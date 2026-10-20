"use client";
import { ChartLine } from "lucide-react";
import { Bar, BarChart, CartesianGrid, XAxis, YAxis } from "recharts";
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";

// ===== Mock data (replace with API later) =====
const sales = [
  2050, 1350, 2000, 2500, 2400, 2050, 2250, 2500, 2050, 2200, 2000, 1350, 2500, 2850, 3050, 4000,
  2400, 3050, 2200, 2650, 2050, 2050, 2600, 2050, 2950, 2400, 2200, 2100, 2950, 2450, 2200,
];
const profit = [
  850, 650, 850, 1000, 1000, 950, 1000, 1000, 950, 900, 750, 650, 1050, 1150, 1550, 2200, 1150,
  1500, 1000, 1000, 900, 1000, 1500, 1150, 1000, 1150, 1000, 1000, 1500, 1150, 1350,
];

const chartData = sales.map((total, i) => ({
  day: `Oct ${i + 1}`,
  sales: total,
  profit: profit[i],
}));

const chartConfig = {
  sales: { label: "Total Sales", color: "#2563eb" },
  profit: { label: "Profit", color: "#10b981" },
} satisfies ChartConfig;

export default function SalesOverview() {
  return (
    <div className="rounded-xl border border-gray-200 bg-white p-5">
      <div className="mb-5 flex flex-wrap items-center justify-between gap-3">
        <h4 className="flex items-center gap-2 text-lg font-semibold text-gray-900">
          <ChartLine size={20} className="text-blue-600" />
          Sales Overview
        </h4>

        <ul className="flex items-center gap-5 text-sm text-gray-600">
          {Object.entries(chartConfig).map(([key, { label, color }]) => (
            <li key={key} className="flex items-center gap-2">
              <span className="size-2.5 rounded-full" style={{ background: color }} />
              {label}
            </li>
          ))}
        </ul>
      </div>

      <ChartContainer config={chartConfig} className="aspect-auto h-72 w-full">
        <BarChart data={chartData} barGap={2} margin={{ left: -8, right: 0 }}>
          <CartesianGrid vertical={false} strokeDasharray="3 3" />
          <XAxis
            dataKey="day"
            tickLine={false}
            axisLine={false}
            tickMargin={10}
            ticks={["Oct 1", "Oct 5", "Oct 10", "Oct 15", "Oct 20", "Oct 25", "Oct 31"]}
          />
          <YAxis
            tickLine={false}
            axisLine={false}
            tickMargin={8}
            tickFormatter={(value) => `$${Number(value).toLocaleString()}`}
          />
          <ChartTooltip cursor={false} content={<ChartTooltipContent />} />
          <Bar dataKey="sales" fill="var(--color-sales)" radius={[3, 3, 0, 0]} maxBarSize={10} />
          <Bar dataKey="profit" fill="var(--color-profit)" radius={[3, 3, 0, 0]} maxBarSize={10} />
        </BarChart>
      </ChartContainer>
    </div>
  );
}
