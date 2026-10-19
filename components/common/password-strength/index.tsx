import { cn } from '@/lib/utils';

const levels = [
  { label: 'Too weak', color: 'bg-sale', text: 'text-sale' },
  { label: 'Weak', color: 'bg-sale', text: 'text-sale' },
  { label: 'Fair', color: 'bg-accent', text: 'text-accent-foreground' },
  { label: 'Good', color: 'bg-primary/70', text: 'text-primary' },
  { label: 'Strong', color: 'bg-primary', text: 'text-primary' },
];

const score = (pw: string) =>
  [pw.length >= 6, pw.length >= 10, /[A-Z]/.test(pw) && /[a-z]/.test(pw), /\d/.test(pw) && /[^A-Za-z0-9]/.test(pw)].filter(
    Boolean
  ).length;

export function PasswordStrength({ password }: { password: string }) {
  if (!password) return null;
  const s = score(password);
  const level = levels[s];

  return (
    <div className="mt-2">
      <div className="flex gap-1.5">
        {Array.from({ length: 4 }).map((_, i) => (
          <span
            key={i}
            className={cn('h-1.5 flex-1 rounded-full transition-colors', i < s ? level.color : 'bg-border')}
          />
        ))}
      </div>
      <p className={cn('mt-1 text-xs font-medium', level.text)}>
        {level.label}
        <span className="font-normal text-muted-foreground"> · use 10+ characters with numbers & symbols</span>
      </p>
    </div>
  );
}
