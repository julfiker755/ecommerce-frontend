'use client';
import { useState } from 'react';
import { Mail } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import sonner from '@/components/reuseable/sonner';

export function Newsletter() {
  const [email, setEmail] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;
    sonner.success('Subscribed!', 'You will receive our best offers first.');
    setEmail('');
  };

  return (
    <section className="wrapper py-12 lg:py-16">
      <div className="relative overflow-hidden rounded-3xl bg-brand-dark px-6 py-10 sm:px-12 sm:py-14 text-white">
        <div className="absolute -right-16 -top-16 size-64 rounded-full bg-primary/40 blur-3xl" />
        <div className="absolute -bottom-20 left-1/3 size-64 rounded-full bg-accent/20 blur-3xl" />
        <div className="relative grid items-center gap-6 lg:grid-cols-2">
          <div>
            <h2 className="font-heading text-2xl sm:text-3xl font-bold">Get 10% off your first order</h2>
            <p className="mt-2 text-sm text-white/70">
              Subscribe for exclusive deals, seasonal arrivals and healthy recipes. No spam, ever.
            </p>
          </div>
          <form onSubmit={handleSubmit} className="flex flex-col gap-2 sm:flex-row">
            <div className="flex flex-1 items-center gap-2 rounded-full bg-white/10 px-5 ring-1 ring-white/15 focus-within:ring-accent">
              <Mail className="size-4 text-white/60" />
              <Input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email address"
                className="h-12 border-0 text-white placeholder:text-white/50 focus-visible:border-0"
              />
            </div>
            <Button type="submit" variant="accent" size="lg" className="h-12 rounded-full">
              Subscribe
            </Button>
          </form>
        </div>
      </div>
    </section>
  );
}
