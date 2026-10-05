// GENERATED FILE: do not edit by hand. Run `python3 scripts/generate_catalog.py`.
// Endpoint catalog rendered from spec/openapi.json (API Direct OpenAPI 1.1.0).
var CATALOG = {
  "version": "1.1.0",
  "baseUrl": "https://apidirect.io",
  "platforms": [
    {
      "id": "twitter",
      "label": "Twitter/X"
    },
    {
      "id": "facebook",
      "label": "Facebook"
    },
    {
      "id": "instagram",
      "label": "Instagram"
    },
    {
      "id": "tiktok",
      "label": "TikTok"
    },
    {
      "id": "youtube",
      "label": "YouTube"
    },
    {
      "id": "reddit",
      "label": "Reddit"
    },
    {
      "id": "threads",
      "label": "Threads"
    },
    {
      "id": "truthsocial",
      "label": "Truth Social"
    },
    {
      "id": "bluesky",
      "label": "Bluesky"
    },
    {
      "id": "linkedin",
      "label": "LinkedIn"
    },
    {
      "id": "amazon",
      "label": "Amazon"
    },
    {
      "id": "trustpilot",
      "label": "Trustpilot"
    },
    {
      "id": "google",
      "label": "Google"
    }
  ],
  "endpoints": [
    {
      "key": "amazon/products",
      "path": "/v1/amazon/products",
      "method": "GET",
      "platform": "amazon",
      "label": "Search Products",
      "summary": "Search Amazon Products",
      "description": "Search Amazon products by free-text keyword (or an ASIN) across 24 marketplaces.",
      "price": "$0.005 per request",
      "freeTier": "50 requests/month",
      "suspended": false,
      "kind": "list",
      "listKey": "products",
      "params": [
        {
          "name": "query",
          "label": "Query",
          "type": "string",
          "required": true,
          "description": "Search keyword or a product ASIN (max 500 characters)"
        },
        {
          "name": "page",
          "label": "Page",
          "type": "integer",
          "required": false,
          "description": "Page number, 1-20 (default: 1)",
          "default": 1,
          "min": 1,
          "max": 20
        },
        {
          "name": "country",
          "label": "Country",
          "type": "string",
          "required": false,
          "description": "Marketplace country code (default: `us`)",
          "enum": [
            "us",
            "au",
            "br",
            "ca",
            "cn",
            "fr",
            "de",
            "in",
            "it",
            "mx",
            "nl",
            "sg",
            "es",
            "tr",
            "ae",
            "gb",
            "jp",
            "sa",
            "pl",
            "se",
            "be",
            "eg",
            "za",
            "ie"
          ],
          "default": "us"
        },
        {
          "name": "sort_by",
          "label": "Sort By",
          "type": "string",
          "required": false,
          "description": "Sort order (default: `relevance`)",
          "enum": [
            "relevance",
            "lowest_price",
            "highest_price",
            "reviews",
            "newest",
            "best_sellers"
          ],
          "default": "relevance"
        },
        {
          "name": "category_id",
          "label": "Category ID",
          "type": "string",
          "required": false,
          "description": "Category slug, e.g. `electronics` (see https://apidirect.io/docs/amazon-categories)"
        },
        {
          "name": "category",
          "label": "Category",
          "type": "string",
          "required": false,
          "description": "Numeric Amazon category node ID(s) from an Amazon URL's `?node=` parameter, comma-separated"
        },
        {
          "name": "min_price",
          "label": "Min Price",
          "type": "number",
          "required": false,
          "description": "Minimum price in the marketplace currency"
        },
        {
          "name": "max_price",
          "label": "Max Price",
          "type": "number",
          "required": false,
          "description": "Maximum price in the marketplace currency"
        },
        {
          "name": "product_condition",
          "label": "Product Condition",
          "type": "string",
          "required": false,
          "description": "Product condition filter (default: `all`)",
          "enum": [
            "all",
            "new",
            "used",
            "renewed",
            "collectible"
          ],
          "default": "all"
        },
        {
          "name": "brand",
          "label": "Brand",
          "type": "string",
          "required": false,
          "description": "Brand name(s), comma-separated for multiple"
        },
        {
          "name": "seller_id",
          "label": "Seller ID",
          "type": "string",
          "required": false,
          "description": "Only products from specific seller ID(s), comma-separated"
        },
        {
          "name": "is_prime",
          "label": "Prime Only",
          "type": "boolean",
          "required": false,
          "description": "Set to `true` to only return products with Prime-eligible offers",
          "default": false
        },
        {
          "name": "deals_and_discounts",
          "label": "Deals and Discounts",
          "type": "string",
          "required": false,
          "description": "Deals filter (default: `none`)",
          "enum": [
            "none",
            "all_discounts",
            "todays_deals"
          ],
          "default": "none"
        },
        {
          "name": "four_stars_and_up",
          "label": "4 Stars and Up",
          "type": "boolean",
          "required": false,
          "description": "Set to `true` to only return products rated 4 stars and up",
          "default": false
        }
      ],
      "fields": [
        "asin",
        "title",
        "price",
        "original_price",
        "unit_price",
        "unit_count",
        "currency",
        "rating",
        "num_ratings",
        "url",
        "photo",
        "num_offers",
        "minimum_offer_price",
        "is_best_seller",
        "is_amazon_choice",
        "is_prime",
        "climate_pledge_friendly",
        "sales_volume",
        "delivery",
        "availability",
        "has_variations",
        "badge",
        "coupon_text"
      ],
      "saveable": true,
      "docs": "https://apidirect.io/docs/amazon-products"
    },
    {
      "key": "amazon/product",
      "path": "/v1/amazon/product",
      "method": "GET",
      "platform": "amazon",
      "label": "Product Details",
      "summary": "Amazon Product Details",
      "description": "Get full details for an Amazon product by its 10-character ASIN — pricing, buy box with seller ID, availability, photos, videos, spec tables, rating breakdown per star, and top reviews.",
      "price": "$0.005 per request",
      "freeTier": "50 requests/month",
      "suspended": false,
      "kind": "detail",
      "listKey": "product",
      "params": [
        {
          "name": "asin",
          "label": "ASIN",
          "type": "string",
          "required": true,
          "description": "10-character Amazon ASIN (e.g. `B07ZPKN6YR`), as returned by Product Search"
        },
        {
          "name": "country",
          "label": "Country",
          "type": "string",
          "required": false,
          "description": "Marketplace country code (default: `us`)",
          "enum": [
            "us",
            "au",
            "br",
            "ca",
            "cn",
            "fr",
            "de",
            "in",
            "it",
            "mx",
            "nl",
            "sg",
            "es",
            "tr",
            "ae",
            "gb",
            "jp",
            "sa",
            "pl",
            "se",
            "be",
            "eg",
            "za",
            "ie"
          ],
          "default": "us"
        }
      ],
      "fields": [
        "asin",
        "title",
        "item_highlight",
        "price",
        "original_price",
        "delivery_price",
        "minimum_order_quantity",
        "currency",
        "country",
        "byline",
        "byline_link",
        "rating",
        "num_ratings",
        "url",
        "slug",
        "photo",
        "photos",
        "videos",
        "user_uploaded_videos",
        "has_video",
        "num_offers",
        "availability",
        "condition",
        "is_best_seller",
        "is_amazon_choice",
        "is_prime",
        "climate_pledge_friendly",
        "sales_volume",
        "delivery",
        "main_buy_box.title",
        "main_buy_box.price",
        "main_buy_box.seller",
        "main_buy_box.seller_id",
        "main_buy_box.seller_link",
        "main_buy_box.return_policy",
        "buy_boxes",
        "about",
        "description",
        "product_information.Screen Size",
        "product_information.Color",
        "product_details.Brand",
        "product_details.Model Name",
        "rating_distribution.1",
        "rating_distribution.2",
        "rating_distribution.3",
        "rating_distribution.4",
        "rating_distribution.5",
        "top_reviews"
      ],
      "saveable": false,
      "docs": "https://apidirect.io/docs/amazon-product-details"
    },
    {
      "key": "amazon/seller",
      "path": "/v1/amazon/seller",
      "method": "GET",
      "platform": "amazon",
      "label": "Seller Profile",
      "summary": "Amazon Seller Profile",
      "description": "Get an Amazon seller's profile by seller ID — name, logo, about text, registered business name and address, average rating, and feedback percentages over 30 days, 90 days, 12 months, and lifetime.",
      "price": "$0.005 per request",
      "freeTier": "50 requests/month",
      "suspended": false,
      "kind": "detail",
      "listKey": "seller",
      "params": [
        {
          "name": "seller_id",
          "label": "Seller ID",
          "type": "string",
          "required": true,
          "description": "Amazon seller ID (e.g. `A2L77EE7U53NWQ`), from a product's `main_buy_box.seller_id`"
        },
        {
          "name": "country",
          "label": "Country",
          "type": "string",
          "required": false,
          "description": "Marketplace country code (default: `us`)",
          "enum": [
            "us",
            "au",
            "br",
            "ca",
            "cn",
            "fr",
            "de",
            "in",
            "it",
            "mx",
            "nl",
            "sg",
            "es",
            "tr",
            "ae",
            "gb",
            "jp",
            "sa",
            "pl",
            "se",
            "be",
            "eg",
            "za",
            "ie"
          ],
          "default": "us"
        }
      ],
      "fields": [
        "seller_id",
        "name",
        "seller_link",
        "store_link",
        "logo",
        "about",
        "business_name",
        "business_address",
        "rating",
        "ratings_total",
        "positive_percentage",
        "review_summary.thirty_days",
        "review_summary.ninety_days",
        "review_summary.twelve_months",
        "review_summary.lifetime",
        "country"
      ],
      "saveable": false,
      "docs": "https://apidirect.io/docs/amazon-seller-profile"
    },
    {
      "key": "amazon/seller/reviews",
      "path": "/v1/amazon/seller/reviews",
      "method": "GET",
      "platform": "amazon",
      "label": "Seller Reviews",
      "summary": "Amazon Seller Reviews",
      "description": "Get customer feedback for an Amazon seller by seller ID.",
      "price": "$0.005 per request",
      "freeTier": "50 requests/month",
      "suspended": false,
      "kind": "list",
      "listKey": "reviews",
      "params": [
        {
          "name": "seller_id",
          "label": "Seller ID",
          "type": "string",
          "required": true,
          "description": "Amazon seller ID"
        },
        {
          "name": "page",
          "label": "Page",
          "type": "integer",
          "required": false,
          "description": "Page number, 1-50 (default: 1)",
          "default": 1,
          "min": 1,
          "max": 50
        },
        {
          "name": "star_rating",
          "label": "Star Rating",
          "type": "string",
          "required": false,
          "description": "Star rating filter (default: `all`)",
          "enum": [
            "all",
            "5_stars",
            "4_stars",
            "3_stars",
            "2_stars",
            "1_stars",
            "positive",
            "critical"
          ],
          "default": "all"
        },
        {
          "name": "country",
          "label": "Country",
          "type": "string",
          "required": false,
          "description": "Marketplace country code (default: `us`)",
          "enum": [
            "us",
            "au",
            "br",
            "ca",
            "cn",
            "fr",
            "de",
            "in",
            "it",
            "mx",
            "nl",
            "sg",
            "es",
            "tr",
            "ae",
            "gb",
            "jp",
            "sa",
            "pl",
            "se",
            "be",
            "eg",
            "za",
            "ie"
          ],
          "default": "us"
        },
        {
          "name": "get_sentiment",
          "label": "Get Sentiment",
          "type": "boolean",
          "required": false,
          "description": "Set to true to add AI emotion analysis to each review. Adds a `sentiment` object containing `emotions` (joy, trust, fear, surprise, sadness, disgust, anger and anticipation, each scored 0-100), `dominant_emotion`, `emotional_intensity` (0-10), and `polarity` (positive, negative or neutral). Any review that cannot be scored returns `sentiment: null`.",
          "default": false
        }
      ],
      "fields": [
        "author_name",
        "review_text",
        "rating",
        "review_date",
        "has_response"
      ],
      "saveable": true,
      "docs": "https://apidirect.io/docs/amazon-seller-reviews"
    },
    {
      "key": "amazon/seller/products",
      "path": "/v1/amazon/seller/products",
      "method": "GET",
      "platform": "amazon",
      "label": "Seller Products",
      "summary": "Amazon Seller Products",
      "description": "Get the products sold by an Amazon seller by seller ID — the same product objects as Product Search plus the seller's total catalog size.",
      "price": "$0.005 per request",
      "freeTier": "50 requests/month",
      "suspended": false,
      "kind": "list",
      "listKey": "products",
      "params": [
        {
          "name": "seller_id",
          "label": "Seller ID",
          "type": "string",
          "required": true,
          "description": "Amazon seller ID"
        },
        {
          "name": "page",
          "label": "Page",
          "type": "integer",
          "required": false,
          "description": "Page number, 1-50 (default: 1)",
          "default": 1,
          "min": 1,
          "max": 50
        },
        {
          "name": "sort_by",
          "label": "Sort By",
          "type": "string",
          "required": false,
          "description": "Sort order (default: `relevance`)",
          "enum": [
            "relevance",
            "lowest_price",
            "highest_price",
            "reviews",
            "newest",
            "best_sellers"
          ],
          "default": "relevance"
        },
        {
          "name": "country",
          "label": "Country",
          "type": "string",
          "required": false,
          "description": "Marketplace country code (default: `us`)",
          "enum": [
            "us",
            "au",
            "br",
            "ca",
            "cn",
            "fr",
            "de",
            "in",
            "it",
            "mx",
            "nl",
            "sg",
            "es",
            "tr",
            "ae",
            "gb",
            "jp",
            "sa",
            "pl",
            "se",
            "be",
            "eg",
            "za",
            "ie"
          ],
          "default": "us"
        }
      ],
      "fields": [
        "asin",
        "title",
        "price",
        "original_price",
        "unit_price",
        "unit_count",
        "currency",
        "rating",
        "num_ratings",
        "url",
        "photo",
        "num_offers",
        "minimum_offer_price",
        "is_best_seller",
        "is_amazon_choice",
        "is_prime",
        "climate_pledge_friendly",
        "sales_volume",
        "delivery",
        "availability",
        "has_variations",
        "badge",
        "coupon_text"
      ],
      "saveable": true,
      "docs": "https://apidirect.io/docs/amazon-seller-products"
    },
    {
      "key": "amazon/best-sellers",
      "path": "/v1/amazon/best-sellers",
      "method": "GET",
      "platform": "amazon",
      "label": "Best Sellers",
      "summary": "Amazon Best Sellers",
      "description": "Get Amazon best-seller rankings for a category — Best Sellers, New Releases, Movers & Shakers, Most Wished For, or Gift Ideas.",
      "price": "$0.005 per request",
      "freeTier": "50 requests/month",
      "suspended": false,
      "kind": "list",
      "listKey": "products",
      "params": [
        {
          "name": "category",
          "label": "Category",
          "type": "string",
          "required": true,
          "description": "Category slug, e.g. `electronics` or `software` (see https://apidirect.io/docs/amazon-categories)"
        },
        {
          "name": "type",
          "label": "Type",
          "type": "string",
          "required": false,
          "description": "Ranking type (default: `best_sellers`)",
          "enum": [
            "best_sellers",
            "gift_ideas",
            "most_wished_for",
            "movers_and_shakers",
            "new_releases"
          ],
          "default": "best_sellers"
        },
        {
          "name": "page",
          "label": "Page",
          "type": "integer",
          "required": false,
          "description": "Page number, 1 or 2 (default: 1). Rankings cover the top 100.",
          "default": 1,
          "min": 1,
          "max": 2
        },
        {
          "name": "country",
          "label": "Country",
          "type": "string",
          "required": false,
          "description": "Marketplace country code (default: `us`)",
          "enum": [
            "us",
            "au",
            "br",
            "ca",
            "cn",
            "fr",
            "de",
            "in",
            "it",
            "mx",
            "nl",
            "sg",
            "es",
            "tr",
            "ae",
            "gb",
            "jp",
            "sa",
            "pl",
            "se",
            "be",
            "eg",
            "za",
            "ie"
          ],
          "default": "us"
        }
      ],
      "fields": [
        "rank",
        "rank_change",
        "asin",
        "title",
        "price",
        "rating",
        "num_ratings",
        "url",
        "photo"
      ],
      "saveable": true,
      "docs": "https://apidirect.io/docs/amazon-best-sellers"
    },
    {
      "key": "bluesky/posts",
      "path": "/v1/bluesky/posts",
      "method": "GET",
      "platform": "bluesky",
      "label": "Search Posts",
      "summary": "Search Bluesky Posts",
      "description": "Search Bluesky posts by keyword.",
      "price": "$0.003 per page",
      "freeTier": "50 requests/month",
      "suspended": false,
      "kind": "list",
      "listKey": "posts",
      "params": [
        {
          "name": "query",
          "label": "Query",
          "type": "string",
          "required": true,
          "description": "Search keyword (max 500 characters). Bluesky search syntax works: \"exact phrase\", -exclude, from:handle, lang:en, #tag"
        },
        {
          "name": "pages",
          "label": "Pages",
          "type": "integer",
          "required": false,
          "description": "Number of pages to fetch and merge into one response (1-20, billed per page returned). Each page returns up to 50 results. Fetching stops early when there are no more results.",
          "default": 1,
          "min": 1,
          "max": 20
        },
        {
          "name": "sort_by",
          "label": "Sort By",
          "type": "string",
          "required": false,
          "description": "Sort order: most_recent or relevance (default: most_recent)",
          "enum": [
            "most_recent",
            "relevance"
          ],
          "default": "most_recent"
        },
        {
          "name": "start_date",
          "label": "Start Date",
          "type": "string",
          "required": false,
          "description": "Only posts from this date onward (format: YYYY-MM-DD)"
        },
        {
          "name": "end_date",
          "label": "End Date",
          "type": "string",
          "required": false,
          "description": "Only posts up to this date (format: YYYY-MM-DD)"
        },
        {
          "name": "get_sentiment",
          "label": "Get Sentiment",
          "type": "boolean",
          "required": false,
          "description": "Set to true to add AI emotion analysis to each result. Adds a `sentiment` object containing `emotions` (joy, trust, fear, surprise, sadness, disgust, anger and anticipation, each scored 0-100), `dominant_emotion`, `emotional_intensity` (0-10), and `polarity` (positive, negative or neutral). Any item that cannot be scored returns `sentiment: null`.",
          "default": false
        }
      ],
      "fields": [
        "title",
        "url",
        "date",
        "author",
        "author_name",
        "author_id",
        "author_verified",
        "source",
        "domain",
        "snippet",
        "likes",
        "replies",
        "reposts",
        "quotes",
        "bookmarks",
        "lang",
        "is_reply",
        "in_reply_to_id",
        "is_quote",
        "quoted_post",
        "hashtags",
        "mentions",
        "links",
        "link_preview.url",
        "link_preview.title",
        "link_preview.description",
        "link_preview.image_url",
        "media_type",
        "image_url",
        "video_url",
        "carousel_media",
        "post_id"
      ],
      "saveable": true,
      "docs": "https://apidirect.io/docs/bluesky-posts"
    },
    {
      "key": "bluesky/users",
      "path": "/v1/bluesky/users",
      "method": "GET",
      "platform": "bluesky",
      "label": "Search Users",
      "summary": "Search Bluesky Users",
      "description": "Search Bluesky users by keyword.",
      "price": "$0.003 per page",
      "freeTier": "50 requests/month",
      "suspended": false,
      "kind": "list",
      "listKey": "users",
      "params": [
        {
          "name": "query",
          "label": "Query",
          "type": "string",
          "required": true,
          "description": "Search keyword (max 500 characters)"
        },
        {
          "name": "pages",
          "label": "Pages",
          "type": "integer",
          "required": false,
          "description": "Number of pages to fetch and merge into one response (1-20, billed per page returned). Each page returns up to 50 results. Fetching stops early when there are no more results.",
          "default": 1,
          "min": 1,
          "max": 20
        }
      ],
      "fields": [
        "username",
        "full_name",
        "user_id",
        "biography",
        "is_verified",
        "profile_pic_url",
        "date_joined",
        "url"
      ],
      "saveable": true,
      "docs": "https://apidirect.io/docs/bluesky-users"
    },
    {
      "key": "bluesky/user",
      "path": "/v1/bluesky/user",
      "method": "GET",
      "platform": "bluesky",
      "label": "User Profile",
      "summary": "Bluesky User Profile",
      "description": "Get a Bluesky user's full profile by handle, DID, or profile URL.",
      "price": "$0.003 per request",
      "freeTier": "50 requests/month",
      "suspended": false,
      "kind": "detail",
      "listKey": "user",
      "params": [
        {
          "name": "username",
          "label": "Username",
          "type": "string",
          "required": false,
          "description": "Bluesky handle, e.g. bsky.app, with or without leading @, or the account's DID (max 100 characters). Provide either username or url."
        },
        {
          "name": "url",
          "label": "URL",
          "type": "string",
          "required": false,
          "description": "Bluesky profile URL, e.g. https://bsky.app/profile/bsky.app (max 500 characters). Provide either username or url."
        }
      ],
      "fields": [
        "username",
        "full_name",
        "user_id",
        "biography",
        "follower_count",
        "following_count",
        "post_count",
        "list_count",
        "feed_count",
        "starter_pack_count",
        "is_verified",
        "is_labeler",
        "profile_pic_url",
        "profile_banner_url",
        "date_joined",
        "date_joined_timestamp",
        "pinned_post_id",
        "url"
      ],
      "saveable": false,
      "docs": "https://apidirect.io/docs/bluesky-user"
    },
    {
      "key": "bluesky/user/posts",
      "path": "/v1/bluesky/user/posts",
      "method": "GET",
      "platform": "bluesky",
      "label": "User Posts",
      "summary": "Bluesky User Posts",
      "description": "Get a user's feed by handle: their posts, replies, and reposts in feed order (the pinned post first, then newest first), each flagged with is_reply, is_repost, and is_pinned.",
      "price": "$0.003 per page",
      "freeTier": "50 requests/month",
      "suspended": false,
      "kind": "list",
      "listKey": "posts",
      "params": [
        {
          "name": "username",
          "label": "Username",
          "type": "string",
          "required": false,
          "description": "Bluesky handle, e.g. bsky.app, with or without leading @, or the account's DID (max 100 characters). Provide either username or url."
        },
        {
          "name": "url",
          "label": "URL",
          "type": "string",
          "required": false,
          "description": "Bluesky profile URL, e.g. https://bsky.app/profile/bsky.app (max 500 characters). Provide either username or url."
        },
        {
          "name": "pages",
          "label": "Pages",
          "type": "integer",
          "required": false,
          "description": "Number of pages to fetch and merge into one response (1-20, billed per page returned). Each page returns up to 50 results. Fetching stops early when there are no more results.",
          "default": 1,
          "min": 1,
          "max": 20
        },
        {
          "name": "get_sentiment",
          "label": "Get Sentiment",
          "type": "boolean",
          "required": false,
          "description": "Set to true to add AI emotion analysis to each result. Adds a `sentiment` object containing `emotions` (joy, trust, fear, surprise, sadness, disgust, anger and anticipation, each scored 0-100), `dominant_emotion`, `emotional_intensity` (0-10), and `polarity` (positive, negative or neutral). Any item that cannot be scored returns `sentiment: null`.",
          "default": false
        }
      ],
      "fields": [
        "title",
        "url",
        "date",
        "author",
        "author_name",
        "author_id",
        "author_verified",
        "source",
        "domain",
        "snippet",
        "likes",
        "replies",
        "reposts",
        "quotes",
        "bookmarks",
        "lang",
        "is_reply",
        "in_reply_to_id",
        "is_quote",
        "quoted_post",
        "hashtags",
        "mentions",
        "links",
        "link_preview",
        "media_type",
        "image_url",
        "video_url",
        "carousel_media",
        "post_id",
        "is_repost",
        "reposted_by",
        "is_pinned"
      ],
      "saveable": true,
      "docs": "https://apidirect.io/docs/bluesky-user-posts"
    },
    {
      "key": "bluesky/user/followers",
      "path": "/v1/bluesky/user/followers",
      "method": "GET",
      "platform": "bluesky",
      "label": "User Followers",
      "summary": "Bluesky User Followers",
      "description": "Get the followers of a Bluesky user, newest first.",
      "price": "$0.003 per page",
      "freeTier": "50 requests/month",
      "suspended": false,
      "kind": "list",
      "listKey": "followers",
      "params": [
        {
          "name": "username",
          "label": "Username",
          "type": "string",
          "required": false,
          "description": "Bluesky handle, e.g. bsky.app, with or without leading @, or the account's DID (max 100 characters). Provide either username or url."
        },
        {
          "name": "url",
          "label": "URL",
          "type": "string",
          "required": false,
          "description": "Bluesky profile URL, e.g. https://bsky.app/profile/bsky.app (max 500 characters). Provide either username or url."
        },
        {
          "name": "pages",
          "label": "Pages",
          "type": "integer",
          "required": false,
          "description": "Number of pages to fetch and merge into one response (1-20, billed per page returned). Each page returns up to 50 results. Fetching stops early when there are no more results.",
          "default": 1,
          "min": 1,
          "max": 20
        }
      ],
      "fields": [
        "username",
        "full_name",
        "user_id",
        "biography",
        "is_verified",
        "profile_pic_url",
        "date_joined",
        "url"
      ],
      "saveable": true,
      "docs": "https://apidirect.io/docs/bluesky-user-followers"
    },
    {
      "key": "bluesky/user/following",
      "path": "/v1/bluesky/user/following",
      "method": "GET",
      "platform": "bluesky",
      "label": "User Following",
      "summary": "Bluesky User Following",
      "description": "Get the accounts a Bluesky user follows, newest first.",
      "price": "$0.003 per page",
      "freeTier": "50 requests/month",
      "suspended": false,
      "kind": "list",
      "listKey": "following",
      "params": [
        {
          "name": "username",
          "label": "Username",
          "type": "string",
          "required": false,
          "description": "Bluesky handle, e.g. bsky.app, with or without leading @, or the account's DID (max 100 characters). Provide either username or url."
        },
        {
          "name": "url",
          "label": "URL",
          "type": "string",
          "required": false,
          "description": "Bluesky profile URL, e.g. https://bsky.app/profile/bsky.app (max 500 characters). Provide either username or url."
        },
        {
          "name": "pages",
          "label": "Pages",
          "type": "integer",
          "required": false,
          "description": "Number of pages to fetch and merge into one response (1-20, billed per page returned). Each page returns up to 50 results. Fetching stops early when there are no more results.",
          "default": 1,
          "min": 1,
          "max": 20
        }
      ],
      "fields": [
        "username",
        "full_name",
        "user_id",
        "biography",
        "is_verified",
        "profile_pic_url",
        "date_joined",
        "url"
      ],
      "saveable": true,
      "docs": "https://apidirect.io/docs/bluesky-user-following"
    },
    {
      "key": "bluesky/user/likes",
      "path": "/v1/bluesky/user/likes",
      "method": "GET",
      "platform": "bluesky",
      "label": "User Likes",
      "summary": "Bluesky User Likes",
      "description": "Get the posts a Bluesky user has liked, newest first.",
      "price": "$0.003 per page",
      "freeTier": "50 requests/month",
      "suspended": false,
      "kind": "list",
      "listKey": "posts",
      "params": [
        {
          "name": "username",
          "label": "Username",
          "type": "string",
          "required": false,
          "description": "Bluesky handle, e.g. bsky.app, with or without leading @, or the account's DID (max 100 characters). Provide either username or url."
        },
        {
          "name": "url",
          "label": "URL",
          "type": "string",
          "required": false,
          "description": "Bluesky profile URL, e.g. https://bsky.app/profile/bsky.app (max 500 characters). Provide either username or url."
        },
        {
          "name": "pages",
          "label": "Pages",
          "type": "integer",
          "required": false,
          "description": "Number of pages to fetch and merge into one response (1-20, billed per page returned). Each page returns up to 50 results. Fetching stops early when there are no more results.",
          "default": 1,
          "min": 1,
          "max": 20
        },
        {
          "name": "get_sentiment",
          "label": "Get Sentiment",
          "type": "boolean",
          "required": false,
          "description": "Set to true to add AI emotion analysis to each result. Adds a `sentiment` object containing `emotions` (joy, trust, fear, surprise, sadness, disgust, anger and anticipation, each scored 0-100), `dominant_emotion`, `emotional_intensity` (0-10), and `polarity` (positive, negative or neutral). Any item that cannot be scored returns `sentiment: null`.",
          "default": false
        }
      ],
      "fields": [
        "title",
        "url",
        "date",
        "author",
        "author_name",
        "author_id",
        "author_verified",
        "source",
        "domain",
        "snippet",
        "likes",
        "replies",
        "reposts",
        "quotes",
        "bookmarks",
        "lang",
        "is_reply",
        "in_reply_to_id",
        "is_quote",
        "quoted_post.post_id",
        "quoted_post.url",
        "quoted_post.date",
        "quoted_post.author",
        "quoted_post.author_name",
        "quoted_post.author_verified",
        "quoted_post.snippet",
        "quoted_post.likes",
        "quoted_post.reposts",
        "hashtags",
        "mentions",
        "links",
        "link_preview",
        "media_type",
        "image_url",
        "video_url",
        "carousel_media",
        "post_id",
        "liked_at"
      ],
      "saveable": true,
      "docs": "https://apidirect.io/docs/bluesky-user-likes"
    },
    {
      "key": "bluesky/post",
      "path": "/v1/bluesky/post",
      "method": "GET",
      "platform": "bluesky",
      "label": "Post Details",
      "summary": "Bluesky Post Details",
      "description": "Get a single Bluesky post by URL or ID.",
      "price": "$0.003 per request",
      "freeTier": "50 requests/month",
      "suspended": false,
      "kind": "detail",
      "listKey": "post",
      "params": [
        {
          "name": "url",
          "label": "URL",
          "type": "string",
          "required": false,
          "description": "Bluesky post URL, e.g. https://bsky.app/profile/bsky.app/post/3l6oveex3ii2l (max 500 characters). Provide either url or post_id."
        },
        {
          "name": "post_id",
          "label": "Post ID",
          "type": "string",
          "required": false,
          "description": "The post's AT URI as returned in post_id, e.g. at://did:plc:z72i7hdynmk6r22z27h6tvur/app.bsky.feed.post/3l6oveex3ii2l (max 200 characters). Provide either url or post_id."
        },
        {
          "name": "get_sentiment",
          "label": "Get Sentiment",
          "type": "boolean",
          "required": false,
          "description": "Set to true to add AI emotion analysis to each result. Adds a `sentiment` object containing `emotions` (joy, trust, fear, surprise, sadness, disgust, anger and anticipation, each scored 0-100), `dominant_emotion`, `emotional_intensity` (0-10), and `polarity` (positive, negative or neutral). Any item that cannot be scored returns `sentiment: null`.",
          "default": false
        }
      ],
      "fields": [
        "title",
        "url",
        "date",
        "author",
        "author_name",
        "author_id",
        "author_verified",
        "source",
        "domain",
        "snippet",
        "likes",
        "replies",
        "reposts",
        "quotes",
        "bookmarks",
        "lang",
        "is_reply",
        "in_reply_to_id",
        "is_quote",
        "quoted_post",
        "hashtags",
        "mentions",
        "links",
        "link_preview",
        "media_type",
        "image_url",
        "video_url",
        "carousel_media",
        "post_id"
      ],
      "saveable": false,
      "docs": "https://apidirect.io/docs/bluesky-post"
    },
    {
      "key": "bluesky/post/comments",
      "path": "/v1/bluesky/post/comments",
      "method": "GET",
      "platform": "bluesky",
      "label": "Post Comments",
      "summary": "Bluesky Post Comments",
      "description": "Get the replies to a Bluesky post.",
      "price": "$0.003 per request",
      "freeTier": "50 requests/month",
      "suspended": false,
      "kind": "list",
      "listKey": "comments",
      "params": [
        {
          "name": "url",
          "label": "URL",
          "type": "string",
          "required": false,
          "description": "Bluesky post URL, e.g. https://bsky.app/profile/bsky.app/post/3l6oveex3ii2l (max 500 characters). Provide either url or post_id."
        },
        {
          "name": "post_id",
          "label": "Post ID",
          "type": "string",
          "required": false,
          "description": "The post's AT URI as returned in post_id, e.g. at://did:plc:z72i7hdynmk6r22z27h6tvur/app.bsky.feed.post/3l6oveex3ii2l (max 200 characters). Provide either url or post_id."
        },
        {
          "name": "get_sentiment",
          "label": "Get Sentiment",
          "type": "boolean",
          "required": false,
          "description": "Set to true to add AI emotion analysis to each result. Adds a `sentiment` object containing `emotions` (joy, trust, fear, surprise, sadness, disgust, anger and anticipation, each scored 0-100), `dominant_emotion`, `emotional_intensity` (0-10), and `polarity` (positive, negative or neutral). Any item that cannot be scored returns `sentiment: null`.",
          "default": false
        }
      ],
      "fields": [
        "title",
        "url",
        "date",
        "author",
        "author_name",
        "author_id",
        "author_verified",
        "source",
        "domain",
        "snippet",
        "likes",
        "replies",
        "reposts",
        "quotes",
        "bookmarks",
        "lang",
        "is_reply",
        "in_reply_to_id",
        "is_quote",
        "quoted_post",
        "hashtags",
        "mentions",
        "links",
        "link_preview",
        "media_type",
        "image_url",
        "video_url",
        "carousel_media",
        "post_id"
      ],
      "saveable": true,
      "docs": "https://apidirect.io/docs/bluesky-post-comments"
    },
    {
      "key": "bluesky/post/likes",
      "path": "/v1/bluesky/post/likes",
      "method": "GET",
      "platform": "bluesky",
      "label": "Post Likes",
      "summary": "Bluesky Post Likes",
      "description": "Get the users who liked a Bluesky post, newest first.",
      "price": "$0.003 per page",
      "freeTier": "50 requests/month",
      "suspended": false,
      "kind": "list",
      "listKey": "likes",
      "params": [
        {
          "name": "url",
          "label": "URL",
          "type": "string",
          "required": false,
          "description": "Bluesky post URL, e.g. https://bsky.app/profile/bsky.app/post/3l6oveex3ii2l (max 500 characters). Provide either url or post_id."
        },
        {
          "name": "post_id",
          "label": "Post ID",
          "type": "string",
          "required": false,
          "description": "The post's AT URI as returned in post_id, e.g. at://did:plc:z72i7hdynmk6r22z27h6tvur/app.bsky.feed.post/3l6oveex3ii2l (max 200 characters). Provide either url or post_id."
        },
        {
          "name": "pages",
          "label": "Pages",
          "type": "integer",
          "required": false,
          "description": "Number of pages to fetch and merge into one response (1-20, billed per page returned). Each page returns up to 50 results. Fetching stops early when there are no more results.",
          "default": 1,
          "min": 1,
          "max": 20
        }
      ],
      "fields": [
        "username",
        "full_name",
        "user_id",
        "biography",
        "is_verified",
        "profile_pic_url",
        "date_joined",
        "url",
        "liked_at"
      ],
      "saveable": true,
      "docs": "https://apidirect.io/docs/bluesky-post-likes"
    },
    {
      "key": "bluesky/post/quotes",
      "path": "/v1/bluesky/post/quotes",
      "method": "GET",
      "platform": "bluesky",
      "label": "Post Quotes",
      "summary": "Bluesky Post Quotes",
      "description": "Get the posts that quote a Bluesky post, newest first.",
      "price": "$0.003 per page",
      "freeTier": "50 requests/month",
      "suspended": false,
      "kind": "list",
      "listKey": "quotes",
      "params": [
        {
          "name": "url",
          "label": "URL",
          "type": "string",
          "required": false,
          "description": "Bluesky post URL, e.g. https://bsky.app/profile/bsky.app/post/3l6oveex3ii2l (max 500 characters). Provide either url or post_id."
        },
        {
          "name": "post_id",
          "label": "Post ID",
          "type": "string",
          "required": false,
          "description": "The post's AT URI as returned in post_id, e.g. at://did:plc:z72i7hdynmk6r22z27h6tvur/app.bsky.feed.post/3l6oveex3ii2l (max 200 characters). Provide either url or post_id."
        },
        {
          "name": "pages",
          "label": "Pages",
          "type": "integer",
          "required": false,
          "description": "Number of pages to fetch and merge into one response (1-20, billed per page returned). Each page returns up to 50 results. Fetching stops early when there are no more results.",
          "default": 1,
          "min": 1,
          "max": 20
        },
        {
          "name": "get_sentiment",
          "label": "Get Sentiment",
          "type": "boolean",
          "required": false,
          "description": "Set to true to add AI emotion analysis to each result. Adds a `sentiment` object containing `emotions` (joy, trust, fear, surprise, sadness, disgust, anger and anticipation, each scored 0-100), `dominant_emotion`, `emotional_intensity` (0-10), and `polarity` (positive, negative or neutral). Any item that cannot be scored returns `sentiment: null`.",
          "default": false
        }
      ],
      "fields": [
        "title",
        "url",
        "date",
        "author",
        "author_name",
        "author_id",
        "author_verified",
        "source",
        "domain",
        "snippet",
        "likes",
        "replies",
        "reposts",
        "quotes",
        "bookmarks",
        "lang",
        "is_reply",
        "in_reply_to_id",
        "is_quote",
        "quoted_post.post_id",
        "quoted_post.url",
        "quoted_post.date",
        "quoted_post.author",
        "quoted_post.author_name",
        "quoted_post.author_verified",
        "quoted_post.snippet",
        "quoted_post.likes",
        "quoted_post.reposts",
        "hashtags",
        "mentions",
        "links",
        "link_preview",
        "media_type",
        "image_url",
        "video_url",
        "carousel_media",
        "post_id"
      ],
      "saveable": true,
      "docs": "https://apidirect.io/docs/bluesky-post-quotes"
    },
    {
      "key": "bluesky/post/reposts",
      "path": "/v1/bluesky/post/reposts",
      "method": "GET",
      "platform": "bluesky",
      "label": "Post Reposts",
      "summary": "Bluesky Post Reposts",
      "description": "Get the users who reposted a Bluesky post, newest first.",
      "price": "$0.003 per page",
      "freeTier": "50 requests/month",
      "suspended": false,
      "kind": "list",
      "listKey": "reposts",
      "params": [
        {
          "name": "url",
          "label": "URL",
          "type": "string",
          "required": false,
          "description": "Bluesky post URL, e.g. https://bsky.app/profile/bsky.app/post/3l6oveex3ii2l (max 500 characters). Provide either url or post_id."
        },
        {
          "name": "post_id",
          "label": "Post ID",
          "type": "string",
          "required": false,
          "description": "The post's AT URI as returned in post_id, e.g. at://did:plc:z72i7hdynmk6r22z27h6tvur/app.bsky.feed.post/3l6oveex3ii2l (max 200 characters). Provide either url or post_id."
        },
        {
          "name": "pages",
          "label": "Pages",
          "type": "integer",
          "required": false,
          "description": "Number of pages to fetch and merge into one response (1-20, billed per page returned). Each page returns up to 50 results. Fetching stops early when there are no more results.",
          "default": 1,
          "min": 1,
          "max": 20
        }
      ],
      "fields": [
        "username",
        "full_name",
        "user_id",
        "biography",
        "is_verified",
        "profile_pic_url",
        "date_joined",
        "url"
      ],
      "saveable": true,
      "docs": "https://apidirect.io/docs/bluesky-post-reposts"
    },
    {
      "key": "facebook/posts",
      "path": "/v1/facebook/posts",
      "method": "GET",
      "platform": "facebook",
      "label": "Search Posts",
      "summary": "Search Facebook Posts",
      "description": "Search for Facebook posts globally by keyword.",
      "price": "$0.008 per page",
      "freeTier": "50 requests/month",
      "suspended": false,
      "kind": "list",
      "listKey": "posts",
      "params": [
        {
          "name": "query",
          "label": "Query",
          "type": "string",
          "required": true,
          "description": "Search query (max 500 characters)"
        },
        {
          "name": "location_id",
          "label": "Location ID",
          "type": "string",
          "required": false,
          "description": "Facebook location ID from /v1/facebook/locations, used to scope posts to that place. Digits only, maximum 64 characters."
        },
        {
          "name": "pages",
          "label": "Pages",
          "type": "integer",
          "required": false,
          "description": "Number of pages to fetch and merge into one response (1-15). Billed per page.",
          "default": 1,
          "min": 1,
          "max": 15
        },
        {
          "name": "start_date",
          "label": "Start Date",
          "type": "string",
          "required": false,
          "description": "Filter posts from this date (YYYY-MM-DD)"
        },
        {
          "name": "end_date",
          "label": "End Date",
          "type": "string",
          "required": false,
          "description": "Filter posts until this date (YYYY-MM-DD)"
        },
        {
          "name": "sort_by",
          "label": "Sort By",
          "type": "string",
          "required": false,
          "description": "Sort order for results. most_recent returns the newest posts first; relevance is the default.",
          "enum": [
            "most_recent",
            "relevance"
          ],
          "default": "relevance"
        },
        {
          "name": "get_sentiment",
          "label": "Get Sentiment",
          "type": "boolean",
          "required": false,
          "description": "Set to true to add AI emotion analysis to each post. Adds a `sentiment` object containing `emotions` (joy, trust, fear, surprise, sadness, disgust, anger and anticipation, each scored 0-100), `dominant_emotion`, `emotional_intensity` (0-10), and `polarity` (positive, negative or neutral). Any post that cannot be scored returns `sentiment: null`.",
          "default": false
        }
      ],
      "fields": [
        "author_id",
        "author_name",
        "author_profile_picture",
        "author_url",
        "comments_count",
        "date",
        "external_url",
        "image_url",
        "message",
        "post_id",
        "reactions.angry",
        "reactions.care",
        "reactions.haha",
        "reactions.like",
        "reactions.love",
        "reactions.sad",
        "reactions.wow",
        "reactions_count",
        "reshare_count",
        "timestamp",
        "url",
        "video"
      ],
      "saveable": true,
      "docs": "https://apidirect.io/docs/facebook-search-posts"
    },
    {
      "key": "facebook/locations",
      "path": "/v1/facebook/locations",
      "method": "GET",
      "platform": "facebook",
      "label": "Search Locations",
      "summary": "Search Facebook Locations",
      "description": "Resolve a place name (city, region, or country) to Facebook location IDs.",
      "price": "$0.004 per request",
      "freeTier": "50 requests/month",
      "suspended": false,
      "kind": "list",
      "listKey": "results",
      "params": [
        {
          "name": "query",
          "label": "Query",
          "type": "string",
          "required": true,
          "description": "Place name to resolve, e.g. \"London\" or \"Paris, France\" (max 500 characters)"
        }
      ],
      "fields": [
        "id",
        "label",
        "timezone"
      ],
      "saveable": true,
      "docs": "https://apidirect.io/docs/facebook-search-locations"
    },
    {
      "key": "facebook/pages",
      "path": "/v1/facebook/pages",
      "method": "GET",
      "platform": "facebook",
      "label": "Search Pages",
      "summary": "Search Facebook Pages",
      "description": "Search for Facebook pages by keyword.",
      "price": "$0.008 per page",
      "freeTier": "50 requests/month",
      "suspended": false,
      "kind": "list",
      "listKey": "results",
      "params": [
        {
          "name": "query",
          "label": "Query",
          "type": "string",
          "required": true,
          "description": "Search query (max 500 characters)"
        },
        {
          "name": "pages",
          "label": "Pages",
          "type": "integer",
          "required": false,
          "description": "Number of pages to fetch and merge into one response (1-15). Billed per page.",
          "default": 1,
          "min": 1,
          "max": 15
        }
      ],
      "fields": [
        "facebook_id",
        "image_url",
        "is_verified",
        "name",
        "profile_url",
        "url"
      ],
      "saveable": true,
      "docs": "https://apidirect.io/docs/facebook-search-pages"
    },
    {
      "key": "facebook/videos",
      "path": "/v1/facebook/videos",
      "method": "GET",
      "platform": "facebook",
      "label": "Search Videos",
      "summary": "Search Facebook Videos",
      "description": "Search for Facebook videos by keyword.",
      "price": "$0.008 per page",
      "freeTier": "50 requests/month",
      "suspended": false,
      "kind": "list",
      "listKey": "videos",
      "params": [
        {
          "name": "query",
          "label": "Query",
          "type": "string",
          "required": true,
          "description": "Search query (max 500 characters)"
        },
        {
          "name": "pages",
          "label": "Pages",
          "type": "integer",
          "required": false,
          "description": "Number of pages to fetch and merge into one response (1-15). Billed per page.",
          "default": 1,
          "min": 1,
          "max": 15
        },
        {
          "name": "start_date",
          "label": "Start Date",
          "type": "string",
          "required": false,
          "description": "Filter videos from this date (YYYY-MM-DD)"
        },
        {
          "name": "end_date",
          "label": "End Date",
          "type": "string",
          "required": false,
          "description": "Filter videos until this date (YYYY-MM-DD)"
        },
        {
          "name": "sort_by",
          "label": "Sort By",
          "type": "string",
          "required": false,
          "description": "Sort order for results. most_recent returns the newest videos first; relevance is the default.",
          "enum": [
            "most_recent",
            "relevance"
          ],
          "default": "relevance"
        },
        {
          "name": "get_sentiment",
          "label": "Get Sentiment",
          "type": "boolean",
          "required": false,
          "description": "Set to true to add AI emotion analysis to each video. Adds a `sentiment` object containing `emotions` (joy, trust, fear, surprise, sadness, disgust, anger and anticipation, each scored 0-100), `dominant_emotion`, `emotional_intensity` (0-10), and `polarity` (positive, negative or neutral). Any video that cannot be scored returns `sentiment: null`.",
          "default": false
        }
      ],
      "fields": [
        "author_name",
        "author_url",
        "author_verified",
        "description",
        "thumbnail",
        "time_and_views",
        "title",
        "video_id",
        "video_url"
      ],
      "saveable": true,
      "docs": "https://apidirect.io/docs/facebook-search-videos"
    },
    {
      "key": "facebook/events",
      "path": "/v1/facebook/events",
      "method": "GET",
      "platform": "facebook",
      "label": "Search Events",
      "summary": "Search Facebook Events",
      "description": "Search for Facebook events by keyword.",
      "price": "$0.008 per page",
      "freeTier": "50 requests/month",
      "suspended": false,
      "kind": "list",
      "listKey": "events",
      "params": [
        {
          "name": "query",
          "label": "Query",
          "type": "string",
          "required": true,
          "description": "Search query (max 500 characters)"
        },
        {
          "name": "pages",
          "label": "Pages",
          "type": "integer",
          "required": false,
          "description": "Number of pages to fetch and merge into one response (1-15). Billed per page.",
          "default": 1,
          "min": 1,
          "max": 15
        },
        {
          "name": "start_date",
          "label": "Start Date",
          "type": "string",
          "required": false,
          "description": "Filter events from this date (YYYY-MM-DD)"
        },
        {
          "name": "end_date",
          "label": "End Date",
          "type": "string",
          "required": false,
          "description": "Filter events until this date (YYYY-MM-DD)"
        },
        {
          "name": "location_id",
          "label": "Location ID",
          "type": "string",
          "required": false,
          "description": "Facebook location ID from /v1/facebook/locations, used to scope events to that place. Digits only, maximum 64 characters."
        }
      ],
      "fields": [
        "event_id",
        "title",
        "url"
      ],
      "saveable": true,
      "docs": "https://apidirect.io/docs/facebook-search-events"
    },
    {
      "key": "facebook/page",
      "path": "/v1/facebook/page",
      "method": "GET",
      "platform": "facebook",
      "label": "Page Details",
      "summary": "Facebook Page Details",
      "description": "Get detailed information about a Facebook page including follower count, category, description, and the page_id / delegate_page_id / reels_page_id needed for other endpoints.",
      "price": "$0.008 per request",
      "freeTier": "50 requests/month",
      "suspended": false,
      "kind": "detail",
      "listKey": "page",
      "params": [
        {
          "name": "url",
          "label": "URL",
          "type": "string",
          "required": true,
          "description": "Full URL of the Facebook page (e.g., https://www.facebook.com/facebook)"
        }
      ],
      "fields": [
        "address",
        "categories",
        "cover_image",
        "delegate_page_id",
        "email",
        "followers",
        "following",
        "image",
        "intro",
        "likes",
        "name",
        "page_id",
        "phone",
        "price_range",
        "rating",
        "reels_page_id",
        "type",
        "url",
        "verified",
        "website"
      ],
      "saveable": false,
      "docs": "https://apidirect.io/docs/facebook-page-details"
    },
    {
      "key": "facebook/page/posts",
      "path": "/v1/facebook/page/posts",
      "method": "GET",
      "platform": "facebook",
      "label": "Page Posts",
      "summary": "Facebook Page Posts",
      "description": "Get posts from a specific Facebook page.",
      "price": "$0.008 per page",
      "freeTier": "50 requests/month",
      "suspended": false,
      "kind": "list",
      "listKey": "posts",
      "params": [
        {
          "name": "page_id",
          "label": "Page ID",
          "type": "string",
          "required": true,
          "description": "Numeric Facebook page ID (from Page Details endpoint)"
        },
        {
          "name": "pages",
          "label": "Pages",
          "type": "integer",
          "required": false,
          "description": "Number of pages to fetch and merge into one response (1-15). Billed per page.",
          "default": 1,
          "min": 1,
          "max": 15
        },
        {
          "name": "start_date",
          "label": "Start Date",
          "type": "string",
          "required": false,
          "description": "Filter posts from this date (YYYY-MM-DD)"
        },
        {
          "name": "end_date",
          "label": "End Date",
          "type": "string",
          "required": false,
          "description": "Filter posts until this date (YYYY-MM-DD)"
        },
        {
          "name": "get_sentiment",
          "label": "Get Sentiment",
          "type": "boolean",
          "required": false,
          "description": "Set to true to add AI emotion analysis to each post. Adds a `sentiment` object containing `emotions` (joy, trust, fear, surprise, sadness, disgust, anger and anticipation, each scored 0-100), `dominant_emotion`, `emotional_intensity` (0-10), and `polarity` (positive, negative or neutral). Any post that cannot be scored returns `sentiment: null`.",
          "default": false
        }
      ],
      "fields": [
        "author_id",
        "author_name",
        "author_profile_picture",
        "author_url",
        "comments_count",
        "date",
        "external_url",
        "image_url",
        "message",
        "post_id",
        "reactions.angry",
        "reactions.care",
        "reactions.haha",
        "reactions.like",
        "reactions.love",
        "reactions.sad",
        "reactions.wow",
        "reactions_count",
        "reshare_count",
        "timestamp",
        "url",
        "video"
      ],
      "saveable": true,
      "docs": "https://apidirect.io/docs/facebook-page-posts"
    },
    {
      "key": "facebook/page/photos",
      "path": "/v1/facebook/page/photos",
      "method": "GET",
      "platform": "facebook",
      "label": "Page Photos",
      "summary": "Facebook Page Photos",
      "description": "Get photos from a specific Facebook page.",
      "price": "$0.008 per page",
      "freeTier": "50 requests/month",
      "suspended": false,
      "kind": "list",
      "listKey": "photos",
      "params": [
        {
          "name": "page_id",
          "label": "Page ID",
          "type": "string",
          "required": true,
          "description": "Numeric Facebook page ID (from Page Details endpoint)"
        },
        {
          "name": "pages",
          "label": "Pages",
          "type": "integer",
          "required": false,
          "description": "Number of pages to fetch and merge into one response (1-15). Billed per page.",
          "default": 1,
          "min": 1,
          "max": 15
        }
      ],
      "fields": [
        "image_url",
        "photo_id"
      ],
      "saveable": true,
      "docs": "https://apidirect.io/docs/facebook-page-photos"
    },
    {
      "key": "facebook/page/videos",
      "path": "/v1/facebook/page/videos",
      "method": "GET",
      "platform": "facebook",
      "label": "Page Videos",
      "summary": "Facebook Page Videos",
      "description": "Get videos from a specific Facebook page.",
      "price": "$0.008 per page",
      "freeTier": "50 requests/month",
      "suspended": false,
      "kind": "list",
      "listKey": "videos",
      "params": [
        {
          "name": "delegate_page_id",
          "label": "Delegate Page ID",
          "type": "string",
          "required": true,
          "description": "Delegate page ID (from Page Details endpoint)"
        },
        {
          "name": "pages",
          "label": "Pages",
          "type": "integer",
          "required": false,
          "description": "Number of pages to fetch and merge into one response (1-15). Billed per page.",
          "default": 1,
          "min": 1,
          "max": 15
        },
        {
          "name": "get_sentiment",
          "label": "Get Sentiment",
          "type": "boolean",
          "required": false,
          "description": "Set to true to add AI emotion analysis to each video. Adds a `sentiment` object containing `emotions` (joy, trust, fear, surprise, sadness, disgust, anger and anticipation, each scored 0-100), `dominant_emotion`, `emotional_intensity` (0-10), and `polarity` (positive, negative or neutral). Any video that cannot be scored returns `sentiment: null`.",
          "default": false
        }
      ],
      "fields": [
        "date",
        "description",
        "play_count",
        "thumbnail",
        "timestamp",
        "url",
        "video_id"
      ],
      "saveable": true,
      "docs": "https://apidirect.io/docs/facebook-page-videos"
    },
    {
      "key": "facebook/page/reels",
      "path": "/v1/facebook/page/reels",
      "method": "GET",
      "platform": "facebook",
      "label": "Page Reels",
      "summary": "Facebook Page Reels",
      "description": "Get reels from a specific Facebook page.",
      "price": "$0.008 per page",
      "freeTier": "50 requests/month",
      "suspended": false,
      "kind": "list",
      "listKey": "reels",
      "params": [
        {
          "name": "reels_page_id",
          "label": "Reels Page ID",
          "type": "string",
          "required": true,
          "description": "Reels page ID (from Page Details endpoint)"
        },
        {
          "name": "pages",
          "label": "Pages",
          "type": "integer",
          "required": false,
          "description": "Number of pages to fetch and merge into one response (1-10). Billed per page.",
          "default": 1,
          "min": 1,
          "max": 10
        },
        {
          "name": "get_sentiment",
          "label": "Get Sentiment",
          "type": "boolean",
          "required": false,
          "description": "Set to true to add AI emotion analysis to each reel. Adds a `sentiment` object containing `emotions` (joy, trust, fear, surprise, sadness, disgust, anger and anticipation, each scored 0-100), `dominant_emotion`, `emotional_intensity` (0-10), and `polarity` (positive, negative or neutral). Any reel that cannot be scored returns `sentiment: null`.",
          "default": false
        }
      ],
      "fields": [
        "author_name",
        "author_url",
        "comments_count",
        "date",
        "description",
        "length_in_seconds",
        "play_count",
        "post_id",
        "reactions_count",
        "reshare_count",
        "thumbnail",
        "timestamp",
        "url",
        "video_id"
      ],
      "saveable": true,
      "docs": "https://apidirect.io/docs/facebook-page-reels"
    },
    {
      "key": "facebook/page/reviews",
      "path": "/v1/facebook/page/reviews",
      "method": "GET",
      "platform": "facebook",
      "label": "Page Reviews",
      "summary": "Facebook Page Reviews",
      "description": "Get the reviews and recommendations posted to a Facebook page.",
      "price": "$0.008 per page",
      "freeTier": "50 requests/month",
      "suspended": false,
      "kind": "list",
      "listKey": "reviews",
      "params": [
        {
          "name": "page_id",
          "label": "Page ID",
          "type": "string",
          "required": true,
          "description": "Numeric Facebook page ID (from Page Details endpoint)"
        },
        {
          "name": "pages",
          "label": "Pages",
          "type": "integer",
          "required": false,
          "description": "Number of pages to fetch and merge into one response (1-15). Billed per page.",
          "default": 1,
          "min": 1,
          "max": 15
        },
        {
          "name": "get_sentiment",
          "label": "Get Sentiment",
          "type": "boolean",
          "required": false,
          "description": "Set to true to add AI emotion analysis to each review. Adds a `sentiment` object containing `emotions` (joy, trust, fear, surprise, sadness, disgust, anger and anticipation, each scored 0-100), `dominant_emotion`, `emotional_intensity` (0-10), and `polarity` (positive, negative or neutral). Any review that cannot be scored returns `sentiment: null`.",
          "default": false
        }
      ],
      "fields": [
        "author_name",
        "author_url",
        "reactions_count",
        "recommend",
        "review_text"
      ],
      "saveable": true,
      "docs": "https://apidirect.io/docs/facebook-page-reviews"
    },
    {
      "key": "facebook/group",
      "path": "/v1/facebook/group",
      "method": "GET",
      "platform": "facebook",
      "label": "Group Details",
      "summary": "Facebook Group Details",
      "description": "Get detailed information about a Facebook group including name, description, privacy, member count, location and cover photo.",
      "price": "$0.008 per request",
      "freeTier": "50 requests/month",
      "suspended": false,
      "kind": "detail",
      "listKey": "group",
      "params": [
        {
          "name": "url",
          "label": "URL",
          "type": "string",
          "required": true,
          "description": "Full URL of the Facebook group"
        }
      ],
      "fields": [
        "cover_photo",
        "description",
        "id",
        "location",
        "members_count",
        "name",
        "privacy",
        "url"
      ],
      "saveable": false,
      "docs": "https://apidirect.io/docs/facebook-group-details"
    },
    {
      "key": "facebook/group/posts",
      "path": "/v1/facebook/group/posts",
      "method": "GET",
      "platform": "facebook",
      "label": "Group Posts",
      "summary": "Facebook Group Posts",
      "description": "Get posts from a specific Facebook group.",
      "price": "$0.008 per page",
      "freeTier": "50 requests/month",
      "suspended": false,
      "kind": "list",
      "listKey": "posts",
      "params": [
        {
          "name": "group_id",
          "label": "Group ID",
          "type": "string",
          "required": true,
          "description": "Numeric Facebook group ID (from Group Details endpoint)"
        },
        {
          "name": "pages",
          "label": "Pages",
          "type": "integer",
          "required": false,
          "description": "Number of pages to fetch and merge into one response (1-15). Billed per page.",
          "default": 1,
          "min": 1,
          "max": 15
        },
        {
          "name": "sort_by",
          "label": "Sort By",
          "type": "string",
          "required": false,
          "description": "Sort order for results. most_recent returns the group's posts chronologically; relevance returns its top posts. Omit to use the default order.",
          "enum": [
            "most_recent",
            "relevance"
          ]
        },
        {
          "name": "get_sentiment",
          "label": "Get Sentiment",
          "type": "boolean",
          "required": false,
          "description": "Set to true to add AI emotion analysis to each post. Adds a `sentiment` object containing `emotions` (joy, trust, fear, surprise, sadness, disgust, anger and anticipation, each scored 0-100), `dominant_emotion`, `emotional_intensity` (0-10), and `polarity` (positive, negative or neutral). Any post that cannot be scored returns `sentiment: null`.",
          "default": false
        }
      ],
      "fields": [
        "author_id",
        "author_name",
        "author_profile_picture",
        "author_url",
        "comments_count",
        "date",
        "external_url",
        "image_url",
        "message",
        "post_id",
        "reactions.angry",
        "reactions.care",
        "reactions.haha",
        "reactions.like",
        "reactions.love",
        "reactions.sad",
        "reactions.wow",
        "reactions_count",
        "reshare_count",
        "timestamp",
        "url",
        "video"
      ],
      "saveable": true,
      "docs": "https://apidirect.io/docs/facebook-group-posts"
    },
    {
      "key": "facebook/group/search",
      "path": "/v1/facebook/group/search",
      "method": "GET",
      "platform": "facebook",
      "label": "Group Posts Search",
      "summary": "Search Facebook Group Posts",
      "description": "Search for posts within a specific Facebook group by keyword.",
      "price": "$0.008 per page",
      "freeTier": "50 requests/month",
      "suspended": true,
      "kind": "list",
      "listKey": "posts",
      "params": [
        {
          "name": "query",
          "label": "Query",
          "type": "string",
          "required": true,
          "description": "Search query (max 500 characters)"
        },
        {
          "name": "group_id",
          "label": "Group ID",
          "type": "string",
          "required": true,
          "description": "Numeric Facebook group ID (from Group Details endpoint)"
        },
        {
          "name": "pages",
          "label": "Pages",
          "type": "integer",
          "required": false,
          "description": "Number of pages to fetch and merge into one response (1-10). Billed per page.",
          "default": 1,
          "min": 1,
          "max": 10
        },
        {
          "name": "start_date",
          "label": "Start Date",
          "type": "string",
          "required": false,
          "description": "Filter posts from this date (YYYY-MM-DD)"
        },
        {
          "name": "end_date",
          "label": "End Date",
          "type": "string",
          "required": false,
          "description": "Filter posts until this date (YYYY-MM-DD)"
        },
        {
          "name": "get_sentiment",
          "label": "Get Sentiment",
          "type": "boolean",
          "required": false,
          "description": "Set to true to add AI emotion analysis to each post. Adds a `sentiment` object containing `emotions` (joy, trust, fear, surprise, sadness, disgust, anger and anticipation, each scored 0-100), `dominant_emotion`, `emotional_intensity` (0-10), and `polarity` (positive, negative or neutral). Any post that cannot be scored returns `sentiment: null`.",
          "default": false
        }
      ],
      "fields": [
        "author_id",
        "author_name",
        "author_profile_picture",
        "author_url",
        "comments_count",
        "date",
        "external_url",
        "image_url",
        "message",
        "post_id",
        "reactions.angry",
        "reactions.care",
        "reactions.haha",
        "reactions.like",
        "reactions.love",
        "reactions.sad",
        "reactions.wow",
        "reactions_count",
        "reshare_count",
        "timestamp",
        "url",
        "video"
      ],
      "saveable": true,
      "docs": "https://apidirect.io/docs/facebook-group-search"
    },
    {
      "key": "facebook/post/comments",
      "path": "/v1/facebook/post/comments",
      "method": "GET",
      "platform": "facebook",
      "label": "Post Comments",
      "summary": "Facebook Post Comments",
      "description": "Get comments on a Facebook post by post ID.",
      "price": "$0.008 per page",
      "freeTier": "50 requests/month",
      "suspended": false,
      "kind": "list",
      "listKey": "comments",
      "params": [
        {
          "name": "post_id",
          "label": "Post ID",
          "type": "string",
          "required": true,
          "description": "Facebook post ID (pfbid or numeric)"
        },
        {
          "name": "pages",
          "label": "Pages",
          "type": "integer",
          "required": false,
          "description": "Number of pages to fetch and merge into one response (1-20). Billed per page.",
          "default": 1,
          "min": 1,
          "max": 20
        },
        {
          "name": "get_sentiment",
          "label": "Get Sentiment",
          "type": "boolean",
          "required": false,
          "description": "Set to true to add AI emotion analysis to each comment. Adds a `sentiment` object containing `emotions` (joy, trust, fear, surprise, sadness, disgust, anger and anticipation, each scored 0-100), `dominant_emotion`, `emotional_intensity` (0-10), and `polarity` (positive, negative or neutral). Any comment that cannot be scored returns `sentiment: null`.",
          "default": false
        }
      ],
      "fields": [
        "comment_id",
        "legacy_comment_id",
        "message",
        "date",
        "timestamp",
        "author_name",
        "author_id",
        "author_url",
        "author_gender",
        "author_profile_picture",
        "replies_count",
        "reactions_count",
        "is_sticker",
        "sticker_url",
        "is_gif",
        "gif",
        "image",
        "video"
      ],
      "saveable": true,
      "docs": "https://apidirect.io/docs/facebook-post-comments"
    },
    {
      "key": "forums/posts",
      "path": "/v1/forums/posts",
      "method": "GET",
      "platform": "google",
      "label": "Forum Posts",
      "summary": "Search Forum Posts",
      "description": "Search for forum posts across the web, including discussion boards, Q&A sites, and community boards.",
      "price": "$0.008 per request",
      "freeTier": "50 requests/month",
      "suspended": false,
      "kind": "list",
      "listKey": "posts",
      "params": [
        {
          "name": "query",
          "label": "Query",
          "type": "string",
          "required": true,
          "description": "Search query (max 500 characters). Leading and trailing whitespace is trimmed, and the query must not be empty."
        },
        {
          "name": "page",
          "label": "Page",
          "type": "integer",
          "required": false,
          "description": "Page number for pagination, 1-10 (default: 1). Results are paginated 10 at a time, so page=2 starts at the 11th result. Values below 1, and values that are not numbers, are treated as 1. A page above 10 returns 400.",
          "default": 1,
          "min": 1,
          "max": 10
        },
        {
          "name": "time",
          "label": "Time",
          "type": "string",
          "required": false,
          "description": "Filter by time period. 'any' applies no time filter. Any value outside this list returns 400.",
          "enum": [
            "any",
            "hour",
            "day",
            "week",
            "month",
            "year"
          ],
          "default": "any"
        },
        {
          "name": "country",
          "label": "Country",
          "type": "string",
          "required": false,
          "description": "ISO 3166-1 alpha-2 country code (e.g., US, GB, DE). Case-insensitive. Any value that is not exactly 2 letters returns 400."
        },
        {
          "name": "get_sentiment",
          "label": "Get Sentiment",
          "type": "boolean",
          "required": false,
          "description": "Set to true to add AI emotion analysis to each post. Adds a `sentiment` object containing `emotions` (joy, trust, fear, surprise, sadness, disgust, anger and anticipation, each scored 0-100), `dominant_emotion`, `emotional_intensity` (0-10), and `polarity` (positive, negative or neutral). Any post that cannot be scored returns `sentiment: null`.",
          "default": false
        }
      ],
      "fields": [
        "domain",
        "position",
        "rank",
        "snippet",
        "source",
        "title",
        "url"
      ],
      "saveable": true,
      "docs": "https://apidirect.io/docs/forum-posts"
    },
    {
      "key": "places/search",
      "path": "/v1/places/search",
      "method": "GET",
      "platform": "google",
      "label": "Places Search",
      "summary": "Search Google Places",
      "description": "Search Google Maps places (local businesses, restaurants, hotels, shops and points of interest) by free-text query.",
      "price": "$0.01 per page",
      "freeTier": "20 requests/month",
      "suspended": false,
      "kind": "list",
      "listKey": "places",
      "params": [
        {
          "name": "query",
          "label": "Query",
          "type": "string",
          "required": true,
          "description": "Search keyword (max 500 characters). E.g. `coffee shops brooklyn`, `dentists 90210`, `hilton hotels paris`"
        },
        {
          "name": "pages",
          "label": "Pages",
          "type": "integer",
          "required": false,
          "description": "Number of pages to fetch and merge. Each page returns up to 10 results and is billed as one request",
          "default": 1,
          "min": 1,
          "max": 20
        },
        {
          "name": "limit",
          "label": "Limit",
          "type": "integer",
          "required": false,
          "description": "Alternative to `pages`: maximum number of results, rounded up to whole pages of 10 (e.g. `limit=15` fetches 2 pages, so up to 20 results). Ignored when `pages` is also sent. Maximum 200",
          "min": 1,
          "max": 200
        },
        {
          "name": "lat",
          "label": "Latitude",
          "type": "number",
          "required": false,
          "description": "Center latitude for geographic bias (provide with `lng`)"
        },
        {
          "name": "lng",
          "label": "Longitude",
          "type": "number",
          "required": false,
          "description": "Center longitude for geographic bias (provide with `lat`)"
        },
        {
          "name": "zoom",
          "label": "Zoom",
          "type": "integer",
          "required": false,
          "description": "Map zoom level. Smaller values widen the search radius (13 ≈ city, 15 ≈ neighborhood, 10 ≈ metro area)",
          "min": 1,
          "max": 20
        },
        {
          "name": "country",
          "label": "Country",
          "type": "string",
          "required": false,
          "description": "2-letter ISO 3166-1 alpha-2 region code",
          "default": "us"
        },
        {
          "name": "language",
          "label": "Language",
          "type": "string",
          "required": false,
          "description": "2-letter ISO 639-1 language code",
          "default": "en"
        }
      ],
      "fields": [
        "place_id",
        "name",
        "type",
        "subtypes",
        "phone_number",
        "website",
        "domain",
        "rating",
        "review_count",
        "reviews_per_rating.1",
        "reviews_per_rating.2",
        "reviews_per_rating.3",
        "reviews_per_rating.4",
        "reviews_per_rating.5",
        "price_level",
        "verified",
        "business_status",
        "opening_status",
        "working_hours.Monday",
        "working_hours.Sunday",
        "opening_date",
        "address",
        "street_address",
        "district",
        "city",
        "state",
        "zipcode",
        "country",
        "latitude",
        "longitude",
        "timezone",
        "summary",
        "about.summary",
        "about.details",
        "photo_count",
        "photos_sample",
        "place_link",
        "reviews_link",
        "booking_link",
        "reservations_link",
        "order_link",
        "owner_name",
        "owner_link",
        "cid"
      ],
      "saveable": true,
      "docs": "https://apidirect.io/docs/places-search"
    },
    {
      "key": "places/details",
      "path": "/v1/places/details",
      "method": "GET",
      "platform": "google",
      "label": "Place Details",
      "summary": "Google Place Details",
      "description": "Get full details for a single Google Maps place by `place_id`.",
      "price": "$0.003 per request",
      "freeTier": "50 requests/month",
      "suspended": false,
      "kind": "detail",
      "listKey": "place",
      "params": [
        {
          "name": "place_id",
          "label": "Place ID",
          "type": "string",
          "required": true,
          "description": "Google `place_id` (e.g. `ChIJifIePKtZwokRVZ-UdRGkZzs`), as returned by the Places Search endpoint"
        },
        {
          "name": "country",
          "label": "Country",
          "type": "string",
          "required": false,
          "description": "2-letter ISO 3166-1 alpha-2 region code",
          "default": "us"
        },
        {
          "name": "language",
          "label": "Language",
          "type": "string",
          "required": false,
          "description": "2-letter ISO 639-1 language code",
          "default": "en"
        }
      ],
      "fields": [
        "place_id",
        "name",
        "type",
        "subtypes",
        "phone_number",
        "website",
        "domain",
        "rating",
        "review_count",
        "reviews_per_rating.1",
        "reviews_per_rating.2",
        "reviews_per_rating.3",
        "reviews_per_rating.4",
        "reviews_per_rating.5",
        "price_level",
        "verified",
        "business_status",
        "opening_status",
        "working_hours.Monday",
        "opening_date",
        "address",
        "street_address",
        "district",
        "city",
        "state",
        "zipcode",
        "country",
        "latitude",
        "longitude",
        "timezone",
        "summary",
        "about.summary",
        "about.details",
        "photo_count",
        "photos_sample",
        "place_link",
        "reviews_link",
        "booking_link",
        "reservations_link",
        "order_link",
        "owner_name",
        "owner_link",
        "cid",
        "global_plus_code",
        "compound_plus_code",
        "menu_link",
        "emails_and_contacts.emails",
        "emails_and_contacts.phone_numbers",
        "emails_and_contacts.facebook",
        "emails_and_contacts.instagram",
        "emails_and_contacts.linkedin",
        "emails_and_contacts.twitter",
        "emails_and_contacts.tiktok",
        "emails_and_contacts.youtube",
        "emails_and_contacts.pinterest",
        "emails_and_contacts.snapchat",
        "emails_and_contacts.yelp",
        "emails_and_contacts.github"
      ],
      "saveable": false,
      "docs": "https://apidirect.io/docs/places-details"
    },
    {
      "key": "places/reviews",
      "path": "/v1/places/reviews",
      "method": "GET",
      "platform": "google",
      "label": "Place Reviews",
      "summary": "Google Place Reviews",
      "description": "Get user reviews for a place by `place_id`.",
      "price": "$0.01 per page",
      "freeTier": "20 requests/month",
      "suspended": false,
      "kind": "list",
      "listKey": "reviews",
      "params": [
        {
          "name": "place_id",
          "label": "Place ID",
          "type": "string",
          "required": true,
          "description": "Google `place_id`, as returned by the Places Search endpoint"
        },
        {
          "name": "pages",
          "label": "Pages",
          "type": "integer",
          "required": false,
          "description": "Number of pages to fetch and merge. Each page returns up to 10 reviews and is billed as one request",
          "default": 1,
          "min": 1,
          "max": 10
        },
        {
          "name": "limit",
          "label": "Limit",
          "type": "integer",
          "required": false,
          "description": "Alternative to `pages`: maximum number of reviews, rounded up to whole pages of 10 (e.g. `limit=15` fetches 2 pages, so up to 20 reviews). Ignored when `pages` is also sent. Maximum 100",
          "min": 1,
          "max": 100
        },
        {
          "name": "sort_by",
          "label": "Sort By",
          "type": "string",
          "required": false,
          "description": "Sort order for reviews",
          "enum": [
            "most_relevant",
            "newest",
            "highest_ranking",
            "lowest_ranking"
          ],
          "default": "most_relevant"
        },
        {
          "name": "language",
          "label": "Language",
          "type": "string",
          "required": false,
          "description": "2-letter ISO 639-1 language code for the returned reviews. Set `translate_reviews=true` to translate the returned reviews into this language",
          "default": "en"
        },
        {
          "name": "translate_reviews",
          "label": "Translate Reviews",
          "type": "boolean",
          "required": false,
          "description": "Set to `true` to translate the returned reviews into the requested `language`",
          "default": false
        },
        {
          "name": "country",
          "label": "Country",
          "type": "string",
          "required": false,
          "description": "2-letter ISO 3166-1 alpha-2 region code",
          "default": "us"
        },
        {
          "name": "get_sentiment",
          "label": "Get Sentiment",
          "type": "boolean",
          "required": false,
          "description": "Set to true to add AI emotion analysis to each review. Adds a `sentiment` object containing `emotions` (joy, trust, fear, surprise, sadness, disgust, anger and anticipation, each scored 0-100), `dominant_emotion`, `emotional_intensity` (0-10), and `polarity` (positive, negative or neutral). Any review that cannot be scored returns `sentiment: null`.",
          "default": false
        }
      ],
      "fields": [
        "review_id",
        "rating",
        "review_text",
        "review_datetime_utc",
        "review_timestamp",
        "review_time",
        "review_link",
        "review_photos",
        "review_language",
        "review_text_translated_language",
        "like_count",
        "review_source",
        "review_source_logo",
        "author_id",
        "author_name",
        "author_link",
        "author_photo_url",
        "author_review_count",
        "author_photo_count",
        "author_reviews_link",
        "author_is_local_guide",
        "author_local_guide_level",
        "owner_response"
      ],
      "saveable": true,
      "docs": "https://apidirect.io/docs/places-reviews"
    },
    {
      "key": "places/photos",
      "path": "/v1/places/photos",
      "method": "GET",
      "platform": "google",
      "label": "Place Photos",
      "summary": "Google Place Photos",
      "description": "Get photos and videos for a place by `place_id`.",
      "price": "$0.01 per page",
      "freeTier": "20 requests/month",
      "suspended": false,
      "kind": "list",
      "listKey": "photos",
      "params": [
        {
          "name": "place_id",
          "label": "Place ID",
          "type": "string",
          "required": true,
          "description": "Google `place_id`, as returned by the Places Search endpoint"
        },
        {
          "name": "pages",
          "label": "Pages",
          "type": "integer",
          "required": false,
          "description": "Number of pages to fetch and merge. Each page returns up to 10 items and is billed as one request",
          "default": 1,
          "min": 1,
          "max": 10
        },
        {
          "name": "country",
          "label": "Country",
          "type": "string",
          "required": false,
          "description": "2-letter ISO 3166-1 alpha-2 region code",
          "default": "us"
        },
        {
          "name": "language",
          "label": "Language",
          "type": "string",
          "required": false,
          "description": "2-letter ISO 639-1 language code",
          "default": "en"
        }
      ],
      "fields": [
        "photo_id",
        "type",
        "photo_url",
        "photo_url_large",
        "video_thumbnail_url",
        "latitude",
        "longitude",
        "photo_datetime_utc",
        "photo_timestamp"
      ],
      "saveable": true,
      "docs": "https://apidirect.io/docs/places-photos"
    },
    {
      "key": "web/search",
      "path": "/v1/web/search",
      "method": "GET",
      "platform": "google",
      "label": "Web Search",
      "summary": "Google Web Search",
      "description": "Run a real-time Google search and return organic results with position, rank, title, URL, snippet, source, domain, and displayed link.",
      "price": "$0.004 per page (+$0.002 flat per request when `include_ai_overview=true`)",
      "freeTier": "50 requests/month",
      "suspended": false,
      "kind": "list",
      "listKey": "results",
      "params": [
        {
          "name": "query",
          "label": "Query",
          "type": "string",
          "required": true,
          "description": "Search keyword (max 500 characters, measured after leading and trailing whitespace is trimmed). Supports Google advanced operators (site:, inurl:, intitle:, etc.)"
        },
        {
          "name": "pages",
          "label": "Pages",
          "type": "integer",
          "required": false,
          "description": "Number of result pages to fetch and merge (10 results per page). This is a count, not a page number: pages=3 returns the first 30 results in a single results array. Values above 10 are rejected with 400; values below 1 are treated as 1. Each page is billed as one request.",
          "default": 1,
          "min": 1,
          "max": 10
        },
        {
          "name": "country",
          "label": "Country",
          "type": "string",
          "required": false,
          "description": "2-letter ISO 3166-1 alpha-2 country code. A value that is not exactly 2 letters is rejected with 400.",
          "default": "us"
        },
        {
          "name": "language",
          "label": "Language",
          "type": "string",
          "required": false,
          "description": "2-letter ISO 639-1 language code. A value that is not exactly 2 letters is rejected with 400.",
          "default": "en"
        },
        {
          "name": "time",
          "label": "Time",
          "type": "string",
          "required": false,
          "description": "Time filter for results",
          "enum": [
            "any",
            "hour",
            "day",
            "week",
            "month",
            "year"
          ],
          "default": "any"
        },
        {
          "name": "location",
          "label": "Location",
          "type": "string",
          "required": false,
          "description": "City-level geo location (e.g. London,England,United Kingdom)"
        },
        {
          "name": "device",
          "label": "Device",
          "type": "string",
          "required": false,
          "description": "Device type to simulate",
          "enum": [
            "desktop",
            "mobile"
          ],
          "default": "desktop"
        },
        {
          "name": "include_ai_overview",
          "label": "Include AI Overview",
          "type": "boolean",
          "required": false,
          "description": "When true, include Google's AI Overview for the query. Only the exact value true (case-insensitive) enables it. When enabled, the response always contains an ai_overview field, which is null if Google generated no overview for the query.",
          "default": false
        }
      ],
      "fields": [
        "position",
        "rank",
        "title",
        "url",
        "snippet",
        "source",
        "domain",
        "displayed_link"
      ],
      "saveable": true,
      "docs": "https://apidirect.io/docs/web-search"
    },
    {
      "key": "web/ai-mode",
      "path": "/v1/web/ai-mode",
      "method": "POST",
      "platform": "google",
      "label": "AI Mode",
      "summary": "Google AI Mode",
      "description": "Send a prompt to Google's AI Mode and receive a structured conversational reply broken into ordered parts (paragraph, heading, list, images) with cited reference links.",
      "price": "$0.005 per request",
      "freeTier": "50 requests/month",
      "suspended": false,
      "kind": "text",
      "listKey": null,
      "params": [
        {
          "name": "prompt",
          "label": "Prompt",
          "type": "string",
          "required": true,
          "description": "The AI Mode prompt (max 12000 characters)"
        },
        {
          "name": "country",
          "label": "Country",
          "type": "string",
          "required": false,
          "description": "2-letter ISO 3166-1 alpha-2 country code. A value that is not exactly 2 letters is rejected with 400.",
          "default": "us"
        },
        {
          "name": "language",
          "label": "Language",
          "type": "string",
          "required": false,
          "description": "2-letter ISO 639-1 language code. A value that is not exactly 2 letters is rejected with 400.",
          "default": "en"
        },
        {
          "name": "session_token",
          "label": "Session Token",
          "type": "string",
          "required": false,
          "description": "Token from a previous AI Mode response. Pass it to continue the conversation with prior context. Treat as an opaque string."
        }
      ],
      "fields": [],
      "saveable": false,
      "docs": "https://apidirect.io/docs/google-ai-mode"
    },
    {
      "key": "instagram/posts",
      "path": "/v1/instagram/posts",
      "method": "GET",
      "platform": "instagram",
      "label": "Search Posts",
      "summary": "Search Instagram Posts",
      "description": "Search for Instagram posts by keyword.",
      "price": "$0.006 per page",
      "freeTier": "50 requests/month",
      "suspended": false,
      "kind": "list",
      "listKey": "posts",
      "params": [
        {
          "name": "query",
          "label": "Query",
          "type": "string",
          "required": true,
          "description": "Search keyword (max 500 characters). Cannot start with @ or #, though either character may appear elsewhere in the query."
        },
        {
          "name": "pages",
          "label": "Pages",
          "type": "integer",
          "required": false,
          "description": "Number of pages to fetch and merge into one response (1-20, billed per page)",
          "default": 1,
          "min": 1,
          "max": 20
        },
        {
          "name": "get_sentiment",
          "label": "Get Sentiment",
          "type": "boolean",
          "required": false,
          "description": "Set to true to add AI emotion analysis to each post. Adds a `sentiment` object containing `emotions` (joy, trust, fear, surprise, sadness, disgust, anger and anticipation, each scored 0-100), `dominant_emotion`, `emotional_intensity` (0-10), and `polarity` (positive, negative or neutral). Any post that cannot be scored returns `sentiment: null`.",
          "default": false
        }
      ],
      "fields": [
        "author",
        "author_name",
        "author_verified",
        "comments",
        "date",
        "domain",
        "hashtags",
        "is_video",
        "likes",
        "media_type",
        "mentions",
        "reposts",
        "shares",
        "snippet",
        "source",
        "title",
        "url",
        "views",
        "media_id",
        "thumbnail_url",
        "video_url",
        "video_duration",
        "width",
        "height",
        "carousel_media_count",
        "is_paid_partnership",
        "ai_label.label",
        "ai_label.detection_method",
        "location",
        "tagged_users",
        "coauthors",
        "carousel_media",
        "audio.type",
        "audio.title",
        "audio.artist",
        "audio.audio_id",
        "audio.duration_ms"
      ],
      "saveable": true,
      "docs": "https://apidirect.io/docs/instagram-posts"
    },
    {
      "key": "instagram/users",
      "path": "/v1/instagram/users",
      "method": "GET",
      "platform": "instagram",
      "label": "Search Users",
      "summary": "Search Instagram Users",
      "description": "Search for Instagram users by keyword.",
      "price": "$0.006 per request",
      "freeTier": "50 requests/month",
      "suspended": false,
      "kind": "list",
      "listKey": "users",
      "params": [
        {
          "name": "query",
          "label": "Query",
          "type": "string",
          "required": true,
          "description": "Search keyword (max 500 characters)"
        }
      ],
      "fields": [
        "full_name",
        "is_private",
        "is_verified",
        "profile_pic_url",
        "is_ai_generated_profile",
        "url",
        "user_id",
        "username"
      ],
      "saveable": true,
      "docs": "https://apidirect.io/docs/instagram-users"
    },
    {
      "key": "instagram/user",
      "path": "/v1/instagram/user",
      "method": "GET",
      "platform": "instagram",
      "label": "User Profile",
      "summary": "Instagram User Profile",
      "description": "Look up a single Instagram user by username or profile URL.",
      "price": "$0.006 per request",
      "freeTier": "50 requests/month",
      "suspended": false,
      "kind": "detail",
      "listKey": "user",
      "params": [
        {
          "name": "username",
          "label": "Username",
          "type": "string",
          "required": false,
          "description": "Instagram username, with or without leading @ (max 100 characters, cannot start with # or /). Provide either username or url."
        },
        {
          "name": "url",
          "label": "URL",
          "type": "string",
          "required": false,
          "description": "Instagram profile URL, e.g. https://instagram.com/natgeo (max 500 characters). Provide either username or url."
        }
      ],
      "fields": [
        "username",
        "full_name",
        "user_id",
        "biography",
        "follower_count",
        "following_count",
        "media_count",
        "is_verified",
        "is_private",
        "is_business",
        "category",
        "external_url",
        "bio_links",
        "profile_pic_url",
        "profile_pic_url_hd",
        "public_email",
        "public_phone_number",
        "account_based_in",
        "date_joined",
        "date_joined_timestamp",
        "date_verified",
        "date_verified_timestamp",
        "former_usernames",
        "is_ai_generated_profile",
        "url"
      ],
      "saveable": false,
      "docs": "https://apidirect.io/docs/instagram-user"
    },
    {
      "key": "instagram/user/posts",
      "path": "/v1/instagram/user/posts",
      "method": "GET",
      "platform": "instagram",
      "label": "User Posts",
      "summary": "Instagram User Posts",
      "description": "Get a single Instagram user's recent posts and reels (their feed) by profile URL or username.",
      "price": "$0.006 per page",
      "freeTier": "50 requests/month",
      "suspended": false,
      "kind": "list",
      "listKey": "posts",
      "params": [
        {
          "name": "url",
          "label": "URL",
          "type": "string",
          "required": false,
          "description": "Instagram profile URL, e.g. https://instagram.com/natgeo (max 500 characters). Provide either url or username."
        },
        {
          "name": "username",
          "label": "Username",
          "type": "string",
          "required": false,
          "description": "Instagram username, with or without leading @ (max 100 characters, cannot start with # or /). Provide either url or username."
        },
        {
          "name": "pages",
          "label": "Pages",
          "type": "integer",
          "required": false,
          "description": "Number of pages to fetch and merge into one response (1-20, billed per page). Each page returns up to 12 posts.",
          "default": 1,
          "min": 1,
          "max": 20
        },
        {
          "name": "get_sentiment",
          "label": "Get Sentiment",
          "type": "boolean",
          "required": false,
          "description": "Set to true to add AI emotion analysis to each post. Adds a `sentiment` object containing `emotions` (joy, trust, fear, surprise, sadness, disgust, anger and anticipation, each scored 0-100), `dominant_emotion`, `emotional_intensity` (0-10), and `polarity` (positive, negative or neutral). Any post that cannot be scored returns `sentiment: null`.",
          "default": false
        }
      ],
      "fields": [
        "author",
        "author_name",
        "author_verified",
        "comments",
        "date",
        "domain",
        "hashtags",
        "is_video",
        "likes",
        "media_type",
        "mentions",
        "reposts",
        "shares",
        "snippet",
        "source",
        "title",
        "url",
        "views",
        "media_id",
        "thumbnail_url",
        "video_url",
        "video_duration",
        "width",
        "height",
        "carousel_media_count",
        "is_paid_partnership",
        "ai_label.label",
        "ai_label.detection_method",
        "location.name",
        "location.city",
        "location.lat",
        "location.lng",
        "tagged_users",
        "coauthors",
        "carousel_media",
        "audio",
        "is_pinned"
      ],
      "saveable": true,
      "docs": "https://apidirect.io/docs/instagram-user-posts"
    },
    {
      "key": "instagram/post",
      "path": "/v1/instagram/post",
      "method": "GET",
      "platform": "instagram",
      "label": "Post Details",
      "summary": "Instagram Post Details",
      "description": "Look up a single Instagram post, reel, or IGTV video by URL, shortcode, or numeric media ID.",
      "price": "$0.006 per request",
      "freeTier": "50 requests/month",
      "suspended": false,
      "kind": "detail",
      "listKey": "post",
      "params": [
        {
          "name": "url",
          "label": "URL",
          "type": "string",
          "required": false,
          "description": "Instagram post, reel, IGTV, or story URL, e.g. https://www.instagram.com/p/CxYQJO8xuC6/ (max 500 characters). Must be an instagram.com URL containing /p/, /reel, /tv/, or /stories/. Provide either url or code."
        },
        {
          "name": "code",
          "label": "Code",
          "type": "string",
          "required": false,
          "description": "The post's shortcode, e.g. CxYQJO8xuC6, or numeric media ID (max 50 characters, letters/digits/-/_ only). Provide either url or code."
        },
        {
          "name": "get_sentiment",
          "label": "Get Sentiment",
          "type": "boolean",
          "required": false,
          "description": "Set to true to add AI emotion analysis to the post. Adds a `sentiment` object containing `emotions` (joy, trust, fear, surprise, sadness, disgust, anger and anticipation, each scored 0-100), `dominant_emotion`, `emotional_intensity` (0-10), and `polarity` (positive, negative or neutral). If the post cannot be scored, `sentiment` is null.",
          "default": false
        }
      ],
      "fields": [
        "title",
        "url",
        "date",
        "date_timestamp",
        "author",
        "author_id",
        "source",
        "domain",
        "snippet",
        "likes",
        "comments",
        "shares",
        "reposts",
        "views",
        "is_video",
        "media_type",
        "author_verified",
        "author_name",
        "hashtags",
        "mentions",
        "media_id",
        "thumbnail_url",
        "video_url",
        "video_duration",
        "width",
        "height",
        "carousel_media_count",
        "is_paid_partnership",
        "ai_label.label",
        "ai_label.detection_method",
        "location",
        "tagged_users",
        "coauthors",
        "carousel_media",
        "audio.type",
        "audio.title",
        "audio.artist",
        "audio.audio_id",
        "audio.duration_ms",
        "is_pinned",
        "accessibility_caption"
      ],
      "saveable": false,
      "docs": "https://apidirect.io/docs/instagram-post"
    },
    {
      "key": "instagram/user/followers",
      "path": "/v1/instagram/user/followers",
      "method": "GET",
      "platform": "instagram",
      "label": "User Followers",
      "summary": "Instagram User Followers",
      "description": "Get a user's followers by username or profile URL.",
      "price": "$0.006 per page",
      "freeTier": "50 requests/month",
      "suspended": false,
      "kind": "list",
      "listKey": "followers",
      "params": [
        {
          "name": "username",
          "label": "Username",
          "type": "string",
          "required": false,
          "description": "Instagram username, with or without leading @ (max 100 characters). Provide either username or url."
        },
        {
          "name": "url",
          "label": "URL",
          "type": "string",
          "required": false,
          "description": "Instagram profile URL, e.g. https://instagram.com/natgeo (max 500 characters). Provide either username or url."
        },
        {
          "name": "pages",
          "label": "Pages",
          "type": "integer",
          "required": false,
          "description": "Number of pages to fetch, 1-40 (default: 1). Each page returns up to 50 accounts. Verified (blue checkmark) accounts return the first page only.",
          "default": 1,
          "min": 1,
          "max": 40
        },
        {
          "name": "query",
          "label": "Query",
          "type": "string",
          "required": false,
          "description": "Search the followers list by username or name (max 100 characters). Returns up to 50 matches in a single request; pages is ignored."
        }
      ],
      "fields": [
        "username",
        "full_name",
        "user_id",
        "is_verified",
        "is_private",
        "profile_pic_url",
        "url"
      ],
      "saveable": true,
      "docs": "https://apidirect.io/docs/instagram-user-followers"
    },
    {
      "key": "instagram/user/following",
      "path": "/v1/instagram/user/following",
      "method": "GET",
      "platform": "instagram",
      "label": "User Following",
      "summary": "Instagram User Following",
      "description": "Get the accounts a user follows by username or profile URL.",
      "price": "$0.006 per page",
      "freeTier": "50 requests/month",
      "suspended": false,
      "kind": "list",
      "listKey": "following",
      "params": [
        {
          "name": "username",
          "label": "Username",
          "type": "string",
          "required": false,
          "description": "Instagram username, with or without leading @ (max 100 characters). Provide either username or url."
        },
        {
          "name": "url",
          "label": "URL",
          "type": "string",
          "required": false,
          "description": "Instagram profile URL, e.g. https://instagram.com/natgeo (max 500 characters). Provide either username or url."
        },
        {
          "name": "pages",
          "label": "Pages",
          "type": "integer",
          "required": false,
          "description": "Number of pages to fetch, 1-40 (default: 1). Each page returns up to 50 accounts.",
          "default": 1,
          "min": 1,
          "max": 40
        },
        {
          "name": "query",
          "label": "Query",
          "type": "string",
          "required": false,
          "description": "Search the following list by username or name (max 100 characters). Returns up to 50 matches in a single request; pages is ignored."
        }
      ],
      "fields": [
        "username",
        "full_name",
        "user_id",
        "is_verified",
        "is_private",
        "profile_pic_url",
        "url"
      ],
      "saveable": true,
      "docs": "https://apidirect.io/docs/instagram-user-following"
    },
    {
      "key": "instagram/user/stories",
      "path": "/v1/instagram/user/stories",
      "method": "GET",
      "platform": "instagram",
      "label": "User Stories",
      "summary": "Instagram User Stories",
      "description": "Get a user's currently active stories by username or profile URL.",
      "price": "$0.006 per request",
      "freeTier": "50 requests/month",
      "suspended": false,
      "kind": "list",
      "listKey": "stories",
      "params": [
        {
          "name": "username",
          "label": "Username",
          "type": "string",
          "required": false,
          "description": "Instagram username, with or without leading @ (max 100 characters). Provide either username or url."
        },
        {
          "name": "url",
          "label": "URL",
          "type": "string",
          "required": false,
          "description": "Instagram profile URL, e.g. https://instagram.com/natgeo (max 500 characters). Provide either username or url."
        }
      ],
      "fields": [
        "title",
        "url",
        "date",
        "date_timestamp",
        "expires_at",
        "expires_at_timestamp",
        "author",
        "author_id",
        "author_name",
        "author_verified",
        "source",
        "domain",
        "snippet",
        "is_video",
        "media_type",
        "media_id",
        "thumbnail_url",
        "video_url",
        "video_duration",
        "width",
        "height",
        "location",
        "tagged_users",
        "mentions",
        "links",
        "audio",
        "coauthors",
        "is_paid_partnership",
        "ai_label.label",
        "ai_label.detection_method"
      ],
      "saveable": true,
      "docs": "https://apidirect.io/docs/instagram-user-stories"
    },
    {
      "key": "instagram/user/highlights",
      "path": "/v1/instagram/user/highlights",
      "method": "GET",
      "platform": "instagram",
      "label": "User Highlights",
      "summary": "Instagram User Highlights",
      "description": "Get a user's story highlights by username or profile URL.",
      "price": "$0.006 per request",
      "freeTier": "50 requests/month",
      "suspended": false,
      "kind": "list",
      "listKey": "highlights",
      "params": [
        {
          "name": "username",
          "label": "Username",
          "type": "string",
          "required": false,
          "description": "Instagram username, with or without leading @ (max 100 characters). Provide either username or url."
        },
        {
          "name": "url",
          "label": "URL",
          "type": "string",
          "required": false,
          "description": "Instagram profile URL, e.g. https://instagram.com/natgeo (max 500 characters). Provide either username or url."
        }
      ],
      "fields": [
        "highlight_id",
        "title",
        "media_count",
        "cover_url",
        "created_at",
        "created_at_timestamp",
        "updated_at",
        "updated_at_timestamp",
        "is_pinned",
        "url",
        "author",
        "author_id"
      ],
      "saveable": true,
      "docs": "https://apidirect.io/docs/instagram-user-highlights"
    },
    {
      "key": "instagram/highlight/stories",
      "path": "/v1/instagram/highlight/stories",
      "method": "GET",
      "platform": "instagram",
      "label": "Highlight Stories",
      "summary": "Instagram Highlight Stories",
      "description": "Get the stories saved in a single Instagram highlight by highlight ID (from the User Highlights endpoint) or highlight URL.",
      "price": "$0.006 per request",
      "freeTier": "50 requests/month",
      "suspended": false,
      "kind": "list",
      "listKey": "stories",
      "params": [
        {
          "name": "highlight_id",
          "label": "Highlight ID",
          "type": "string",
          "required": true,
          "description": "Highlight ID from the User Highlights endpoint, e.g. 17987606483520330, or a highlight URL like https://www.instagram.com/stories/highlights/17987606483520330/ (max 500 characters)"
        }
      ],
      "fields": [
        "title",
        "url",
        "date",
        "date_timestamp",
        "expires_at",
        "expires_at_timestamp",
        "author",
        "author_id",
        "author_name",
        "author_verified",
        "source",
        "domain",
        "snippet",
        "is_video",
        "media_type",
        "media_id",
        "thumbnail_url",
        "video_url",
        "video_duration",
        "width",
        "height",
        "location",
        "tagged_users",
        "mentions",
        "links",
        "audio",
        "coauthors",
        "is_paid_partnership",
        "ai_label.label",
        "ai_label.detection_method"
      ],
      "saveable": true,
      "docs": "https://apidirect.io/docs/instagram-highlight-stories"
    },
    {
      "key": "instagram/post/comments",
      "path": "/v1/instagram/post/comments",
      "method": "GET",
      "platform": "instagram",
      "label": "Post Comments",
      "summary": "Instagram Post Comments",
      "description": "Get the comments on an Instagram post or reel by URL or shortcode.",
      "price": "$0.006 per page",
      "freeTier": "50 requests/month",
      "suspended": false,
      "kind": "list",
      "listKey": "comments",
      "params": [
        {
          "name": "url",
          "label": "URL",
          "type": "string",
          "required": false,
          "description": "Instagram post or reel URL, e.g. https://www.instagram.com/p/CxYQJO8xuC6/ (max 500 characters). Provide either url or code."
        },
        {
          "name": "code",
          "label": "Code",
          "type": "string",
          "required": false,
          "description": "The post's shortcode, e.g. CxYQJO8xuC6, or numeric media ID (max 50 characters). Provide either url or code."
        },
        {
          "name": "pages",
          "label": "Pages",
          "type": "integer",
          "required": false,
          "description": "Number of pages to fetch, 1-20 (default: 1). Each page returns up to 15 comments.",
          "default": 1,
          "min": 1,
          "max": 20
        },
        {
          "name": "sort_by",
          "label": "Sort By",
          "type": "string",
          "required": false,
          "description": "Sort order: popular or recent (default: popular)",
          "enum": [
            "popular",
            "recent"
          ],
          "default": "popular"
        },
        {
          "name": "get_sentiment",
          "label": "Get Sentiment",
          "type": "boolean",
          "required": false,
          "description": "Set to true to add AI emotion analysis (Plutchik's Wheel) to each result. Adds +$0.001 per page to the cost. Returns emotion scores, dominant emotion, intensity, and polarity.",
          "default": false
        }
      ],
      "fields": [
        "comment_id",
        "text",
        "author",
        "author_name",
        "author_id",
        "author_verified",
        "author_is_ai_generated_profile",
        "author_url",
        "author_profile_pic_url",
        "likes",
        "reply_count",
        "is_pinned",
        "hashtags",
        "mentions",
        "date",
        "date_timestamp",
        "url",
        "source",
        "domain",
        "gif_url"
      ],
      "saveable": true,
      "docs": "https://apidirect.io/docs/instagram-post-comments"
    },
    {
      "key": "instagram/comment/replies",
      "path": "/v1/instagram/comment/replies",
      "method": "GET",
      "platform": "instagram",
      "label": "Comment Replies",
      "summary": "Instagram Comment Replies",
      "description": "Get the replies to a single Instagram comment by post URL or shortcode plus the comment ID from the Post Comments endpoint.",
      "price": "$0.006 per page",
      "freeTier": "50 requests/month",
      "suspended": false,
      "kind": "list",
      "listKey": "replies",
      "params": [
        {
          "name": "url",
          "label": "URL",
          "type": "string",
          "required": false,
          "description": "Instagram post or reel URL, e.g. https://www.instagram.com/p/CxYQJO8xuC6/ (max 500 characters). Provide either url or code."
        },
        {
          "name": "code",
          "label": "Code",
          "type": "string",
          "required": false,
          "description": "The post's shortcode, e.g. CxYQJO8xuC6, or numeric media ID (max 50 characters). Provide either url or code."
        },
        {
          "name": "comment_id",
          "label": "Comment ID",
          "type": "string",
          "required": true,
          "description": "The comment's numeric ID, from the Post Comments endpoint (max 50 characters)"
        },
        {
          "name": "pages",
          "label": "Pages",
          "type": "integer",
          "required": false,
          "description": "Number of pages to fetch, 1-10 (default: 1)",
          "default": 1,
          "min": 1,
          "max": 10
        },
        {
          "name": "get_sentiment",
          "label": "Get Sentiment",
          "type": "boolean",
          "required": false,
          "description": "Set to true to add AI emotion analysis (Plutchik's Wheel) to each result. Adds +$0.001 per page to the cost. Returns emotion scores, dominant emotion, intensity, and polarity.",
          "default": false
        }
      ],
      "fields": [
        "comment_id",
        "text",
        "author",
        "author_name",
        "author_id",
        "author_verified",
        "author_is_ai_generated_profile",
        "author_url",
        "author_profile_pic_url",
        "likes",
        "reply_count",
        "is_pinned",
        "hashtags",
        "mentions",
        "date",
        "date_timestamp",
        "url",
        "source",
        "domain",
        "gif_url",
        "parent_comment_id",
        "replied_to_comment_id"
      ],
      "saveable": true,
      "docs": "https://apidirect.io/docs/instagram-comment-replies"
    },
    {
      "key": "instagram/post/likes",
      "path": "/v1/instagram/post/likes",
      "method": "GET",
      "platform": "instagram",
      "label": "Post Likes",
      "summary": "Instagram Post Likes",
      "description": "Get the users who liked an Instagram post or reel by URL or shortcode.",
      "price": "$0.006 per request",
      "freeTier": "50 requests/month",
      "suspended": false,
      "kind": "list",
      "listKey": "likes",
      "params": [
        {
          "name": "url",
          "label": "URL",
          "type": "string",
          "required": false,
          "description": "Instagram post or reel URL, e.g. https://www.instagram.com/p/CxYQJO8xuC6/ (max 500 characters). Provide either url or code."
        },
        {
          "name": "code",
          "label": "Code",
          "type": "string",
          "required": false,
          "description": "The post's shortcode, e.g. CxYQJO8xuC6, or numeric media ID (max 50 characters). Provide either url or code."
        }
      ],
      "fields": [
        "username",
        "full_name",
        "user_id",
        "is_verified",
        "is_private",
        "profile_pic_url",
        "url"
      ],
      "saveable": true,
      "docs": "https://apidirect.io/docs/instagram-post-likes"
    },
    {
      "key": "instagram/hashtag/posts",
      "path": "/v1/instagram/hashtag/posts",
      "method": "GET",
      "platform": "instagram",
      "label": "Hashtag Posts",
      "summary": "Instagram Hashtag Posts",
      "description": "Get posts and reels for any Instagram hashtag.",
      "price": "$0.006 per page",
      "freeTier": "50 requests/month",
      "suspended": false,
      "kind": "list",
      "listKey": "posts",
      "params": [
        {
          "name": "hashtag",
          "label": "Hashtag",
          "type": "string",
          "required": true,
          "description": "Hashtag, with or without the leading # (max 100 characters)"
        },
        {
          "name": "pages",
          "label": "Pages",
          "type": "integer",
          "required": false,
          "description": "Number of pages to fetch, 1-10 (default: 1). Each page adds up to about 30 posts; repeats across pages are removed.",
          "default": 1,
          "min": 1,
          "max": 10
        },
        {
          "name": "sort_by",
          "label": "Sort By",
          "type": "string",
          "required": false,
          "description": "Hashtag tab: top, recent, or reels (default: top)",
          "enum": [
            "top",
            "recent",
            "reels"
          ],
          "default": "top"
        },
        {
          "name": "get_sentiment",
          "label": "Get Sentiment",
          "type": "boolean",
          "required": false,
          "description": "Set to true to add AI emotion analysis (Plutchik's Wheel) to each result. Adds +$0.001 per page to the cost. Returns emotion scores, dominant emotion, intensity, and polarity.",
          "default": false
        }
      ],
      "fields": [
        "title",
        "url",
        "date",
        "author",
        "source",
        "domain",
        "snippet",
        "likes",
        "comments",
        "shares",
        "reposts",
        "views",
        "is_video",
        "media_type",
        "author_verified",
        "author_name",
        "hashtags",
        "mentions",
        "media_id",
        "thumbnail_url",
        "video_url",
        "video_duration",
        "width",
        "height",
        "carousel_media_count",
        "is_paid_partnership",
        "ai_label.label",
        "ai_label.detection_method",
        "location",
        "tagged_users",
        "coauthors",
        "carousel_media",
        "audio.type",
        "audio.title",
        "audio.artist",
        "audio.audio_id",
        "audio.duration_ms"
      ],
      "saveable": true,
      "docs": "https://apidirect.io/docs/instagram-hashtag-posts"
    },
    {
      "key": "linkedin/posts",
      "path": "/v1/linkedin/posts",
      "method": "GET",
      "platform": "linkedin",
      "label": "Search Posts",
      "summary": "Search LinkedIn Posts",
      "description": "Search for LinkedIn posts by keyword.",
      "price": "$0.006 per request",
      "freeTier": "50 requests/month",
      "suspended": false,
      "kind": "list",
      "listKey": "posts",
      "params": [
        {
          "name": "query",
          "label": "Query",
          "type": "string",
          "required": false,
          "description": "Search query (max 500 characters). Required unless at least one filter (e.g. author) is provided."
        },
        {
          "name": "page",
          "label": "Page",
          "type": "integer",
          "required": false,
          "description": "Page number, 1-25 (default: 1). 20 posts per page. LinkedIn's search pool is at most ~500 posts per query, so pages past the pool return an empty list. Values below 1 are treated as 1; a page above 25 returns 400.",
          "default": 1,
          "min": 1,
          "max": 25
        },
        {
          "name": "sort_by",
          "label": "Sort By",
          "type": "string",
          "required": false,
          "description": "Sort order for results",
          "enum": [
            "most_recent",
            "relevance"
          ],
          "default": "most_recent"
        },
        {
          "name": "posted_ago",
          "label": "Posted Ago",
          "type": "string",
          "required": false,
          "description": "Only return posts from this period: 24h (past day), 7d (past week), or 30d (past month). Works with both sort orders and every filter. Omit for all time. Any other value returns 400.",
          "enum": [
            "24h",
            "7d",
            "30d"
          ]
        },
        {
          "name": "author",
          "label": "Author",
          "type": "string",
          "required": false,
          "description": "Filter to posts authored by a specific person. Accepts a profile URL, public slug (e.g. williamhgates), or member URN, resolved automatically. Comma-separate for multiple (max 5 values)."
        },
        {
          "name": "mentions_member",
          "label": "Mentions Member",
          "type": "string",
          "required": false,
          "description": "Filter to posts that mention a specific person (profile URL, slug, or member URN). Comma-separate for multiple (max 5 values)."
        },
        {
          "name": "from_company",
          "label": "From Company",
          "type": "string",
          "required": false,
          "description": "Filter to posts authored by a company page. Numeric LinkedIn company ID (from the Company Details endpoint). Comma-separate for multiple. Non-numeric values return 400."
        },
        {
          "name": "author_company",
          "label": "Author Company",
          "type": "string",
          "required": false,
          "description": "Filter to posts written by people who work at a company. Numeric company ID, comma-separate for multiple. Non-numeric values return 400."
        },
        {
          "name": "mentions_company",
          "label": "Mentions Company",
          "type": "string",
          "required": false,
          "description": "Filter to posts that mention a company. Numeric company ID, comma-separate for multiple. Non-numeric values return 400."
        },
        {
          "name": "author_title",
          "label": "Author Title",
          "type": "string",
          "required": false,
          "description": "Filter by the author's job title as free text (e.g. CEO). Requires a query parameter."
        },
        {
          "name": "author_industry",
          "label": "Author Industry",
          "type": "string",
          "required": false,
          "description": "Filter by the author's industry. Numeric LinkedIn industry ID(s), comma-separated. Requires a query parameter. Non-numeric values return 400. Advanced."
        },
        {
          "name": "get_sentiment",
          "label": "Get Sentiment",
          "type": "boolean",
          "required": false,
          "description": "Set to true to add AI emotion analysis to each post. Adds a `sentiment` object containing `emotions` (joy, trust, fear, surprise, sadness, disgust, anger and anticipation, each scored 0-100), `dominant_emotion`, `emotional_intensity` (0-10), and `polarity` (positive, negative or neutral). Any post that cannot be scored returns `sentiment: null`.",
          "default": false
        }
      ],
      "fields": [
        "article.description",
        "article.subtitle",
        "article.title",
        "article.url",
        "author",
        "comments",
        "date",
        "domain",
        "has_content_entities",
        "images",
        "job",
        "likes",
        "reactions.interest",
        "reactions.like",
        "reactions.appreciation",
        "reactions.entertainment",
        "reactions.praise",
        "shares",
        "snippet",
        "source",
        "title",
        "url",
        "urn",
        "video.duration",
        "video.thumbnail"
      ],
      "saveable": true,
      "docs": "https://apidirect.io/docs/linkedin-posts"
    },
    {
      "key": "linkedin/person",
      "path": "/v1/linkedin/person",
      "method": "GET",
      "platform": "linkedin",
      "label": "Person Profile",
      "summary": "LinkedIn Person Profile",
      "description": "Get a LinkedIn person's profile: name, headline, about, location, follower and connection counts, open-to-work status, and the experience, education, skills, certifications, languages, honors, publications, volunteering, and projects sections.",
      "price": "$0.006 per request",
      "freeTier": "50 requests/month",
      "suspended": false,
      "kind": "detail",
      "listKey": null,
      "params": [
        {
          "name": "url",
          "label": "URL",
          "type": "string",
          "required": true,
          "description": "LinkedIn profile URL, public slug, or member URN (e.g., https://www.linkedin.com/in/reidhoffman, reidhoffman, or ACoAAAAABL0B3SGhqeNX998wiOuk_8hYA6ojLwg). Max 500 characters."
        }
      ],
      "fields": [
        "about",
        "certifications",
        "connections",
        "country_code",
        "cover_image",
        "domain",
        "education",
        "experience",
        "first_name",
        "followers",
        "full_name",
        "headline",
        "honors",
        "is_creator",
        "is_premium",
        "languages",
        "last_name",
        "location",
        "open_to_work",
        "profile_picture",
        "projects",
        "public_identifier",
        "publications",
        "skills",
        "source",
        "url",
        "urn",
        "volunteering"
      ],
      "saveable": false,
      "docs": "https://apidirect.io/docs/linkedin-person"
    },
    {
      "key": "linkedin/person/posts",
      "path": "/v1/linkedin/person/posts",
      "method": "GET",
      "platform": "linkedin",
      "label": "Person Posts",
      "summary": "LinkedIn Person Posts",
      "description": "Get the recent posts authored by a LinkedIn person by profile URL or public slug.",
      "price": "$0.006 per request",
      "freeTier": "50 requests/month",
      "suspended": false,
      "kind": "list",
      "listKey": "posts",
      "params": [
        {
          "name": "url",
          "label": "URL",
          "type": "string",
          "required": true,
          "description": "LinkedIn profile URL or public slug, e.g. https://www.linkedin.com/in/williamhgates or williamhgates (max 500 characters)"
        },
        {
          "name": "page",
          "label": "Page",
          "type": "integer",
          "required": false,
          "description": "Page number, 1-30 (default: 1). 20 posts per page, so up to about 600 of the person's most recent posts. Values below 1 are treated as 1; a page above 30 returns 400.",
          "default": 1,
          "min": 1,
          "max": 30
        },
        {
          "name": "get_sentiment",
          "label": "Get Sentiment",
          "type": "boolean",
          "required": false,
          "description": "Set to true to add AI emotion analysis to each post. Adds a `sentiment` object containing `emotions` (joy, trust, fear, surprise, sadness, disgust, anger and anticipation, each scored 0-100), `dominant_emotion`, `emotional_intensity` (0-10), and `polarity` (positive, negative or neutral). Any post that cannot be scored returns `sentiment: null`.",
          "default": false
        }
      ],
      "fields": [
        "article",
        "author",
        "author_description",
        "author_image",
        "author_url",
        "comments",
        "date",
        "domain",
        "images",
        "is_repost",
        "likes",
        "reactions.appreciation",
        "reactions.empathy",
        "reactions.like",
        "shares",
        "source",
        "text",
        "url",
        "urn",
        "video.duration",
        "video.thumbnail"
      ],
      "saveable": true,
      "docs": "https://apidirect.io/docs/linkedin-person-posts"
    },
    {
      "key": "linkedin/post",
      "path": "/v1/linkedin/post",
      "method": "GET",
      "platform": "linkedin",
      "label": "Post Details",
      "summary": "LinkedIn Post Details",
      "description": "Get detailed information about a specific LinkedIn post including full content, likes, comments, shares, reactions, embedded links, images, and author details.",
      "price": "$0.002 per request",
      "freeTier": "50 requests/month",
      "suspended": false,
      "kind": "detail",
      "listKey": null,
      "params": [
        {
          "name": "url",
          "label": "URL",
          "type": "string",
          "required": true,
          "description": "Full URL of the LinkedIn post (max 500 characters)"
        },
        {
          "name": "get_sentiment",
          "label": "Get Sentiment",
          "type": "boolean",
          "required": false,
          "description": "Set to true to add AI emotion analysis to the post. Adds a `sentiment` object containing `emotions` (joy, trust, fear, surprise, sadness, disgust, anger and anticipation, each scored 0-100), `dominant_emotion`, `emotional_intensity` (0-10), and `polarity` (positive, negative or neutral). If the post cannot be scored, `sentiment` is null.",
          "default": false
        }
      ],
      "fields": [
        "author",
        "author_description",
        "author_image",
        "author_url",
        "comments",
        "date",
        "domain",
        "images",
        "is_repost",
        "likes",
        "links",
        "reactions.interest",
        "reactions.like",
        "shares",
        "source",
        "text",
        "url",
        "urn"
      ],
      "saveable": false,
      "docs": "https://apidirect.io/docs/linkedin-post"
    },
    {
      "key": "linkedin/companies",
      "path": "/v1/linkedin/companies",
      "method": "GET",
      "platform": "linkedin",
      "label": "Search Companies",
      "summary": "Search LinkedIn Companies",
      "description": "Search for LinkedIn company pages by keyword.",
      "price": "$0.006 per request",
      "freeTier": "50 requests/month",
      "suspended": false,
      "kind": "list",
      "listKey": "companies",
      "params": [
        {
          "name": "query",
          "label": "Query",
          "type": "string",
          "required": true,
          "description": "Search query (max 500 characters)"
        },
        {
          "name": "page",
          "label": "Page",
          "type": "integer",
          "required": false,
          "description": "Page number for pagination (1-100). Each page returns 10 results. Values below 1 are treated as 1; a page above 100 returns 400.",
          "default": 1,
          "min": 1,
          "max": 100
        }
      ],
      "fields": [
        "company_id",
        "description",
        "followers",
        "logo",
        "name",
        "subtitle",
        "url"
      ],
      "saveable": true,
      "docs": "https://apidirect.io/docs/linkedin-companies"
    },
    {
      "key": "linkedin/company",
      "path": "/v1/linkedin/company",
      "method": "GET",
      "platform": "linkedin",
      "label": "Company Details",
      "summary": "LinkedIn Company Details",
      "description": "Get detailed information about a LinkedIn company page including description, follower count, industry, headquarters, employee count, founded year, specialities, locations, similar companies, and showcase pages.",
      "price": "$0.006 per request",
      "freeTier": "50 requests/month",
      "suspended": false,
      "kind": "detail",
      "listKey": null,
      "params": [
        {
          "name": "url",
          "label": "URL",
          "type": "string",
          "required": true,
          "description": "Full URL of the LinkedIn company page (e.g., https://www.linkedin.com/company/google). Max 500 characters."
        }
      ],
      "fields": [
        "call_to_action.text",
        "call_to_action.url",
        "company_id",
        "cover_image",
        "description",
        "domain",
        "employee_range",
        "employees",
        "followers",
        "founded_year",
        "hashtag",
        "headquarters.address",
        "headquarters.city",
        "headquarters.country",
        "headquarters.postal_code",
        "headquarters.region",
        "industry",
        "locations",
        "logo",
        "name",
        "showcases",
        "similar_companies",
        "source",
        "specialities",
        "tagline",
        "universal_name",
        "url",
        "website"
      ],
      "saveable": false,
      "docs": "https://apidirect.io/docs/linkedin-company"
    },
    {
      "key": "linkedin/company/posts",
      "path": "/v1/linkedin/company/posts",
      "method": "GET",
      "platform": "linkedin",
      "label": "Company Posts",
      "summary": "LinkedIn Company Posts",
      "description": "Retrieve recent posts published by a specific LinkedIn company page.",
      "price": "$0.006 per request",
      "freeTier": "50 requests/month",
      "suspended": false,
      "kind": "list",
      "listKey": "posts",
      "params": [
        {
          "name": "url",
          "label": "URL",
          "type": "string",
          "required": true,
          "description": "Full URL of the LinkedIn company page (max 500 characters)"
        },
        {
          "name": "page",
          "label": "Page",
          "type": "integer",
          "required": false,
          "description": "Page number, 1-50 (default: 1). 10 posts per page; LinkedIn serves a company page's newest 500 posts. Values below 1 are treated as 1; a page above 50 returns 400.",
          "default": 1,
          "min": 1,
          "max": 50
        },
        {
          "name": "get_sentiment",
          "label": "Get Sentiment",
          "type": "boolean",
          "required": false,
          "description": "Set to true to add AI emotion analysis to each post. Adds a `sentiment` object containing `emotions` (joy, trust, fear, surprise, sadness, disgust, anger and anticipation, each scored 0-100), `dominant_emotion`, `emotional_intensity` (0-10), and `polarity` (positive, negative or neutral). Any post that cannot be scored returns `sentiment: null`.",
          "default": false
        }
      ],
      "fields": [
        "author",
        "author_description",
        "author_image",
        "author_url",
        "comments",
        "date",
        "domain",
        "images",
        "is_repost",
        "likes",
        "links",
        "reactions.appreciation",
        "reactions.empathy",
        "reactions.entertainment",
        "reactions.interest",
        "reactions.like",
        "reactions.praise",
        "shares",
        "source",
        "text",
        "url",
        "urn",
        "video.duration",
        "video.thumbnail"
      ],
      "saveable": true,
      "docs": "https://apidirect.io/docs/linkedin-company-posts"
    },
    {
      "key": "linkedin/jobs",
      "path": "/v1/linkedin/jobs",
      "method": "GET",
      "platform": "linkedin",
      "label": "Search Jobs",
      "summary": "Search LinkedIn Jobs",
      "description": "Search for LinkedIn job listings by keyword.",
      "price": "$0.006 per request",
      "freeTier": "50 requests/month",
      "suspended": false,
      "kind": "list",
      "listKey": "jobs",
      "params": [
        {
          "name": "query",
          "label": "Query",
          "type": "string",
          "required": true,
          "description": "Search query (max 500 characters)"
        },
        {
          "name": "page",
          "label": "Page",
          "type": "integer",
          "required": false,
          "description": "Page number for pagination (1-40). 25 jobs per page; LinkedIn shows only the first 40 pages of results. Values below 1 are treated as 1; a page above 40 returns 400.",
          "default": 1,
          "min": 1,
          "max": 40
        },
        {
          "name": "sort_by",
          "label": "Sort By",
          "type": "string",
          "required": false,
          "description": "Sort order for results",
          "enum": [
            "most_recent",
            "relevance"
          ],
          "default": "relevance"
        },
        {
          "name": "posted_ago",
          "label": "Posted Ago",
          "type": "string",
          "required": false,
          "description": "Filter by maximum job age. Defaults to all time when omitted.",
          "enum": [
            "1h",
            "24h",
            "7d",
            "30d"
          ]
        },
        {
          "name": "job_type",
          "label": "Job Type",
          "type": "string",
          "required": false,
          "description": "Filter by employment type. Comma-separate multiple values (e.g., `full_time,contract`). Allowed values: full_time, part_time, contract, temporary, volunteer, internship, other. Any other value returns 400."
        },
        {
          "name": "company_ids",
          "label": "Company IDs",
          "type": "string",
          "required": false,
          "description": "Filter by company. Comma-separated LinkedIn company IDs (get IDs from the Search Companies endpoint)."
        },
        {
          "name": "location_id",
          "label": "Location ID",
          "type": "string",
          "required": false,
          "description": "Filter by location. A numeric LinkedIn location ID. Non-numeric values return 400."
        }
      ],
      "fields": [
        "title",
        "url",
        "company",
        "company_id",
        "company_url",
        "company_logo",
        "location",
        "date",
        "job_type",
        "experience_level",
        "workplace_type",
        "industry",
        "job_functions",
        "description",
        "salary",
        "benefits",
        "apply_url",
        "applicants"
      ],
      "saveable": true,
      "docs": "https://apidirect.io/docs/linkedin-jobs"
    },
    {
      "key": "linkedin/job",
      "path": "/v1/linkedin/job",
      "method": "GET",
      "platform": "linkedin",
      "label": "Job Details",
      "summary": "LinkedIn Job Details",
      "description": "Get detailed information about a specific LinkedIn job listing by URL or numeric job ID.",
      "price": "$0.002 per request",
      "freeTier": "50 requests/month",
      "suspended": false,
      "kind": "detail",
      "listKey": null,
      "params": [
        {
          "name": "url",
          "label": "URL",
          "type": "string",
          "required": true,
          "description": "LinkedIn job URL (e.g., `https://linkedin.com/jobs/view/1234567890`) or numeric job ID. Max 500 characters."
        }
      ],
      "fields": [
        "title",
        "url",
        "company",
        "company_id",
        "company_url",
        "company_logo",
        "location",
        "date",
        "job_type",
        "experience_level",
        "workplace_type",
        "industry",
        "job_functions",
        "description",
        "salary",
        "benefits",
        "apply_url",
        "applicants"
      ],
      "saveable": false,
      "docs": "https://apidirect.io/docs/linkedin-job"
    },
    {
      "key": "news/articles",
      "path": "/v1/news/articles",
      "method": "GET",
      "platform": "google",
      "label": "News Articles",
      "summary": "Search News Articles",
      "description": "Search for news articles from worldwide sources by keyword.",
      "price": "$0.008 per request",
      "freeTier": "50 requests/month",
      "suspended": false,
      "kind": "list",
      "listKey": "articles",
      "params": [
        {
          "name": "query",
          "label": "Query",
          "type": "string",
          "required": true,
          "description": "Search query (max 500 characters, cannot be blank)"
        },
        {
          "name": "limit",
          "label": "Limit",
          "type": "integer",
          "required": false,
          "description": "Maximum number of results to return (1-100). Fewer may come back; the response count field reports how many articles were returned.",
          "default": 10,
          "min": 1,
          "max": 100
        },
        {
          "name": "time_published",
          "label": "Time Published",
          "type": "string",
          "required": false,
          "description": "Filter by publication time: anytime, 1h, 1d, 7d, or 1y",
          "enum": [
            "anytime",
            "1h",
            "1d",
            "7d",
            "1y"
          ],
          "default": "anytime"
        },
        {
          "name": "source",
          "label": "Source",
          "type": "string",
          "required": false,
          "description": "Filter by news source domain (e.g., bbc.com, reuters.com, cnn.com)"
        },
        {
          "name": "country",
          "label": "Country",
          "type": "string",
          "required": false,
          "description": "2-letter ISO 3166-1 alpha-2 country code (e.g., us, gb, de, jp). Must be exactly 2 letters.",
          "default": "us"
        },
        {
          "name": "language",
          "label": "Language",
          "type": "string",
          "required": false,
          "description": "2-letter ISO 639-1 language code (e.g., en, es, fr, de, ja). Must be exactly 2 letters.",
          "default": "en"
        }
      ],
      "fields": [
        "authors",
        "domain",
        "photo_url",
        "published_datetime_utc",
        "snippet",
        "source_favicon_url",
        "source_name",
        "source_url",
        "thumbnail_url",
        "title",
        "url"
      ],
      "saveable": true,
      "docs": "https://apidirect.io/docs/news-articles"
    },
    {
      "key": "reddit/posts",
      "path": "/v1/reddit/posts",
      "method": "GET",
      "platform": "reddit",
      "label": "Search Posts",
      "summary": "Search Reddit Posts",
      "description": "Search for Reddit posts by keyword across all subreddits.",
      "price": "$0.003 per request",
      "freeTier": "50 requests/month",
      "suspended": false,
      "kind": "list",
      "listKey": "posts",
      "params": [
        {
          "name": "query",
          "label": "Query",
          "type": "string",
          "required": true,
          "description": "Search query (max 500 characters). Reddit search operators are supported, including AND, OR, NOT, exclusion with -, grouping with ( ), and fields such as subreddit: and author:."
        },
        {
          "name": "page",
          "label": "Page",
          "type": "integer",
          "required": false,
          "description": "Page number for pagination (1-12). Each page returns up to 20 posts.",
          "default": 1,
          "min": 1,
          "max": 12
        },
        {
          "name": "sort_by",
          "label": "Sort By",
          "type": "string",
          "required": false,
          "description": "Sort order for results",
          "enum": [
            "most_recent",
            "relevance",
            "hot",
            "top"
          ],
          "default": "most_recent"
        },
        {
          "name": "posted_ago",
          "label": "Posted Ago",
          "type": "string",
          "required": false,
          "description": "Only return posts from this period: 1h (past hour), 24h (past day), 7d (past week), 30d (past month), or 12m (past year). Works with every sort_by, e.g. sort_by=relevance with posted_ago=24h returns the most relevant posts of the past day. Omit for all time. Any other value returns 400.",
          "enum": [
            "1h",
            "24h",
            "7d",
            "30d",
            "12m"
          ]
        },
        {
          "name": "get_sentiment",
          "label": "Get Sentiment",
          "type": "boolean",
          "required": false,
          "description": "Set to true to add AI emotion analysis to each post. Adds a `sentiment` object containing `emotions` (joy, trust, fear, surprise, sadness, disgust, anger and anticipation, each scored 0-100), `dominant_emotion`, `emotional_intensity` (0-10), and `polarity` (positive, negative or neutral). Any post that cannot be scored returns `sentiment: null`.",
          "default": false
        }
      ],
      "fields": [
        "author",
        "date",
        "domain",
        "snippet",
        "source",
        "subreddit",
        "title",
        "upvotes",
        "upvote_ratio",
        "comments",
        "crossposts",
        "url"
      ],
      "saveable": true,
      "docs": "https://apidirect.io/docs/reddit-posts"
    },
    {
      "key": "reddit/comments",
      "path": "/v1/reddit/comments",
      "method": "GET",
      "platform": "reddit",
      "label": "Search Comments",
      "summary": "Search Reddit Comments",
      "description": "Search for Reddit comments by keyword across all subreddits.",
      "price": "$0.003 per page",
      "freeTier": "50 requests/month",
      "suspended": false,
      "kind": "list",
      "listKey": "posts",
      "params": [
        {
          "name": "query",
          "label": "Query",
          "type": "string",
          "required": true,
          "description": "Search query (max 500 characters)"
        },
        {
          "name": "pages",
          "label": "Pages",
          "type": "integer",
          "required": false,
          "description": "Number of pages to fetch and merge (1-10). Billed per page.",
          "default": 1,
          "min": 1,
          "max": 10
        },
        {
          "name": "sort_by",
          "label": "Sort By",
          "type": "string",
          "required": false,
          "description": "Sort order for results",
          "enum": [
            "most_recent",
            "relevance",
            "top"
          ],
          "default": "most_recent"
        },
        {
          "name": "get_sentiment",
          "label": "Get Sentiment",
          "type": "boolean",
          "required": false,
          "description": "Set to true to add AI emotion analysis to each comment (returned in the `posts` array). Adds a `sentiment` object containing `emotions` (joy, trust, fear, surprise, sadness, disgust, anger and anticipation, each scored 0-100), `dominant_emotion`, `emotional_intensity` (0-10), and `polarity` (positive, negative or neutral). Any comment that cannot be scored returns `sentiment: null`.",
          "default": false
        }
      ],
      "fields": [
        "author",
        "date",
        "domain",
        "snippet",
        "source",
        "subreddit",
        "title",
        "type",
        "upvotes",
        "post_upvotes",
        "post_comments",
        "url"
      ],
      "saveable": true,
      "docs": "https://apidirect.io/docs/reddit-comments"
    },
    {
      "key": "reddit/users",
      "path": "/v1/reddit/users",
      "method": "GET",
      "platform": "reddit",
      "label": "Search Users",
      "summary": "Search Reddit Users",
      "description": "Search for Reddit users by keyword.",
      "price": "$0.003 per request",
      "freeTier": "50 requests/month",
      "suspended": false,
      "kind": "list",
      "listKey": "users",
      "params": [
        {
          "name": "query",
          "label": "Query",
          "type": "string",
          "required": true,
          "description": "Search query (max 500 characters)"
        }
      ],
      "fields": [
        "comment_karma",
        "created_at",
        "description",
        "has_verified_email",
        "icon_img",
        "is_gold",
        "is_mod",
        "link_karma",
        "total_karma",
        "url",
        "user_id",
        "username"
      ],
      "saveable": true,
      "docs": "https://apidirect.io/docs/reddit-users"
    },
    {
      "key": "threads/posts",
      "path": "/v1/threads/posts",
      "method": "GET",
      "platform": "threads",
      "label": "Search Posts",
      "summary": "Search Threads Posts",
      "description": "Search for Threads posts by keyword.",
      "price": "$0.006 per request",
      "freeTier": "50 requests/month",
      "suspended": false,
      "kind": "list",
      "listKey": "posts",
      "params": [
        {
          "name": "query",
          "label": "Query",
          "type": "string",
          "required": true,
          "description": "Search keyword (max 500 characters)"
        },
        {
          "name": "get_sentiment",
          "label": "Get Sentiment",
          "type": "boolean",
          "required": false,
          "description": "Set to true to add AI emotion analysis to each result (+$0.001/request)",
          "default": false
        }
      ],
      "fields": [
        "title",
        "url",
        "date",
        "author",
        "source",
        "domain",
        "snippet",
        "likes",
        "replies",
        "reposts",
        "quotes",
        "reshares",
        "author_name",
        "author_verified",
        "is_reply",
        "media_type",
        "image_url",
        "video_url",
        "hashtags",
        "mentions",
        "carousel_media",
        "link_preview",
        "quoted_post",
        "post_id",
        "code"
      ],
      "saveable": true,
      "docs": "https://apidirect.io/docs/threads-posts"
    },
    {
      "key": "threads/users",
      "path": "/v1/threads/users",
      "method": "GET",
      "platform": "threads",
      "label": "Search Users",
      "summary": "Search Threads Users",
      "description": "Search for Threads users by keyword.",
      "price": "$0.006 per request",
      "freeTier": "50 requests/month",
      "suspended": false,
      "kind": "list",
      "listKey": "users",
      "params": [
        {
          "name": "query",
          "label": "Query",
          "type": "string",
          "required": true,
          "description": "Search keyword (max 500 characters)"
        }
      ],
      "fields": [
        "username",
        "full_name",
        "user_id",
        "is_verified",
        "is_private",
        "profile_pic_url",
        "url"
      ],
      "saveable": true,
      "docs": "https://apidirect.io/docs/threads-users"
    },
    {
      "key": "threads/user",
      "path": "/v1/threads/user",
      "method": "GET",
      "platform": "threads",
      "label": "User Profile",
      "summary": "Threads User Profile",
      "description": "Look up a single Threads user by username.",
      "price": "$0.006 per request",
      "freeTier": "50 requests/month",
      "suspended": false,
      "kind": "detail",
      "listKey": "user",
      "params": [
        {
          "name": "username",
          "label": "Username",
          "type": "string",
          "required": true,
          "description": "Threads username, with or without leading @ (max 100 characters)"
        }
      ],
      "fields": [
        "username",
        "full_name",
        "user_id",
        "biography",
        "follower_count",
        "is_verified",
        "is_private",
        "profile_pic_url",
        "profile_pic_url_hd",
        "bio_links",
        "profile_tags",
        "url"
      ],
      "saveable": false,
      "docs": "https://apidirect.io/docs/threads-user"
    },
    {
      "key": "threads/user/posts",
      "path": "/v1/threads/user/posts",
      "method": "GET",
      "platform": "threads",
      "label": "User Posts",
      "summary": "Threads User Posts",
      "description": "Get a single Threads user's recent posts (their feed) by username.",
      "price": "$0.006 per request",
      "freeTier": "50 requests/month",
      "suspended": false,
      "kind": "list",
      "listKey": "posts",
      "params": [
        {
          "name": "username",
          "label": "Username",
          "type": "string",
          "required": true,
          "description": "Threads username, with or without leading @ (max 100 characters)"
        },
        {
          "name": "get_sentiment",
          "label": "Get Sentiment",
          "type": "boolean",
          "required": false,
          "description": "Set to true to add AI emotion analysis to each result (+$0.001/request)",
          "default": false
        }
      ],
      "fields": [
        "title",
        "url",
        "date",
        "author",
        "source",
        "domain",
        "snippet",
        "likes",
        "replies",
        "reposts",
        "quotes",
        "reshares",
        "author_name",
        "author_verified",
        "is_reply",
        "is_pinned",
        "media_type",
        "image_url",
        "video_url",
        "hashtags",
        "mentions",
        "carousel_media",
        "link_preview",
        "quoted_post",
        "post_id",
        "code"
      ],
      "saveable": true,
      "docs": "https://apidirect.io/docs/threads-user-posts"
    },
    {
      "key": "tiktok/videos",
      "path": "/v1/tiktok/videos",
      "method": "GET",
      "platform": "tiktok",
      "label": "Search Videos",
      "summary": "Search TikTok Videos",
      "description": "Search for TikTok videos by keyword.",
      "price": "$0.006 per page",
      "freeTier": "50 requests/month",
      "suspended": false,
      "kind": "list",
      "listKey": "videos",
      "params": [
        {
          "name": "query",
          "label": "Query",
          "type": "string",
          "required": true,
          "description": "Search query (max 500 characters)"
        },
        {
          "name": "pages",
          "label": "Pages",
          "type": "integer",
          "required": false,
          "description": "Number of pages to fetch and merge (1-10). Each page returns up to 30 videos. Billed per page.",
          "default": 1,
          "min": 1,
          "max": 10
        },
        {
          "name": "region",
          "label": "Region",
          "type": "string",
          "required": false,
          "description": "2-letter region code to filter by (e.g., us, gb, jp, de, fr)"
        },
        {
          "name": "publish_time",
          "label": "Publish Time",
          "type": "integer",
          "required": false,
          "description": "Filter by publish time in days: 0 = all time, 1 = last day, 7 = last week, 30 = last month, 90 = last 3 months, 180 = last 6 months. Any other number returns 400; a non-numeric value falls back to 0.",
          "enum": [
            0,
            1,
            7,
            30,
            90,
            180
          ],
          "default": 0
        },
        {
          "name": "sort_by",
          "label": "Sort By",
          "type": "string",
          "required": false,
          "description": "Sort order for results. Any unrecognised value falls back to relevance.",
          "enum": [
            "relevance",
            "most_recent",
            "most_liked"
          ],
          "default": "relevance"
        },
        {
          "name": "get_sentiment",
          "label": "Get Sentiment",
          "type": "boolean",
          "required": false,
          "description": "Set to true to add AI emotion analysis to each video. Adds a `sentiment` object containing `emotions` (joy, trust, fear, surprise, sadness, disgust, anger and anticipation, each scored 0-100), `dominant_emotion`, `emotional_intensity` (0-10), and `polarity` (positive, negative or neutral). Any video that cannot be scored returns `sentiment: null`.",
          "default": false
        }
      ],
      "fields": [
        "author",
        "author_avatar",
        "author_name",
        "comments",
        "cover",
        "date",
        "domain",
        "downloads",
        "duration",
        "is_ad",
        "likes",
        "music_author",
        "music_title",
        "play_count",
        "shares",
        "snippet",
        "source",
        "title",
        "url"
      ],
      "saveable": true,
      "docs": "https://apidirect.io/docs/tiktok-videos"
    },
    {
      "key": "tiktok/users",
      "path": "/v1/tiktok/users",
      "method": "GET",
      "platform": "tiktok",
      "label": "Search Users",
      "summary": "Search TikTok Users",
      "description": "Search for TikTok users by keyword.",
      "price": "$0.006 per page",
      "freeTier": "50 requests/month",
      "suspended": false,
      "kind": "list",
      "listKey": "users",
      "params": [
        {
          "name": "query",
          "label": "Query",
          "type": "string",
          "required": true,
          "description": "Search query (max 500 characters)"
        },
        {
          "name": "pages",
          "label": "Pages",
          "type": "integer",
          "required": false,
          "description": "Number of pages to fetch and merge (1-10). Each page returns up to 30 users. Billed per page.",
          "default": 1,
          "min": 1,
          "max": 10
        }
      ],
      "fields": [
        "avatar",
        "bio",
        "followers",
        "following",
        "is_private",
        "likes",
        "nickname",
        "url",
        "user_id",
        "username",
        "verified",
        "video_count"
      ],
      "saveable": true,
      "docs": "https://apidirect.io/docs/tiktok-users"
    },
    {
      "key": "tiktok/user",
      "path": "/v1/tiktok/user",
      "method": "GET",
      "platform": "tiktok",
      "label": "User Profile",
      "summary": "TikTok User Profile",
      "description": "Look up a single TikTok user by username, numeric user ID, or profile URL.",
      "price": "$0.006 per request",
      "freeTier": "50 requests/month",
      "suspended": false,
      "kind": "detail",
      "listKey": "user",
      "params": [
        {
          "name": "username",
          "label": "Username",
          "type": "string",
          "required": false,
          "description": "TikTok username, with or without leading @ (max 100 characters). Provide exactly one of username, user_id, or url."
        },
        {
          "name": "user_id",
          "label": "User ID",
          "type": "string",
          "required": false,
          "description": "Numeric TikTok user ID, as returned by Search Users. Digits only, max 20 characters, and not all zeros. Provide exactly one of username, user_id, or url."
        },
        {
          "name": "url",
          "label": "URL",
          "type": "string",
          "required": false,
          "description": "TikTok profile URL, e.g. https://www.tiktok.com/@tiktok (max 500 characters). Must include the tiktok.com/@username segment. Provide exactly one of username, user_id, or url."
        }
      ],
      "fields": [
        "username",
        "nickname",
        "user_id",
        "sec_uid",
        "bio",
        "bio_link",
        "verified",
        "is_private",
        "followers",
        "following",
        "likes",
        "video_count",
        "videos_liked",
        "avatar",
        "avatar_hd",
        "date_joined",
        "date_joined_timestamp",
        "instagram_username",
        "twitter_id",
        "youtube_channel_id",
        "youtube_channel_title",
        "url"
      ],
      "saveable": false,
      "docs": "https://apidirect.io/docs/tiktok-user"
    },
    {
      "key": "tiktok/video",
      "path": "/v1/tiktok/video",
      "method": "GET",
      "platform": "tiktok",
      "label": "Video Details",
      "summary": "TikTok Video Details",
      "description": "Look up a single TikTok video by URL or numeric video ID.",
      "price": "$0.006 per request",
      "freeTier": "50 requests/month",
      "suspended": false,
      "kind": "detail",
      "listKey": "video",
      "params": [
        {
          "name": "url",
          "label": "URL",
          "type": "string",
          "required": false,
          "description": "TikTok video URL, e.g. https://www.tiktok.com/@tiktok/video/7516594811734854943 (max 500 characters). Must contain tiktok.com/. Provide exactly one of url or video_id."
        },
        {
          "name": "video_id",
          "label": "Video ID",
          "type": "string",
          "required": false,
          "description": "Numeric TikTok video ID: the number at the end of a video URL. Digits only, max 25 characters, and not all zeros. Provide exactly one of url or video_id."
        }
      ],
      "fields": [
        "video_id",
        "url",
        "title",
        "region",
        "date",
        "date_timestamp",
        "duration",
        "play_count",
        "likes",
        "comments",
        "shares",
        "downloads",
        "saves",
        "is_ad",
        "cover",
        "dynamic_cover",
        "origin_cover",
        "video_url",
        "video_url_hd",
        "video_url_watermarked",
        "size",
        "size_hd",
        "size_watermarked",
        "author",
        "author_name",
        "author_id",
        "author_avatar",
        "author_url",
        "music_id",
        "music_title",
        "music_author",
        "music_url",
        "music_cover",
        "music_album",
        "music_original",
        "music_duration",
        "mentioned_user_ids"
      ],
      "saveable": false,
      "docs": "https://apidirect.io/docs/tiktok-video"
    },
    {
      "key": "trustpilot/company/reviews",
      "path": "/v1/trustpilot/company/reviews",
      "method": "GET",
      "platform": "trustpilot",
      "label": "Company Reviews",
      "summary": "Trustpilot Company Reviews",
      "description": "Get a company's Trustpilot reviews and full profile by website domain.",
      "price": "$0.005 per page",
      "freeTier": "50 requests/month",
      "suspended": false,
      "kind": "list",
      "listKey": "reviews",
      "params": [
        {
          "name": "domain",
          "label": "Domain",
          "type": "string",
          "required": true,
          "description": "Company website domain (e.g. gossby.com) or its Trustpilot review-page URL (max 500 characters)"
        },
        {
          "name": "pages",
          "label": "Pages",
          "type": "integer",
          "required": false,
          "description": "Number of pages to fetch, 1-10 (default: 1). Each page returns up to 20 reviews and is billed as one request",
          "default": 1,
          "min": 1,
          "max": 10
        },
        {
          "name": "sort_by",
          "label": "Sort By",
          "type": "string",
          "required": false,
          "description": "most_relevant (default), newest",
          "enum": [
            "most_relevant",
            "newest"
          ],
          "default": "most_relevant"
        },
        {
          "name": "rating",
          "label": "Rating",
          "type": "string",
          "required": false,
          "description": "Only reviews with these star ratings, comma-separated 1-5 (e.g. 1,2 or 5)"
        },
        {
          "name": "posted_ago",
          "label": "Posted Ago",
          "type": "string",
          "required": false,
          "description": "Only reviews from this period: 30d, 3m, 6m, 12m (default: all time)",
          "enum": [
            "30d",
            "3m",
            "6m",
            "12m"
          ]
        },
        {
          "name": "language",
          "label": "Language",
          "type": "string",
          "required": false,
          "description": "2-letter ISO 639-1 language code (e.g. en, de). Default: all languages"
        },
        {
          "name": "verified",
          "label": "Verified",
          "type": "boolean",
          "required": false,
          "description": "Set to true to return only verified reviews",
          "default": false
        },
        {
          "name": "with_replies",
          "label": "With Replies",
          "type": "boolean",
          "required": false,
          "description": "Set to true to return only reviews the company has replied to",
          "default": false
        },
        {
          "name": "query",
          "label": "Query",
          "type": "string",
          "required": false,
          "description": "Only reviews matching this keyword or phrase (max 500 characters)"
        },
        {
          "name": "get_sentiment",
          "label": "Get Sentiment",
          "type": "boolean",
          "required": false,
          "description": "Set to true to add AI emotion analysis to each review. Adds a `sentiment` object containing `emotions` (joy, trust, fear, surprise, sadness, disgust, anger and anticipation, each scored 0-100), `dominant_emotion`, `emotional_intensity` (0-10), and `polarity` (positive, negative or neutral). Any review that cannot be scored returns `sentiment: null`.",
          "default": false
        }
      ],
      "fields": [
        "review_id",
        "review_link",
        "rating",
        "title",
        "review_text",
        "review_language",
        "review_datetime_utc",
        "review_timestamp",
        "experience_date",
        "updated_datetime_utc",
        "is_verified",
        "verification_level",
        "like_count",
        "author_id",
        "author_name",
        "author_country",
        "author_review_count",
        "author_link",
        "owner_response"
      ],
      "saveable": true,
      "docs": "https://apidirect.io/docs/trustpilot-company-reviews"
    },
    {
      "key": "trustpilot/companies",
      "path": "/v1/trustpilot/companies",
      "method": "GET",
      "platform": "trustpilot",
      "label": "Search Companies",
      "summary": "Search Trustpilot Companies",
      "description": "Search Trustpilot companies by name or keyword.",
      "price": "$0.005 per request",
      "freeTier": "50 requests/month",
      "suspended": false,
      "kind": "list",
      "listKey": "companies",
      "params": [
        {
          "name": "query",
          "label": "Query",
          "type": "string",
          "required": true,
          "description": "Company name or keyword (max 500 characters)"
        },
        {
          "name": "page",
          "label": "Page",
          "type": "integer",
          "required": false,
          "description": "Page number, 1-500 (default: 1). Each page returns up to 10 results",
          "default": 1,
          "min": 1,
          "max": 500
        },
        {
          "name": "min_rating",
          "label": "Min Rating",
          "type": "string",
          "required": false,
          "description": "Only companies with at least this TrustScore: 3, 4, 4.5",
          "enum": [
            "3",
            "4",
            "4.5"
          ]
        },
        {
          "name": "min_review_count",
          "label": "Min Review Count",
          "type": "string",
          "required": false,
          "description": "Only companies with at least this many reviews: 25, 50, 100, 250, 500",
          "enum": [
            "25",
            "50",
            "100",
            "250",
            "500"
          ]
        }
      ],
      "fields": [
        "business_unit_id",
        "name",
        "domain",
        "website",
        "url",
        "logo",
        "rating",
        "stars",
        "review_count",
        "categories",
        "city",
        "country",
        "address",
        "zipcode",
        "is_recommended"
      ],
      "saveable": true,
      "docs": "https://apidirect.io/docs/trustpilot-companies"
    },
    {
      "key": "trustpilot/category/companies",
      "path": "/v1/trustpilot/category/companies",
      "method": "GET",
      "platform": "trustpilot",
      "label": "Category Companies",
      "summary": "Trustpilot Category Companies",
      "description": "List the companies in a Trustpilot category, ranked, 20 per page, along with the category's size and subcategories.",
      "price": "$0.005 per request",
      "freeTier": "50 requests/month",
      "suspended": false,
      "kind": "list",
      "listKey": "companies",
      "params": [
        {
          "name": "category_id",
          "label": "Category ID",
          "type": "string",
          "required": true,
          "description": "Category slug, e.g. bank or electronics_technology. See Category IDs (https://apidirect.io/docs/trustpilot-category-ids). A trustpilot.com/categories/... URL also works"
        },
        {
          "name": "page",
          "label": "Page",
          "type": "integer",
          "required": false,
          "description": "Page number, 1-500 (default: 1). Each page returns up to 20 companies",
          "default": 1,
          "min": 1,
          "max": 500
        },
        {
          "name": "sort_by",
          "label": "Sort By",
          "type": "string",
          "required": false,
          "description": "recommended (default), recently_reviewed",
          "enum": [
            "recommended",
            "recently_reviewed"
          ],
          "default": "recommended"
        },
        {
          "name": "country",
          "label": "Country",
          "type": "string",
          "required": false,
          "description": "2-letter ISO 3166-1 country code (e.g. us, gb, de). Default: all countries"
        },
        {
          "name": "min_rating",
          "label": "Min Rating",
          "type": "string",
          "required": false,
          "description": "Only companies with at least this TrustScore: 3, 3.5, 4, 4.5",
          "enum": [
            "3",
            "3.5",
            "4",
            "4.5"
          ]
        },
        {
          "name": "claimed",
          "label": "Claimed",
          "type": "boolean",
          "required": false,
          "description": "Set to true to return only companies that have claimed their Trustpilot profile",
          "default": false
        }
      ],
      "fields": [
        "business_unit_id",
        "name",
        "domain",
        "website",
        "url",
        "logo",
        "rating",
        "stars",
        "review_count",
        "categories",
        "city",
        "country",
        "address",
        "zipcode",
        "is_recommended"
      ],
      "saveable": true,
      "docs": "https://apidirect.io/docs/trustpilot-category-companies"
    },
    {
      "key": "trustpilot/category/newest",
      "path": "/v1/trustpilot/category/newest",
      "method": "GET",
      "platform": "trustpilot",
      "label": "Category Newest",
      "summary": "Trustpilot Category Newest",
      "description": "Get the newest companies added to a Trustpilot category — the short list shown on the category page, plus the category's size and subcategories.",
      "price": "$0.005 per request",
      "freeTier": "50 requests/month",
      "suspended": false,
      "kind": "list",
      "listKey": "companies",
      "params": [
        {
          "name": "category_id",
          "label": "Category ID",
          "type": "string",
          "required": true,
          "description": "Category slug, e.g. bank. See Category IDs (https://apidirect.io/docs/trustpilot-category-ids). A trustpilot.com/categories/... URL also works"
        }
      ],
      "fields": [
        "business_unit_id",
        "name",
        "domain",
        "website",
        "url",
        "logo",
        "rating",
        "stars",
        "review_count",
        "categories",
        "city",
        "country",
        "address",
        "zipcode",
        "is_recommended"
      ],
      "saveable": true,
      "docs": "https://apidirect.io/docs/trustpilot-category-newest"
    },
    {
      "key": "trustpilot/category",
      "path": "/v1/trustpilot/category",
      "method": "GET",
      "platform": "trustpilot",
      "label": "Category Details",
      "summary": "Trustpilot Category Details",
      "description": "Get a Trustpilot category's display name, business count, parent, and subcategories.",
      "price": "$0.005 per request",
      "freeTier": "50 requests/month",
      "suspended": false,
      "kind": "detail",
      "listKey": "category",
      "params": [
        {
          "name": "category_id",
          "label": "Category ID",
          "type": "string",
          "required": true,
          "description": "Category slug, e.g. electronics_technology. See Category IDs (https://apidirect.io/docs/trustpilot-category-ids). A trustpilot.com/categories/... URL also works"
        }
      ],
      "fields": [
        "category_id",
        "name",
        "business_count",
        "parent_id",
        "url",
        "subcategories"
      ],
      "saveable": false,
      "docs": "https://apidirect.io/docs/trustpilot-category"
    },
    {
      "key": "trustpilot/categories",
      "path": "/v1/trustpilot/categories",
      "method": "GET",
      "platform": "trustpilot",
      "label": "Search Categories",
      "summary": "Search Trustpilot Categories",
      "description": "Search Trustpilot categories by keyword to find category IDs at any level of the taxonomy.",
      "price": "$0.005 per request",
      "freeTier": "50 requests/month",
      "suspended": false,
      "kind": "list",
      "listKey": "categories",
      "params": [
        {
          "name": "query",
          "label": "Query",
          "type": "string",
          "required": true,
          "description": "Keyword, e.g. bank or shop (max 200 characters)"
        }
      ],
      "fields": [
        "category_id",
        "name"
      ],
      "saveable": true,
      "docs": "https://apidirect.io/docs/trustpilot-categories"
    },
    {
      "key": "trustpilot/user",
      "path": "/v1/trustpilot/user",
      "method": "GET",
      "platform": "trustpilot",
      "label": "User Profile",
      "summary": "Trustpilot User Profile",
      "description": "Get a Trustpilot reviewer's public profile and the reviews they have written across all companies, 20 per page.",
      "price": "$0.005 per request",
      "freeTier": "50 requests/month",
      "suspended": false,
      "kind": "list",
      "listKey": "reviews",
      "params": [
        {
          "name": "user_id",
          "label": "User ID",
          "type": "string",
          "required": true,
          "description": "Reviewer ID (24 hex characters), from a review's author_id on Company Reviews (https://apidirect.io/docs/trustpilot-company-reviews). A trustpilot.com/users/... URL also works"
        },
        {
          "name": "page",
          "label": "Page",
          "type": "integer",
          "required": false,
          "description": "Page number, 1-500 (default: 1). Each page returns up to 20 reviews",
          "default": 1,
          "min": 1,
          "max": 500
        }
      ],
      "fields": [
        "review_id",
        "review_link",
        "rating",
        "title",
        "review_text",
        "review_language",
        "review_datetime_utc",
        "review_timestamp",
        "experience_date",
        "updated_datetime_utc",
        "is_verified",
        "verification_level",
        "like_count",
        "company_name",
        "company_domain",
        "company_url",
        "business_unit_id",
        "owner_response.text",
        "owner_response.datetime_utc",
        "owner_response.timestamp"
      ],
      "saveable": true,
      "docs": "https://apidirect.io/docs/trustpilot-user"
    },
    {
      "key": "truthsocial/user/posts",
      "path": "/v1/truthsocial/user/posts",
      "method": "GET",
      "platform": "truthsocial",
      "label": "User Posts",
      "summary": "Truth Social User Posts",
      "description": "Get a single Truth Social user's recent posts (their feed) by username.",
      "price": "$0.006 per page",
      "freeTier": "50 requests/month",
      "suspended": false,
      "kind": "list",
      "listKey": "posts",
      "params": [
        {
          "name": "username",
          "label": "Username",
          "type": "string",
          "required": true,
          "description": "Truth Social username, with or without leading @ (max 100 characters)"
        },
        {
          "name": "pages",
          "label": "Pages",
          "type": "integer",
          "required": false,
          "description": "Number of pages to fetch and merge into one response (1-20, billed per page). Each page returns up to 20 posts. Fetching stops early when there are no more results.",
          "default": 1,
          "min": 1,
          "max": 20
        },
        {
          "name": "get_sentiment",
          "label": "Get Sentiment",
          "type": "boolean",
          "required": false,
          "description": "Set to true to add AI emotion analysis to each post. Adds a `sentiment` object containing `emotions` (joy, trust, fear, surprise, sadness, disgust, anger and anticipation, each scored 0-100), `dominant_emotion`, `emotional_intensity` (0-10), and `polarity` (positive, negative or neutral). Any post that cannot be scored returns `sentiment: null`.",
          "default": false
        }
      ],
      "fields": [
        "title",
        "url",
        "date",
        "author",
        "source",
        "domain",
        "snippet",
        "likes",
        "replies",
        "reposts",
        "post_id",
        "content_html",
        "media",
        "hashtags",
        "language",
        "visibility",
        "sensitive",
        "spoiler_text",
        "sponsored",
        "is_reply",
        "in_reply_to_id"
      ],
      "saveable": true,
      "docs": "https://apidirect.io/docs/truthsocial-user-posts"
    },
    {
      "key": "twitter/posts",
      "path": "/v1/twitter/posts",
      "method": "GET",
      "platform": "twitter",
      "label": "Search Posts",
      "summary": "Search Twitter Posts",
      "description": "Search for tweets by keyword.",
      "price": "$0.006 per page",
      "freeTier": "50 requests/month",
      "suspended": false,
      "kind": "list",
      "listKey": "posts",
      "params": [
        {
          "name": "query",
          "label": "Query",
          "type": "string",
          "required": true,
          "description": "Search query (max 500 characters). Supports X's search operators (https://help.x.com/en/using-x/x-advanced-search)."
        },
        {
          "name": "pages",
          "label": "Pages",
          "type": "integer",
          "required": false,
          "description": "Number of pages to fetch and merge into one response (1-20, billed per page). Fetching stops early when there are no more results.",
          "default": 1,
          "min": 1,
          "max": 20
        },
        {
          "name": "sort_by",
          "label": "Sort By",
          "type": "string",
          "required": false,
          "description": "Sort order for results",
          "enum": [
            "most_recent",
            "relevance"
          ],
          "default": "most_recent"
        },
        {
          "name": "posted_ago",
          "label": "Posted Ago",
          "type": "string",
          "required": false,
          "description": "Only return posts from this period: 1h (past hour), 24h (past day), 7d (past week), 30d (past month), or 12m (past year). Works with both sort orders. Omit for all time. Can't be combined with start_date or end_date. Any other value returns 400.",
          "enum": [
            "1h",
            "24h",
            "7d",
            "30d",
            "12m"
          ]
        },
        {
          "name": "start_date",
          "label": "Start Date",
          "type": "string",
          "required": false,
          "description": "Only return posts from this date onward (YYYY-MM-DD, UTC). Can't be combined with posted_ago."
        },
        {
          "name": "end_date",
          "label": "End Date",
          "type": "string",
          "required": false,
          "description": "Only return posts up to and including this date (YYYY-MM-DD, UTC). Must not be earlier than start_date. Can't be combined with posted_ago."
        },
        {
          "name": "get_sentiment",
          "label": "Get Sentiment",
          "type": "boolean",
          "required": false,
          "description": "Set to true to add AI emotion analysis to each post. Adds a `sentiment` object containing `emotions` (joy, trust, fear, surprise, sadness, disgust, anger and anticipation, each scored 0-100), `dominant_emotion`, `emotional_intensity` (0-10), and `polarity` (positive, negative or neutral). Any post that cannot be scored returns `sentiment: null`.",
          "default": false
        }
      ],
      "fields": [
        "author",
        "author_followers",
        "author_verified",
        "bookmarks",
        "date",
        "domain",
        "hashtags",
        "is_quote",
        "is_reply",
        "lang",
        "likes",
        "quotes",
        "replies",
        "retweets",
        "snippet",
        "source",
        "title",
        "url",
        "user_mentions",
        "views"
      ],
      "saveable": true,
      "docs": "https://apidirect.io/docs/twitter-posts"
    },
    {
      "key": "twitter/users",
      "path": "/v1/twitter/users",
      "method": "GET",
      "platform": "twitter",
      "label": "Search Users",
      "summary": "Search Twitter Users",
      "description": "Search for Twitter/X users by keyword.",
      "price": "$0.006 per page",
      "freeTier": "50 requests/month",
      "suspended": false,
      "kind": "list",
      "listKey": "users",
      "params": [
        {
          "name": "query",
          "label": "Query",
          "type": "string",
          "required": true,
          "description": "Search query (max 500 characters)"
        },
        {
          "name": "pages",
          "label": "Pages",
          "type": "integer",
          "required": false,
          "description": "Number of pages to fetch and merge into one response (1-20, billed per page). Fetching stops early when there are no more results.",
          "default": 1,
          "min": 1,
          "max": 20
        }
      ],
      "fields": [
        "created_at",
        "description",
        "followers_count",
        "following_count",
        "name",
        "profile_image_url",
        "tweet_count",
        "url",
        "user_id",
        "username",
        "verified"
      ],
      "saveable": true,
      "docs": "https://apidirect.io/docs/twitter-users"
    },
    {
      "key": "twitter/user",
      "path": "/v1/twitter/user",
      "method": "GET",
      "platform": "twitter",
      "label": "User Profile",
      "summary": "Twitter User Profile",
      "description": "Get detailed profile information for a Twitter/X user by username.",
      "price": "$0.006 per request",
      "freeTier": "50 requests/month",
      "suspended": false,
      "kind": "detail",
      "listKey": "user",
      "params": [
        {
          "name": "username",
          "label": "Username",
          "type": "string",
          "required": true,
          "description": "Twitter username without the @ symbol (max 50 characters). A leading @ is accepted and stripped."
        }
      ],
      "fields": [
        "account_based_in",
        "created_at",
        "description",
        "favourites_count",
        "followers_count",
        "following_count",
        "listed_count",
        "media_count",
        "name",
        "pinned_tweet_ids",
        "profile_banner_url",
        "profile_image_url",
        "protected",
        "tweet_count",
        "url",
        "user_id",
        "username",
        "username_changes",
        "verified"
      ],
      "saveable": false,
      "docs": "https://apidirect.io/docs/twitter-user"
    },
    {
      "key": "twitter/user/tweets",
      "path": "/v1/twitter/user/tweets",
      "method": "GET",
      "platform": "twitter",
      "label": "User Tweets",
      "summary": "Twitter User Tweets",
      "description": "Get tweets posted by a specific Twitter/X user.",
      "price": "$0.006 per page",
      "freeTier": "50 requests/month",
      "suspended": false,
      "kind": "list",
      "listKey": "tweets",
      "params": [
        {
          "name": "username",
          "label": "Username",
          "type": "string",
          "required": true,
          "description": "Twitter username without the @ symbol (max 50 characters). A leading @ is accepted and stripped."
        },
        {
          "name": "pages",
          "label": "Pages",
          "type": "integer",
          "required": false,
          "description": "Number of pages to fetch and merge into one response (1-20, billed per page). Fetching stops early when there are no more results.",
          "default": 1,
          "min": 1,
          "max": 20
        },
        {
          "name": "get_sentiment",
          "label": "Get Sentiment",
          "type": "boolean",
          "required": false,
          "description": "Set to true to add AI emotion analysis to each tweet. Adds a `sentiment` object containing `emotions` (joy, trust, fear, surprise, sadness, disgust, anger and anticipation, each scored 0-100), `dominant_emotion`, `emotional_intensity` (0-10), and `polarity` (positive, negative or neutral). Any tweet that cannot be scored returns `sentiment: null`.",
          "default": false
        }
      ],
      "fields": [
        "author",
        "author_followers",
        "author_verified",
        "bookmarks",
        "date",
        "domain",
        "hashtags",
        "is_quote",
        "is_reply",
        "lang",
        "likes",
        "quotes",
        "replies",
        "retweets",
        "snippet",
        "source",
        "title",
        "url",
        "user_mentions",
        "views"
      ],
      "saveable": true,
      "docs": "https://apidirect.io/docs/twitter-user-tweets"
    },
    {
      "key": "twitter/user/followers",
      "path": "/v1/twitter/user/followers",
      "method": "GET",
      "platform": "twitter",
      "label": "User Followers",
      "summary": "Twitter User Followers",
      "description": "Get the followers of a specific Twitter/X user.",
      "price": "$0.006 per page",
      "freeTier": "50 requests/month",
      "suspended": false,
      "kind": "list",
      "listKey": "followers",
      "params": [
        {
          "name": "username",
          "label": "Username",
          "type": "string",
          "required": true,
          "description": "Twitter username without the @ symbol (max 50 characters). A leading @ is accepted and stripped."
        },
        {
          "name": "pages",
          "label": "Pages",
          "type": "integer",
          "required": false,
          "description": "Number of pages to fetch and merge into one response (1-20, billed per page). Fetching stops early when there are no more results.",
          "default": 1,
          "min": 1,
          "max": 20
        }
      ],
      "fields": [
        "created_at",
        "description",
        "followers_count",
        "following_count",
        "name",
        "profile_image_url",
        "tweet_count",
        "url",
        "user_id",
        "username",
        "verified"
      ],
      "saveable": true,
      "docs": "https://apidirect.io/docs/twitter-user-followers"
    },
    {
      "key": "twitter/user/following",
      "path": "/v1/twitter/user/following",
      "method": "GET",
      "platform": "twitter",
      "label": "User Following",
      "summary": "Twitter User Following",
      "description": "Get the accounts that a specific Twitter/X user follows.",
      "price": "$0.006 per page",
      "freeTier": "50 requests/month",
      "suspended": false,
      "kind": "list",
      "listKey": "following",
      "params": [
        {
          "name": "username",
          "label": "Username",
          "type": "string",
          "required": true,
          "description": "Twitter username without the @ symbol (max 50 characters). A leading @ is accepted and stripped."
        },
        {
          "name": "pages",
          "label": "Pages",
          "type": "integer",
          "required": false,
          "description": "Number of pages to fetch and merge into one response (1-175, billed per page). Fetching stops early when there are no more results.",
          "default": 1,
          "min": 1,
          "max": 175
        }
      ],
      "fields": [
        "created_at",
        "description",
        "followers_count",
        "following_count",
        "name",
        "profile_image_url",
        "tweet_count",
        "url",
        "user_id",
        "username",
        "verified"
      ],
      "saveable": true,
      "docs": "https://apidirect.io/docs/twitter-user-following"
    },
    {
      "key": "twitter/user/verified-followers",
      "path": "/v1/twitter/user/verified-followers",
      "method": "GET",
      "platform": "twitter",
      "label": "Verified Followers",
      "summary": "Twitter Verified Followers",
      "description": "Get the verified (blue checkmark) followers of a specific Twitter/X user.",
      "price": "$0.006 per page",
      "freeTier": "50 requests/month",
      "suspended": false,
      "kind": "list",
      "listKey": "verified_followers",
      "params": [
        {
          "name": "username",
          "label": "Username",
          "type": "string",
          "required": true,
          "description": "Twitter username without the @ symbol (max 50 characters). A leading @ is accepted and stripped."
        },
        {
          "name": "pages",
          "label": "Pages",
          "type": "integer",
          "required": false,
          "description": "Number of pages to fetch and merge into one response (1-20, billed per page). Fetching stops early when there are no more results.",
          "default": 1,
          "min": 1,
          "max": 20
        }
      ],
      "fields": [
        "created_at",
        "description",
        "followers_count",
        "following_count",
        "name",
        "profile_image_url",
        "tweet_count",
        "url",
        "user_id",
        "username",
        "verified"
      ],
      "saveable": true,
      "docs": "https://apidirect.io/docs/twitter-user-verified-followers"
    },
    {
      "key": "twitter/user/replies",
      "path": "/v1/twitter/user/replies",
      "method": "GET",
      "platform": "twitter",
      "label": "User Replies",
      "summary": "Twitter User Replies",
      "description": "Get replies posted by a specific Twitter/X user.",
      "price": "$0.006 per page",
      "freeTier": "50 requests/month",
      "suspended": false,
      "kind": "list",
      "listKey": "replies",
      "params": [
        {
          "name": "username",
          "label": "Username",
          "type": "string",
          "required": true,
          "description": "Twitter username without the @ symbol (max 50 characters). A leading @ is accepted and stripped."
        },
        {
          "name": "pages",
          "label": "Pages",
          "type": "integer",
          "required": false,
          "description": "Number of pages to fetch and merge into one response (1-20, billed per page). Fetching stops early when there are no more results.",
          "default": 1,
          "min": 1,
          "max": 20
        },
        {
          "name": "get_sentiment",
          "label": "Get Sentiment",
          "type": "boolean",
          "required": false,
          "description": "Set to true to add AI emotion analysis to each reply. Adds a `sentiment` object containing `emotions` (joy, trust, fear, surprise, sadness, disgust, anger and anticipation, each scored 0-100), `dominant_emotion`, `emotional_intensity` (0-10), and `polarity` (positive, negative or neutral). Any reply that cannot be scored returns `sentiment: null`.",
          "default": false
        }
      ],
      "fields": [
        "author",
        "author_followers",
        "author_verified",
        "bookmarks",
        "date",
        "domain",
        "hashtags",
        "is_quote",
        "is_reply",
        "lang",
        "likes",
        "quotes",
        "replies",
        "retweets",
        "snippet",
        "source",
        "title",
        "url",
        "user_mentions",
        "views"
      ],
      "saveable": true,
      "docs": "https://apidirect.io/docs/twitter-user-replies"
    },
    {
      "key": "twitter/tweet",
      "path": "/v1/twitter/tweet",
      "method": "GET",
      "platform": "twitter",
      "label": "Tweet Details",
      "summary": "Twitter Tweet Details",
      "description": "Get detailed information for a single tweet by its ID.",
      "price": "$0.006 per request",
      "freeTier": "50 requests/month",
      "suspended": false,
      "kind": "detail",
      "listKey": "tweet",
      "params": [
        {
          "name": "tweet_id",
          "label": "Tweet ID",
          "type": "string",
          "required": true,
          "description": "Numeric tweet ID"
        },
        {
          "name": "get_sentiment",
          "label": "Get Sentiment",
          "type": "boolean",
          "required": false,
          "description": "Set to true to add AI emotion analysis to the tweet. Adds a `sentiment` object containing `emotions` (joy, trust, fear, surprise, sadness, disgust, anger and anticipation, each scored 0-100), `dominant_emotion`, `emotional_intensity` (0-10), and `polarity` (positive, negative or neutral). If the tweet cannot be scored, `sentiment` is null.",
          "default": false
        }
      ],
      "fields": [
        "author",
        "author_followers",
        "author_verified",
        "bookmarks",
        "date",
        "domain",
        "hashtags",
        "is_quote",
        "is_reply",
        "lang",
        "likes",
        "quotes",
        "replies",
        "retweets",
        "snippet",
        "source",
        "title",
        "url",
        "user_mentions",
        "views"
      ],
      "saveable": false,
      "docs": "https://apidirect.io/docs/twitter-tweet"
    },
    {
      "key": "twitter/tweet/retweets",
      "path": "/v1/twitter/tweet/retweets",
      "method": "GET",
      "platform": "twitter",
      "label": "Tweet Retweets",
      "summary": "Twitter Tweet Retweets",
      "description": "Get the users who retweeted a specific tweet.",
      "price": "$0.006 per page",
      "freeTier": "50 requests/month",
      "suspended": false,
      "kind": "list",
      "listKey": "retweets",
      "params": [
        {
          "name": "tweet_id",
          "label": "Tweet ID",
          "type": "string",
          "required": true,
          "description": "Numeric tweet ID"
        },
        {
          "name": "pages",
          "label": "Pages",
          "type": "integer",
          "required": false,
          "description": "Number of pages to fetch and merge into one response (1-20, billed per page). Fetching stops early when there are no more results.",
          "default": 1,
          "min": 1,
          "max": 20
        }
      ],
      "fields": [],
      "saveable": true,
      "docs": "https://apidirect.io/docs/twitter-tweet-retweets"
    },
    {
      "key": "twitter/tweet/quotes",
      "path": "/v1/twitter/tweet/quotes",
      "method": "GET",
      "platform": "twitter",
      "label": "Tweet Quotes",
      "summary": "Twitter Quote Tweets",
      "description": "Get the quote tweets for a specific tweet.",
      "price": "$0.006 per page",
      "freeTier": "50 requests/month",
      "suspended": false,
      "kind": "list",
      "listKey": "quotes",
      "params": [
        {
          "name": "tweet_id",
          "label": "Tweet ID",
          "type": "string",
          "required": true,
          "description": "Numeric tweet ID"
        },
        {
          "name": "pages",
          "label": "Pages",
          "type": "integer",
          "required": false,
          "description": "Number of pages to fetch and merge into one response (1-20, billed per page). Fetching stops early when there are no more results.",
          "default": 1,
          "min": 1,
          "max": 20
        },
        {
          "name": "get_sentiment",
          "label": "Get Sentiment",
          "type": "boolean",
          "required": false,
          "description": "Set to true to add AI emotion analysis to each quote tweet. Adds a `sentiment` object containing `emotions` (joy, trust, fear, surprise, sadness, disgust, anger and anticipation, each scored 0-100), `dominant_emotion`, `emotional_intensity` (0-10), and `polarity` (positive, negative or neutral). Any quote tweet that cannot be scored returns `sentiment: null`.",
          "default": false
        }
      ],
      "fields": [],
      "saveable": true,
      "docs": "https://apidirect.io/docs/twitter-tweet-quotes"
    },
    {
      "key": "twitter/tweet/comments",
      "path": "/v1/twitter/tweet/comments",
      "method": "GET",
      "platform": "twitter",
      "label": "Tweet Comments",
      "summary": "Twitter Tweet Comments",
      "description": "Get the comments (replies) on a specific tweet.",
      "price": "$0.006 per page",
      "freeTier": "50 requests/month",
      "suspended": false,
      "kind": "list",
      "listKey": "comments",
      "params": [
        {
          "name": "tweet_id",
          "label": "Tweet ID",
          "type": "string",
          "required": true,
          "description": "Numeric tweet ID"
        },
        {
          "name": "pages",
          "label": "Pages",
          "type": "integer",
          "required": false,
          "description": "Number of pages to fetch and merge into one response (1-20, billed per page). Fetching stops early when there are no more results.",
          "default": 1,
          "min": 1,
          "max": 20
        },
        {
          "name": "get_sentiment",
          "label": "Get Sentiment",
          "type": "boolean",
          "required": false,
          "description": "Set to true to add AI emotion analysis to each comment. Adds a `sentiment` object containing `emotions` (joy, trust, fear, surprise, sadness, disgust, anger and anticipation, each scored 0-100), `dominant_emotion`, `emotional_intensity` (0-10), and `polarity` (positive, negative or neutral). Any comment that cannot be scored returns `sentiment: null`.",
          "default": false
        }
      ],
      "fields": [
        "author",
        "author_followers",
        "author_verified",
        "bookmarks",
        "date",
        "domain",
        "hashtags",
        "is_quote",
        "is_reply",
        "lang",
        "likes",
        "quotes",
        "replies",
        "retweets",
        "snippet",
        "source",
        "title",
        "url",
        "user_mentions",
        "views"
      ],
      "saveable": true,
      "docs": "https://apidirect.io/docs/twitter-tweet-comments"
    },
    {
      "key": "twitter/trends",
      "path": "/v1/twitter/trends",
      "method": "GET",
      "platform": "twitter",
      "label": "Trends",
      "summary": "Twitter Trending Topics",
      "description": "Get the current trending topics for a specific location on Twitter/X.",
      "price": "$0.006 per request",
      "freeTier": "50 requests/month",
      "suspended": false,
      "kind": "list",
      "listKey": "trends",
      "params": [
        {
          "name": "woeid",
          "label": "WOEID",
          "type": "integer",
          "required": true,
          "description": "Where On Earth ID for the location. Use 1 for Worldwide.",
          "min": 1
        }
      ],
      "fields": [
        "name",
        "query",
        "tweet_volume",
        "url"
      ],
      "saveable": true,
      "docs": "https://apidirect.io/docs/twitter-trends"
    },
    {
      "key": "youtube/posts",
      "path": "/v1/youtube/posts",
      "method": "GET",
      "platform": "youtube",
      "label": "Search Videos",
      "summary": "Search YouTube Videos",
      "description": "Search for YouTube videos by keyword.",
      "price": "$0.005 per page",
      "freeTier": "50 requests/month",
      "suspended": false,
      "kind": "list",
      "listKey": "posts",
      "params": [
        {
          "name": "query",
          "label": "Query",
          "type": "string",
          "required": true,
          "description": "Search query (max 500 characters)"
        },
        {
          "name": "pages",
          "label": "Pages",
          "type": "integer",
          "required": false,
          "description": "Number of pages to fetch and merge (1-20). Billed per page.",
          "default": 1,
          "min": 1,
          "max": 20
        },
        {
          "name": "upload_date",
          "label": "Upload Date",
          "type": "string",
          "required": false,
          "description": "Filter by upload date",
          "enum": [
            "last_hour",
            "today",
            "this_week",
            "this_month",
            "this_year"
          ]
        },
        {
          "name": "get_sentiment",
          "label": "Get Sentiment",
          "type": "boolean",
          "required": false,
          "description": "Set to true to add AI emotion analysis to each post. Adds a `sentiment` object containing `emotions` (joy, trust, fear, surprise, sadness, disgust, anger and anticipation, each scored 0-100), `dominant_emotion`, `emotional_intensity` (0-10), and `polarity` (positive, negative or neutral). Any post that cannot be scored returns `sentiment: null`.",
          "default": false
        }
      ],
      "fields": [
        "author",
        "channel_id",
        "date",
        "domain",
        "is_live",
        "keywords",
        "snippet",
        "source",
        "thumbnail",
        "title",
        "type",
        "url",
        "video_id",
        "video_length",
        "views"
      ],
      "saveable": true,
      "docs": "https://apidirect.io/docs/youtube-videos"
    },
    {
      "key": "youtube/channels",
      "path": "/v1/youtube/channels",
      "method": "GET",
      "platform": "youtube",
      "label": "Search Channels",
      "summary": "Search YouTube Channels",
      "description": "Search for YouTube channels by keyword.",
      "price": "$0.005 per page",
      "freeTier": "50 requests/month",
      "suspended": false,
      "kind": "list",
      "listKey": "channels",
      "params": [
        {
          "name": "query",
          "label": "Query",
          "type": "string",
          "required": true,
          "description": "Search query (max 500 characters)"
        },
        {
          "name": "pages",
          "label": "Pages",
          "type": "integer",
          "required": false,
          "description": "Number of pages to fetch and merge (1-20). Billed per page.",
          "default": 1,
          "min": 1,
          "max": 20
        }
      ],
      "fields": [
        "channel_id",
        "description",
        "subscriber_count",
        "thumbnail",
        "title",
        "url"
      ],
      "saveable": true,
      "docs": "https://apidirect.io/docs/youtube-channels"
    },
    {
      "key": "youtube/channel",
      "path": "/v1/youtube/channel",
      "method": "GET",
      "platform": "youtube",
      "label": "Channel Details",
      "summary": "YouTube Channel Details",
      "description": "Get detailed information about a YouTube channel by channel ID, URL, or name/handle.",
      "price": "$0.005 per request",
      "freeTier": "50 requests/month",
      "suspended": false,
      "kind": "detail",
      "listKey": "channel",
      "params": [
        {
          "name": "id",
          "label": "ID",
          "type": "string",
          "required": false,
          "description": "YouTube channel ID (24 characters, starts with UC), e.g. UCXuqSBlHAE6Xw-yeJA0Tunw"
        },
        {
          "name": "url",
          "label": "URL",
          "type": "string",
          "required": false,
          "description": "Channel URL, used instead of id: youtube.com/channel/..., youtube.com/@handle, /c/ or /user/ forms"
        },
        {
          "name": "name",
          "label": "Name",
          "type": "string",
          "required": false,
          "description": "Channel name or @handle, used instead of id (e.g. @mkbhd or Linus Tech Tips)"
        }
      ],
      "fields": [
        "channel_id",
        "channel_name",
        "description",
        "subscriber_count",
        "video_count",
        "view_count",
        "country",
        "creation_date",
        "verified",
        "has_business_email",
        "links",
        "profile_pic_url",
        "banner",
        "url"
      ],
      "saveable": false,
      "docs": "https://apidirect.io/docs/youtube-channel-details"
    },
    {
      "key": "youtube/video",
      "path": "/v1/youtube/video",
      "method": "GET",
      "platform": "youtube",
      "label": "Video Details",
      "summary": "YouTube Video Details",
      "description": "Get detailed information about a YouTube video by URL or video ID.",
      "price": "$0.005 per request",
      "freeTier": "50 requests/month",
      "suspended": false,
      "kind": "detail",
      "listKey": "video",
      "params": [
        {
          "name": "url",
          "label": "URL",
          "type": "string",
          "required": true,
          "description": "YouTube video URL (watch?v=, youtu.be/, /shorts/, /embed/, /live/ or /v/ forms) or 11-character video ID"
        }
      ],
      "fields": [
        "video_id",
        "url",
        "title",
        "description",
        "author",
        "channel_id",
        "date",
        "duration",
        "views",
        "category",
        "type",
        "is_live",
        "keywords",
        "thumbnail"
      ],
      "saveable": false,
      "docs": "https://apidirect.io/docs/youtube-video-details"
    },
    {
      "key": "youtube/comments",
      "path": "/v1/youtube/comments",
      "method": "GET",
      "platform": "youtube",
      "label": "Video Comments",
      "summary": "YouTube Video Comments",
      "description": "Get comments (comment threads) from a YouTube video.",
      "price": "$0.005 per page",
      "freeTier": "50 requests/month",
      "suspended": false,
      "kind": "list",
      "listKey": "comments",
      "params": [
        {
          "name": "url",
          "label": "URL",
          "type": "string",
          "required": true,
          "description": "YouTube video URL (watch?v=, youtu.be/, /shorts/, /embed/, /live/ or /v/ forms) or 11-character video ID"
        },
        {
          "name": "pages",
          "label": "Pages",
          "type": "integer",
          "required": false,
          "description": "Number of pages to fetch and merge (1-20). Each page returns up to ~100 comments. Billed per page.",
          "default": 1,
          "min": 1,
          "max": 20
        },
        {
          "name": "sort_by",
          "label": "Sort By",
          "type": "string",
          "required": false,
          "description": "Sort order",
          "enum": [
            "most_recent",
            "relevance"
          ],
          "default": "relevance"
        }
      ],
      "fields": [
        "comment_id",
        "text",
        "author",
        "author_channel_id",
        "author_channel_url",
        "author_thumbnail",
        "likes",
        "reply_count",
        "date",
        "updated_date",
        "url",
        "video_id",
        "channel_id",
        "source",
        "domain",
        "replies"
      ],
      "saveable": true,
      "docs": "https://apidirect.io/docs/youtube-comments"
    }
  ],
  "aliases": {
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
    "amazon products": "amazon/products",
    "bluesky posts": "bluesky/posts",
    "bluesky users": "bluesky/users",
    "facebook posts": "facebook/posts",
    "facebook locations": "facebook/locations",
    "facebook pages": "facebook/pages",
    "facebook videos": "facebook/videos",
    "facebook events": "facebook/events",
    "facebook search": "facebook/group/search",
    "instagram posts": "instagram/posts",
    "instagram users": "instagram/users",
    "linkedin posts": "linkedin/posts",
    "linkedin companies": "linkedin/companies",
    "linkedin jobs": "linkedin/jobs",
    "reddit posts": "reddit/posts",
    "reddit comments": "reddit/comments",
    "reddit users": "reddit/users",
    "threads posts": "threads/posts",
    "threads users": "threads/users",
    "tiktok videos": "tiktok/videos",
    "tiktok users": "tiktok/users",
    "trustpilot companies": "trustpilot/companies",
    "trustpilot categories": "trustpilot/categories",
    "twitter posts": "twitter/posts",
    "twitter users": "twitter/users",
    "youtube posts": "youtube/posts",
    "youtube channels": "youtube/channels",
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
    "companies": "linkedin/companies",
    "trustpilot reviews": "trustpilot/company/reviews",
    "events": "facebook/events",
    "x users": "twitter/users",
    "youtube videos": "youtube/posts",
    "google ai": "web/ai-mode",
    "ai mode": "web/ai-mode",
    "google search": "web/search",
    "google web": "web/search",
    "google news": "news/articles",
    "news articles": "news/articles",
    "google forums": "forums/posts",
    "forum posts": "forums/posts",
    "google places": "places/search",
    "places search": "places/search"
  }
};
