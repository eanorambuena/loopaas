'use client'

import * as React from 'react'
import { Bar, BarChart as RechartsBarChart, Line, LineChart as RechartsLineChart } from 'recharts'

import { cn } from '@/lib/utils'

const ChartContainer = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement> & {
    config?: ChartConfig
  }
>(({ className, children, config, ...props }, ref) => (
  <div
    ref={ref}
    className={cn('h-[350px] w-full', className)}
    style={
      {
        '--chart-1': config?.visitors?.color || 'hsl(var(--chart-1))',
        '--chart-2': config?.chrome?.color || 'hsl(var(--chart-2))',
        '--chart-3': config?.firefox?.color || 'hsl(var(--chart-3))',
        '--chart-4': config?.edge?.color || 'hsl(var(--chart-4))',
        '--chart-5': config?.other?.color || 'hsl(var(--chart-5))',
      } as React.CSSProperties
    }
    {...props}
  >
    {children}
  </div>
))
ChartContainer.displayName = 'ChartContainer'

const ChartTooltip = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn(
      'rounded-lg border bg-background p-2 shadow-sm',
      className
    )}
    {...props}
  />
))
ChartTooltip.displayName = 'ChartTooltip'

const ChartTooltipContent = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement> & {
    hideLabel?: boolean
  }
>(({ className, hideLabel, ...props }, ref) => (
  <div
    ref={ref}
    className={cn('grid gap-2', className)}
    {...props}
  />
))
ChartTooltipContent.displayName = 'ChartTooltipContent'

const BarChart = React.forwardRef<
  React.ElementRef<typeof RechartsBarChart>,
  React.ComponentPropsWithoutRef<typeof RechartsBarChart>
>(({ className, ...props }, ref) => (
  <RechartsBarChart
    ref={ref}
    className={cn('', className)}
    {...props}
  />
))
BarChart.displayName = 'BarChart'

const LineChart = React.forwardRef<
  React.ElementRef<typeof RechartsLineChart>,
  React.ComponentPropsWithoutRef<typeof RechartsLineChart>
>(({ className, ...props }, ref) => (
  <RechartsLineChart
    ref={ref}
    className={cn('', className)}
    {...props}
  />
))
LineChart.displayName = 'LineChart'



export {
  Bar,
  BarChart,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
  Line,
  LineChart,
}

export type ChartConfig = {
  visitors?: {
    label: string
    color?: string
  }
  chrome?: {
    label: string
    color?: string
  }
  safari?: {
    label: string
    color?: string
  }
  firefox?: {
    label: string
    color?: string
  }
  edge?: {
    label: string
    color?: string
  }
  other?: {
    label: string
    color?: string
  }
} 