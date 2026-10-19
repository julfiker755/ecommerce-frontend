import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { helpers } from '@/lib/helpers';
import { cn } from '@/lib/utils';
import { ChevronDown } from 'lucide-react';

interface DropdownBoxProps {
  label: string;
  menuItems: any[];
  onChange?: (item: string) => void;
  btnStyle?: string;
  className?: string;
  itemStyle?: string;
}

export function DropdownBox({
  label,
  menuItems,
  onChange,
  btnStyle,
  className,
  itemStyle,
}: DropdownBoxProps) {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger>
        <Button
          className={cn(
            'bg-transparent font-medium hover:bg-transparent text-figma-black border cursor-pointer rounded-full',
            'data-[state=open]:bg-transparent data-[state=open]:text-white data-[state=open]:border-border',
            btnStyle
          )}
          variant="outline"
        >
          {' '}
          {helpers.capitalize(label)} <ChevronDown />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className={cn('w-40', className)} align="start">
        {menuItems.map((item, index) => (
          <DropdownMenuItem
            key={index}
            onClick={() => onChange?.(item?.value)}
            className={itemStyle}
          >
            {item.label}
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
