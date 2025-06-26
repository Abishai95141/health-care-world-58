
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from '@/components/ui/chart';
import { BarChart, Bar, XAxis, YAxis, ResponsiveContainer } from 'recharts';

interface TopProduct {
  id: string;
  name: string;
  totalQuantity: number;
  totalRevenue: number;
}

interface TopProductsChartProps {
  data: TopProduct[];
  title?: string;
}

const chartConfig = {
  totalRevenue: {
    label: "Revenue",
    color: "#2563eb",
  },
  totalQuantity: {
    label: "Quantity",
    color: "#dc2626",
  },
};

const TopProductsChart = ({ data, title = "Top Products" }: TopProductsChartProps) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>{title}</CardTitle>
      </CardHeader>
      <CardContent>
        <ChartContainer config={chartConfig}>
          <BarChart data={data} layout="horizontal">
            <XAxis type="number" />
            <YAxis 
              dataKey="name" 
              type="category" 
              width={120}
              tickFormatter={(value) => value.length > 15 ? value.substring(0, 15) + '...' : value}
            />
            <ChartTooltip content={<ChartTooltipContent />} />
            <Bar 
              dataKey="totalRevenue" 
              fill="var(--color-totalRevenue)" 
              name="Revenue (₹)"
            />
          </BarChart>
        </ChartContainer>
      </CardContent>
    </Card>
  );
};

export default TopProductsChart;
