import Link from 'next/link';
import { MapPin, Phone, Truck } from 'lucide-react';
import { siteInfo } from '@/lib/data';
import { helpers } from '@/lib/helpers';

export function TopBar() {
  return (
    <div className="bg-brand-dark text-white/85 text-xs">
      <div className="wrapper flex h-9 items-center justify-between gap-4">
        <p className="flex items-center gap-2 truncate">
          <Truck className="size-3.5 text-accent shrink-0" />
          Free delivery on orders over{' '}
          <span className="font-semibold text-accent">
            {helpers.currency(siteInfo.freeDeliveryOver)}
          </span>
        </p>
        <div className="hidden md:flex items-center gap-5">
          <a href={`tel:${siteInfo.phone}`} className="flex items-center gap-1.5 hover:text-white">
            <Phone className="size-3.5" /> {siteInfo.phone}
          </a>
        
          <Link href="#" className="hover:text-white">
            Help &amp; FAQ
          </Link>
        </div>
      </div>
    </div>
  );
}
