'use client';
import { useState } from 'react';
import { ChevronDown, ChevronLeft, ChevronRight, SlidersHorizontal, X } from 'lucide-react';
import { ProductCard } from '@/components/common/landing/product-card';
import { Button, Checkbox, Input, Label, Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui';
import { categories, products } from '@/lib/data';
import { cn } from '@/lib/utils';

const sortOptions = [
  { label: 'Featured', value: 'featured' },
  { label: 'Price: Low to High', value: 'price-asc' },
  { label: 'Price: High to Low', value: 'price-desc' },
  { label: 'Top Rated', value: 'rating' },
];

const brands = [...new Set(products.map((p) => p.brand))];
const colors = [
  ...new Map(products.flatMap((p) => p.colors ?? []).map((c) => [c.name, c])).values(),
];

export default function SearchBox() {
  const [showFilters, setShowFilters] = useState(false);

  return (
    <>
      <section className="wrapper py-6 lg:py-10">
        <div className="grid gap-8 lg:grid-cols-[240px_1fr]">
          {/* ===== Filters ===== */}
          <aside className={cn('lg:block', showFilters ? 'block' : 'hidden')}>
            <div className="flex items-center justify-between pb-2">
              <h2 className="text-sm font-semibold">Filters</h2>
              <Button
                variant="link"
                size="sm"
                className="h-auto p-0 text-xs"
                onClick={() => console.log('clear filters')}
              >
                Clear all
              </Button>
            </div>

            <FilterGroup title="Category">
              {categories.map((c) => (
                <Label key={c.slug} className="flex cursor-pointer items-center gap-2.5 py-1 text-sm font-normal">
                  <Checkbox onCheckedChange={(checked) => console.log('category', c.slug, checked)} />
                  {c.name}
                </Label>
              ))}
            </FilterGroup>

            <FilterGroup title="Brand">
              {brands.map((b) => (
                <Label key={b} className="flex cursor-pointer items-center gap-2.5 py-1 text-sm font-normal">
                  <Checkbox onCheckedChange={(checked) => console.log('brand', b, checked)} />
                  {b}
                </Label>
              ))}
            </FilterGroup>

            <FilterGroup title="Colour">
              <div className="flex flex-wrap gap-2.5">
                {colors.map((c) => (
                  <button
                    key={c.name}
                    type="button"
                    title={c.name}
                    aria-label={c.name}
                    onClick={() => console.log('colour', c.name)}
                    className="size-7 rounded-full ring-1 ring-border ring-offset-2 ring-offset-background focus-visible:ring-2 focus-visible:ring-primary"
                    style={{ backgroundColor: c.hex }}
                  />
                ))}
              </div>
            </FilterGroup>

            <FilterGroup title="Price">
              <div className="flex items-center gap-2">
                <Input
                  type="number"
                  min={0}
                  placeholder="Min"
                  onChange={(e) => console.log('min price', e.target.value)}
                />
                <span className="text-muted-foreground">–</span>
                <Input
                  type="number"
                  min={0}
                  placeholder="Max"
                  onChange={(e) => console.log('max price', e.target.value)}
                />
              </div>
            </FilterGroup>
          </aside>

          {/* ===== Results ===== */}
          <div className="min-w-0">
            <h1 className="text-2xl font-bold tracking-tight sm:text-3xl">All Products</h1>

            <div className="mt-4 flex items-center justify-between gap-3 border-b border-border pb-4">
              <Button variant="outline" size="sm" className="lg:hidden" onClick={() => setShowFilters((v) => !v)}>
                {showFilters ? <X /> : <SlidersHorizontal />} Filters
              </Button>
              <div className="ml-auto flex items-center gap-2 text-sm">
                <span className="text-muted-foreground">Sort by</span>
                <Select items={sortOptions} defaultValue="featured" onValueChange={(v) => console.log('sort', v)}>
                  <SelectTrigger className="min-w-44 border-b-primary font-medium text-primary [&_svg]:text-primary">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {sortOptions.map((o) => (
                      <SelectItem key={o.value} value={o.value}>
                        {o.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="mt-6 grid grid-cols-2 gap-3 sm:gap-5 md:grid-cols-3">
              {products.slice(0, 12).map((p) => (
                <ProductCard key={p.id} product={p} />
              ))}
            </div>

            <nav aria-label="Pagination" className="mt-10 flex items-center justify-center gap-2">
              <Button variant="outline" size="icon-sm" aria-label="Previous page" onClick={() => console.log('page', 'prev')}>
                <ChevronLeft />
              </Button>
              {[1, 2, 3, 4].map((n) => (
                <Button
                  key={n}
                  size="icon-sm"
                  variant={n === 1 ? 'default' : 'outline'}
                  aria-current={n === 1 ? 'page' : undefined}
                  onClick={() => console.log('page', n)}
                >
                  {n}
                </Button>
              ))}
              <Button variant="outline" size="icon-sm" aria-label="Next page" onClick={() => console.log('page', 'next')}>
                <ChevronRight />
              </Button>
            </nav>
          </div>
        </div>
      </section>
    </>
  );
}

function FilterGroup({ title, children }: { title: string; children: React.ReactNode }) {
  const [open, setOpen] = useState(true);
  return (
    <div className="border-b border-border py-4">
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        aria-expanded={open}
        className="flex w-full items-center justify-between text-sm font-semibold"
      >
        {title}
        <ChevronDown className={cn('size-4 transition-transform', open && 'rotate-180')} />
      </button>
      {open && <div className="mt-3">{children}</div>}
    </div>
  );
}
