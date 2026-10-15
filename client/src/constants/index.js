/**
 * Content constants for the storefront, following a data-driven pattern:
 * each UI section is described by an array/object of plain data and consumed by
 * a component. This mirrors the structure used across the project's portfolio
 * (navLinks -> cards -> sections) so content stays declarative and DRY.
 */

// Top navigation (category bar). `id` maps to a product category or "all".
export const navLinks = [
  { id: "", title: "All", icon: "☰" },
  { id: "electronics", title: "Electronics" },
  { id: "home", title: "Home & Kitchen" },
  { id: "books", title: "Books" },
  { id: "fashion", title: "Fashion" },
  { id: "toys", title: "Toys & Games" },
];

// Secondary nav strip shown inside the search overlay (like Amazon's).
export const overlayNavLinks = [
  { id: "deals", title: "Today's Deals" },
  { id: "customer-service", title: "Customer Service" },
  { id: "registry", title: "Registry" },
  { id: "gift-cards", title: "Gift Cards" },
  { id: "sell", title: "Sell" },
];

// Search suggestions shown when the search box is focused.
export const searchSuggestions = [
  "echo dot",
  "fire tv stick",
  "water bottle",
  "wireless headphones",
  "running shoes",
  "clean code book",
  "building blocks",
  "desk lamp",
];

// Hero banner tiles (the big colored promo cards row).
export const heroBanners = [
  {
    id: "kitchen",
    title: "Shop kitchen must-haves",
    category: "home",
    image:
      "https://images.unsplash.com/photo-1556911220-bff31c812dba?w=500&q=80",
    bg: "#f3e9dc",
  },
  {
    id: "beauty",
    title: "Shop all things beauty",
    category: "fashion",
    image:
      "https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?w=500&q=80",
    bg: "#f6ded9",
  },
  {
    id: "fashion",
    title: "Start looking sharp",
    category: "fashion",
    image:
      "https://images.unsplash.com/photo-1489987707025-afc232f7ea0f?w=500&q=80",
    bg: "#efe7df",
  },
  {
    id: "toys",
    title: "Toys for little ones",
    category: "toys",
    image:
      "https://images.unsplash.com/photo-1558060370-d644479cb6f7?w=500&q=80",
    bg: "#dfeaf2",
  },
  {
    id: "pc",
    title: "Level up your PC here",
    category: "electronics",
    image:
      "https://images.unsplash.com/photo-1593640408182-31c70c8268f5?w=500&q=80",
    bg: "#f3dff2",
  },
];

// Category cards (the 4-up grid of mini product tiles). Each card has a title,
// a target category, a CTA, and four sub-tiles.
export const categoryCards = [
  {
    id: "electronics",
    title: "Plug in with our electronics",
    category: "electronics",
    cta: "See more",
    tiles: [
      {
        label: "Headphones",
        image:
          "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=250&q=80",
      },
      {
        label: "Tablets",
        image:
          "https://images.unsplash.com/photo-1544244015-0df4b3ffc6b0?w=250&q=80",
      },
      {
        label: "Cameras",
        image:
          "https://images.unsplash.com/photo-1526170375885-4d8ecf77b99f?w=250&q=80",
      },
      {
        label: "Speakers",
        image:
          "https://images.unsplash.com/photo-1543512214-318c7553f230?w=250&q=80",
      },
    ],
  },
  {
    id: "home",
    title: "Fantastic finds for home",
    category: "home",
    cta: "Explore more",
    tiles: [
      {
        label: "Kitchen",
        image:
          "https://images.unsplash.com/photo-1556911220-bff31c812dba?w=250&q=80",
      },
      {
        label: "Cookware",
        image:
          "https://images.unsplash.com/photo-1585515320310-259814833e62?w=250&q=80",
      },
      {
        label: "Lighting",
        image:
          "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=250&q=80",
      },
      {
        label: "Bottles",
        image:
          "https://images.unsplash.com/photo-1602143407151-7111542de6e8?w=250&q=80",
      },
    ],
  },
  {
    id: "fashion",
    title: "Shine brighter with fashion",
    category: "fashion",
    cta: "See more",
    tiles: [
      {
        label: "Women",
        image:
          "https://images.unsplash.com/photo-1483985988355-763728e1935b?w=250&q=80",
      },
      {
        label: "Men",
        image:
          "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=250&q=80",
      },
      {
        label: "Footwear",
        image:
          "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=250&q=80",
      },
      {
        label: "Shoes",
        image:
          "https://images.unsplash.com/photo-1460353581641-37baddab0fa2?w=250&q=80",
      },
    ],
  },
  {
    id: "books",
    title: "Level up your reading",
    category: "books",
    cta: "Shop books",
    tiles: [
      {
        label: "Programming",
        image:
          "https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?w=250&q=80",
      },
      {
        label: "Agile",
        image:
          "https://images.unsplash.com/photo-1512820790803-83ca734da794?w=250&q=80",
      },
      {
        label: "Classics",
        image:
          "https://images.unsplash.com/photo-1495446815901-a7297e633e8d?w=250&q=80",
      },
      {
        label: "New arrivals",
        image:
          "https://images.unsplash.com/photo-1476275466078-4007374efbbe?w=250&q=80",
      },
    ],
  },
];

// Footer link columns (like Amazon's four-column footer).
export const footerSections = [
  {
    id: "know-us",
    title: "Get to Know Us",
    links: ["Careers", "Blog", "About Amazon.rebuild", "Investor Relations", "Devices"],
  },
  {
    id: "make-money",
    title: "Make Money with Us",
    links: [
      "Sell products",
      "Sell on Business",
      "Become an Affiliate",
      "Advertise Your Products",
      "Self-Publish with Us",
    ],
  },
  {
    id: "payment",
    title: "Payment Products",
    links: [
      "Business Card",
      "Shop with Points",
      "Reload Your Balance",
      "Currency Converter",
    ],
  },
  {
    id: "help",
    title: "Let Us Help You",
    links: [
      "Your Account",
      "Your Orders",
      "Shipping Rates & Policies",
      "Returns & Replacements",
      "Help",
    ],
  },
];
