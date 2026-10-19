import { cn } from '@/lib/utils';

interface AuthHeaderProps {
  icon?: React.ElementType;
  title: string;
  subtitle?: React.ReactNode;
  className?: string;
}

export function AuthHeader({ icon: Icon, title, subtitle, className }: AuthHeaderProps) {
  return (
    <div className={cn('mb-7 text-center', className)}>
      {Icon && (
        <span className="mx-auto mb-4 grid size-12 place-items-center rounded-full bg-secondary text-primary">
          <Icon className="size-5" />
        </span>
      )}
      <h1 className="text-2xl leading-relaxed font-bold text-foreground sm:text-3xl">{title}</h1>
      {subtitle && <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{subtitle}</p>}
    </div>
  );
}
