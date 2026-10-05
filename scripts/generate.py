#!/usr/bin/env python3
"""Generate src/catalog/*.js from an API Direct OpenAPI document.

    python3 scripts/generate.py spec/openapi.json

Every GET operation in the spec becomes one catalog entry: an action (a Zapier
"create" for endpoints that return a list, a "search" for endpoints that return
one object) and, for endpoints a saved search can run, a polling trigger. The
hand-written modules in src/ turn these entries into Zapier definitions.

The spec is the one served at https://apidirect.io/openapi.json plus the
LinkedIn operations, which the public spec leaves out. Rebuild it with
api-arbitrage's specs/build_openapi.py and copy it to spec/openapi.json.

Standard library only.
"""
import json
import os
import re
import sys

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
OUT_DIR = os.path.join(ROOT, "src", "catalog")
SITE = "https://apidirect.io"

# Operations the app does not expose as generated entries: /v1/time is the auth
# test, /v1/batch has no place in a Zap step, saved searches are hand-written
# in src/, and the POST variant of AI Mode duplicates the GET.
SKIP = {("get", "/v1/time"), ("post", "/v1/batch"), ("post", "/v1/web/ai-mode")}
SKIP_PREFIXES = ("/v1/saved-searches",)

# Endpoints a saved search can run, with the key holding the result list and
# the item fields that identify one result (first present wins, groups joined
# as "field=value|field=value"). Mirrors the API's table at
# https://apidirect.io/docs/saved-searches#supported-endpoints; the sample id
# of every trigger is derived from it so static samples match live ids.
SAVEABLE = {
    "/v1/amazon/best-sellers": ("products", ("asin", "url")),
    "/v1/amazon/products": ("products", ("asin", "url")),
    "/v1/amazon/seller/products": ("products", ("asin", "url")),
    "/v1/amazon/seller/reviews": ("reviews", (("author_name", "review_date", "review_text"),)),
    "/v1/bluesky/post/comments": ("comments", ("post_id", "url")),
    "/v1/bluesky/post/likes": ("likes", ("user_id", "username", "url")),
    "/v1/bluesky/post/quotes": ("quotes", ("post_id", "url")),
    "/v1/bluesky/post/reposts": ("reposts", ("user_id", "username", "url")),
    "/v1/bluesky/posts": ("posts", ("post_id", "url")),
    "/v1/bluesky/user/followers": ("followers", ("user_id", "username", "url")),
    "/v1/bluesky/user/following": ("following", ("user_id", "username", "url")),
    "/v1/bluesky/user/likes": ("posts", ("post_id", "url")),
    "/v1/bluesky/user/posts": ("posts", ("post_id", "url")),
    "/v1/bluesky/users": ("users", ("user_id", "username", "url")),
    "/v1/facebook/events": ("events", ("event_id", "url")),
    "/v1/facebook/group/posts": ("posts", ("post_id", "url")),
    "/v1/facebook/group/search": ("posts", ("post_id", "url")),
    "/v1/facebook/locations": ("results", ("id",)),
    "/v1/facebook/page/photos": ("photos", ("photo_id", "image_url")),
    "/v1/facebook/page/posts": ("posts", ("post_id", "url")),
    "/v1/facebook/page/reels": ("reels", ("video_id", "post_id", "url")),
    "/v1/facebook/page/reviews": ("reviews", (("author_url", "review_text"),)),
    "/v1/facebook/page/videos": ("videos", ("video_id", "url")),
    "/v1/facebook/pages": ("results", ("facebook_id", "profile_url", "url")),
    "/v1/facebook/post/comments": ("comments", ("comment_id",)),
    "/v1/facebook/posts": ("posts", ("post_id", "url")),
    "/v1/facebook/videos": ("videos", ("video_id", "video_url")),
    "/v1/forums/posts": ("posts", ("url",)),
    "/v1/instagram/comment/replies": ("replies", ("comment_id",)),
    "/v1/instagram/hashtag/posts": ("posts", ("media_id", "url")),
    "/v1/instagram/highlight/stories": ("stories", ("media_id", "url")),
    "/v1/instagram/post/comments": ("comments", ("comment_id",)),
    "/v1/instagram/post/likes": ("likes", ("user_id", "username", "url")),
    "/v1/instagram/posts": ("posts", ("media_id", "url")),
    "/v1/instagram/user/followers": ("followers", ("user_id", "username", "url")),
    "/v1/instagram/user/following": ("following", ("user_id", "username", "url")),
    "/v1/instagram/user/highlights": ("highlights", ("highlight_id", "url")),
    "/v1/instagram/user/posts": ("posts", ("media_id", "url")),
    "/v1/instagram/user/stories": ("stories", ("media_id", "url")),
    "/v1/instagram/users": ("users", ("user_id", "username", "url")),
    "/v1/linkedin/companies": ("companies", ("company_id", "url")),
    "/v1/linkedin/company/posts": ("posts", ("urn", "url")),
    "/v1/linkedin/jobs": ("jobs", ("url",)),
    "/v1/linkedin/person/posts": ("posts", ("urn", "url")),
    "/v1/linkedin/posts": ("posts", ("urn", "url")),
    "/v1/news/articles": ("articles", ("url",)),
    "/v1/places/photos": ("photos", ("photo_id", "photo_url")),
    "/v1/places/reviews": ("reviews", ("review_id", "review_link")),
    "/v1/places/search": ("places", ("place_id",)),
    "/v1/reddit/comments": ("posts", ("url",)),
    "/v1/reddit/posts": ("posts", ("url",)),
    "/v1/reddit/users": ("users", ("user_id", "username", "url")),
    "/v1/threads/posts": ("posts", ("post_id", "url")),
    "/v1/threads/user/posts": ("posts", ("post_id", "url")),
    "/v1/threads/users": ("users", ("user_id", "username", "url")),
    "/v1/tiktok/users": ("users", ("user_id", "username", "url")),
    "/v1/tiktok/videos": ("videos", ("url",)),
    "/v1/trustpilot/categories": ("categories", ("category_id",)),
    "/v1/trustpilot/category/companies": ("companies", ("business_unit_id", "domain", "url")),
    "/v1/trustpilot/category/newest": ("companies", ("business_unit_id", "domain", "url")),
    "/v1/trustpilot/companies": ("companies", ("business_unit_id", "domain", "url")),
    "/v1/trustpilot/company/reviews": ("reviews", ("review_id", "review_link")),
    "/v1/trustpilot/user": ("reviews", ("review_id", "review_link")),
    "/v1/truthsocial/user/posts": ("posts", ("post_id", "url")),
    "/v1/twitter/posts": ("posts", ("url",)),
    "/v1/twitter/trends": ("trends", ("name", "url")),
    "/v1/twitter/tweet/comments": ("comments", ("url",)),
    "/v1/twitter/tweet/quotes": ("quotes", ("url",)),
    "/v1/twitter/tweet/retweets": ("retweets", ("user_id", "username", "url")),
    "/v1/twitter/user/followers": ("followers", ("user_id", "username", "url")),
    "/v1/twitter/user/following": ("following", ("user_id", "username", "url")),
    "/v1/twitter/user/replies": ("replies", ("url",)),
    "/v1/twitter/user/tweets": ("tweets", ("url",)),
    "/v1/twitter/user/verified-followers": ("verified_followers", ("user_id", "username", "url")),
    "/v1/twitter/users": ("users", ("user_id", "username", "url")),
    "/v1/web/search": ("results", ("url",)),
    "/v1/youtube/channels": ("channels", ("channel_id", "url")),
    "/v1/youtube/comments": ("comments", ("comment_id", "url")),
    "/v1/youtube/posts": ("posts", ("video_id", "url")),
}

# Polling trigger label and description per saveable endpoint. Zapier requires
# "Triggers when ..." and a trailing period; the pricing sentence is appended.
TRIGGERS = {
    "/v1/amazon/best-sellers": ("New Amazon Best Seller", "Triggers when a product enters an Amazon best sellers list."),
    "/v1/amazon/products": ("New Amazon Product Matching Search", "Triggers when a new product matches your Amazon search."),
    "/v1/amazon/seller/products": ("New Amazon Seller Product", "Triggers when an Amazon seller lists a new product."),
    "/v1/amazon/seller/reviews": ("New Amazon Seller Review", "Triggers when an Amazon seller gets a new review."),
    "/v1/bluesky/post/comments": ("New Bluesky Post Comment", "Triggers when a Bluesky post gets a new reply."),
    "/v1/bluesky/post/likes": ("New Bluesky Post Like", "Triggers when a Bluesky post gets a new like."),
    "/v1/bluesky/post/quotes": ("New Bluesky Post Quote", "Triggers when a Bluesky post is quoted in a new post."),
    "/v1/bluesky/post/reposts": ("New Bluesky Post Repost", "Triggers when a Bluesky post gets a new repost."),
    "/v1/bluesky/posts": ("New Bluesky Post Matching Search", "Triggers when a new Bluesky post matches your search."),
    "/v1/bluesky/user/followers": ("New Bluesky Follower", "Triggers when a Bluesky user gains a new follower."),
    "/v1/bluesky/user/following": ("New Bluesky Account Followed", "Triggers when a Bluesky user follows a new account."),
    "/v1/bluesky/user/likes": ("New Bluesky Like by User", "Triggers when a Bluesky user likes a new post."),
    "/v1/bluesky/user/posts": ("New Bluesky Post by User", "Triggers when a Bluesky user publishes a new post."),
    "/v1/bluesky/users": ("New Bluesky User Matching Search", "Triggers when a new Bluesky user matches your search."),
    "/v1/facebook/events": ("New Facebook Event Matching Search", "Triggers when a new Facebook event matches your search."),
    "/v1/facebook/group/posts": ("New Facebook Group Post", "Triggers when a new post appears in a public Facebook group."),
    "/v1/facebook/group/search": ("New Facebook Group Post Matching Search", "Triggers when a new post in a Facebook group matches your search."),
    "/v1/facebook/locations": ("New Facebook Location Matching Search", "Triggers when a new Facebook location matches your search."),
    "/v1/facebook/page/photos": ("New Facebook Page Photo", "Triggers when a Facebook page posts a new photo."),
    "/v1/facebook/page/posts": ("New Facebook Page Post", "Triggers when a Facebook page publishes a new post."),
    "/v1/facebook/page/reels": ("New Facebook Page Reel", "Triggers when a Facebook page posts a new reel."),
    "/v1/facebook/page/reviews": ("New Facebook Page Review", "Triggers when a Facebook page gets a new review."),
    "/v1/facebook/page/videos": ("New Facebook Page Video", "Triggers when a Facebook page posts a new video."),
    "/v1/facebook/pages": ("New Facebook Page Matching Search", "Triggers when a new Facebook page matches your search."),
    "/v1/facebook/post/comments": ("New Facebook Post Comment", "Triggers when a Facebook post gets a new comment."),
    "/v1/facebook/posts": ("New Facebook Post Matching Search", "Triggers when a new public Facebook post matches your search."),
    "/v1/facebook/videos": ("New Facebook Video Matching Search", "Triggers when a new Facebook video matches your search."),
    "/v1/forums/posts": ("New Forum Post Matching Search", "Triggers when a new forum post matches your search."),
    "/v1/instagram/comment/replies": ("New Instagram Comment Reply", "Triggers when an Instagram comment gets a new reply."),
    "/v1/instagram/hashtag/posts": ("New Instagram Hashtag Post", "Triggers when a new Instagram post uses a hashtag."),
    "/v1/instagram/highlight/stories": ("New Instagram Highlight Story", "Triggers when a new story is added to an Instagram highlight."),
    "/v1/instagram/post/comments": ("New Instagram Post Comment", "Triggers when an Instagram post gets a new comment."),
    "/v1/instagram/post/likes": ("New Instagram Post Like", "Triggers when an Instagram post gets a new like."),
    "/v1/instagram/posts": ("New Instagram Post Matching Search", "Triggers when a new Instagram post matches your search."),
    "/v1/instagram/user/followers": ("New Instagram Follower", "Triggers when an Instagram user gains a new follower."),
    "/v1/instagram/user/following": ("New Instagram Account Followed", "Triggers when an Instagram user follows a new account."),
    "/v1/instagram/user/highlights": ("New Instagram Highlight", "Triggers when an Instagram user adds a new highlight."),
    "/v1/instagram/user/posts": ("New Instagram Post by User", "Triggers when an Instagram user publishes a new post."),
    "/v1/instagram/user/stories": ("New Instagram Story", "Triggers when an Instagram user posts a new story."),
    "/v1/instagram/users": ("New Instagram User Matching Search", "Triggers when a new Instagram user matches your search."),
    "/v1/linkedin/companies": ("New LinkedIn Company Matching Search", "Triggers when a new LinkedIn company matches your search."),
    "/v1/linkedin/company/posts": ("New LinkedIn Company Post", "Triggers when a LinkedIn company page publishes a new post."),
    "/v1/linkedin/jobs": ("New LinkedIn Job Matching Search", "Triggers when a new LinkedIn job listing matches your search."),
    "/v1/linkedin/person/posts": ("New LinkedIn Post by Person", "Triggers when a LinkedIn member publishes a new post."),
    "/v1/linkedin/posts": ("New LinkedIn Post Matching Search", "Triggers when a new LinkedIn post matches your search or filters."),
    "/v1/news/articles": ("New News Article Matching Search", "Triggers when a new news article matches your search."),
    "/v1/places/photos": ("New Google Place Photo", "Triggers when a place gets a new Google Maps photo."),
    "/v1/places/reviews": ("New Google Place Review", "Triggers when a place gets a new Google Maps review."),
    "/v1/places/search": ("New Google Place Matching Search", "Triggers when a new place matches your Google Maps search."),
    "/v1/reddit/comments": ("New Reddit Comment Matching Search", "Triggers when a new Reddit comment matches your search."),
    "/v1/reddit/posts": ("New Reddit Post Matching Search", "Triggers when a new Reddit post matches your search."),
    "/v1/reddit/users": ("New Reddit User Matching Search", "Triggers when a new Reddit user matches your search."),
    "/v1/threads/posts": ("New Threads Post Matching Search", "Triggers when a new Threads post matches your search."),
    "/v1/threads/user/posts": ("New Threads Post by User", "Triggers when a Threads user publishes a new post."),
    "/v1/threads/users": ("New Threads User Matching Search", "Triggers when a new Threads user matches your search."),
    "/v1/tiktok/users": ("New TikTok User Matching Search", "Triggers when a new TikTok user matches your search."),
    "/v1/tiktok/videos": ("New TikTok Video Matching Search", "Triggers when a new TikTok video matches your search."),
    "/v1/trustpilot/categories": ("New Trustpilot Category Matching Search", "Triggers when a new Trustpilot category matches your search."),
    "/v1/trustpilot/category/companies": ("New Trustpilot Company in Category", "Triggers when a new company appears in a Trustpilot category."),
    "/v1/trustpilot/category/newest": ("Newly Listed Trustpilot Company in Category", "Triggers when a company is newly listed in a Trustpilot category."),
    "/v1/trustpilot/companies": ("New Trustpilot Company Matching Search", "Triggers when a new Trustpilot company matches your search."),
    "/v1/trustpilot/company/reviews": ("New Trustpilot Company Review", "Triggers when a company gets a new Trustpilot review."),
    "/v1/trustpilot/user": ("New Trustpilot Review by User", "Triggers when a Trustpilot user writes a new review."),
    "/v1/truthsocial/user/posts": ("New Truth Social Post by User", "Triggers when a Truth Social user publishes a new post."),
    "/v1/twitter/posts": ("New Twitter Post Matching Search", "Triggers when a new Twitter/X post matches your search."),
    "/v1/twitter/trends": ("New Twitter Trending Topic", "Triggers when a new topic starts trending on Twitter/X in a location."),
    "/v1/twitter/tweet/comments": ("New Tweet Reply", "Triggers when a tweet gets a new reply."),
    "/v1/twitter/tweet/quotes": ("New Tweet Quote", "Triggers when a tweet is quoted in a new tweet."),
    "/v1/twitter/tweet/retweets": ("New Tweet Retweet", "Triggers when a tweet gets a new retweet."),
    "/v1/twitter/user/followers": ("New Twitter Follower", "Triggers when a Twitter/X user gains a new follower."),
    "/v1/twitter/user/following": ("New Twitter Account Followed", "Triggers when a Twitter/X user follows a new account."),
    "/v1/twitter/user/replies": ("New Twitter Reply by User", "Triggers when a Twitter/X user posts a new reply."),
    "/v1/twitter/user/tweets": ("New Tweet by User", "Triggers when a Twitter/X user posts a new tweet."),
    "/v1/twitter/user/verified-followers": ("New Verified Twitter Follower", "Triggers when a Twitter/X user gains a new verified follower."),
    "/v1/twitter/users": ("New Twitter User Matching Search", "Triggers when a new Twitter/X user matches your search."),
    "/v1/web/search": ("New Google Search Result", "Triggers when a new web page appears in Google results for your search."),
    "/v1/youtube/channels": ("New YouTube Channel Matching Search", "Triggers when a new YouTube channel matches your search."),
    "/v1/youtube/comments": ("New YouTube Video Comment", "Triggers when a YouTube video gets a new comment."),
    "/v1/youtube/posts": ("New YouTube Video Matching Search", "Triggers when a new YouTube video matches your search."),
}

# Endpoints whose documented 200 example has an empty result list: the sample
# item is borrowed from an endpoint that returns the same kind of item.
SAMPLE_FROM = {
    "/v1/twitter/tweet/quotes": "/v1/twitter/user/tweets",
    "/v1/twitter/tweet/retweets": "/v1/twitter/user/followers",
}

# Action labels that the rule below ("Search ..." stays, lists get "Get ...",
# single objects get "Find ..." without a trailing Details/Profile) gets wrong.
ACTION_LABELS = {
    "/v1/web/ai-mode": "Ask Google AI Mode",
    "/v1/web/search": "Search Google",
    "/v1/trustpilot/category/newest": "Get Newest Trustpilot Companies in Category",
    "/v1/trustpilot/user": "Get Trustpilot User Reviews",
    "/v1/twitter/tweet": "Find Tweet",
    "/v1/twitter/tweet/quotes": "Get Quote Tweets",
    "/v1/twitter/tweet/retweets": "Get Tweet Retweets",
    "/v1/twitter/tweet/comments": "Get Tweet Replies",
}

# Nouns where the list key or wrapper key would read wrong.
PATH_NOUNS = {
    "/v1/facebook/locations": "Location", "/v1/facebook/pages": "Page",
    "/v1/web/search": "Search Result", "/v1/youtube/posts": "Video",
    "/v1/reddit/comments": "Comment", "/v1/bluesky/user/likes": "Liked Post",
    "/v1/trustpilot/user": "Review", "/v1/twitter/tweet/comments": "Reply",
    "/v1/twitter/tweet/quotes": "Quote Tweet", "/v1/bluesky/post/quotes": "Quote Post",
    "/v1/linkedin/person": "Person", "/v1/linkedin/post": "Post",
    "/v1/linkedin/company": "Company", "/v1/linkedin/job": "Job",
}

# Singular noun per result list key (or wrapper key of a single object).
NOUNS = {
    "posts": "Post", "users": "User", "tweets": "Tweet", "comments": "Comment",
    "replies": "Reply", "quotes": "Quote", "retweets": "Retweet",
    "followers": "Follower", "following": "Followed Account", "likes": "Like",
    "reposts": "Repost", "results": "Result", "videos": "Video", "reels": "Reel",
    "photos": "Photo", "reviews": "Review", "events": "Event", "products": "Product",
    "companies": "Company", "jobs": "Job", "articles": "Article", "places": "Place",
    "stories": "Story", "highlights": "Highlight", "trends": "Trend",
    "channels": "Channel", "categories": "Category", "verified_followers": "Verified Follower",
    "user": "User", "tweet": "Tweet", "post": "Post", "place": "Place", "product": "Product",
    "seller": "Seller", "page": "Page", "group": "Group", "video": "Video",
    "channel": "Channel", "person": "Person", "company": "Company", "job": "Job",
    "category": "Category",
}

# Input field labels where Title Case of the key is not enough.
FIELD_LABELS = {
    "query": "Search Query", "url": "URL", "asin": "ASIN", "woeid": "WOEID",
    "lat": "Latitude", "lng": "Longitude", "posted_ago": "Posted Within",
    "get_sentiment": "Add Sentiment Analysis", "pages": "Pages to Fetch",
    "page": "Page Number", "min_rating": "Minimum Rating",
    "min_review_count": "Minimum Review Count", "min_price": "Minimum Price",
    "max_price": "Maximum Price", "is_prime": "Prime Only",
    "four_stars_and_up": "Four Stars and Up", "deals_and_discounts": "Deals and Discounts",
    "time_published": "Published Within", "upload_date": "Uploaded Within",
    "publish_time": "Published Within (Days)", "with_replies": "Include Replies",
    "include_ai_overview": "Include AI Overview", "translate_reviews": "Translate Reviews",
    "session_token": "Session Token", "company_ids": "Company IDs",
    "author_title": "Author Job Title", "author_company": "Author's Company",
    "from_company": "Posted by Company", "mentions_company": "Mentions Company",
    "mentions_member": "Mentions Member", "author_industry": "Author Industry",
    "job_type": "Job Type", "delegate_page_id": "Delegate Page ID",
    "reels_page_id": "Reels Page ID", "product_condition": "Product Condition",
    "star_rating": "Star Rating",
}
ACRONYMS = {"id": "ID", "url": "URL", "ids": "IDs", "ai": "AI", "asin": "ASIN", "urn": "URN",
            "utc": "UTC", "api": "API", "tv": "TV", "cdn": "CDN", "html": "HTML"}

MAX_LIST_ITEMS = 2        # items kept per list in samples
MAX_STRING = 200          # characters kept per string in samples
MAX_OUTPUT_FIELDS = 80    # output fields per entry

_DATE_RE = re.compile(r"^(\d{4}-\d{2}-\d{2}) (\d{2}:\d{2}:\d{2})(?: UTC)?$")


def title(key):
    words = []
    for w in key.replace("-", "_").split("_"):
        if not w:
            continue
        words.append(ACRONYMS.get(w.lower(), w[:1].upper() + w[1:]))
    return " ".join(words)


def field_label(name):
    if name in FIELD_LABELS:
        return FIELD_LABELS[name]
    return title(name)


def op_key(path):
    return path[len("/v1/"):].replace("/", "_").replace("-", "_")


def slug(tag):
    return tag.lower().replace(" ", "-")


def third_person(sentence):
    """'Search for tweets' -> 'Searches for tweets' (first word only)."""
    verbs = {"Search": "Searches", "Get": "Gets", "Look": "Looks", "Run": "Runs",
             "Retrieve": "Retrieves", "List": "Lists", "Fetch": "Fetches",
             "Find": "Finds", "Return": "Returns", "Ask": "Asks", "Send": "Sends",
             "Resolve": "Resolves"}
    first, _, rest = sentence.partition(" ")
    return f"{verbs.get(first, first)} {rest}" if rest else verbs.get(first, first)


def strip_markdown(text):
    text = re.sub(r"\[([^\]]+)\]\([^)]+\)", r"\1", text)
    text = text.replace("**", "").replace("`", "")
    return re.sub(r"\s+", " ", text).strip()


_BARE_URL_RE = re.compile(r"(?<!\]\()(?<!`)(https?://[^\s`\)\]]+)")


def _link_url(match):
    url = match.group(1)
    if url.startswith(SITE + "/docs"):
        return f"[docs]({url})"
    return f"`{url}`"


def help_text(text):
    """Markdown for a field's help text: bold stripped, apidirect.io docs URLs
    as links, every other bare URL in backticks (Zapier check D008)."""
    text = text.replace("**", "")
    text = _BARE_URL_RE.sub(_link_url, text)
    return re.sub(r"\s+", " ", text).strip()


def pricing(description):
    price = re.search(r"\*\*Price:\*\*\s*(.+?)\.(?:\s|$)", description)
    free = re.search(r"\*\*Free tier:\*\*\s*(.+?)\.(?:\s|$)", description)
    if not price:
        return ""
    line = strip_markdown(price.group(1))
    if free:
        line += f" after the free tier ({strip_markdown(free.group(1))})"
    return line


def action_description(op, label):
    head = strip_markdown(op["description"].split("\n\n")[0])
    head = third_person(head)
    if not head.endswith("."):
        head += "."
    price = pricing(op["description"])
    text = head + (f" {price[0].upper() + price[1:]}." if price else "")
    if len(text) > 1000:
        cut = text[:990].rsplit(". ", 1)[0]
        text = cut + "."
    return text


def normalize_dates(value):
    if isinstance(value, dict):
        return {k: normalize_dates(v) for k, v in value.items()}
    if isinstance(value, list):
        return [normalize_dates(v) for v in value]
    if isinstance(value, str):
        m = _DATE_RE.match(value.strip())
        if m:
            return f"{m.group(1)}T{m.group(2)}Z"
    return value


def trim(value, depth=0):
    """A sample-sized copy: short lists, short strings, dates normalized."""
    if isinstance(value, dict):
        return {k: trim(v, depth + 1) for k, v in value.items()}
    if isinstance(value, list):
        keep = MAX_LIST_ITEMS if depth == 0 else 3
        return [trim(v, depth + 1) for v in value[:keep]]
    if isinstance(value, str):
        value = normalize_dates(value)
        if len(value) > MAX_STRING:
            value = value[:MAX_STRING - 1] + "…"
        return value
    return value


def usable(v):
    return v is not None and not isinstance(v, (bool, dict, list)) and str(v).strip() != ""


def item_id(path, item):
    _, candidates = SAVEABLE[path]
    for candidate in candidates:
        if isinstance(candidate, tuple):
            values = [item.get(f) for f in candidate]
            if all(usable(v) for v in values):
                return "|".join(f"{f}={str(v).strip()}" for f, v in zip(candidate, values))
        elif usable(item.get(candidate)):
            return str(item[candidate]).strip()
    return "sha256:0000000000000000000000000000000000000000000000000000000000000000"


def value_type(v):
    if isinstance(v, bool):
        return "boolean"
    if isinstance(v, (int, float)):
        return "number"
    return None


def output_fields(sample, prefix="", label_prefix="", depth=0):
    fields = []
    for k, v in sample.items():
        key = prefix + k
        label = (label_prefix + title(k)).strip()
        if isinstance(v, dict):
            if depth < 2 and v:
                fields.extend(output_fields(v, key + "__", title(k) + " ", depth + 1))
        elif isinstance(v, list):
            if v and isinstance(v[0], dict):
                if depth < 2:
                    fields.extend(output_fields(v[0], key + "[]", title(k) + ": ", depth + 1))
            else:
                fields.append({"key": key, "label": label, "list": True})
        else:
            f = {"key": key, "label": label}
            t = value_type(v)
            if t:
                f["type"] = t
            fields.append(f)
    return fields


def help_text_of(param):
    return help_text(param.get("description", ""))


def input_field(param, is_trigger):
    name = param["name"]
    sch = param.get("schema", {})
    kind = sch.get("type", "string")
    f = {"key": name, "label": field_label(name), "required": bool(param.get("required"))}
    f["type"] = {"integer": "integer", "number": "number", "boolean": "boolean"}.get(kind, "string")
    help_text = help_text_of(param)
    notes = []
    if "minimum" in sch and "maximum" in sch:
        notes.append(f"{sch['minimum']}-{sch['maximum']}")
    elif "maximum" in sch:
        notes.append(f"up to {sch['maximum']}")
    elif "minimum" in sch:
        notes.append(f"at least {sch['minimum']}")
    if "maxLength" in sch and "character" not in help_text:
        notes.append(f"up to {sch['maxLength']} characters")
    if notes:
        help_text = (help_text.rstrip(".") + " (" + ", ".join(notes) + ").") if help_text else ", ".join(notes).capitalize() + "."
    if "default" in sch and kind != "boolean":
        default = sch["default"]
        if name == "sort_by" and is_trigger and "most_recent" in sch.get("enum", []):
            default = "most_recent"
        f["default"] = str(default)
    elif name == "sort_by" and is_trigger and "most_recent" in sch.get("enum", []):
        f["default"] = "most_recent"
    if name == "pages" and is_trigger:
        help_text += " Every check of this trigger fetches this many pages, each billed as one request."
    if help_text and help_text.lower() != f["label"].lower():
        f["helpText"] = help_text
    if "enum" in sch:
        f["choices"] = {str(v): choice_label(name, v) for v in sch["enum"]}
    if "example" in param and kind != "boolean":
        f["placeholder"] = str(param["example"])
    return f


def choice_label(name, value):
    v = str(value)
    if name == "posted_ago":
        return {"1h": "Last hour", "24h": "Last 24 hours", "7d": "Last 7 days", "30d": "Last 30 days",
                "3m": "Last 3 months", "6m": "Last 6 months", "12m": "Last 12 months"}.get(v, v)
    if name == "country":
        return v.upper()
    if name == "min_rating":
        return f"{v}+"
    if name in ("min_review_count",):
        return f"{v}+"
    if name == "publish_time":
        return {"0": "Any time", "1": "Last day", "7": "Last week", "30": "Last month",
                "90": "Last 3 months", "180": "Last 6 months"}.get(v, v)
    return title(v)


def example_of(spec, path):
    op = spec["paths"].get(path, {}).get("get", {})
    return (op.get("responses", {}).get("200", {}).get("content", {})
            .get("application/json", {}).get("example"))


def build_entry(spec, method, path, op, tag):
    example = example_of(spec, path)
    if not isinstance(example, dict):
        sys.exit(f"{path}: no 200 example in the spec; a sample is required")
    if path in SAMPLE_FROM and not example.get(SAVEABLE[path][0]):
        source = example_of(spec, SAMPLE_FROM[path])
        borrowed = source[SAVEABLE[SAMPLE_FROM[path]][0]]
        example = {**example, SAVEABLE[path][0]: borrowed, "count": len(borrowed)}

    summary = op["summary"]
    if path in SAVEABLE:
        kind, list_key = "list", SAVEABLE[path][0]
        if list_key not in example or not isinstance(example[list_key], list):
            sys.exit(f"{path}: list key {list_key} missing from the 200 example")
        unwrap = None
    elif path == "/v1/web/ai-mode":
        kind, list_key, unwrap = "answer", None, None
    else:
        kind, list_key = "detail", None
        wrappers = [k for k, v in example.items() if isinstance(v, dict)]
        unwrap = wrappers[0] if len(wrappers) == 1 and len(example) == 1 else None

    if path in ACTION_LABELS:
        label = ACTION_LABELS[path]
    elif summary.startswith("Search "):
        label = summary
    elif kind == "detail":
        label = "Find " + re.sub(r" (Details|Profile)$", "", summary)
    else:
        label = "Get " + summary

    noun = PATH_NOUNS.get(path) or NOUNS.get(list_key or unwrap or "")
    if noun is None:
        noun = {"answer": "Answer"}.get(kind, summary.split(" ")[-1])

    entry = {
        "key": op_key(path),
        "path": path,
        "method": method.upper(),
        "platform": tag,
        "noun": noun,
        "kind": kind,
        "listKey": list_key,
        "unwrapKey": unwrap,
        "docs": op.get("externalDocs", {}).get("url"),
        "action": {"label": label, "description": action_description(op, label)},
        "inputFields": [input_field(p, False) for p in sorted(op.get("parameters", []), key=lambda p: not p.get("required"))],
    }
    if kind == "detail" and unwrap:
        action_sample = trim(example[unwrap])
    else:
        action_sample = trim(example)
    entry["sample"] = action_sample
    entry["outputFields"] = output_fields(action_sample)[:MAX_OUTPUT_FIELDS]

    if kind == "list":
        tlabel, tdesc = TRIGGERS[path]
        price = pricing(op["description"])
        tdesc = f"{tdesc} Each check runs {label}" + (f" ({price})." if price else ".")
        items = example[list_key]
        if not items or not isinstance(items[0], dict):
            sys.exit(f"{path}: the 200 example has no {list_key} item to sample")
        item = trim(items[0], depth=1)
        item_sample = {"id": item_id(path, items[0]), **item}
        entry["trigger"] = {
            "label": tlabel,
            "description": tdesc,
            "inputFields": [input_field(p, True) for p in sorted(op.get("parameters", []), key=lambda p: not p.get("required"))],
            "sample": item_sample,
            "outputFields": [{"key": "id", "label": "ID", "primary": True}]
            + output_fields({k: v for k, v in item_sample.items() if k != "id"})[:MAX_OUTPUT_FIELDS],
        }
    else:
        entry["trigger"] = None
    return entry


def main():
    if len(sys.argv) != 2:
        sys.exit(__doc__)
    with open(sys.argv[1], encoding="utf-8") as f:
        spec = json.load(f)

    by_tag = {}
    for path, methods in spec["paths"].items():
        if path.startswith(SKIP_PREFIXES):
            continue
        for method, op in methods.items():
            if (method, path) in SKIP:
                continue
            if method != "get":
                sys.exit(f"{method.upper()} {path}: only GET operations are generated; add it to SKIP or handle it by hand")
            if op.get("description", "").startswith("Temporarily unavailable"):
                print(f"skipping {path}: the spec marks it temporarily unavailable", file=sys.stderr)
                continue
            tag = op["tags"][0]
            by_tag.setdefault(tag, []).append(build_entry(spec, method, path, op, tag))

    for path in SAVEABLE:
        if path not in spec["paths"]:
            sys.exit(f"SAVEABLE lists {path} but the spec has no such operation")
    for path in TRIGGERS:
        if path not in SAVEABLE:
            sys.exit(f"TRIGGERS lists {path} but SAVEABLE does not")

    os.makedirs(OUT_DIR, exist_ok=True)
    for old in os.listdir(OUT_DIR):
        os.remove(os.path.join(OUT_DIR, old))
    names = []
    header = ("// Generated by scripts/generate.py from spec/openapi.json. Do not edit by hand;\n"
              "// change the spec or the generator and run `npm run generate`.\n")
    for tag in sorted(by_tag):
        name = slug(tag)
        names.append(name)
        with open(os.path.join(OUT_DIR, name + ".js"), "w", encoding="utf-8") as f:
            f.write(header + "module.exports = " + json.dumps(by_tag[tag], indent=2, ensure_ascii=False) + ";\n")
    with open(os.path.join(OUT_DIR, "index.js"), "w", encoding="utf-8") as f:
        f.write(header + "module.exports = [\n" + "".join(f"  ...require('./{n}'),\n" for n in names) + "];\n")

    total = sum(len(v) for v in by_tag.values())
    triggers = sum(1 for v in by_tag.values() for e in v if e["trigger"])
    kinds = {}
    for v in by_tag.values():
        for e in v:
            kinds[e["kind"]] = kinds.get(e["kind"], 0) + 1
    print(f"{total} operations across {len(by_tag)} platforms: {kinds}; {triggers} polling triggers")


if __name__ == "__main__":
    main()
