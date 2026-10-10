#!/usr/bin/env python3
"""Render src/Catalog.js from spec/openapi.json.

The catalog is the single source of truth the add-on uses for endpoint
names, parameters, labels, prices and output fields. Regenerate it after
updating spec/openapi.json:

    python3 scripts/generate_catalog.py            # write src/Catalog.js
    python3 scripts/generate_catalog.py --check    # fail if it is stale (CI)
"""
import json
import os
import re
import sys

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
SPEC = os.path.join(ROOT, "spec", "openapi.json")
OUT = os.path.join(ROOT, "src", "Catalog.js")

# Platforms in the order the n8n node lists its resources, plus LinkedIn.
PLATFORMS = [
    ("twitter", "Twitter/X", ["twitter"]),
    ("facebook", "Facebook", ["facebook"]),
    ("instagram", "Instagram", ["instagram"]),
    ("tiktok", "TikTok", ["tiktok"]),
    ("youtube", "YouTube", ["youtube"]),
    ("reddit", "Reddit", ["reddit"]),
    ("threads", "Threads", ["threads"]),
    ("truthsocial", "Truth Social", ["truthsocial"]),
    ("bluesky", "Bluesky", ["bluesky"]),
    ("linkedin", "LinkedIn", ["linkedin"]),
    ("amazon", "Amazon", ["amazon"]),
    ("trustpilot", "Trustpilot", ["trustpilot"]),
    ("google", "Google", ["web", "news", "forums", "places"]),
]

# Words stripped from the spec summary to get the label shown under a platform.
STRIP_WORDS = {
    "twitter": ["Twitter"],
    "facebook": ["Facebook"],
    "instagram": ["Instagram"],
    "tiktok": ["TikTok"],
    "youtube": ["YouTube"],
    "reddit": ["Reddit"],
    "threads": ["Threads"],
    "truthsocial": ["Truth Social"],
    "bluesky": ["Bluesky"],
    "linkedin": ["LinkedIn"],
    "amazon": ["Amazon"],
    "trustpilot": ["Trustpilot"],
    "google": ["Google"],
}

# Labels that read better than the stripped summary.
LABEL_OVERRIDES = {
    "web/search": "Web Search",
    "web/ai-mode": "AI Mode",
    "news/articles": "News Articles",
    "forums/posts": "Forum Posts",
    "places/search": "Places Search",
    "places/details": "Place Details",
    "places/reviews": "Place Reviews",
    "places/photos": "Place Photos",
    "twitter/tweet/quotes": "Tweet Quotes",
    "twitter/trends": "Trends",
    "facebook/group/search": "Group Posts Search",
}

# Endpoints the add-on does not expose in the sidebar or custom functions.
INTERNAL_PREFIXES = ("/v1/batch", "/v1/time")

# The first platform alias (APIDIRECT_SEARCH("twitter", ...)) maps to this endpoint.
PRIMARY_SEARCH = {
    "twitter": "twitter/posts",
    "facebook": "facebook/posts",
    "instagram": "instagram/posts",
    "tiktok": "tiktok/videos",
    "youtube": "youtube/posts",
    "reddit": "reddit/posts",
    "threads": "threads/posts",
    "bluesky": "bluesky/posts",
    "linkedin": "linkedin/posts",
    "amazon": "amazon/products",
    "trustpilot": "trustpilot/companies",
    "google": "web/search",
}

# Extra spellings users are likely to type as the platform argument.
ALIASES = {
    "x": "twitter/posts",
    "tweets": "twitter/posts",
    "web": "web/search",
    "news": "news/articles",
    "forums": "forums/posts",
    "forum": "forums/posts",
    "places": "places/search",
    "maps": "places/search",
    "google maps": "places/search",
    "jobs": "linkedin/jobs",
    "linkedin jobs": "linkedin/jobs",
    "linkedin companies": "linkedin/companies",
    "companies": "linkedin/companies",
    "trustpilot reviews": "trustpilot/company/reviews",
    "amazon products": "amazon/products",
    "events": "facebook/events",
    "facebook events": "facebook/events",
    "facebook pages": "facebook/pages",
    "facebook videos": "facebook/videos",
    "facebook locations": "facebook/locations",
    "reddit comments": "reddit/comments",
    "reddit users": "reddit/users",
    "twitter users": "twitter/users",
    "x users": "twitter/users",
    "instagram users": "instagram/users",
    "tiktok users": "tiktok/users",
    "tiktok videos": "tiktok/videos",
    "youtube videos": "youtube/posts",
    "youtube channels": "youtube/channels",
    "threads users": "threads/users",
    "bluesky users": "bluesky/users",
    "trustpilot companies": "trustpilot/companies",
    "trustpilot categories": "trustpilot/categories",
    "google ai": "web/ai-mode",
    "ai mode": "web/ai-mode",
    "google search": "web/search",
    "google web": "web/search",
    "google news": "news/articles",
    "news articles": "news/articles",
    "google forums": "forums/posts",
    "forum posts": "forums/posts",
    "google places": "places/search",
    "places search": "places/search",
}

# Fields that identify one result on each list endpoint, in order of preference; a nested
# list is a composite key. The scheduled refresh keeps these columns in the sheet so repeat
# results can be recognised on the next run; a row with none of them is keyed by its content.
ID_FIELDS = {
    "/v1/amazon/products": ["asin", "url"],
    "/v1/amazon/seller/reviews": [["author_name", "review_date", "review_text"]],
    "/v1/amazon/seller/products": ["asin", "url"],
    "/v1/amazon/best-sellers": ["asin", "url"],
    "/v1/bluesky/posts": ["post_id", "url"],
    "/v1/bluesky/users": ["user_id", "username", "url"],
    "/v1/bluesky/user/posts": ["post_id", "url"],
    "/v1/bluesky/user/followers": ["user_id", "username", "url"],
    "/v1/bluesky/user/following": ["user_id", "username", "url"],
    "/v1/bluesky/user/likes": ["post_id", "url"],
    "/v1/bluesky/post/comments": ["post_id", "url"],
    "/v1/bluesky/post/likes": ["user_id", "username", "url"],
    "/v1/bluesky/post/quotes": ["post_id", "url"],
    "/v1/bluesky/post/reposts": ["user_id", "username", "url"],
    "/v1/facebook/posts": ["post_id", "url"],
    "/v1/facebook/locations": ["id"],
    "/v1/facebook/pages": ["facebook_id", "profile_url", "url"],
    "/v1/facebook/videos": ["video_id", "video_url"],
    "/v1/facebook/events": ["event_id", "url"],
    "/v1/facebook/page/posts": ["post_id", "url"],
    "/v1/facebook/page/photos": ["photo_id", "image_url"],
    "/v1/facebook/page/videos": ["video_id", "url"],
    "/v1/facebook/page/reels": ["video_id", "post_id", "url"],
    "/v1/facebook/page/reviews": [["author_url", "review_text"]],
    "/v1/facebook/group/posts": ["post_id", "url"],
    "/v1/facebook/group/search": ["post_id", "url"],
    "/v1/facebook/post/comments": ["comment_id"],
    "/v1/forums/posts": ["url"],
    "/v1/news/articles": ["url"],
    "/v1/web/search": ["url"],
    "/v1/places/search": ["place_id"],
    "/v1/places/reviews": ["review_id", "review_link"],
    "/v1/places/photos": ["photo_id", "photo_url"],
    "/v1/instagram/posts": ["media_id", "url"],
    "/v1/instagram/users": ["user_id", "username", "url"],
    "/v1/instagram/user/posts": ["media_id", "url"],
    "/v1/instagram/user/followers": ["user_id", "username", "url"],
    "/v1/instagram/user/following": ["user_id", "username", "url"],
    "/v1/instagram/user/stories": ["media_id", "url"],
    "/v1/instagram/user/highlights": ["highlight_id", "url"],
    "/v1/instagram/highlight/stories": ["media_id", "url"],
    "/v1/instagram/post/comments": ["comment_id"],
    "/v1/instagram/comment/replies": ["comment_id"],
    "/v1/instagram/post/likes": ["user_id", "username", "url"],
    "/v1/instagram/hashtag/posts": ["media_id", "url"],
    "/v1/linkedin/posts": ["urn", "url"],
    "/v1/linkedin/person/posts": ["urn", "url"],
    "/v1/linkedin/company/posts": ["urn", "url"],
    "/v1/linkedin/companies": ["company_id", "url"],
    "/v1/linkedin/jobs": ["url"],
    "/v1/reddit/posts": ["url"],
    "/v1/reddit/comments": ["url"],
    "/v1/reddit/users": ["user_id", "username", "url"],
    "/v1/threads/posts": ["post_id", "url"],
    "/v1/threads/users": ["user_id", "username", "url"],
    "/v1/threads/user/posts": ["post_id", "url"],
    "/v1/tiktok/videos": ["url"],
    "/v1/tiktok/users": ["user_id", "username", "url"],
    "/v1/trustpilot/company/reviews": ["review_id", "review_link"],
    "/v1/trustpilot/companies": ["business_unit_id", "domain", "url"],
    "/v1/trustpilot/category/companies": ["business_unit_id", "domain", "url"],
    "/v1/trustpilot/category/newest": ["business_unit_id", "domain", "url"],
    "/v1/trustpilot/categories": ["category_id"],
    "/v1/trustpilot/user": ["review_id", "review_link"],
    "/v1/truthsocial/user/posts": ["post_id", "url"],
    "/v1/twitter/posts": ["url"],
    "/v1/twitter/users": ["user_id", "username", "url"],
    "/v1/twitter/user/tweets": ["url"],
    "/v1/twitter/user/followers": ["user_id", "username", "url"],
    "/v1/twitter/user/following": ["user_id", "username", "url"],
    "/v1/twitter/user/verified-followers": ["user_id", "username", "url"],
    "/v1/twitter/user/replies": ["url"],
    "/v1/twitter/tweet/retweets": ["user_id", "username", "url"],
    "/v1/twitter/tweet/quotes": ["url"],
    "/v1/twitter/tweet/comments": ["url"],
    "/v1/twitter/trends": ["name", "url"],
    "/v1/youtube/posts": ["video_id", "url"],
    "/v1/youtube/channels": ["channel_id", "url"],
    "/v1/youtube/comments": ["comment_id", "url"],
}

# Detail endpoints whose response is the object itself (no wrapper key).
FLAT_DETAIL = {"/v1/linkedin/person", "/v1/linkedin/post", "/v1/linkedin/company", "/v1/linkedin/job"}

# Endpoints whose main content is prose rather than a table.
TEXT_ENDPOINTS = {"/v1/web/ai-mode"}

# Which array holds the rows when the response has more than one.
LIST_KEY_OVERRIDES = {"/v1/trustpilot/companies": "companies", "/v1/trustpilot/user": "reviews"}

# Public operations deliberately left out of the catalog (none at the moment; every data
# endpoint in the spec ships, including ones the API marks temporarily unavailable).
SKIP_ENDPOINTS = set()

# The API prefixes a suspended endpoint's description with this notice; the catalog carries
# it as `suspended: true` so the sidebar can say so, and keeps the real description.
SUSPENDED_RE = re.compile(r"^\s*Temporarily unavailable:.*?as it behaves when available\.\s*", re.S)

PARAM_LABELS = {
    "query": "Query", "sort_by": "Sort By", "get_sentiment": "Get Sentiment", "asin": "ASIN",
    "url": "URL", "lat": "Latitude", "lng": "Longitude", "woeid": "WOEID", "id": "ID",
    "page": "Page", "pages": "Pages", "posted_ago": "Posted Ago", "start_date": "Start Date",
    "end_date": "End Date", "min_price": "Min Price", "max_price": "Max Price",
    "is_prime": "Prime Only", "four_stars_and_up": "4 Stars and Up",
    "deals_and_discounts": "Deals and Discounts", "product_condition": "Product Condition",
    "include_ai_overview": "Include AI Overview", "time_published": "Time Published",
    "upload_date": "Upload Date", "publish_time": "Publish Time", "with_replies": "With Replies",
    "min_review_count": "Min Review Count", "min_rating": "Min Rating", "star_rating": "Star Rating",
    "translate_reviews": "Translate Reviews", "session_token": "Session Token",
    "mentions_member": "Mentions Member", "from_company": "From Company",
    "author_company": "Author Company", "mentions_company": "Mentions Company",
    "author_title": "Author Title", "author_industry": "Author Industry", "job_type": "Job Type",
    "company_ids": "Company IDs", "limit": "Limit", "prompt": "Prompt", "time": "Time",
}


def param_label(name):
    if name in PARAM_LABELS:
        return PARAM_LABELS[name]
    words = []
    for w in name.split("_"):
        if w == "id":
            words.append("ID")
        elif w == "url":
            words.append("URL")
        else:
            words.append(w.capitalize())
    return " ".join(words)


def deref(spec, schema):
    while isinstance(schema, dict) and "$ref" in schema:
        node = spec
        for part in schema["$ref"].split("/")[1:]:
            node = node[part]
        schema = node
    return schema


def platform_for(path):
    seg = path.split("/")[2]
    for pid, _label, prefixes in PLATFORMS:
        if seg in prefixes:
            return pid
    return None


def label_for(key, platform, summary):
    if key in LABEL_OVERRIDES:
        return LABEL_OVERRIDES[key]
    label = summary
    for word in STRIP_WORDS.get(platform, []):
        label = re.sub(r"\b" + re.escape(word) + r"\b", "", label)
    label = re.sub(r"\s+", " ", label).strip()
    return label


def price_for(description):
    m = re.search(r"\*\*Price:\*\*\s*([^\n]*?)\.?\s*\*\*Free tier:\*\*\s*([^\n]*?)\.?\s*$", description, re.M)
    if not m:
        m2 = re.search(r"\*\*Price:\*\*\s*([^\n]*)", description)
        return (m2.group(1).strip().rstrip(".") if m2 else ""), ""
    return m.group(1).strip().rstrip("."), m.group(2).strip().rstrip(".")


def short_description(description):
    """First sentence of the description, for the sidebar."""
    text = description.split("\n\n")[0]
    text = re.sub(r"\s+", " ", text).strip()
    m = re.match(r"(.+?\.)(\s|$)", text)
    return m.group(1) if m else text


def field_names(spec, schema, prefix="", depth=0):
    """Flattened field names for an object schema, one level of nesting."""
    schema = deref(spec, schema)
    names = []
    for name, sub in (schema.get("properties") or {}).items():
        sub = deref(spec, sub)
        if sub.get("type") == "object" and sub.get("properties") and depth < 1:
            names.extend(field_names(spec, sub, prefix + name + ".", depth + 1))
        else:
            names.append(prefix + name)
    return names


def build(spec):
    endpoints = []
    for path, methods in spec["paths"].items():
        if path.startswith(INTERNAL_PREFIXES) or path in SKIP_ENDPOINTS:
            continue
        op = methods.get("get")
        if op is None:
            continue
        method = "GET"
        if path in TEXT_ENDPOINTS and "post" in methods:
            method = "POST"  # long prompts do not fit in a URL; the API accepts a JSON body
        platform = platform_for(path)
        if platform is None:
            raise SystemExit("unknown platform for " + path)
        key = path[len("/v1/"):]
        params = []
        for p in op.get("parameters", []):
            if p.get("in") != "query":
                continue
            schema = deref(spec, p["schema"])
            param = {
                "name": p["name"],
                "label": param_label(p["name"]),
                "type": schema.get("type", "string"),
                "required": bool(p.get("required")),
                "description": re.sub(r"\s+", " ", p.get("description", "")).strip(),
            }
            if "enum" in schema:
                param["enum"] = schema["enum"]
            if "default" in schema and schema["default"] is not None:
                param["default"] = schema["default"]
            if "minimum" in schema:
                param["min"] = schema["minimum"]
            if "maximum" in schema:
                param["max"] = schema["maximum"]
            params.append(param)
        response = op["responses"].get("200", {}).get("content", {}).get("application/json", {}).get("schema")
        response = deref(spec, response or {})
        props = response.get("properties") or {}
        kind = "detail"
        list_key = None
        fields = []
        if path in TEXT_ENDPOINTS:
            kind = "text"
        elif path in FLAT_DETAIL:
            fields = field_names(spec, response)
        else:
            arrays = [k for k, v in props.items()
                      if deref(spec, v).get("type") == "array"
                      and deref(spec, deref(spec, v).get("items", {})).get("type", "object") == "object"]
            if path in LIST_KEY_OVERRIDES:
                list_key = LIST_KEY_OVERRIDES[path]
            elif len(arrays) == 1:
                list_key = arrays[0]
            elif len(arrays) > 1:
                raise SystemExit("ambiguous list key for %s: %s" % (path, arrays))
            if list_key:
                kind = "list"
                fields = field_names(spec, deref(spec, props[list_key]).get("items", {}))
            else:
                objects = [k for k, v in props.items() if deref(spec, v).get("type") == "object"]
                if len(objects) != 1:
                    raise SystemExit("cannot find the detail object for %s: %s" % (path, list(props)))
                list_key = objects[0]  # the wrapper key, e.g. "user"
                fields = field_names(spec, props[list_key])
        description = op.get("description", "")
        suspended = bool(SUSPENDED_RE.match(description))
        description = SUSPENDED_RE.sub("", description, count=1)
        price, free_tier = price_for(description)
        endpoints.append({
            "key": key,
            "path": path,
            "method": method,
            "platform": platform,
            "label": label_for(key, platform, op.get("summary", key)),
            "summary": op.get("summary", key),
            "description": short_description(description),
            "price": price,
            "freeTier": free_tier,
            "suspended": suspended,
            "kind": kind,
            "listKey": list_key,
            "params": params,
            "fields": fields,
            "idFields": ID_FIELDS.get(path, []) if kind == "list" else [],
            "docs": "https://apidirect.io/docs/" + doc_slug(key),
        })
    missing_ids = [e["path"] for e in endpoints if e["kind"] == "list" and not e["idFields"]]
    if missing_ids:
        raise SystemExit("no ID_FIELDS entry for list endpoints: %s" % missing_ids)
    unused_ids = sorted(set(ID_FIELDS) - {e["path"] for e in endpoints})
    if unused_ids:
        raise SystemExit("ID_FIELDS names endpoints that are not in the catalog: %s" % unused_ids)
    by_key = {e["key"]: e for e in endpoints}
    aliases = {}
    for pid, _label, _prefixes in PLATFORMS:
        if pid in PRIMARY_SEARCH:
            aliases[pid] = PRIMARY_SEARCH[pid]
    for e in endpoints:
        # "<platform> <last segment>" for every search-style list endpoint, e.g. "reddit comments".
        if e["kind"] == "list" and e["params"] and e["params"][0]["name"] == "query" and e["platform"] != "google":
            alias = "%s %s" % (e["platform"], e["key"].split("/")[-1])
            aliases.setdefault(alias, e["key"])
    for alias, key in ALIASES.items():
        if key not in by_key:
            raise SystemExit("alias %s points at unknown endpoint %s" % (alias, key))
        aliases[alias] = key
    for key in PRIMARY_SEARCH.values():
        if key not in by_key:
            raise SystemExit("primary search endpoint missing: " + key)
    return {
        "version": spec["info"]["version"],
        "baseUrl": "https://apidirect.io",
        "platforms": [{"id": pid, "label": label} for pid, label, _p in PLATFORMS],
        "endpoints": endpoints,
        "aliases": aliases,
    }


def doc_slug(key):
    # Docs pages are named after the endpoint path, e.g. twitter-user-followers.
    special = {
        "web/search": "web-search", "web/ai-mode": "google-ai-mode", "news/articles": "news-articles",
        "forums/posts": "forum-posts", "twitter/user/verified-followers": "twitter-user-verified-followers",
        "youtube/channel": "youtube-channel-details", "youtube/video": "youtube-video-details",
        "youtube/posts": "youtube-videos", "facebook/posts": "facebook-search-posts",
        "facebook/pages": "facebook-search-pages", "facebook/videos": "facebook-search-videos",
        "facebook/events": "facebook-search-events", "facebook/locations": "facebook-search-locations",
        "facebook/page": "facebook-page-details", "facebook/group": "facebook-group-details",
        "amazon/product": "amazon-product-details", "amazon/seller": "amazon-seller-profile",
        "places/details": "places-details",
    }
    return special.get(key, key.replace("/", "-"))


def render(catalog):
    body = json.dumps(catalog, indent=2, ensure_ascii=False)
    return (
        "// GENERATED FILE: do not edit by hand. Run `python3 scripts/generate_catalog.py`.\n"
        "// Endpoint catalog rendered from spec/openapi.json (API Direct OpenAPI %s).\n"
        "var CATALOG = %s;\n" % (catalog["version"], body)
    )


def main(argv):
    with open(SPEC) as f:
        spec = json.load(f)
    text = render(build(spec))
    if "--check" in argv:
        current = open(OUT).read() if os.path.exists(OUT) else ""
        if current != text:
            print("src/Catalog.js is stale; run python3 scripts/generate_catalog.py", file=sys.stderr)
            return 1
        print("src/Catalog.js is up to date")
        return 0
    with open(OUT, "w") as f:
        f.write(text)
    catalog = build(spec)
    kinds = {}
    for e in catalog["endpoints"]:
        kinds[e["kind"]] = kinds.get(e["kind"], 0) + 1
    print("wrote %s: %d endpoints %s, %d aliases" % (OUT, len(catalog["endpoints"]), kinds, len(catalog["aliases"])))
    return 0


if __name__ == "__main__":
    sys.exit(main(sys.argv[1:]))
