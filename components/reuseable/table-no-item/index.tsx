import React from 'react';
import { TableCell, TableRow } from '@/components/ui';
import { cn } from '@/lib/utils';
import FavIcon from '@/icon/favIcon';

export interface tableItemProps {
  title?: string;
  colSpan: number;
  className?: string;
  tdStyle?: string;
}

// TableNoItem
export function TableNoItem({
  title = 'No Data Found',
  colSpan,
  className,
  tdStyle,
}: tableItemProps) {
  return (
    <TableRow>
      <TableCell colSpan={colSpan} className={cn('text-center', tdStyle)}>
        <div className={cn('py-24 2xl:py-40 text-center', className)}>
          <div className="flex justify-center">
            <SVGFile color="#99a1af" />
          </div>
          <h3 className="text-sm font-medium text-gray-400 mt-5">{title}</h3>
        </div>
      </TableCell>
    </TableRow>
  );
}

interface itemProps {
  title?: string;
  className?: string;
  iconStyle?: string;
}

// NoItemData
export function NoItemData({
  title = 'No Data Found',
  className,
  iconStyle,
}: itemProps) {
  return (
    <div
      className={cn(
        'py-24 2xl:py-40 text-center border border-dashed rounded-md bg-admin-sideber/60 flex flex-col justify-center',
        className
      )}
    >
      <div className="flex justify-center">
        <SVGFile className={iconStyle} />
      </div>
      <h3 className="text-sm font-medium text-gray-500 mt-5">{title}</h3>
    </div>
  );
}

const SVGFile = ({ className }: any) => (
  <svg
    className={cn('size-20', className)}
    xmlns="http://www.w3.org/2000/svg"
    width="1em"
    height="1em"
    viewBox="0 0 24 24"
    fill="none"
  >
    <path d="M0 0h24v24H0z" fill="none" />
    <g fill="#6a7282 ">
      <path
        fillRule="evenodd"
        d="M14 22H10C6.22876 22 4.34315 22 3.17157 20.8284C2 19.6569 2 17.7712 2 14V10C2 6.22876 2 4.34315 3.17157 3.17157C4.34315 2 6.23869 2 10.0298 2C10.6358 2 11.1214 2 11.53 2.01666C11.5166 2.09659 11.5095 2.17813 11.5092 2.26057L11.5 5.09497C11.4999 6.19207 11.4998 7.16164 11.6049 7.94316C11.7188 8.79028 11.9803 9.63726 12.6716 10.3285C13.3628 11.0198 14.2098 11.2813 15.0569 11.3952C15.8385 11.5003 16.808 11.5002 17.9051 11.5001L18 11.5001H21.9574C22 12.0344 22 12.6901 22 13.5629V14C22 17.7712 22 19.6569 20.8284 20.8284C19.6569 22 17.7712 22 14 22Z"
        clipRule="evenodd"
      />
      <path d="M19.3517 7.61665L15.3929 4.05375C14.2651 3.03868 13.7012 2.53114 13.0092 2.26562L13 5.00011C13 7.35713 13 8.53564 13.7322 9.26787C14.4645 10.0001 15.643 10.0001 18 10.0001H21.5801C21.2175 9.29588 20.5684 8.71164 19.3517 7.61665Z" />
    </g>
  </svg>
);
