import { HeroBanner } from '@/components/common/hero-banner';
import { FeatureStrip } from '@/components/common/feature-strip';
import { CategorySlider } from '@/components/common/category-slider';
import { FlashSale } from '@/components/common/flash-sale';
import { ProductSection } from '@/components/common/product-section';
import { PromoBanner } from '@/components/common/promo-banner';
import { PopularProducts } from '@/components/common/popular-products';
import { Newsletter } from '@/components/common/newsletter';
import { getProductsByCategory, products } from '@/lib/data';

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
