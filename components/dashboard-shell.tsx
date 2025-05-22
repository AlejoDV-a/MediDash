import type React from "react"
interface DashboardShellProps {
  children: React.ReactNode
  className?: string
}

export function DashboardShell({
  children,
  
}: DashboardShellProps & React.HTMLAttributes<HTMLDivElement>) {
  return <div className=" flex-1 space-y-6 p-2 md:p-8">{children}</div>
}
