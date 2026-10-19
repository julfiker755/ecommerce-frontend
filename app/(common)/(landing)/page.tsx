import { HeroBanner } from '@/components/common/landing/hero-banner';
import { CategorySlider } from '@/components/common/landing/category-slider';
import { ProductSection } from '@/components/common/landing/product-section';
import { PromoBanner } from '@/components/common/landing/promo-banner';
import { PopularProducts } from '@/components/common/landing/popular-products';
import { Newsletter } from '@/components/common/landing/newsletter';
import { getProductsByCategory, products } from '@/lib/data';
import { FeatureStrip } from '@/components/common/landing/feature-strip';
import { FlashSale } from '@/components/common/landing/flash-sale';

export default function HomePage() {
  const flashDeals = products.filter((p) => p.oldPrice).slice(0, 5);
  const bestSelling = products
    .filter((p) => p.badge === 'Best Selling' || p.badge === 'Hot')
    .slice(0, 4);

  return (
    <>
      <HeroBanner />
      <FeatureStrip />
      <div id="categories" className="scroll-mt-32">
        <CategorySlider />
      </div>
      <FlashSale products={flashDeals} />
      <ProductSection title="Best Selling Products" eyebrow="Top Picks" href="/#popular" products={bestSelling} />
      <ProductSection
        id="fashion"
        title="Fashion & Clothing"
        eyebrow="New Season"
        href="/#clothing"
        products={getProductsByCategory('clothing').slice(0, 4)}
      />
      <PromoBanner />
      <ProductSection
        id="gadgets"
        title="Electronics & Gadgets"
        eyebrow="Tech Deals"
        href="/#electronics"
        products={getProductsByCategory('electronics').slice(0, 4)}
      />
      <PopularProducts />
      <Newsletter />
    </>
  );
}
