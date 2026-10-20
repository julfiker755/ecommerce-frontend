import type React from 'react';
import {
  Dialog,
  DialogContent,
  DialogTrigger,
  DialogTitle,
  DialogDescription,
  DialogHeader,
} from '@/components/ui';
import { cn } from '@/lib/utils';

interface ModalProps {
  open: boolean;
  setIsOpen: (open: boolean) => void;
  children: React.ReactNode;
  className?: string;
  title?: string;
  titleStyle?: string;
  mainStyle?: string;
  style?: string;
  text?: string;
  showCloseButton?: boolean;
  textStyle?: string;
  headerStyle?: string;
}

export function Modal({
  open,
  setIsOpen,
  children,
  className,
  title,
  titleStyle,
  textStyle,
  mainStyle,
  style,
  text,
  showCloseButton = true,
  headerStyle,
}: ModalProps) {
  return (
    <Dialog open={open} onOpenChange={setIsOpen}>
      <DialogTrigger/>
      <DialogContent
        // onPointerDownOutside={(e:any) => e.preventDefault()}
        // onInteractOutside={(e:any) => e.preventDefault()}
        // overlyStyle={`${style} transition-opacity duration-200`}
        showCloseButton={showCloseButton}
        className={cn(
          'sm:max-w-md p-0 border border-border gap-0 bg-background rounded-2xl overflow-y-auto  max-h-[95vh] h-fit scrollbar-hide ',
          className,
          style
        )}
      >
        <DialogHeader className={cn('p-4 gap-1', headerStyle)}>
          <DialogTitle
            className={cn('font-bold capitalize text-xl text-black mb-0', titleStyle)}
          >
            {title}
          </DialogTitle>
          <DialogDescription className={cn('text-gray', textStyle)}>
            {text}
          </DialogDescription>
        </DialogHeader>

        <div className={cn('p-4', mainStyle)}>{children}</div>
      </DialogContent>
    </Dialog>
  );
}
