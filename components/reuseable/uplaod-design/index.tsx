import { Button } from '@/components/ui';
import { cn } from '@/lib';
import { Upload } from 'lucide-react';

const UploadDesign = ({
  title = 'Upload Image',
  text = 'PNG, JPG or WEBP (Max 5MB)',
  className = '',
}: any) => {
  return (
    <div
      className={cn(
        'w-full min-h-[160px] grid place-items-center border border-dashed border-gray-300 bg-gray-50/50 hover:bg-gray-50 transition-colors rounded-lg p-4 cursor-pointer',
        className
      )}
    >
      <div className="space-y-2 text-center">
        <div className="flex mx-auto h-10 w-10 items-center justify-center rounded-full bg-primary/10">
          <Upload className="h-5 w-5 text-primary" strokeWidth={2} />
        </div>

        <div>
          <p className="text-sm font-semibold text-gray-800 text-center">{title}</p>
          <p className="mt-0.5 text-xs text-gray-500">{text}</p>
        </div>
        <Button type="button" size="sm" variant="outline" className="mt-1">
          Browse Files
        </Button>
      </div>
    </div>
  );
};

export default UploadDesign;
