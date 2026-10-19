import Link from 'next/link';
import { Mail, MapPin, Phone } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { BrandLogo } from '../brand-logo';
import { categories, siteInfo } from '@/lib/data';

const links = {
  Company: ['About Us', 'Our Story', 'Careers', 'Terms & Conditions', 'Privacy Policy'],
  Support: ['Help Center', 'How to Order', 'Shipping Info', 'Refund Policy'],
};

const socials = [
  {
    name: 'Facebook',
    path: 'M14 8h3V4h-3c-2.8 0-4.5 1.8-4.5 4.6V11H7v4h2.5v9h4v-9h3l.5-4h-3.5V8.8c0-.5.3-.8.5-.8Z',
  },
  {
    name: 'Instagram',
    path: 'M12 7.3A4.7 4.7 0 1 0 12 16.7 4.7 4.7 0 0 0 12 7.3Zm0 7.7a3 3 0 1 1 0-6 3 3 0 0 1 0 6Zm6-7.9a1.1 1.1 0 1 1-2.2 0 1.1 1.1 0 0 1 2.2 0ZM12 3.6c2.7 0 3 0 4.1.1 2.7.1 4 1.4 4.1 4.1.1 1.1.1 1.4.1 4.1s0 3-.1 4.1c-.1 2.7-1.4 4-4.1 4.1-1.1.1-1.4.1-4.1.1s-3 0-4.1-.1c-2.7-.1-4-1.4-4.1-4.1C3.7 15 3.6 14.7 3.6 12s0-3 .1-4.1c.1-2.7 1.4-4 4.1-4.1 1.1-.1 1.4-.2 4.2-.2Z',
  },
  {
    name: 'YouTube',
    path: 'M21.6 7.2a2.5 2.5 0 0 0-1.8-1.8C18.2 5 12 5 12 5s-6.2 0-7.8.4A2.5 2.5 0 0 0 2.4 7.2 26 26 0 0 0 2 12a26 26 0 0 0 .4 4.8 2.5 2.5 0 0 0 1.8 1.8c1.6.4 7.8.4 7.8.4s6.2 0 7.8-.4a2.5 2.5 0 0 0 1.8-1.8A26 26 0 0 0 22 12a26 26 0 0 0-.4-4.8ZM10 15V9l5.2 3L10 15Z',
  },
];

export function Footer() {
  return (
    <footer className="bg-brand-dark text-white/75 pb-16 lg:pb-0">
      <div className="wrapper grid gap-10 py-14 sm:grid-cols-2 lg:grid-cols-[1.4fr_1fr_1fr_1fr]">
        <div>
          <BrandLogo light />
          <p className="mt-5 max-w-sm text-sm leading-relaxed">
            We bring safe, authentic and traceable food from trusted farms and producers across
            Bangladesh straight to your kitchen.
          </p>
          <ul className="mt-5 space-y-2.5 text-sm">
            <li className="flex gap-2.5"><MapPin className="size-4 shrink-0 text-accent mt-0.5" /> {siteInfo.address}</li>
            <li className="flex gap-2.5"><Phone className="size-4 shrink-0 text-accent mt-0.5" /> {siteInfo.phone}</li>
            <li className="flex gap-2.5"><Mail className="size-4 shrink-0 text-accent mt-0.5" /> {siteInfo.email}</li>
          </ul>
          <div className="mt-6 flex gap-2">
            {socials.map((s) => (
              <Button
                key={s.name}
                size="icon-sm"
                aria-label={s.name}
                className="rounded-full bg-white/10 text-white hover:bg-accent hover:text-accent-foreground"
              >
                <svg viewBox="0 0 24 24" fill="currentColor" className="size-4"><path d={s.path} /></svg>
              </Button>
            ))}
          </div>
        </div>

        <FooterColumn title="Shop By">
          {categories.slice(0, 6).map((c) => (
            <FooterLink key={c.slug} href={`/#${c.slug}`}>{c.name}</FooterLink>
          ))}
        </FooterColumn>
        {Object.entries(links).map(([title, items]) => (
          <FooterColumn key={title} title={title}>
            {items.map((item) => (
              <FooterLink key={item} href="#">{item}</FooterLink>
            ))}
          </FooterColumn>
        ))}
      </div>

      <div className="border-t border-white/10">
        <div className="wrapper flex flex-col items-center justify-between gap-3 py-5 text-xs sm:flex-row">
          <p>© {siteInfo.name}. All rights reserved.</p>
          <div className="flex items-center gap-2">
            <span className="opacity-70">We accept:</span>
            {['bKash', 'Nagad', 'VISA', 'COD'].map((m) => (
              <span key={m} className="rounded-md bg-white/10 px-2 py-1 font-semibold text-white">{m}</span>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}

function FooterColumn({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div>
      <h4 className="mb-4 text-base font-semibold text-white">{title}</h4>
      <ul className="space-y-2.5 text-sm">{children}</ul>
    </div>
  );
}

function FooterLink({ href, children }: { href: string; children: React.ReactNode }) {
  return (
    <li>
      <Link href={href} className="transition-colors hover:text-accent">{children}</Link>
    </li>
  );
}
