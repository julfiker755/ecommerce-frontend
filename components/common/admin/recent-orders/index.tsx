import Link from "next/link";
import { Clock } from "lucide-react";
import { cn } from "@/lib/utils";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui";

type OrderStatus = "delivered" | "processing" | "cancelled" | "pending";

const statusStyles: Record<OrderStatus, { label: string; className: string }> = {
  delivered: { label: "Delivered", className: "bg-emerald-50 text-emerald-700" },
  processing: { label: "Processing", className: "bg-amber-50 text-amber-700" },
  cancelled: { label: "Cancelled", className: "bg-red-50 text-red-700" },
  pending: { label: "Pending", className: "bg-sky-50 text-sky-700" },
};

// ===== Mock data (replace with API later) =====
const recentOrders: { id: string; customer: string; total: number; status: OrderStatus }[] = [
  { id: "ORD-1025", customer: "Sarah Khan", total: 299, status: "delivered" },
  { id: "ORD-1024", customer: "Ahmed Rahman", total: 159, status: "delivered" },
  { id: "ORD-1023", customer: "Fatima Noor", total: 89, status: "processing" },
  { id: "ORD-1022", customer: "Rifat Hasan", total: 420, status: "cancelled" },
  { id: "ORD-1021", customer: "Nusrat Jahan", total: 275, status: "delivered" },
];

const headers = ["Order ID", "Customer", "Total", "Status"];

export default function RecentOrders() {
  return (
    <div className="rounded-xl border border-gray-200 bg-white p-5">
      <div className="mb-4 flex items-center justify-between gap-3">
        <h4 className="flex items-center gap-3 text-lg font-semibold text-gray-900">
          <span className="grid size-9 place-items-center rounded-full bg-secondary text-primary">
            <Clock size={18} />
          </span>
          Recent Orders
        </h4>
        <Link href="#" className="text-sm font-medium text-blue-600 hover:underline">
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
          {recentOrders.map((item) => (
            <TableRow key={item.id} className="h-15">
              <TableCell>
                <span className="flex items-center gap-2.5 font-medium text-gray-900">
                  <span className="size-2 rounded-full bg-blue-500" />#{item.id}
                </span>
              </TableCell>
              <TableCell className="text-gray-700">{item.customer}</TableCell>
              <TableCell className="text-gray-700">${item.total.toFixed(2)}</TableCell>
              <TableCell>
                <span
                  className={cn(
                    "rounded-full px-2.5 py-1 text-xs font-medium",
                    statusStyles[item.status].className
                  )}
                >
                  {statusStyles[item.status].label}
                </span>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
