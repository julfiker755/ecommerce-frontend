"use client";
import { useState } from "react";
import { FieldValues, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Button,
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui";
import { Modal } from "@/components/reuseable/modal";
import Form from "@/components/reuseable/from";
import { FromTextArea } from "@/components/reuseable/from-textarea";
import { order_Cancel } from "@/schema";
import { statusStyles } from "@/components/common/landing/order-status-badge";
import type { OrderStatus } from "@/lib/data";
import { cn } from "@/lib/utils";

const statusOptions = [
  { label: "Pending", value: "pending" },
  { label: "Accepted", value: "accepted" },
  { label: "Packed", value: "packed" },
  { label: "Shipped", value: "shipped" },
  { label: "Delivered", value: "delivered" },
  { label: "Cancelled", value: "cancelled" },
];

interface StatusChangeProps {
  id: string;
  status: OrderStatus;
  className?: string;
  rootStyle?:any;
}

export default function StatusChange({ id, status, className, rootStyle }: StatusChangeProps) {
  const [value, setValue] = useState<string>(status);
  const [isOpen, setIsOpen] = useState(false);
  const form = useForm({
    resolver: zodResolver(order_Cancel),
    defaultValues: {
      reason: "",
    },
  });

  const handleChange = (val: string | null) => {
    if (!val || val === value) return;
    // cancelled needs a reason first
    if (val === "cancelled") {
      form.reset();
      setIsOpen(true);
      return;
    }
    setValue(val);
    console.log({ id, status: val });
  };

  const handleSubmit = (values: FieldValues) => {
    setValue("cancelled");
    setIsOpen(false);
    console.log({ id, status: "cancelled", reason: values.reason });
    form.reset();
  };

  return (
    <div className={cn("shrink-0", rootStyle)}>
      <Select items={statusOptions} value={value} onValueChange={handleChange}>
        <SelectTrigger
          className={cn(
            "h-9 min-w-32 rounded-full shadow-none border px-3 text-xs font-semibold",
            statusStyles[value as OrderStatus]?.className,
            className
          )}
        >
          <SelectValue />
        </SelectTrigger>
        <SelectContent>
          {statusOptions.map((o) => (
            <SelectItem key={o.value} value={o.value}>
              <span className="flex items-center gap-2">
                <span className={cn("size-2 shrink-0 rounded-full", statusStyles[o.value as OrderStatus].dot)} />
                {o.label}
              </span>
            </SelectItem>
          ))}
        </SelectContent>
      </Select>

      <Modal
        open={isOpen}
        setIsOpen={setIsOpen}
        title="Cancel Order"
        text={`Please write a reason for cancelling order #${id}.`}
      >
        <Form from={form} className="space-y-5" onSubmit={handleSubmit}>
          <FromTextArea
            label="Reason"
            name="reason"
            placeholder="Write cancellation reason..."
            className="min-h-28"
          />

          <div className="flex justify-end gap-3">
            <Button type="submit" variant="destructive">
              Cancel Order
            </Button>
          </div>
        </Form>
      </Modal>
    </div>
  );
}
