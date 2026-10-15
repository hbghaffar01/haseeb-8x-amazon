/**
 * Mock product catalog. No real Amazon data is scraped or stored — these are
 * synthetic records used purely to drive the rebuilt storefront UI.
 */
export const categories = [
  { id: "electronics", name: "Electronics" },
  { id: "home", name: "Home & Kitchen" },
  { id: "books", name: "Books" },
  { id: "fashion", name: "Fashion" },
  { id: "toys", name: "Toys & Games" },
];

export const products = [
  {
    id: "p1",
    title: "Echo Dot (5th Gen) Smart Speaker with Alexa",
    category: "electronics",
    price: 49.99,
    oldPrice: 59.99,
    rating: 4.7,
    reviews: 128433,
    prime: true,
    image:
      "https://images.unsplash.com/photo-1543512214-318c7553f230?w=600&q=80",
    description:
      "Our best-sounding Echo Dot yet. Enjoy an improved audio experience with clearer vocals, deeper bass and vibrant sound.",
    inStock: true,
  },
  {
    id: "p2",
    title: "Fire TV Stick 4K streaming device",
    category: "electronics",
    price: 39.99,
    oldPrice: 49.99,
    rating: 4.6,
    reviews: 98211,
    prime: true,
    image:
      "https://images.unsplash.com/photo-1593784991095-a205069470b6?w=600&q=80",
    description:
      "Brilliant 4K Ultra HD streaming with support for Wi-Fi 6, Dolby Vision, HDR and immersive Dolby Atmos audio.",
    inStock: true,
  },
  {
    id: "p3",
    title: "Stainless Steel Insulated Water Bottle 32oz",
    category: "home",
    price: 24.95,
    oldPrice: 32.0,
    rating: 4.8,
    reviews: 54122,
    prime: true,
    image:
      "https://images.unsplash.com/photo-1602143407151-7111542de6e8?w=600&q=80",
    description:
      "Double-wall vacuum insulation keeps drinks cold for 24 hours or hot for 12. Leak-proof and BPA-free.",
    inStock: true,
  },
  {
    id: "p4",
    title: "Non-Stick Ceramic Cookware Set, 12-Piece",
    category: "home",
    price: 89.99,
    oldPrice: 129.99,
    rating: 4.5,
    reviews: 20311,
    prime: false,
    image:
      "https://images.unsplash.com/photo-1556911220-bff31c812dba?w=600&q=80",
    description:
      "Scratch-resistant ceramic coating, oven-safe to 450°F, and dishwasher friendly. Everything you need to cook.",
    inStock: true,
  },
  {
    id: "p5",
    title: "The Pragmatic Programmer: Your Journey to Mastery",
    category: "books",
    price: 34.99,
    oldPrice: 49.99,
    rating: 4.9,
    reviews: 15988,
    prime: true,
    image:
      "https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?w=600&q=80",
    description:
      "A classic of software craftsmanship, fully revised with new material on modern development practices.",
    inStock: true,
  },
  {
    id: "p6",
    title: "Men's Classic Fit Cotton T-Shirt (3-Pack)",
    category: "fashion",
    price: 27.5,
    oldPrice: 35.0,
    rating: 4.4,
    reviews: 44120,
    prime: true,
    image:
      "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=600&q=80",
    description:
      "Soft, breathable 100% combed cotton. Pre-shrunk and tagless for all-day comfort.",
    inStock: true,
  },
  {
    id: "p7",
    title: "Wireless Noise Cancelling Over-Ear Headphones",
    category: "electronics",
    price: 199.0,
    oldPrice: 249.0,
    rating: 4.7,
    reviews: 73155,
    prime: true,
    image:
      "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=600&q=80",
    description:
      "Industry-leading noise cancellation, 30-hour battery life, and crystal-clear hands-free calling.",
    inStock: true,
  },
  {
    id: "p8",
    title: "Building Blocks Creative Set, 1000 Pieces",
    category: "toys",
    price: 59.99,
    oldPrice: 79.99,
    rating: 4.8,
    reviews: 30877,
    prime: false,
    image:
      "https://images.unsplash.com/photo-1558060370-d644479cb6f7?w=600&q=80",
    description:
      "Spark imagination with 1000 compatible building blocks in a rainbow of colors. Ages 6 and up.",
    inStock: true,
  },
  {
    id: "p9",
    title: "Smart LED Desk Lamp with Wireless Charging",
    category: "home",
    price: 42.99,
    oldPrice: 54.99,
    rating: 4.6,
    reviews: 12044,
    prime: true,
    image:
      "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=600&q=80",
    description:
      "Adjustable color temperature, touch controls, and a built-in Qi wireless charging pad for your phone.",
    inStock: true,
  },
  {
    id: "p10",
    title: "4K Ultra HD Action Camera Waterproof",
    category: "electronics",
    price: 129.99,
    oldPrice: 169.99,
    rating: 4.3,
    reviews: 8755,
    prime: true,
    image:
      "https://images.unsplash.com/photo-1526170375885-4d8ecf77b99f?w=600&q=80",
    description:
      "Capture every adventure in stunning 4K. Waterproof to 30m, with image stabilization and Wi-Fi.",
    inStock: false,
  },
  {
    id: "p11",
    title: "Clean Code: A Handbook of Agile Software Craftsmanship",
    category: "books",
    price: 39.99,
    oldPrice: 54.99,
    rating: 4.7,
    reviews: 22100,
    prime: true,
    image:
      "https://images.unsplash.com/photo-1512820790803-83ca734da794?w=600&q=80",
    description:
      "Learn to write code that is readable, maintainable, and a pleasure to work with.",
    inStock: true,
  },
  {
    id: "p12",
    title: "Women's Lightweight Running Shoes",
    category: "fashion",
    price: 64.95,
    oldPrice: 89.95,
    rating: 4.5,
    reviews: 51233,
    prime: true,
    image:
      "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=600&q=80",
    description:
      "Breathable knit upper, responsive cushioning, and a durable rubber outsole for everyday runs.",
    inStock: true,
  },
];
