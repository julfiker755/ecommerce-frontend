import { Button } from "@/components/ui/button";
import FavIcon from "@/icon/favIcon";
import { Upload, X } from "lucide-react";
import { cn } from '@/lib/utils';

interface btnProps {
  onClick?: () => void;
  className?: string;
  disabled?: boolean;
}

export function CircleBtn({ className, icon }: any) {
  return (
    <div
      className={cn(
        `grid place-items-center size-12 bg-white overflow-hidden rounded-full`,
        className,
      )}
    >
      {icon}
    </div>
  );
}

export function PreviewBtn({ onClick, className }: btnProps) {
  return (
    <Button
      className={cn("border border-border bg-transparent size-10", className)}
      onClick={onClick}
    >
      <FavIcon className="size-5" name="preview" />
    </Button>
  );
}
export function OrderBtn({ onClick, className }: btnProps) {
  return (
    <Button
      className={cn("border border-border bg-transparent size-10", className)}
      onClick={onClick}
    >
      <FavIcon className="size-5" name="order" />
    </Button>
  );
}
export function EditBtn({ onClick, className }: btnProps) {
  return (
    <Button
      className={cn("border border-border bg-transparent size-10", className)}
      onClick={onClick}
    >
      <FavIcon className="size-5" name="edit" />
    </Button>
  );
}
export function DeleteBtn({ onClick, className }: btnProps) {
  return (
    <Button
      className={cn("border border-border bg-transparent size-10", className)}
      onClick={onClick}
    >
      <FavIcon className="size-5" name="delete" />
    </Button>
  );
}

export function Xbtn({ onClick, className }: btnProps) {
  return (
    <X
      onClick={onClick}
      className={cn(
        "absolute cursor-pointer text-black top-4 right-4",
        className,
      )}
    />
  );
}
