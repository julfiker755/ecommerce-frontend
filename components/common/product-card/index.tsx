'use client';
import Image from 'next/image';
import Link from 'next/link';
import { Heart, ShoppingBag, Star } from 'lucide-react';
import { Button } from '@/components/ui/button';
import sonner from '@/components/reuseable/sonner';
import { PriceTag } from '../price-tag';
import { useCart } from '@/context/cart';
import { discountPercent, getCategory, type Product } from '@/lib/data';
import { cn } from '@/lib/utils';

const badgeStyles: Record<NonNullable<Product['badge']>, string> = {
  'Best Selling': 'bg-primary text-primary-foreground',
  Hot: 'bg-accent text-accent-foreground',
  New: 'bg-brand-dark text-white',
  Organic: 'bg-secondary text-secondary-foreground',
};

interface ProductCardProps {
  product: Product;
  className?: string;
}

export function ProductCard({ product, className }: ProductCardProps) {
  const { addItem, toggleWishlist, wishlist } = useCart();
  const off = discountPercent(product.price, product.oldPrice);
  const liked = wishlist.includes(product.slug);
  const href = `/products/${product.slug}`;

  const handleAdd = () => {
    addItem({
      slug: product.slug,
      name: product.name,
      image: product.image,
      price: product.price,
      quantity: 1,
      color: product.colors?.[0]?.name,
      weight: product.weights?.find((w) => w.price === product.price)?.label,
    });
    sonner.success('Added to cart', product.name);
  };

  return (
    <article
      className={cn(
        'group relative flex flex-col overflow-hidden rounded-2xl border border-border bg-card transition-all duration-300 hover:-translate-y-1 hover:border-primary/30 hover:shadow-[0_12px_32px_-12px_rgba(16,80,60,0.25)]',
        className
      )}
    >
      {/* ===== Media ===== */}
      <div className="relative aspect-square overflow-hidden bg-muted">
        <Link href={href} aria-label={product.name}>
          <Image
            src={product.image}
            alt={product.name}
            fill
            sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 20vw"
            className="object-cover transition-transform duration-500 group-hover:scale-105"
          />
        </Link>
        <div className="absolute left-3 top-3 flex flex-col items-start gap-1.5">
          {off > 0 && (
            <span className="rounded-md bg-sale px-2 py-0.5 text-[11px] font-bold text-sale-foreground">
              -{off}%
            </span>
          )}
          {product.badge && (
            <span className={cn('rounded-md px-2 py-0.5 text-[11px] font-semibold', badgeStyles[product.badge])}>
              {product.badge}
            </span>
          )}
        </div>
        <Button
          variant="outline"
          size="icon-sm"
          aria-label="Add to wishlist"
          onClick={() => toggleWishlist(product.slug)}
          className={cn(
            'absolute right-3 top-3 rounded-full bg-card/90 backdrop-blur border-0 shadow-sm',
            liked ? 'text-sale' : 'sm:opacity-0 sm:group-hover:opacity-100'
          )}
        >
          <Heart className={cn(liked && 'fill-current')} />
        </Button>
      </div>

      {/* ===== Body ===== */}
      <div className="flex flex-1 flex-col p-3 sm:p-4">
        <div className="flex items-center justify-between gap-2 text-xs text-muted-foreground">
          <span className="truncate">{getCategory(product.category)?.name}</span>
          <span className="flex items-center gap-1 shrink-0">
            <Star className="size-3.5 fill-gold text-gold" />
            <span className="font-medium text-foreground">{product.rating}</span>({product.reviews})
          </span>
        </div>
        <Link href={href} className="mt-1.5">
          <h3 className="line-clamp-2 min-h-10 text-sm sm:text-[15px] font-semibold leading-snug text-foreground hover:text-primary transition-colors">
            {product.name}
          </h3>
        </Link>

        {product.colors && (
          <div className="mt-2 flex items-center gap-1.5">
            {product.colors.map((c) => (
              <span
                key={c.name}
                title={c.name}
                className="size-3.5 rounded-full ring-1 ring-border ring-offset-1 ring-offset-card"
                style={{ backgroundColor: c.hex }}
              />
            ))}
            <span className="text-[11px] text-muted-foreground">{product.colors.length} variants</span>
          </div>
        )}

        <PriceTag price={product.price} oldPrice={product.oldPrice} className="mt-2" />

        <div className="mt-auto grid grid-cols-[auto_1fr] gap-2 pt-3">
          <Button variant="soft" size="icon" aria-label="Add to cart" onClick={handleAdd}>
            <ShoppingBag />
          </Button>
          <Button nativeButton={false} render={<Link href={href} />}>
            Buy Now
          </Button>
        </div>
      </div>
    </article>
  );
}
