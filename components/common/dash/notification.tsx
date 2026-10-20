"use client";
import { Bell, CircleCheck, Info, TriangleAlert } from "lucide-react";
import { Button, Popover, PopoverContent, PopoverTrigger } from "@/components/ui";
import { cn } from "@/lib/utils";

const notifications = [
  {
    id: 1,
    title: "Low stock alert",
    message: "5 products are running low on stock",
    time: "5 min ago",
    type: "warning",
    unread: true,
  },
  {
    id: 2,
    title: "New order received",
    message: "Order #NSH-2451 — ৳4,290",
    time: "12 min ago",
    type: "info",
    unread: true,
  },
  {
    id: 3,
    title: "Pending review",
    message: "2 reviews awaiting moderation",
    time: "1 hour ago",
    type: "info",
    unread: true,
  },
  {
    id: 4,
    title: "Daily sales report",
    message: "Yesterday's revenue: ৳82,000",
    time: "8 hours ago",
    type: "success",
    unread: false,
  },
];

const typeStyles = {
  warning: { icon: TriangleAlert, style: "bg-amber-50 text-amber-600" },
  info: { icon: Info, style: "bg-sky-50 text-sky-600" },
  success: { icon: CircleCheck, style: "bg-emerald-50 text-emerald-600" },
};

export default function Notification() {
  const unreadCount = notifications.filter((n) => n.unread).length;

  return (
    <Popover>
      <PopoverTrigger
        render={
          <Button variant="ghost" size="icon-sm" aria-label="Notifications" className="relative" />
        }
      >
        <Bell />
        {unreadCount > 0 && (
          <span className="absolute -right-1 -top-1 grid size-4.5 place-items-center rounded-full bg-red-500 text-[10px] font-bold text-white">
            {unreadCount}
          </span>
        )}
      </PopoverTrigger>

      <PopoverContent align="end" sideOffset={8} className="w-90 gap-0 overflow-hidden rounded-xl p-0">
        <div className="flex items-center justify-between border-b border-border px-4 py-3">
          <h3 className="text-base font-semibold text-gray-900">Notifications</h3>
          {unreadCount > 0 && (
            <span className="rounded-full bg-red-50 px-2 py-0.5 text-xs font-medium text-red-600">
              {unreadCount} new
            </span>
          )}
        </div>

        <ul className="max-h-96 divide-y divide-border overflow-y-auto">
          {notifications.map((item) => {
            const { icon: Icon, style } = typeStyles[item.type as keyof typeof typeStyles];
            return (
              <li
                key={item.id}
                onClick={() => console.log("notification", item.id)}
                className={cn(
                  "flex cursor-pointer gap-3 px-4 py-3 hover:bg-gray-50",
                  item.unread && "bg-red-50/40"
                )}
              >
                <span className={cn("grid size-10 shrink-0 place-items-center rounded-xl", style)}>
                  <Icon size={18} />
                </span>
                <div className="min-w-0 flex-1">
                  <p className="font-semibold text-gray-900">{item.title}</p>
                  <p className="text-sm text-gray-500">{item.message}</p>
                  <p className="mt-1 text-xs text-gray-400">{item.time}</p>
                </div>
                {item.unread && <span className="mt-1.5 size-2 shrink-0 rounded-full bg-red-500" />}
              </li>
            );
          })}
        </ul>
      </PopoverContent>
    </Popover>
  );
}
