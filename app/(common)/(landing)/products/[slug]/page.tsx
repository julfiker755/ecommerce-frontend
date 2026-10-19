import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { Breadcrumb } from '@/components/common/landing/breadcrumb';
import { ProductTabs } from '@/components/common/landing/product-tabs';
import { ProductSection } from '@/components/common/landing/product-section';
import { getCategory, getProductBySlug, getRelatedProducts, products, siteInfo } from '@/lib/data';
import { ProductDetails } from '@/components/common/landing/product-details';

export function generateStaticParams() {
  return products.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: PageProps<'/products/[slug]'>): Promise<Metadata> {
  const { slug } = await params;
  const product = getProductBySlug(slug);
  if (!product) return { title: `Product not found | ${siteInfo.name}` };
  return {
    title: `${product.name} | ${siteInfo.name}`,
    description: product.shortDescription,
    openGraph: { images: [product.image] },
  };
}

export default async function ProductPage({ params }: PageProps<'/products/[slug]'>) {
  const { slug } = await params;
  const product = getProductBySlug(slug);
  if (!product) notFound();

  const category = getCategory(product.category);

  return (
    <>
      <Breadcrumb
        items={[
          { label: category?.name ?? 'Products', href: `/#${product.category}` },
          { label: product.name },
        ]}
      />
      <ProductDetails key={product.slug} product={product} />
      <ProductTabs key={product.slug} product={product} />
      <ProductSection title="You May Also Like" eyebrow="Related Products" href="/#popular" products={getRelatedProducts(product)} />
    </>
  );
}
