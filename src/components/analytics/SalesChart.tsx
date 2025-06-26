
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from '@/components/ui/chart';
import { LineChart, Line, XAxis, YAxis, ResponsiveContainer } from 'recharts';

interface SalesData {
  date: string;
  revenue: number;
  orders: number;
}

interface SalesChartProps {
  data: SalesData[];
  title?: string;
}

const chartConfig = {
  revenue: {
    label: "Revenue",
    color: "#2563eb",
  },
  orders: {
    label: "Orders",
    color: "#dc2626",
  },
};

const SalesChart = ({ data, title = "Sales Trend" }: SalesChartProps) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>{title}</CardTitle>
      </CardHeader>
      <CardContent>
        <ChartContainer config={chartConfig}>
          <LineChart data={data}>
            <XAxis 
              dataKey="date" 
              tickFormatter={(value) => new Date(value).toLocaleDateString()}
            />
            <YAxis />
            <ChartTooltip content={<ChartTooltipContent />} />
            <Line 
              type="monotone" 
              dataKey="revenue" 
              stroke="var(--color-revenue)" 
              strokeWidth={2}
              name="Revenue (₹)"
            />
            <Line 
              type="monotone" 
              dataKey="orders" 
              stroke="var(--color-orders)" 
              strokeWidth={2}
              name="Orders"
            />
          </LineChart>
        </ChartContainer>
      </CardContent>
    </Card>
  );
};

export default SalesChart;
