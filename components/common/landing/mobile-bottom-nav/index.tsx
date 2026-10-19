'use client';
import Link from 'next/link';
import { Heart, Home, LayoutGrid, ShoppingBag, User } from 'lucide-react';
import { useCart } from '@/context/cart';

export function MobileBottomNav() {
  const { count } = useCart();
  const items = [
    { href: '/', label: 'Home', icon: Home },
    { href: '/#categories', label: 'Categories', icon: LayoutGrid },
    { href: '/checkout', label: 'Cart', icon: ShoppingBag, badge: count },
    { href: '#', label: 'Wishlist', icon: Heart },
    { href: '#', label: 'Account', icon: User },
  ];

  return (
    <nav className="lg:hidden fixed inset-x-0 bottom-0 z-40 border-t border-border bg-card/95 backdrop-blur">
      <ul className="grid grid-cols-5">
        {items.map(({ href, label, icon: Icon, badge }) => (
          <li key={label}>
            <Link href={href} className="flex flex-col items-center gap-0.5 py-2 text-[11px] text-muted-foreground hover:text-primary">
              <span className="relative">
                <Icon className="size-5" />
                {!!badge && (
                  <span className="absolute -right-2.5 -top-1.5 grid min-w-4 h-4 place-items-center rounded-full bg-sale px-1 text-[9px] font-bold text-sale-foreground">
                    {badge}
                  </span>
                )}
              </span>
              {label}
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  );
}
