import * as React from "react"

export const ChartContainer = ({
  children,
  data,
  xAxisKey,
  yAxisKey,
  className,
}: {
  children: React.ReactNode
  data: any[]
  xAxisKey: string
  yAxisKey: string
  className?: string
}) => {
  return (
    <div className={className}>
      {React.Children.map(children, (child) => {
        return React.cloneElement(React.Children.only(child) as React.ReactElement, {
          data,
          xAxisKey,
          yAxisKey,
        })
      })}
    </div>
  )
}

export const ChartGrid = () => {
  return null
}

export const ChartXAxis = () => {
  return null
}

export const ChartYAxis = () => {
  return null
}

export const ChartLine = () => {
  return null
}

export const ChartBar = () => {
  return null
}

export const ChartArea = () => {
  return null
}

export const ChartTooltip = ({ children }: { children: React.ReactNode }) => {
  return children
}

export const ChartTooltipContent = () => {
  return null
}

export type ChartAxisOptions = {
  domain: [number, number]
}

export const Chart = () => {
  return null
}
