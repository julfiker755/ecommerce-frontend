'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import {
  BadgeCheck,
  Heart,
  MessageCircle,
  Phone,
  RotateCcw,
  Share2,
  ShieldCheck,
  ShoppingBag,
  Star,
  Truck,
  Zap,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import sonner from '@/components/reuseable/sonner';
import { ProductGallery } from '../product-gallery';
import { ColorVariant } from '../color-variant';
import { WeightVariant } from '../weight-variant';
import { QuantityInput } from '../quantity-input';
import { PriceTag } from '../price-tag';
import { useCart } from '@/context/cart';
import { discountPercent, getCategory, siteInfo, type Product } from '@/lib/data';
import { helpers } from '@/lib/helpers';
import { cn } from '@/lib/utils';

export function ProductDetails({ product }: { product: Product }) {
  const router = useRouter();
  const { addItem, toggleWishlist, wishlist } = useCart();

  const images = Array.from(
    new Set([...product.gallery, ...(product.colors?.map((c) => c.image).filter(Boolean) as string[] ?? [])])
  );
  const defaultWeight =
    product.weights?.find((w) => w.price === product.price) ?? product.weights?.[0];

  const [image, setImage] = useState(product.image);
  const [color, setColor] = useState(product.colors?.[0]);
  const [weight, setWeight] = useState(defaultWeight);
  const [quantity, setQuantity] = useState(1);

  const price = weight?.price ?? product.price;
  const oldPrice = weight ? weight.oldPrice : product.oldPrice;
  const off = discountPercent(price, oldPrice);
  const liked = wishlist.includes(product.slug);
  const lowStock = product.stock <= 20;

  const handleAdd = (buyNow = false) => {
    addItem({
      slug: product.slug,
      name: product.name,
      image,
      price,
      quantity,
      color: color?.name,
      weight: weight?.label,
    });
    if (buyNow) router.push('/checkout');
    else sonner.success('Added to cart', `${quantity} × ${product.name}`);
  };

  return (
    <section className="wrapper grid gap-8 py-8 lg:grid-cols-2 lg:gap-12 lg:py-12">
      <ProductGallery
        images={images}
        active={image}
        onChange={setImage}
        alt={product.name}
        badge={
          off > 0 && (
            <span className="rounded-lg bg-sale px-3 py-1 text-sm font-bold text-sale-foreground shadow">
              -{off}% OFF
            </span>
          )
        }
      />

      <div className="flex flex-col gap-6">
        {/* ===== Heading ===== */}
        <div>
          <div className="flex flex-wrap items-center gap-2 text-xs">
            <span className="rounded-full bg-secondary px-3 py-1 font-semibold text-secondary-foreground">
              {getCategory(product.category)?.name}
            </span>
            {product.badge && (
              <span className="rounded-full bg-accent/10 px-3 py-1 font-semibold text-accent">
                {product.badge}
              </span>
            )}
          </div>
          <h1 className="mt-3 font-heading text-3xl font-bold leading-tight text-foreground sm:text-4xl">
            {product.name}
          </h1>
          <div className="mt-3 flex flex-wrap items-center gap-x-4 gap-y-1 text-sm text-muted-foreground">
            <span className="flex items-center gap-1">
              {Array.from({ length: 5 }).map((_, i) => (
                <Star
                  key={i}
                  className={cn('size-4', i < Math.round(product.rating) ? 'fill-gold text-gold' : 'text-border')}
                />
              ))}
              <span className="ml-1 font-semibold text-foreground">{product.rating}</span>
              <span>({product.reviews} reviews)</span>
            </span>
            <span className="hidden h-4 w-px bg-border sm:block" />
            <span>
              Brand: <span className="font-medium text-foreground">{product.brand}</span>
            </span>
            <span className="hidden h-4 w-px bg-border sm:block" />
            <span>SKU: {product.sku}</span>
          </div>
        </div>

        {/* ===== Price ===== */}
        <div className="rounded-2xl bg-brand-soft p-4 sm:p-5">
          <PriceTag price={price * quantity} oldPrice={oldPrice ? oldPrice * quantity : undefined} size="lg" showSave />
          <p
            className={cn(
              'mt-2 flex items-center gap-1.5 text-sm font-medium',
              lowStock ? 'text-sale' : 'text-primary'
            )}
          >
            <span className={cn('size-2 rounded-full', lowStock ? 'bg-sale animate-pulse' : 'bg-primary')} />
            {lowStock ? `Hurry! Only ${product.stock} left in stock` : 'In stock, ready to ship'}
          </p>
        </div>

        <p className="leading-relaxed text-foreground/75">{product.shortDescription}</p>

        {/* ===== Variants ===== */}
        {(product.colors || product.weights) && (
          <div className="flex flex-col gap-5 border-y border-border py-5">
            {product.colors && color && (
              <ColorVariant
                colors={product.colors}
                value={color.name}
                onChange={(c) => {
                  setColor(c);
                  if (c.image) setImage(c.image);
                }}
              />
            )}
            {product.weights && weight && (
              <WeightVariant
                weights={product.weights}
                value={weight.label}
                label={product.optionLabel}
                onChange={setWeight}
              />
            )}
          </div>
        )}

        {/* ===== Actions ===== */}
        <div className="flex flex-col gap-3">
          <div className="flex gap-3">
            <QuantityInput value={quantity} onChange={setQuantity} max={product.stock} />
            <Button variant="soft" size="lg" className="h-12 flex-1" onClick={() => handleAdd()}>
              <ShoppingBag /> Add to Cart
            </Button>
            <Button
              variant="outline"
              size="icon-lg"
              className={cn('size-12 border-2', liked && 'border-sale text-sale')}
              aria-label="Add to wishlist"
              onClick={() => toggleWishlist(product.slug)}
            >
              <Heart className={cn(liked && 'fill-current')} />
            </Button>
          </div>
          <Button size="lg" className="h-12 w-full text-base" onClick={() => handleAdd(true)}>
            <Zap /> Buy Now — {helpers.currency(price * quantity)}
          </Button>
          <div className="grid grid-cols-2 gap-3">
            <Button
              variant="outline"
              className="h-11 border-[#25D366]/40 text-[#128C4B] hover:bg-[#25D366]/10"
              nativeButton={false}
              render={<a href={`https://wa.me/${siteInfo.phone.replace(/\D/g, '')}`} target="_blank" rel="noreferrer" />}
            >
              <MessageCircle /> Order on WhatsApp
            </Button>
            <Button
              variant="accent"
              className="h-11"
              nativeButton={false}
              render={<a href={`tel:${siteInfo.phone}`} />}
            >
              <Phone /> Call to Order
            </Button>
          </div>
        </div>

        {/* ===== Trust ===== */}
        <ul className="grid gap-3 rounded-2xl border border-border p-4 text-sm sm:grid-cols-2">
          {[
            { icon: Truck, text: `Free delivery over ${helpers.currency(siteInfo.freeDeliveryOver)}` },
            { icon: RotateCcw, text: '7 days easy return' },
            { icon: ShieldCheck, text: 'Cash on delivery available' },
            { icon: BadgeCheck, text: `Origin: ${product.origin}` },
          ].map(({ icon: Icon, text }) => (
            <li key={text} className="flex items-center gap-2.5 text-foreground/80">
              <Icon className="size-4.5 shrink-0 text-primary" /> {text}
            </li>
          ))}
        </ul>

        <Button
          variant="ghost"
          size="sm"
          className="w-fit text-muted-foreground"
          onClick={() => {
            navigator.clipboard?.writeText(window.location.href);
            sonner.success('Link copied');
          }}
        >
          <Share2 /> Share this product
        </Button>
      </div>
    </section>
  );
}
