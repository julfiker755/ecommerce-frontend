import Link from "next/link";
import { Box } from "lucide-react";
import { ImgBox } from "@/components/reuseable/Img-box";
import { unsplash } from "@/lib/data";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui";

// ===== Mock data (replace with API later) =====
const topProducts = [
  { id: 1, name: 'LG gram Laptop - 13.3"', image: unsplash("1496181133206-80ce9b88a853", 120), sold: 198, profit: 2970 },
  { id: 2, name: "iPhone 15", image: unsplash("1592750475338-74b7b21085ab", 120), sold: 156, profit: 2340 },
  { id: 3, name: "Wireless Headphones", image: unsplash("1505740420928-5e560c06d30e", 120), sold: 102, profit: 1530 },
  { id: 4, name: "Smart Watch", image: unsplash("1579586337278-3befd40fd17a", 120), sold: 83, profit: 1245 },
  { id: 5, name: "Travel Backpack", image: unsplash("1553062407-98eeb64c6a62", 120), sold: 67, profit: 1005 },
];

const headers = ["#", "Product", "Items Sold", "Profit"];

export default function TopProducts() {
  return (
    <div className="rounded-xl border border-gray-200 bg-white p-5">
      <div className="mb-4 flex items-center justify-between gap-3">
        <h4 className="flex items-center gap-3 text-lg font-semibold text-gray-900">
          <span className="grid size-9 place-items-center rounded-full bg-secondary text-primary">
            <Box size={18} />
          </span>
          Top Products
        </h4>
        <Link href="/admin/product/list" className="text-sm font-medium text-blue-600 hover:underline">
          View All
        </Link>
      </div>

      <Table>
        <TableHeader>
          <TableRow className="hover:bg-transparent">
            {headers.map((header) => (
              <TableHead key={header} className="font-semibold normal-case text-gray-700">
                {header}
              </TableHead>
            ))}
          </TableRow>
        </TableHeader>
        <TableBody>
          {topProducts.map((item, index) => (
            <TableRow key={item.id}>
              <TableCell className="text-gray-700">{index + 1}</TableCell>
              <TableCell>
                <div className="flex items-center gap-3">
                  <ImgBox
                    src={item.image}
                    alt={item.name}
                    className="size-10 shrink-0 rounded-md border border-gray-200"
                  />
                  <span className="font-medium text-gray-900">{item.name}</span>
                </div>
              </TableCell>
              <TableCell className="text-gray-700">{item.sold}</TableCell>
              <TableCell className="font-semibold text-emerald-600">
                ${item.profit.toLocaleString("en-US", { minimumFractionDigits: 2 })}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
