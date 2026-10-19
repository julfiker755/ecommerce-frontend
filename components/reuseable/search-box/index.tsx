'use client';

import React, { useState } from 'react';
import { Input } from '@/components/ui';
import { Search } from 'lucide-react';
import { cn } from '@/lib/utils';

interface SearchBoxProps {
  onChange: (value: string) => void;
  placeholder?: string;
  className?: string;
}

export default function SearchBox({
  onChange,
  placeholder = 'Search',
  className,
}: SearchBoxProps) {
  const [searchText, setSearchText] = useState('');

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const text = e.target.value;
    setSearchText(text);
    onChange(text);
  };

  return (
    <div
      className={cn(
        'relative flex items-center w-full lg:max-w-md rounded-full border border-gray-300/80 bg-[#F9FAFB] px-4 transition-all',
        className
      )}
    >
      <Search className="h-4.5 w-4.5 text-gray-400 shrink-0 mr-2" />
      <Input
        type="text"
        value={searchText}
        onChange={handleSearchChange}
        placeholder={placeholder}
        className="h-10 w-full rounded-full border-0 bg-transparent px-0 text-sm text-gray-900 placeholder:text-gray-400 focus-visible:ring-0 focus-visible:ring-offset-0 shadow-none"
      />
    </div>
  );
}
