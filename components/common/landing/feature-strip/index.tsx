import { BadgeCheck, Headphones, RotateCcw, Truck } from 'lucide-react';

const features = [
  { icon: Truck, title: 'Fast Delivery', text: 'Inside Dhaka in 24 hours' },
  { icon: BadgeCheck, title: '100% Authentic', text: 'Lab tested, pure products' },
  { icon: RotateCcw, title: 'Easy Returns', text: 'Hassle-free 7 day return' },
  { icon: Headphones, title: '24/7 Support', text: 'Call or chat anytime' },
];

export function FeatureStrip() {
  return (
    <section className="wrapper py-6">
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 rounded-2xl border border-border bg-card p-3 sm:p-4">
        {features.map(({ icon: Icon, title, text }) => (
          <div key={title} className="flex items-center gap-3 rounded-xl p-2 sm:p-3">
            <span className="grid place-items-center size-11 sm:size-12 shrink-0 rounded-full bg-secondary text-primary">
              <Icon className="size-5" />
            </span>
            <div className="min-w-0">
              <h4 className="text-sm font-semibold text-foreground">{title}</h4>
              <p className="text-xs text-muted-foreground truncate">{text}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
