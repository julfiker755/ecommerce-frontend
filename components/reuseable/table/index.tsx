import {
  Table,
  TableBody,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { cn } from '@/lib/utils';
import React from 'react';

interface TableProps {
  className?: string;
  headers?: string[];
  children: React.ReactNode;
  pagination?: React.ReactNode;
  paginateStyle?: string;
}

export const CustomTable = ({
  className,
  headers = [],
  children,
  pagination,
  paginateStyle,
}: TableProps) => {
  return (
    <div className={cn('bg-transparent', className)}>
      <Table className="border-separate border-spacing-y-3 my-0">
        {headers && headers.length > 0 && (
          <TableHeader className="translate-y-1">
            <TableRow className="text-[15px] hover:bg-transparent font-semibold border-none">
              {headers?.map((header, index) => (
                <TableHead key={index}>
                  <h5 className="w-max text-gray-700 capitalize font-semibold px-1">
                    {header}
                  </h5>
                </TableHead>
              ))}
            </TableRow>
          </TableHeader>
        )}
        <TableBody className="[&>tr>td]:bg-admin [&>tr>td]:border-y [&>tr>td]:border-border [&>tr>td]:first:border-l [&>tr>td]:first:border-border [&>tr>td]:first:pl-5 [&>tr>td]:first:rounded-l-lg [&>tr>td]:last:border-r [&>tr>td]:last:border-border [&>tr>td]:last:rounded-r-lg [&>tr>td]:last:w-[180px]">
          {children}
        </TableBody>
      </Table>
      {pagination && <div className="mt-5 md:mt-0">{pagination}</div>}
    </div>
  );
};
