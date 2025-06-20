"use client"

import { Line, LineChart, Bar, BarChart, XAxis, YAxis, CartesianGrid, ResponsiveContainer } from "recharts"
import { ChartContainer, ChartTooltip, ChartTooltipContent, ChartLegend, ChartLegendContent } from "@/components/ui/chart"
import { Card } from "@/components/ui/card"

// Metric Display Component
export function MetricDisplay({ metrics }: { metrics: Array<{ value: string; label: string }> }) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 my-8">
      {metrics.map((metric, index) => (
        <Card key={index} className="p-6 text-center bg-gray-50 dark:bg-gray-900 border-gray-300 dark:border-gray-700">
          <div className="text-3xl md:text-4xl font-bold font-mono tracking-tight mb-2">
            {metric.value}
          </div>
          <div className="text-xs uppercase tracking-widest text-gray-600 dark:text-gray-400">
            {metric.label}
          </div>
        </Card>
      ))}
    </div>
  )
}

// Token Distribution Bar Chart
export function TokenDistributionChart({ data }: { data: any[] }) {
  const chartConfig = {
    inputTokens: {
      label: "Input Tokens",
      color: "hsl(var(--chart-1))",
    },
    outputTokens: {
      label: "Output Tokens",
      color: "hsl(var(--chart-2))",
    },
  }

  return (
    <Card className="p-6 my-8 bg-gray-50 dark:bg-gray-900 border-gray-300 dark:border-gray-700">
      <h3 className="text-sm uppercase tracking-widest mb-4 text-gray-700 dark:text-gray-300">
        Input-Output Token Distribution
      </h3>
      <ChartContainer config={chartConfig} className="h-[300px]">
        <BarChart data={data}>
          <CartesianGrid strokeDasharray="3 3" className="stroke-gray-200 dark:stroke-gray-800" />
          <XAxis 
            dataKey="date" 
            className="text-xs"
            stroke="currentColor"
          />
          <YAxis 
            className="text-xs"
            stroke="currentColor"
            tickFormatter={(value) => value.toLocaleString()}
          />
          <ChartTooltip content={<ChartTooltipContent />} />
          <ChartLegend content={<ChartLegendContent />} />
          <Bar dataKey="inputTokens" fill="var(--color-inputTokens)" />
          <Bar dataKey="outputTokens" fill="var(--color-outputTokens)" />
        </BarChart>
      </ChartContainer>
    </Card>
  )
}

// Efficiency Trajectory Line Chart
export function EfficiencyChart({ data }: { data: any[] }) {
  const chartConfig = {
    ratio: {
      label: "Output/Input Ratio",
      color: "hsl(var(--chart-1))",
    },
  }

  return (
    <Card className="p-6 my-8 bg-gray-50 dark:bg-gray-900 border-gray-300 dark:border-gray-700">
      <h3 className="text-sm uppercase tracking-widest mb-4 text-gray-700 dark:text-gray-300">
        Efficiency Multiplier Trajectory
      </h3>
      <ChartContainer config={chartConfig} className="h-[300px]">
        <LineChart data={data}>
          <CartesianGrid strokeDasharray="3 3" className="stroke-gray-200 dark:stroke-gray-800" />
          <XAxis 
            dataKey="date" 
            className="text-xs"
            stroke="currentColor"
          />
          <YAxis 
            className="text-xs"
            stroke="currentColor"
            label={{ 
              value: 'Output tokens per input token', 
              angle: -90, 
              position: 'insideLeft',
              className: 'text-xs fill-current'
            }}
          />
          <ChartTooltip 
            content={<ChartTooltipContent />}
            formatter={(value: any) => [`Ratio: ${value.toFixed(1)}:1`, '']}
          />
          <Line 
            type="monotone" 
            dataKey="ratio" 
            stroke="var(--color-ratio)" 
            strokeWidth={2}
            dot={{ r: 6, strokeWidth: 2 }}
          />
        </LineChart>
      </ChartContainer>
    </Card>
  )
}

// Comparative Performance Table
export function PerformanceTable({ data }: { data: any[] }) {
  return (
    <Card className="p-6 my-8 bg-gray-50 dark:bg-gray-900 border-gray-300 dark:border-gray-700">
      <h3 className="text-sm uppercase tracking-widest mb-4 text-gray-700 dark:text-gray-300">
        Comparative Performance Metrics
      </h3>
      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-gray-300 dark:border-gray-700">
              <th className="text-left py-3 px-4 font-normal uppercase tracking-widest text-xs">Metric</th>
              <th className="text-left py-3 px-4 font-normal uppercase tracking-widest text-xs">Pre-Optimization<br/>(Jun 13-16)</th>
              <th className="text-left py-3 px-4 font-normal uppercase tracking-widest text-xs">Post-Optimization<br/>(Jun 17-19)</th>
              <th className="text-left py-3 px-4 font-normal uppercase tracking-widest text-xs">Delta</th>
            </tr>
          </thead>
          <tbody>
            {data.map((row, index) => (
              <tr key={index} className="border-b border-gray-200 dark:border-gray-800 hover:bg-gray-100 dark:hover:bg-gray-800">
                <td className="py-3 px-4">{row.metric}</td>
                <td className="py-3 px-4 font-mono">{row.preOptimization}</td>
                <td className="py-3 px-4 font-mono">{row.postOptimization}</td>
                <td className="py-3 px-4 font-mono font-semibold">{row.delta}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </Card>
  )
}

// Insight Box Component
export function InsightBox({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <Card className="p-6 my-8 bg-gray-100 dark:bg-gray-800 border-2 border-gray-900 dark:border-gray-100">
      <h3 className="font-bold uppercase tracking-widest text-sm mb-4">{title}</h3>
      <div className="prose prose-sm dark:prose-invert max-w-none">
        {children}
      </div>
    </Card>
  )
}