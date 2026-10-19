'use client';
import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import {
  ChevronDown,
  Flame,
  Heart,
  LayoutGrid,
  Menu,
  Search,
  ShoppingBag,
  User,
  X,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { BrandLogo } from '../brand-logo';
import { useCart } from '@/context/cart';
import { categories, products } from '@/lib/data';
import { helpers } from '@/lib/helpers';
import { cn } from '@/lib/utils';

export function Navbar() {
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-40 bg-card/95 backdrop-blur supports-backdrop-filter:bg-card/85 border-b border-border shadow-[0_1px_0_0_rgba(0,0,0,0.02)]">
      {/* ===== Main row ===== */}
      <div className="wrapper flex h-18 items-center gap-4 lg:gap-8">
        <Button
          variant="ghost"
          size="icon"
          className="lg:hidden -ml-2"
          aria-label="Open menu"
          onClick={() => setOpen(true)}
        >
          <Menu className="size-5" />
        </Button>

        <BrandLogo />

        <LiveSearch className="hidden md:block flex-1 max-w-2xl" />

        <HeaderActions />
      </div>

      <LiveSearch className="md:hidden wrapper pb-3" />

      {/* ===== Category row ===== */}
      <nav className="hidden lg:block border-t border-border">
        <div className="wrapper flex h-12 items-center gap-1">
          <AllCategories />
          {categories.slice(0, 7).map((cat) => (
            <div key={cat.slug} className="group relative">
              <Link
                href={`/#${cat.slug}`}
                className="flex items-center gap-1 px-3 h-12 text-sm font-medium text-foreground/80 hover:text-primary transition-colors"
              >
                {cat.name}
                {cat.children && (
                  <ChevronDown className="size-3.5 transition-transform group-hover:rotate-180" />
                )}
              </Link>
              {cat.children && (
                <div className="invisible opacity-0 translate-y-1 group-hover:visible group-hover:opacity-100 group-hover:translate-y-0 transition-all absolute left-0 top-full z-50 min-w-52 rounded-xl border border-border bg-popover p-2 shadow-xl">
                  {cat.children.map((child) => (
                    <Link
                      key={child}
                      href={`/#${cat.slug}`}
                      className="block rounded-lg px-3 py-2 text-sm text-foreground/80 hover:bg-secondary hover:text-primary"
                    >
                      {child}
                    </Link>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>
      </nav>

      <MobileMenu open={open} onClose={() => setOpen(false)} />
    </header>
  );
}

// ===== Header icons =====
function HeaderActions() {
  const { count, wishlist } = useCart();

  return (
    <div className="ml-auto flex items-center gap-1 sm:gap-2">
      <Button variant="ghost" size="icon" className="hidden sm:inline-flex relative" aria-label="Wishlist">
        <Heart className="size-5" />
        <CountBadge value={wishlist.length} />
      </Button>
       <Link href="/login">
        <Button variant="ghost" size="icon" className="hidden sm:inline-flex" aria-label="Account">
        <User className="size-5" />
      </Button>
        </Link>
      <Button
        variant="soft"
        size="icon-lg"
        className="relative rounded-full"
        aria-label={`Cart, ${count} items`}
        nativeButton={false}
        render={<Link href="/checkout" />}
      >
        <ShoppingBag className="size-5" />
        <CountBadge value={count} className="-top-1.5 -right-1.5 ring-2 ring-card" />
      </Button>
    </div>
  );
}

function CountBadge({ value, className }: { value: number; className?: string }) {
  if (!value) return null;
  return (
    <span
      className={cn(
        'absolute -top-1 -right-1 grid place-items-center min-w-5 h-5 px-1 rounded-full bg-sale text-sale-foreground text-[10px] font-bold',
        className
      )}
    >
      {value > 99 ? '99+' : value}
    </span>
  );
}

// ===== Live search =====
function LiveSearch({ className }: { className?: string }) {
  const [query, setQuery] = useState('');
  const results = query.trim()
    ? products
        .filter((p) => p.name.toLowerCase().includes(query.trim().toLowerCase()))
        .slice(0, 6)
    : [];

  return (
    <div className={cn('relative', className)}>
      <form
        onSubmit={(e) => e.preventDefault()}
        className="flex items-center h-11 rounded-full border-2 border-primary/80 bg-card pl-5 pr-1 focus-within:border-primary transition-colors"
      >
        <Input
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search for honey, spices, oil..."
          className="h-full border-0 focus-visible:border-0 shadow-none"
        />
        {query && (
          <Button type="button" variant="ghost" size="icon-xs" onClick={() => setQuery('')} aria-label="Clear">
            <X />
          </Button>
        )}
        <Button type="submit" size="sm" className="rounded-full h-8.5 px-5 ml-1">
          <Search /> <span className="hidden sm:inline">Search</span>
        </Button>
      </form>

      {query.trim() && (
        <div className="absolute inset-x-0 top-full mt-2 z-50 rounded-xl border border-border bg-popover shadow-xl overflow-hidden">
          {results.length ? (
            results.map((p) => (
              <Link
                key={p.id}
                href={`/products/${p.slug}`}
                onClick={() => setQuery('')}
                className="flex items-center gap-3 px-4 py-2.5 hover:bg-muted border-b border-border last:border-0"
              >
                <Image src={p.image} alt={p.name} width={44} height={44} className="size-11 rounded-lg object-cover" />
                <span className="flex-1 min-w-0">
                  <span className="block truncate text-sm font-medium">{p.name}</span>
                  <span className="text-sm font-semibold text-primary">
                    {helpers.currency(p.price)}
                    {p.oldPrice && (
                      <del className="ml-2 text-xs font-normal text-muted-foreground">
                        {helpers.currency(p.oldPrice)}
                      </del>
                    )}
                  </span>
                </span>
              </Link>
            ))
          ) : (
            <p className="p-4 text-center text-sm text-muted-foreground">No products found for “{query}”</p>
          )}
        </div>
      )}
    </div>
  );
}

// ===== All categories dropdown =====
function AllCategories() {
  return (
    <div className="group relative mr-2">
      <Button className="h-12 rounded-none px-5 gap-2">
        <LayoutGrid /> All Categories <ChevronDown className="size-3.5" />
      </Button>
      <div className="invisible opacity-0 group-hover:visible group-hover:opacity-100 transition-opacity absolute left-0 top-full z-50 w-64 rounded-b-xl border border-border bg-popover py-2 shadow-xl">
        {categories.map((cat) => (
          <Link
            key={cat.slug}
            href={`/#${cat.slug}`}
            className="flex items-center gap-3 px-4 py-2 text-sm hover:bg-secondary hover:text-primary"
          >
            <Image src={cat.image} alt={cat.name} width={28} height={28} className="size-7 rounded-full object-cover" />
            {cat.name}
          </Link>
        ))}
      </div>
    </div>
  );
}

// ===== Mobile drawer =====
function MobileMenu({ open, onClose }: { open: boolean; onClose: () => void }) {
  return (
    <div className={cn('lg:hidden fixed inset-0 z-99999', open ? 'visible' : 'invisible')}>
      <div
        onClick={onClose}
        className={cn('absolute inset-0 bg-black/40 transition-opacity', open ? 'opacity-100' : 'opacity-0')}
      />
      <aside
        className={cn(
          'absolute inset-y-0 left-0 w-80 max-w-[85%] bg-card shadow-2xl transition-transform duration-300 flex flex-col',
          open ? 'translate-x-0' : '-translate-x-full'
        )}
      >
        <div className="flex items-center justify-between p-4 border-b border-border">
          <BrandLogo />
          <Button variant="ghost" size="icon-sm" onClick={onClose} aria-label="Close menu">
            <X />
          </Button>
        </div>
        <div className="flex-1 overflow-y-auto p-2">
          <Link href="/" onClick={onClose} className="flex items-center gap-2 px-3 py-3 text-sm font-semibold text-sale">
            <Flame className="size-4" /> Offer Zone
          </Link>
          {categories.map((cat) => (
            <Link
              key={cat.slug}
              href={`/#${cat.slug}`}
              onClick={onClose}
              className="flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm hover:bg-secondary"
            >
              <Image src={cat.image} alt={cat.name} width={32} height={32} className="size-8 rounded-full object-cover" />
              {cat.name}
            </Link>
          ))}
        </div>
        <div className="p-4 border-t border-border grid grid-cols-2 gap-2">
          <Button variant="outline">
            <User /> Sign In
          </Button>
          <Button>
            <Heart /> Wishlist
          </Button>
        </div>
      </aside>
    </div>
  );
}
