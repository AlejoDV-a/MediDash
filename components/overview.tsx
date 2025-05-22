"use client"

import { useEffect, useState } from "react"
import { Bar, BarChart, ResponsiveContainer, XAxis, YAxis, Tooltip } from "recharts"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { getMonthlyStats } from "@/app/actions"


interface OverviewProps {
  className?: string
}

export function Overview({ className }: OverviewProps) {
  // Define the MonthlyStats type based on the expected structure from getMonthlyStats
  type MonthlyStats = {
    name: string
    appointments: number
    new_patients: number
  }

  const [data, setData] = useState<MonthlyStats[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function loadData() {
      try {
        const stats = await getMonthlyStats()
        setData(stats)
      } catch (error) {
        console.error("Failed to load monthly stats:", error)
      } finally {
        setLoading(false)
      }
    }

    loadData()
  }, [])

  return (
    <Card className={className}>
      <CardHeader>
        <CardTitle>Practice Overview</CardTitle>
        <CardDescription>Monthly appointments and new patients</CardDescription>
      </CardHeader>
      <CardContent className="pl-2">
        {loading ? (
          <div className="flex h-[350px] items-center justify-center">
            <p>Loading data...</p>
          </div>
        ) : (
          <ResponsiveContainer width="100%" height={350}>
            <BarChart data={data}>
              <XAxis dataKey="name" stroke="#888888" fontSize={12} tickLine={false} axisLine={false} />
              <YAxis
                stroke="#888888"
                fontSize={12}
                tickLine={false}
                axisLine={false}
                tickFormatter={(value) => `${value}`}
              />
              <Tooltip />
              <Bar dataKey="appointments" fill="#3b82f6" radius={[4, 4, 0, 0]} name="Appointments" />
              <Bar dataKey="new_patients" fill="#10b981" radius={[4, 4, 0, 0]} name="New Patients" />
            </BarChart>
          </ResponsiveContainer>
        )}
      </CardContent>
    </Card>
  )
}
