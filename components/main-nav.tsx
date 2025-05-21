import type React from "react"
import Link from "next/link"
import { Activity } from "lucide-react"

import { cn } from "@/lib/utils"

export function MainNav({ className, ...props }: React.HTMLAttributes<HTMLElement>) {
  return (
    <nav className={cn("flex items-center space-x-4 lg:space-x-6", className)} {...props}>
      <Link href="/" className="flex items-center space-x-2 text-sm font-medium transition-colors hover:text-primary">
        <Activity className="h-4 w-4" />
        <span>Dashboard</span>
      </Link>
      <Link href="/patients" className="text-sm font-medium text-muted-foreground transition-colors hover:text-primary">
        Patients
      </Link>
      <Link
        href="/appointments"
        className="text-sm font-medium text-muted-foreground transition-colors hover:text-primary"
      >
        Appointments
      </Link>
      <Link href="/records" className="text-sm font-medium text-muted-foreground transition-colors hover:text-primary">
        Records
      </Link>
    </nav>
  )
}
