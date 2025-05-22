"use client"

import type React from "react"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { Calendar, FileText, LayoutDashboard, LineChart, Settings, Users } from "lucide-react"

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"

type SidebarProps = React.HTMLAttributes<HTMLDivElement>;

export function Sidebar({ className }: SidebarProps) {
  const pathname = usePathname()

  const routes = [
    {
      label: "Dashboard",
      icon: LayoutDashboard,
      href: "/",
      active: pathname === "/",
    },
    {
      label: "Patients",
      icon: Users,
      href: "/patients",
      active: pathname === "/patients",
    },
    {
      label: "Appointments",
      icon: Calendar,
      href: "/appointments",
      active: pathname === "/appointments",
    },
    {
      label: "Medical Records",
      icon: FileText,
      href: "/records",
      active: pathname === "/records",
    },
    {
      label: "Analytics",
      icon: LineChart,
      href: "/analytics",
      active: pathname === "/analytics",
    },
    {
      label: "Settings",
      icon: Settings,
      href: "/settings",
      active: pathname === "/settings",
    },
  ]

  return (
    <div className={cn("pb-12", className)}>
      <div className="space-y-4 py-4">
        <div className="px-3 py-2">
          <h2 className="mb-2 px-4 text-lg font-semibold tracking-tight">MediDash</h2>
          <div className="space-y-1">
            {routes.map((route) => (
              <Button
                key={route.href}
                variant={route.active ? "default" : "ghost"}
                className={cn(
                  "w-full justify-start",
                  route.active ? "bg-primary text-primary-foreground" : "transparent",
                )}
                asChild
              >
                <Link href={route.href}>
                  <route.icon className="mr-2 h-4 w-4" />
                  {route.label}
                </Link>
              </Button>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
