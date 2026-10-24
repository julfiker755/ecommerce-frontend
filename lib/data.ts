// ===== Storefront mock data (replace with API later) =====

export const siteInfo = {
  name: 'Shuddho Bazar',
  tagline: 'Everything you need, delivered',
  phone: '+880 1700-000000',
  email: 'support@shuddhobazar.com',
  address: 'Banani, Dhaka 1213, Bangladesh',
  freeDeliveryOver: 1500,
};

export const unsplash = (id: string, w = 800) =>
  `https://images.unsplash.com/photo-${id}?w=${w}&q=80&auto=format&fit=crop`;

const IMG = {
  honeyJar: '1471943311424-646960669fbc',
  honeyDipper: '1558642452-9d2a7deb7f62',
  spicesFlat: '1596040033229-a9821ebd058d',
  spiceBowls: '1532336414038-cf19250c5757',
  almonds: '1508061253366-f7da158b6d46',
  tea: '1544787219-7f47ccb76574',
  rice: '1586201375761-83865001e31c',
  coffeeBeans: '1447933601403-0c6688de566e',
  coffeeBag: '1559056199-641a0ac8b55e',
  oliveOil: '1474979266404-7eaacbcd87c5',
  mango: '1601493700631-2b16ec4b4716',
  broccoli: '1615485290382-441e4d049cb5',
  bread: '1509440159596-0249088772ff',
  flour: '1610725664285-7c57e6eeac3f',
  orange: '1611080626919-7cf5a9dbab5b',
  curry: '1505253758473-96b7015fcd40',
  storeShelf: '1542838132-92c53300491e',
  market: '1488459716781-31db52582fe9',
  foodSpread: '1606787366850-de6330128bfc',
  // clothing
  teeWhite: '1521572163474-6864f9cf17ab',
  teeBlack: '1583743814966-8936f5b7be1a',
  teePrint: '1576566588028-4147f3842f27',
  denim: '1542272604-787c3835535d',
  leatherJacket: '1551028719-00167b16eac5',
  bomberJacket: '1591047139829-d91aecb6caea',
  hoodie: '1556821840-3a63f95609a7',
  shirtBlue: '1596755094514-f87e34085b2c',
  shirtsFolded: '1602810318383-e386cc2a3ccf',
  dressRed: '1595777457583-95e059d581b8',
  // electronics
  headphonesYellow: '1505740420928-5e560c06d30e',
  headphonesGrey: '1546435770-a3e426bf472b',
  earbudsWhite: '1590658268037-6bf12165a8df',
  earbudsBlack: '1606220588913-b3aacb4d2f46',
  watchDark: '1579586337278-3befd40fd17a',
  watchWhite: '1523275335684-37898b6baf30',
  speaker: '1608043152269-423dbba4e7e1',
  phoneSilver: '1592750475338-74b7b21085ab',
  phoneBlue: '1511707171634-5f897ff02aa9',
  laptopDesk: '1496181133206-80ce9b88a853',
  laptopPurple: '1517336714731-489689fd1ca8',
  camera: '1526170375885-4d8ecf77b99f',
  techFlatlay: '1468495244123-6c6c332eeece',
};

// ===== Types =====
export interface ColorVariant {
  name: string;
  hex: string;
  image?: string;
}

export interface WeightVariant {
  label: string;
  price: number;
  oldPrice?: number;
}

export type ProductBadge = 'New' | 'Best Selling' | 'Hot' | 'Organic';

export interface Product {
  id: number;
  slug: string;
  name: string;
  category: string;
  brand: string;
  image: string;
  gallery: string[];
  price: number;
  oldPrice?: number;
  rating: number;
  reviews: number;
  stock: number;
  sku: string;
  origin: string;
  badge?: ProductBadge;
  shortDescription: string;
  description: string[];
  features: string[];
  colors?: ColorVariant[];
  weights?: WeightVariant[];
  /** Label for the `weights` selector, e.g. "Size" or "Storage" */
  optionLabel?: string;
}

export interface Category {
  slug: string;
  name: string;
  image: string;
  children?: string[];
}

export interface HeroSlide {
  id: number;
  eyebrow: string;
  title: string;
  text: string;
  cta: string;
  href: string;
  image: string;
  tone: 'emerald' | 'amber' | 'rose';
}

// ===== Categories =====
export const categories: Category[] = [
  { slug: 'clothing', name: 'Fashion', image: unsplash(IMG.teeWhite, 300), children: ['T-Shirts', 'Shirts', 'Jeans', 'Jackets & Hoodies', 'Women’s Dresses'] },
  { slug: 'electronics', name: 'Electronics', image: unsplash(IMG.headphonesYellow, 300), children: ['Headphones & Earbuds', 'Smartwatches', 'Smartphones', 'Laptops', 'Speakers & Cameras'] },
  { slug: 'honey', name: 'Honey', image: unsplash(IMG.honeyJar, 300), children: ['Wild Honey', 'Mustard Flower Honey', 'Black Seed Honey', 'Honeycomb'] },
  { slug: 'spices', name: 'Spices', image: unsplash(IMG.spicesFlat, 300), children: ['Whole Spices', 'Ground Spices', 'Mixed Masala'] },
  { slug: 'nuts-seeds', name: 'Nuts & Seeds', image: unsplash(IMG.almonds, 300), children: ['Almonds', 'Cashews', 'Chia & Flax'] },
  { slug: 'tea-coffee', name: 'Tea & Coffee', image: unsplash(IMG.coffeeBeans, 300), children: ['Black Tea', 'Green Tea', 'Coffee Beans'] },
  { slug: 'rice-flour', name: 'Rice & Flour', image: unsplash(IMG.rice, 300), children: ['Aromatic Rice', 'Atta', 'Lentils'] },
  { slug: 'oil-ghee', name: 'Oil & Ghee', image: unsplash(IMG.oliveOil, 300), children: ['Mustard Oil', 'Olive Oil', 'Cow Ghee'] },
  { slug: 'fruits', name: 'Fresh Fruits', image: unsplash(IMG.mango, 300), children: ['Seasonal', 'Imported'] },
  { slug: 'vegetables', name: 'Vegetables', image: unsplash(IMG.broccoli, 300), children: ['Leafy Greens', 'Root Vegetables'] },
  { slug: 'bakery', name: 'Bakery', image: unsplash(IMG.bread, 300), children: ['Breads', 'Cookies'] },
];

// ===== Hero =====
export const heroSlides: HeroSlide[] = [
  {
    id: 1,
    eyebrow: 'Straight from the Sundarbans',
    title: '100% Pure & Raw Wild Honey',
    text: 'Hand-harvested, unheated and lab tested. Taste honey the way nature made it.',
    cta: 'Shop Honey',
    href: '/products/wild-forest-honey',
    image: unsplash(IMG.honeyJar, 900),
    tone: 'amber',
  },
  {
    id: 2,
    eyebrow: 'Seasonal Harvest',
    title: 'Fresh Himsagar Mangoes Are Here',
    text: 'Carbide-free mangoes picked from Rajshahi orchards and delivered within 24 hours.',
    cta: 'Order Now',
    href: '/products/himsagar-mango',
    image: unsplash(IMG.mango, 900),
    tone: 'emerald',
  },
  {
    id: 3,
    eyebrow: 'Flat 15% Off',
    title: 'Authentic Hand-Ground Spices',
    text: 'Small-batch masalas, roasted and ground the traditional way for richer flavor.',
    cta: 'Explore Spices',
    href: '/products/shahi-garam-masala',
    image: unsplash(IMG.spicesFlat, 900),
    tone: 'rose',
  },
  {
    id: 4,
    eyebrow: 'Gadget Week · Up to 25% Off',
    title: 'Sound That Moves You',
    text: 'Wireless headphones, earbuds and smartwatches with official warranty and free delivery.',
    cta: 'Shop Electronics',
    href: '/products/wireless-over-ear-headphones',
    image: unsplash(IMG.headphonesYellow, 900),
    tone: 'amber',
  },
  {
    id: 5,
    eyebrow: 'New Season Collection',
    title: 'Everyday Essentials, Elevated',
    text: 'Premium cotton tees, denim and jackets designed for comfort and made to last.',
    cta: 'Shop Fashion',
    href: '/products/classic-cotton-t-shirt',
    image: unsplash(IMG.teeWhite, 900),
    tone: 'emerald',
  },
];

export const promoBanners = [
  {
    id: 1,
    eyebrow: 'Weekend Deal',
    title: 'Healthy Snacking, Smarter Prices',
    text: 'Save up to 25% on premium nuts & dry fruits.',
    href: '/products/california-almonds',
    image: unsplash(IMG.almonds, 700),
    tone: 'emerald' as const,
  },
  {
    id: 2,
    eyebrow: 'Free Delivery',
    title: 'Stock Up Your Kitchen',
    text: `Free home delivery on orders over ৳${siteInfo.freeDeliveryOver}.`,
    href: '/products/chinigura-aromatic-rice',
    image: unsplash(IMG.curry, 700),
    tone: 'amber' as const,
  },
];

// ===== Products =====
export const products: Product[] = [
  {
    id: 1,
    slug: 'wild-forest-honey',
    name: 'Wild Forest Honey',
    category: 'honey',
    brand: 'Shuddho',
    image: unsplash(IMG.honeyJar),
    gallery: [unsplash(IMG.honeyJar), unsplash(IMG.honeyDipper), unsplash(IMG.foodSpread)],
    price: 1125,
    oldPrice: 1250,
    rating: 4.8,
    reviews: 214,
    stock: 32,
    sku: 'SB-HNY-001',
    origin: 'Sundarbans, Bangladesh',
    badge: 'Best Selling',
    shortDescription:
      'Raw multi-floral honey collected from wild giant honeybee hives deep in the mangrove forest. Unheated, unfiltered and free from added sugar.',
    description: [
      'Our Wild Forest Honey is ethically hand-harvested by traditional mouals from the protected zones of the Sundarbans. Bees feed on Khalisha, Garan and Keora blossoms, giving the honey its distinct light-amber color and gently tangy, floral taste.',
      'Every batch is moisture tested and lab verified before bottling, so you get honey that is rich in natural enzymes, pollen and antioxidants — exactly as nature intended.',
    ],
    features: ['100% natural & raw', 'Lab tested every batch', 'No added sugar or syrup', 'Food-grade glass jar'],
    colors: [
      { name: 'Golden', hex: '#E7A93B', image: unsplash(IMG.honeyJar) },
      { name: 'Amber', hex: '#B86B1B', image: unsplash(IMG.honeyDipper) },
      { name: 'Dark', hex: '#6B3A12', image: unsplash(IMG.foodSpread) },
    ],
    weights: [
      { label: '250g', price: 320, oldPrice: 350 },
      { label: '500g', price: 600, oldPrice: 650 },
      { label: '1kg', price: 1125, oldPrice: 1250 },
    ],
  },
  {
    id: 2,
    slug: 'raw-mustard-flower-honey',
    name: 'Raw Mustard Flower Honey',
    category: 'honey',
    brand: 'Shuddho',
    image: unsplash(IMG.honeyDipper),
    gallery: [unsplash(IMG.honeyDipper), unsplash(IMG.honeyJar)],
    price: 650,
    oldPrice: 700,
    rating: 4.6,
    reviews: 98,
    stock: 54,
    sku: 'SB-HNY-002',
    origin: 'Sirajganj, Bangladesh',
    badge: 'Hot',
    shortDescription: 'Creamy, naturally crystallising honey from winter mustard fields. Mild, buttery and perfect for breakfast.',
    description: [
      'Harvested during the mustard bloom, this honey crystallises naturally into a smooth, spreadable texture — a sign of purity, not adulteration.',
    ],
    features: ['Naturally crystallises', 'Rich in glucose for quick energy', 'Ideal for kids', 'Glass jar packaging'],
    weights: [
      { label: '500g', price: 650, oldPrice: 700 },
      { label: '1kg', price: 1250, oldPrice: 1350 },
    ],
  },
  {
    id: 3,
    slug: 'shahi-garam-masala',
    name: 'Shahi Garam Masala',
    category: 'spices',
    brand: 'Mashla Ghor',
    image: unsplash(IMG.spicesFlat),
    gallery: [unsplash(IMG.spicesFlat), unsplash(IMG.spiceBowls), unsplash(IMG.curry)],
    price: 425,
    oldPrice: 500,
    rating: 4.7,
    reviews: 156,
    stock: 80,
    sku: 'SB-SPC-003',
    origin: 'Dhaka, Bangladesh',
    badge: 'Best Selling',
    shortDescription: 'A royal blend of 14 hand-roasted whole spices, stone ground in small batches for a deep, aromatic finish.',
    description: [
      'Cardamom, cinnamon, clove, mace, nutmeg and more — slow roasted and ground in small batches so the essential oils stay locked in. A pinch transforms biryani, korma and rezala.',
    ],
    features: ['14 premium whole spices', 'No colour or preservatives', 'Stone ground', 'Zip-lock pouch'],
    weights: [
      { label: '100g', price: 220, oldPrice: 260 },
      { label: '250g', price: 425, oldPrice: 500 },
    ],
  },
  {
    id: 4,
    slug: 'kala-bhuna-masala-mix',
    name: 'Kala Bhuna Masala Mix',
    category: 'spices',
    brand: 'Mashla Ghor',
    image: unsplash(IMG.spiceBowls),
    gallery: [unsplash(IMG.spiceBowls), unsplash(IMG.curry)],
    price: 700,
    oldPrice: 750,
    rating: 4.5,
    reviews: 64,
    stock: 40,
    sku: 'SB-SPC-004',
    origin: 'Chattogram, Bangladesh',
    shortDescription: 'The authentic Chattogram-style blend for rich, dark kala bhuna beef and mutton.',
    description: ['Slow roasted chilli, coriander, cumin and secret aromatics for the iconic smoky depth of Chatgaiya kala bhuna.'],
    features: ['Traditional Chatgaiya recipe', 'No artificial colour', 'Serves 4–5 kg meat per 500g'],
  },
  {
    id: 5,
    slug: 'california-almonds',
    name: 'California Almonds',
    category: 'nuts-seeds',
    brand: 'NutriPick',
    image: unsplash(IMG.almonds),
    gallery: [unsplash(IMG.almonds), unsplash(IMG.foodSpread)],
    price: 1150,
    oldPrice: 1350,
    rating: 4.9,
    reviews: 302,
    stock: 25,
    sku: 'SB-NUT-005',
    origin: 'California, USA',
    badge: 'Hot',
    shortDescription: 'Crunchy, plump grade-A almonds packed with protein, fibre and vitamin E.',
    description: ['Sorted by hand and vacuum packed to keep every almond fresh and crunchy. A perfect daily snack for energy and heart health.'],
    features: ['Grade-A jumbo size', 'Vacuum sealed for freshness', 'High in vitamin E'],
    weights: [
      { label: '250g', price: 320 },
      { label: '500g', price: 600, oldPrice: 690 },
      { label: '1kg', price: 1150, oldPrice: 1350 },
    ],
  },
  {
    id: 6,
    slug: 'premium-assam-black-tea',
    name: 'Premium Assam Black Tea',
    category: 'tea-coffee',
    brand: 'Chayer Bagan',
    image: unsplash(IMG.tea),
    gallery: [unsplash(IMG.tea)],
    price: 380,
    rating: 4.4,
    reviews: 77,
    stock: 120,
    sku: 'SB-TEA-006',
    origin: 'Sylhet, Bangladesh',
    badge: 'New',
    shortDescription: 'Bold, malty CTC tea from the first flush of Sylhet gardens for the perfect cup of doodh cha.',
    description: ['Bright liquor, strong body and a malty finish — brewed for milk tea lovers.'],
    features: ['First flush leaves', 'Strong & malty', 'Resealable pack'],
  },
  {
    id: 7,
    slug: 'arabica-coffee-beans',
    name: 'Arabica Coffee Beans',
    category: 'tea-coffee',
    brand: 'Roast House',
    image: unsplash(IMG.coffeeBeans),
    gallery: [unsplash(IMG.coffeeBeans), unsplash(IMG.coffeeBag)],
    price: 1450,
    oldPrice: 1600,
    rating: 4.7,
    reviews: 121,
    stock: 18,
    sku: 'SB-COF-007',
    origin: 'Chiang Rai, Thailand',
    badge: 'New',
    shortDescription: 'Single-origin specialty arabica, roasted fresh every week. Choose your roast level.',
    description: [
      'Notes of dark chocolate, caramel and a hint of citrus. Roasted in small batches and shipped within 7 days of roasting for peak flavour.',
    ],
    features: ['100% Arabica', 'Roasted weekly', 'One-way valve bag'],
    colors: [
      { name: 'Light Roast', hex: '#A0703C', image: unsplash(IMG.coffeeBag) },
      { name: 'Medium Roast', hex: '#6F4422', image: unsplash(IMG.coffeeBeans) },
      { name: 'Dark Roast', hex: '#3B2314', image: unsplash(IMG.coffeeBeans) },
    ],
    weights: [
      { label: '250g', price: 780 },
      { label: '500g', price: 1450, oldPrice: 1600 },
    ],
  },
  {
    id: 8,
    slug: 'chinigura-aromatic-rice',
    name: 'Chinigura Aromatic Rice',
    category: 'rice-flour',
    brand: 'Shuddho',
    image: unsplash(IMG.rice),
    gallery: [unsplash(IMG.rice), unsplash(IMG.curry)],
    price: 690,
    rating: 4.6,
    reviews: 189,
    stock: 200,
    sku: 'SB-RCE-008',
    origin: 'Dinajpur, Bangladesh',
    badge: 'Best Selling',
    shortDescription: 'Short-grain, naturally fragrant rice — the soul of polao, payesh and khichuri.',
    description: ['Aged for 6 months for better aroma and non-sticky texture.'],
    features: ['Naturally aromatic', 'Aged 6 months', 'Stone & dust free'],
    weights: [
      { label: '1kg', price: 160 },
      { label: '5kg', price: 690 },
    ],
  },
  {
    id: 9,
    slug: 'whole-wheat-chakki-atta',
    name: 'Whole Wheat Chakki Atta',
    category: 'rice-flour',
    brand: 'Shuddho',
    image: unsplash(IMG.flour),
    gallery: [unsplash(IMG.flour), unsplash(IMG.bread)],
    price: 140,
    rating: 4.3,
    reviews: 45,
    stock: 150,
    sku: 'SB-FLR-009',
    origin: 'Rajshahi, Bangladesh',
    badge: 'Organic',
    shortDescription: 'Stone-milled whole wheat flour with all the bran intact for soft, fibre-rich rotis.',
    description: ['Milled on traditional chakki for higher fibre and a naturally sweet taste.'],
    features: ['100% whole wheat', 'High fibre', 'No maida mixed'],
  },
  {
    id: 10,
    slug: 'extra-virgin-olive-oil',
    name: 'Extra Virgin Olive Oil',
    category: 'oil-ghee',
    brand: 'Oliva',
    image: unsplash(IMG.oliveOil),
    gallery: [unsplash(IMG.oliveOil), unsplash(IMG.foodSpread)],
    price: 1280,
    oldPrice: 1600,
    rating: 4.8,
    reviews: 88,
    stock: 30,
    sku: 'SB-OIL-010',
    origin: 'Andalusia, Spain',
    badge: 'Organic',
    shortDescription: 'First cold-pressed olive oil with a fresh, peppery finish. Ideal for salads and light cooking.',
    description: ['Pressed within hours of harvest to preserve polyphenols and a vibrant green-gold colour.'],
    features: ['First cold press', 'Acidity < 0.5%', 'Dark glass bottle'],
    weights: [
      { label: '500ml', price: 680, oldPrice: 850 },
      { label: '1L', price: 1280, oldPrice: 1600 },
    ],
  },
  {
    id: 11,
    slug: 'himsagar-mango',
    name: 'Himsagar Mango',
    category: 'fruits',
    brand: 'Bagan Fresh',
    image: unsplash(IMG.mango),
    gallery: [unsplash(IMG.mango)],
    price: 1150,
    oldPrice: 1300,
    rating: 4.9,
    reviews: 412,
    stock: 60,
    sku: 'SB-FRT-011',
    origin: 'Rajshahi, Bangladesh',
    badge: 'Hot',
    shortDescription: 'Fibreless, sweet Himsagar mangoes. Carbide-free and naturally ripened. Sold per 5kg crate.',
    description: ['Picked at the right maturity and naturally ripened in straw — just like at grandma’s house.'],
    features: ['Carbide-free', 'Naturally ripened', 'Delivered in 24 hours'],
  },
  {
    id: 12,
    slug: 'fresh-broccoli',
    name: 'Fresh Broccoli',
    category: 'vegetables',
    brand: 'Bagan Fresh',
    image: unsplash(IMG.broccoli),
    gallery: [unsplash(IMG.broccoli)],
    price: 120,
    rating: 4.2,
    reviews: 23,
    stock: 70,
    sku: 'SB-VEG-012',
    origin: 'Savar, Bangladesh',
    badge: 'Organic',
    shortDescription: 'Crisp, pesticide-free broccoli harvested the same morning. Approx. 400–500g per piece.',
    description: ['Grown on partner organic farms without chemical pesticides.'],
    features: ['Same-day harvest', 'Pesticide free'],
  },
  {
    id: 13,
    slug: 'artisan-sourdough-bread',
    name: 'Artisan Sourdough Bread',
    category: 'bakery',
    brand: 'Crust & Co.',
    image: unsplash(IMG.bread),
    gallery: [unsplash(IMG.bread), unsplash(IMG.flour)],
    price: 350,
    rating: 4.5,
    reviews: 51,
    stock: 15,
    sku: 'SB-BKR-013',
    origin: 'Dhaka, Bangladesh',
    shortDescription: '48-hour fermented sourdough with a crackly crust and soft, open crumb.',
    description: ['Made with just flour, water, salt and our 5-year-old starter.'],
    features: ['No commercial yeast', 'Baked fresh daily'],
  },
  {
    id: 14,
    slug: 'sweet-malta-orange',
    name: 'Sweet Malta Orange',
    category: 'fruits',
    brand: 'Bagan Fresh',
    image: unsplash(IMG.orange),
    gallery: [unsplash(IMG.orange)],
    price: 280,
    oldPrice: 320,
    rating: 4.4,
    reviews: 37,
    stock: 90,
    sku: 'SB-FRT-014',
    origin: 'Panchagarh, Bangladesh',
    shortDescription: 'Juicy, sweet malta oranges rich in vitamin C. Sold per kg.',
    description: ['Freshly picked and hand sorted for size and sweetness.'],
    features: ['Rich in vitamin C', 'Hand sorted'],
  },

  // ===== Clothing =====
  {
    id: 15,
    slug: 'classic-cotton-t-shirt',
    name: 'Classic Cotton Crew-Neck T-Shirt',
    category: 'clothing',
    brand: 'Urban Thread',
    image: unsplash(IMG.teeWhite),
    gallery: [unsplash(IMG.teeWhite), unsplash(IMG.teeBlack), unsplash(IMG.teePrint)],
    price: 650,
    oldPrice: 850,
    rating: 4.6,
    reviews: 342,
    stock: 120,
    sku: 'SB-CLT-015',
    origin: 'Made in Bangladesh',
    badge: 'Best Selling',
    shortDescription: '180 GSM combed cotton tee with a relaxed regular fit. Soft, breathable and pre-shrunk so it keeps its shape wash after wash.',
    description: [
      'A wardrobe staple cut from 100% combed ring-spun cotton. The ribbed crew neck holds its shape, and double-stitched hems make it built to last.',
      'Pre-washed and bio-polished for an ultra-soft feel from the very first wear.',
    ],
    features: ['100% combed cotton, 180 GSM', 'Pre-shrunk & colour fast', 'Regular fit', 'Machine washable'],
    colors: [
      { name: 'White', hex: '#F5F5F2', image: unsplash(IMG.teeWhite) },
      { name: 'Black', hex: '#1F1F1F', image: unsplash(IMG.teeBlack) },
      { name: 'Beige Print', hex: '#D9C9AE', image: unsplash(IMG.teePrint) },
    ],
    optionLabel: 'Size',
    weights: [
      { label: 'S', price: 650, oldPrice: 850 },
      { label: 'M', price: 650, oldPrice: 850 },
      { label: 'L', price: 650, oldPrice: 850 },
      { label: 'XL', price: 690, oldPrice: 890 },
      { label: 'XXL', price: 690, oldPrice: 890 },
    ],
  },
  {
    id: 16,
    slug: 'slim-fit-denim-jeans',
    name: 'Slim Fit Stretch Denim Jeans',
    category: 'clothing',
    brand: 'Urban Thread',
    image: unsplash(IMG.denim),
    gallery: [unsplash(IMG.denim)],
    price: 1850,
    oldPrice: 2200,
    rating: 4.5,
    reviews: 128,
    stock: 64,
    sku: 'SB-CLT-016',
    origin: 'Made in Bangladesh',
    badge: 'Hot',
    shortDescription: 'Mid-rise slim fit jeans in 12 oz stretch denim — sharp enough for the office, comfortable enough for the weekend.',
    description: ['Cotton-elastane stretch denim moves with you while keeping a clean, tailored silhouette. Classic five-pocket styling with YKK zip.'],
    features: ['98% cotton, 2% elastane', 'Slim tapered fit', 'YKK metal zip', 'Fade-resistant wash'],
    colors: [
      { name: 'Indigo', hex: '#2F4A6D' },
      { name: 'Jet Black', hex: '#1C1C1E' },
    ],
    optionLabel: 'Waist',
    weights: [
      { label: '30', price: 1850, oldPrice: 2200 },
      { label: '32', price: 1850, oldPrice: 2200 },
      { label: '34', price: 1850, oldPrice: 2200 },
      { label: '36', price: 1950, oldPrice: 2300 },
    ],
  },
  {
    id: 17,
    slug: 'leather-biker-jacket',
    name: 'Genuine Leather Biker Jacket',
    category: 'clothing',
    brand: 'Hide & Co.',
    image: unsplash(IMG.leatherJacket),
    gallery: [unsplash(IMG.leatherJacket), unsplash(IMG.bomberJacket)],
    price: 5500,
    oldPrice: 6500,
    rating: 4.8,
    reviews: 76,
    stock: 14,
    sku: 'SB-CLT-017',
    origin: 'Made in Bangladesh',
    badge: 'New',
    shortDescription: 'Full-grain cowhide biker jacket with asymmetric zip and quilted lining. Gets better with every wear.',
    description: ['Hand-finished full-grain leather with heavy-duty metal hardware, zip cuffs and a warm quilted satin lining.'],
    features: ['Full-grain cowhide leather', 'Quilted satin lining', '3 zip pockets', 'Dry clean only'],
    colors: [
      { name: 'Black', hex: '#141414', image: unsplash(IMG.leatherJacket) },
      { name: 'Tan', hex: '#B5683A', image: unsplash(IMG.bomberJacket) },
    ],
    optionLabel: 'Size',
    weights: [
      { label: 'M', price: 5500, oldPrice: 6500 },
      { label: 'L', price: 5500, oldPrice: 6500 },
      { label: 'XL', price: 5800, oldPrice: 6800 },
    ],
  },
  {
    id: 18,
    slug: 'fleece-pullover-hoodie',
    name: 'Fleece Pullover Hoodie',
    category: 'clothing',
    brand: 'Urban Thread',
    image: unsplash(IMG.hoodie),
    gallery: [unsplash(IMG.hoodie)],
    price: 1650,
    rating: 4.4,
    reviews: 58,
    stock: 45,
    sku: 'SB-CLT-018',
    origin: 'Made in Bangladesh',
    shortDescription: 'Cosy 320 GSM brushed fleece hoodie with kangaroo pocket and adjustable drawcord hood.',
    description: ['Brushed inside for warmth, with ribbed cuffs and hem that keep the cold out.'],
    features: ['320 GSM brushed fleece', 'Kangaroo pocket', 'Adjustable hood'],
    colors: [
      { name: 'Heather Grey', hex: '#9EA3A8' },
      { name: 'Charcoal', hex: '#3A3D40' },
      { name: 'Olive', hex: '#5B6248' },
    ],
    optionLabel: 'Size',
    weights: [
      { label: 'M', price: 1650 },
      { label: 'L', price: 1650 },
      { label: 'XL', price: 1750 },
    ],
  },
  {
    id: 19,
    slug: 'casual-oxford-shirt',
    name: 'Casual Oxford Button-Down Shirt',
    category: 'clothing',
    brand: 'Urban Thread',
    image: unsplash(IMG.shirtBlue),
    gallery: [unsplash(IMG.shirtBlue), unsplash(IMG.shirtsFolded)],
    price: 1450,
    oldPrice: 1700,
    rating: 4.5,
    reviews: 91,
    stock: 50,
    sku: 'SB-CLT-019',
    origin: 'Made in Bangladesh',
    shortDescription: 'Soft-washed oxford cotton shirt with button-down collar. Dress it up or down.',
    description: ['Woven from breathable oxford cotton, garment-washed for a lived-in softness.'],
    features: ['100% oxford cotton', 'Button-down collar', 'Regular fit'],
    colors: [
      { name: 'Chambray Blue', hex: '#5A7FA6', image: unsplash(IMG.shirtBlue) },
      { name: 'Maroon', hex: '#6B2737', image: unsplash(IMG.shirtsFolded) },
    ],
    optionLabel: 'Size',
    weights: [
      { label: 'S', price: 1450, oldPrice: 1700 },
      { label: 'M', price: 1450, oldPrice: 1700 },
      { label: 'L', price: 1450, oldPrice: 1700 },
      { label: 'XL', price: 1450, oldPrice: 1700 },
    ],
  },
  {
    id: 20,
    slug: 'flowy-maxi-dress',
    name: 'Flowy Chiffon Maxi Dress',
    category: 'clothing',
    brand: 'Bloom',
    image: unsplash(IMG.dressRed),
    gallery: [unsplash(IMG.dressRed)],
    price: 2450,
    oldPrice: 2900,
    rating: 4.7,
    reviews: 64,
    stock: 22,
    sku: 'SB-CLT-020',
    origin: 'Made in Bangladesh',
    badge: 'New',
    shortDescription: 'Lightweight chiffon maxi with a swing skirt and soft lining — perfect for summer evenings and festive days.',
    description: ['Flowing tiered silhouette with an adjustable waist tie and fully lined bodice.'],
    features: ['Lined chiffon', 'Adjustable waist tie', 'Hand wash cold'],
    colors: [
      { name: 'Scarlet', hex: '#D7262E' },
      { name: 'Emerald', hex: '#1F6B4F' },
      { name: 'Midnight', hex: '#1E2240' },
    ],
    optionLabel: 'Size',
    weights: [
      { label: 'S', price: 2450, oldPrice: 2900 },
      { label: 'M', price: 2450, oldPrice: 2900 },
      { label: 'L', price: 2450, oldPrice: 2900 },
    ],
  },

  // ===== Electronics =====
  {
    id: 21,
    slug: 'wireless-over-ear-headphones',
    name: 'Wireless ANC Over-Ear Headphones',
    category: 'electronics',
    brand: 'SonicWave',
    image: unsplash(IMG.headphonesYellow),
    gallery: [unsplash(IMG.headphonesYellow), unsplash(IMG.headphonesGrey)],
    price: 3200,
    oldPrice: 3990,
    rating: 4.7,
    reviews: 268,
    stock: 35,
    sku: 'SB-ELC-021',
    origin: '1 year official warranty',
    badge: 'Best Selling',
    shortDescription: 'Active noise cancelling, 40-hour battery and plush memory-foam cushions for all-day listening.',
    description: [
      'Hybrid ANC blocks out up to 35 dB of noise so you can focus on what matters. 40mm dynamic drivers deliver deep bass and crisp highs.',
      '10 minutes of charging gives you 5 hours of playback. Multipoint Bluetooth 5.3 connects your phone and laptop at the same time.',
    ],
    features: ['Hybrid ANC up to 35 dB', '40 hr battery, USB-C fast charge', 'Bluetooth 5.3 multipoint', 'Foldable design with case'],
    colors: [
      { name: 'Matte Black', hex: '#1B1B1D', image: unsplash(IMG.headphonesYellow) },
      { name: 'Space Grey', hex: '#5E6166', image: unsplash(IMG.headphonesGrey) },
    ],
  },
  {
    id: 22,
    slug: 'true-wireless-earbuds',
    name: 'True Wireless Earbuds Pro',
    category: 'electronics',
    brand: 'SonicWave',
    image: unsplash(IMG.earbudsWhite),
    gallery: [unsplash(IMG.earbudsWhite), unsplash(IMG.earbudsBlack)],
    price: 1890,
    oldPrice: 2490,
    rating: 4.5,
    reviews: 412,
    stock: 80,
    sku: 'SB-ELC-022',
    origin: '6 months official warranty',
    badge: 'Hot',
    shortDescription: 'Compact earbuds with ENC calling, low-latency game mode and 30 hours total playtime with case.',
    description: ['Touch controls, IPX5 sweat resistance and a pocket-friendly charging case.'],
    features: ['30 hr total playtime', 'ENC dual-mic calls', 'IPX5 water resistant', 'Low-latency game mode'],
    colors: [
      { name: 'Pearl White', hex: '#F2F2F2', image: unsplash(IMG.earbudsWhite) },
      { name: 'Carbon Black', hex: '#202020', image: unsplash(IMG.earbudsBlack) },
    ],
  },
  {
    id: 23,
    slug: 'smart-watch-active',
    name: 'Smart Watch Active 2',
    category: 'electronics',
    brand: 'Pulse',
    image: unsplash(IMG.watchDark),
    gallery: [unsplash(IMG.watchDark), unsplash(IMG.watchWhite)],
    price: 4500,
    oldPrice: 5200,
    rating: 4.6,
    reviews: 189,
    stock: 28,
    sku: 'SB-ELC-023',
    origin: '1 year official warranty',
    badge: 'New',
    shortDescription: '1.9" AMOLED display, Bluetooth calling, heart-rate & SpO2 tracking and up to 10 days battery.',
    description: ['Track 100+ sports modes, sleep and stress. Answer calls straight from your wrist with the built-in mic and speaker.'],
    features: ['1.9" AMOLED always-on display', 'Bluetooth calling', 'Heart rate, SpO2 & sleep', 'IP68 water resistant'],
    colors: [
      { name: 'Midnight', hex: '#25262B', image: unsplash(IMG.watchDark) },
      { name: 'Silver White', hex: '#E6E6E3', image: unsplash(IMG.watchWhite) },
    ],
    optionLabel: 'Case',
    weights: [
      { label: '41mm', price: 4500, oldPrice: 5200 },
      { label: '45mm', price: 4900, oldPrice: 5600 },
    ],
  },
  {
    id: 24,
    slug: 'portable-bluetooth-speaker',
    name: 'Portable Waterproof Bluetooth Speaker',
    category: 'electronics',
    brand: 'Boomly',
    image: unsplash(IMG.speaker),
    gallery: [unsplash(IMG.speaker)],
    price: 2800,
    rating: 4.4,
    reviews: 97,
    stock: 40,
    sku: 'SB-ELC-024',
    origin: '1 year official warranty',
    shortDescription: '360° room-filling sound, punchy bass and IPX7 waterproofing. Up to 12 hours playtime.',
    description: ['Take the party anywhere — pool, beach or rooftop. Pair two speakers for stereo sound.'],
    features: ['20W output', 'IPX7 waterproof', '12 hr battery', 'Stereo pairing'],
    colors: [
      { name: 'Black', hex: '#1A1A1A' },
      { name: 'Ocean Blue', hex: '#1F4E79' },
      { name: 'Red', hex: '#B3262E' },
    ],
  },
  {
    id: 25,
    slug: 'smartphone-x-pro',
    name: 'Smartphone X Pro 5G',
    category: 'electronics',
    brand: 'Novatek',
    image: unsplash(IMG.phoneSilver),
    gallery: [unsplash(IMG.phoneSilver), unsplash(IMG.phoneBlue)],
    price: 32999,
    oldPrice: 35999,
    rating: 4.7,
    reviews: 154,
    stock: 12,
    sku: 'SB-ELC-025',
    origin: '1 year official warranty',
    badge: 'Hot',
    shortDescription: '6.7" 120Hz AMOLED, 50MP triple camera, 5000mAh battery with 67W fast charging.',
    description: [
      'A flagship-grade display, all-day battery and a pro camera system that shines even at night. Comes with an official 1 year brand warranty.',
    ],
    features: ['6.7" 120Hz AMOLED', '50MP OIS triple camera', '5000mAh, 67W charging', '5G dual SIM'],
    colors: [
      { name: 'Titanium Silver', hex: '#C9CACC', image: unsplash(IMG.phoneSilver) },
      { name: 'Sky Blue', hex: '#4FA3D1', image: unsplash(IMG.phoneBlue) },
    ],
    optionLabel: 'Storage',
    weights: [
      { label: '8/128GB', price: 32999, oldPrice: 35999 },
      { label: '12/256GB', price: 37999, oldPrice: 40999 },
    ],
  },
  {
    id: 26,
    slug: 'ultrabook-laptop-14',
    name: 'Ultrabook 14" Laptop',
    category: 'electronics',
    brand: 'Novatek',
    image: unsplash(IMG.laptopDesk),
    gallery: [unsplash(IMG.laptopDesk), unsplash(IMG.laptopPurple), unsplash(IMG.techFlatlay)],
    price: 89999,
    oldPrice: 96999,
    rating: 4.8,
    reviews: 63,
    stock: 8,
    sku: 'SB-ELC-026',
    origin: '2 years official warranty',
    shortDescription: 'Thin and light aluminium laptop with 14" 2.8K display, latest-gen processor and 15-hour battery.',
    description: ['Weighs just 1.3 kg, wakes instantly and handles everything from spreadsheets to photo editing.'],
    features: ['14" 2.8K 90Hz display', 'Up to 16GB RAM, 512GB SSD', '15 hr battery', 'Backlit keyboard, Wi-Fi 6E'],
    colors: [
      { name: 'Silver', hex: '#D4D5D7', image: unsplash(IMG.laptopDesk) },
      { name: 'Space Grey', hex: '#4A4C50', image: unsplash(IMG.laptopPurple) },
    ],
    optionLabel: 'Memory',
    weights: [
      { label: '8GB / 256GB', price: 79999, oldPrice: 86999 },
      { label: '16GB / 512GB', price: 89999, oldPrice: 96999 },
    ],
  },
  {
    id: 27,
    slug: 'instant-film-camera',
    name: 'Instant Film Camera',
    category: 'electronics',
    brand: 'Snapix',
    image: unsplash(IMG.camera),
    gallery: [unsplash(IMG.camera)],
    price: 7500,
    oldPrice: 8200,
    rating: 4.6,
    reviews: 41,
    stock: 16,
    sku: 'SB-ELC-027',
    origin: '1 year official warranty',
    shortDescription: 'Point, shoot and print in seconds. Auto exposure, selfie mirror and built-in flash.',
    description: ['Capture memories you can hold. Includes a 10-sheet starter film pack.'],
    features: ['Auto exposure', 'Selfie mirror', 'Built-in flash', 'Starter film pack included'],
    colors: [
      { name: 'Cream White', hex: '#EDEAE3' },
      { name: 'Charcoal', hex: '#2E2F31' },
    ],
  },
];

export const testimonials = [
  {
    id: 1,
    name: 'Nusrat J.',
    location: 'Dhanmondi, Dhaka',
    text: 'The wild honey is the real deal — you can taste the difference. Delivery was next morning and the packaging was spotless.',
    rating: 5,
  },
  {
    id: 2,
    name: 'Tanvir A.',
    location: 'Agrabad, Chattogram',
    text: 'Kala bhuna masala tastes exactly like home. I have re-ordered three times already. Great customer support too.',
    rating: 5,
  },
  {
    id: 3,
    name: 'Farhana R.',
    location: 'Uttara, Dhaka',
    text: 'Mangoes were sweet and properly ripened, not a single bad one in the crate. Will definitely buy again this season.',
    rating: 4,
  },
];

// ===== Checkout =====
export const deliveryCharge = {
  insideDhaka: 60,
  outsideDhaka: 120,
};

export const districts: { label: string; value: string; thanas: string[] }[] = [
  { label: 'Dhaka', value: 'dhaka', thanas: ['Dhanmondi', 'Gulshan', 'Banani', 'Mirpur', 'Mohammadpur', 'Uttara', 'Motijheel', 'Badda', 'Rampura', 'Tejgaon'] },
  { label: 'Chattogram', value: 'chattogram', thanas: ['Agrabad', 'Panchlaish', 'Kotwali', 'Halishahar', 'Pahartali', 'Chandgaon'] },
  { label: 'Gazipur', value: 'gazipur', thanas: ['Tongi', 'Gazipur Sadar', 'Kaliakair', 'Sreepur'] },
  { label: 'Narayanganj', value: 'narayanganj', thanas: ['Narayanganj Sadar', 'Fatullah', 'Siddhirganj', 'Rupganj'] },
  { label: 'Sylhet', value: 'sylhet', thanas: ['Sylhet Sadar', 'Zindabazar', 'Ambarkhana', 'South Surma'] },
  { label: 'Rajshahi', value: 'rajshahi', thanas: ['Boalia', 'Motihar', 'Rajpara', 'Shah Makhdum'] },
  { label: 'Khulna', value: 'khulna', thanas: ['Khulna Sadar', 'Sonadanga', 'Daulatpur', 'Khalishpur'] },
  { label: 'Barishal', value: 'barishal', thanas: ['Barishal Sadar', 'Kotwali', 'Airport'] },
  { label: 'Rangpur', value: 'rangpur', thanas: ['Rangpur Sadar', 'Kotwali', 'Mahiganj'] },
  { label: 'Mymensingh', value: 'mymensingh', thanas: ['Mymensingh Sadar', 'Kotwali', 'Trishal'] },
  { label: 'Cumilla', value: 'cumilla', thanas: ['Cumilla Sadar', 'Kotbari', 'Laksam'] },
];

export type PaymentMethod = 'cod' | 'bkash' | 'online';

// ===== Selectors =====
export const getProductBySlug = (slug: string) => products.find((p) => p.slug === slug);

export const getProductsByCategory = (category: string) =>
  products.filter((p) => p.category === category);

export const getRelatedProducts = (product: Product, limit = 5) =>
  [
    ...products.filter((p) => p.category === product.category && p.id !== product.id),
    ...products.filter((p) => p.category !== product.category),
  ].slice(0, limit);

export const getCategory = (slug: string) => categories.find((c) => c.slug === slug);

export const discountPercent = (price: number, oldPrice?: number) =>
  oldPrice && oldPrice > price ? Math.round(((oldPrice - price) / oldPrice) * 100) : 0;

// ===== Profile & Orders (replace with API later) =====
export const userProfile = {
  name: 'Rahim Uddin',
  email: 'rahim.uddin@example.com',
  phone: '01712345678',
  gender: 'Male',
  birthday: '1995-06-14',
  joinedAt: '2025-03-12',
  address: {
    line: 'House 12, Road 5, Block C',
    thana: 'Banani',
    district: 'Dhaka',
  },
};

export const adminProfile = {
  name: 'Nishaan Super Admin',
  email: 'admin@nishaans.com',
  phone: '01710000001',
  role: 'super_admin' as 'super_admin' | 'admin',
  joinedAt: '2024-01-08',
};

export type OrderStatus = 'pending' | 'accepted' | 'packed' | 'shipped' | 'delivered' | 'cancelled';

export const orderSteps: { status: Exclude<OrderStatus, 'cancelled'>; label: string }[] = [
  { status: 'pending', label: 'Pending' },
  { status: 'accepted', label: 'Accepted' },
  { status: 'packed', label: 'Packed' },
  { status: 'shipped', label: 'Shipped' },
  { status: 'delivered', label: 'Delivered' },
];

export interface OrderItem {
  slug: string;
  name: string;
  image: string;
  price: number;
  quantity: number;
  variant?: string;
}

export interface Order {
  id: string;
  placedAt: string;
  status: OrderStatus;
  payment: PaymentMethod;
  deliveryCharge: number;
  items: OrderItem[];
  /** date each step was reached */
  timeline: Partial<Record<OrderStatus, string>>;
  address: string;
}

const orderItem = (slug: string, quantity: number, variant?: string): OrderItem => {
  const p = products.find((x) => x.slug === slug)!;
  return { slug, name: p.name, image: p.image, price: p.price, quantity, variant };
};

export const orders: Order[] = [
  {
    id: 'SB10482931',
    placedAt: '2026-10-17T10:24:00',
    status: 'pending',
    payment: 'cod',
    deliveryCharge: 60,
    items: [orderItem('wild-forest-honey', 1, 'Golden · 1kg'), orderItem('classic-cotton-t-shirt', 2, 'Black · M')],
    timeline: { pending: '2026-10-17T10:24:00' },
    address: 'House 12, Road 5, Block C, Banani, Dhaka',
  },
  {
    id: 'SB10482877',
    placedAt: '2026-10-15T18:02:00',
    status: 'accepted',
    payment: 'cod',
    deliveryCharge: 0,
    items: [orderItem('true-wireless-earbuds', 1, 'Pearl White')],
    timeline: { pending: '2026-10-15T18:02:00', accepted: '2026-10-15T19:30:00' },
    address: 'House 12, Road 5, Block C, Banani, Dhaka',
  },
  {
    id: 'SB10482650',
    placedAt: '2026-10-12T09:15:00',
    status: 'packed',
    payment: 'cod',
    deliveryCharge: 60,
    items: [orderItem('shahi-garam-masala', 2, '250g'), orderItem('chinigura-aromatic-rice', 1, '5kg')],
    timeline: {
      pending: '2026-10-12T09:15:00',
      accepted: '2026-10-12T10:05:00',
      packed: '2026-10-13T11:40:00',
    },
    address: 'House 12, Road 5, Block C, Banani, Dhaka',
  },
  {
    id: 'SB10482411',
    placedAt: '2026-10-08T21:47:00',
    status: 'shipped',
    payment: 'cod',
    deliveryCharge: 0,
    items: [orderItem('smart-watch-active', 1, 'Midnight · 41mm'), orderItem('california-almonds', 1, '1kg')],
    timeline: {
      pending: '2026-10-08T21:47:00',
      accepted: '2026-10-09T09:12:00',
      packed: '2026-10-09T15:30:00',
      shipped: '2026-10-10T08:20:00',
    },
    address: 'House 12, Road 5, Block C, Banani, Dhaka',
  },
  {
    id: 'SB10481902',
    placedAt: '2026-09-28T13:05:00',
    status: 'delivered',
    payment: 'cod',
    deliveryCharge: 0,
    items: [
      orderItem('leather-biker-jacket', 1, 'Black · L'),
      orderItem('slim-fit-denim-jeans', 1, 'Indigo · 32'),
      orderItem('premium-assam-black-tea', 2),
    ],
    timeline: {
      pending: '2026-09-28T13:05:00',
      accepted: '2026-09-28T14:10:00',
      packed: '2026-09-29T10:00:00',
      shipped: '2026-09-29T17:45:00',
      delivered: '2026-09-30T12:30:00',
    },
    address: 'House 12, Road 5, Block C, Banani, Dhaka',
  },
  {
    id: 'SB10481555',
    placedAt: '2026-09-20T16:40:00',
    status: 'cancelled',
    payment: 'cod',
    deliveryCharge: 60,
    items: [orderItem('himsagar-mango', 1)],
    timeline: { pending: '2026-09-20T16:40:00', cancelled: '2026-09-20T18:00:00' },
    address: 'House 12, Road 5, Block C, Banani, Dhaka',
  },
];

export const getOrder = (id: string) => orders.find((o) => o.id === id);

export const orderSubtotal = (order: Order) =>
  order.items.reduce((sum, i) => sum + i.price * i.quantity, 0);

export const orderTotal = (order: Order) => orderSubtotal(order) + order.deliveryCharge;
