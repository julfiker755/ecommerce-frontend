'use client';
import ResponsivePagination from 'react-responsive-pagination';
import { ChevronsLeft, ChevronsRight } from 'lucide-react';
import { cn } from '@/lib';

export function Pagination({
  current_page = 1,
  onPageChange,
  total = 10,
  per_page,
  className,
  activeStyle,
  itemStyle,
  name,
}: any) {
  const totalCount = Math.ceil(total / per_page);

  if (total <= per_page) return null;

  return (
    <ul className="flex items-center flex-wrap justify-between w-full pt-10 pb-3">
      <li className="flex">
        Total:
        <sup className="font-semibold text-2xl relative -top-3 px-2 ">
          {total}
        </sup>
        {name}
      </li>
      <li>
        <div className={cn('lg:w-[320px] flex justify-end', className)}>
          <ResponsivePagination
            previousLabel={<ChevronsLeft className="size-5" />}
            nextLabel={<ChevronsRight className="size-5" />}
            className="flex flex-row gap-1 w-fit"
            pageItemClassName={cn(
              'h-10  rounded-full bg-admin-sideber w-10 flex items-center text-article justify-center whitespace-nowrap text-sm font-medium hover:bg-admin-sideber hover:text-article',
              itemStyle
            )}
            pageLinkClassName="h-10 w-10 flex items-center justify-center rounded-full"
            activeItemClassName={cn(
              `bg-transparent border-none text-white bg-primary hover:!text-white  hover:!bg-primary rounded-full`,
              activeStyle
            )}
            disabledItemClassName="hover:!bg-transparent"
            current={current_page}
            total={totalCount}
            onPageChange={onPageChange}
          />
        </div>
      </li>
    </ul>
  );
}
