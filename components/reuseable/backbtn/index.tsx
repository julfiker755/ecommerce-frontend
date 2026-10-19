'use client';
import { cn } from 'cn';
import { ChevronLeft } from 'lucide-react';
import { useRouter } from 'next/navigation';

interface BackBtnProps {
  className?: string;
  label?: string;
}

export default function BackBtn({ className, label }: BackBtnProps) {
  const router = useRouter();
  return (
    <button
      onClick={() => router.back()}
      className={cn(
        'grid place-items-center cursor-pointer bg-admin-sideber rounded-full size-11',
        className
      )}
    >
      <ChevronLeft className="w-5 h-5" />
      {label && <span className="text-sm">{label}</span>}
    </button>
  );
}
