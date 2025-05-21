"use client"

import { useEffect, useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { getTodayAppointments } from "@/app/actions"

interface UpcomingAppointmentsProps {
  className?: string
}

export function UpcomingAppointments({ className }: UpcomingAppointmentsProps) {
  const [appointments, setAppointments] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function loadAppointments() {
      try {
        const data = await getTodayAppointments()
        setAppointments(data)
      } catch (error) {
        console.error("Failed to load appointments:", error)
      } finally {
        setLoading(false)
      }
    }

    loadAppointments()
  }, [])

  return (
    <Card className={className}>
      <CardHeader>
        <CardTitle>Today's Appointments</CardTitle>
        <CardDescription>You have {appointments.length} appointments scheduled for today</CardDescription>
      </CardHeader>
      <CardContent>
        {loading ? (
          <div className="flex h-[200px] items-center justify-center">
            <p>Loading appointments...</p>
          </div>
        ) : appointments.length === 0 ? (
          <p className="text-center text-muted-foreground">No appointments scheduled for today</p>
        ) : (
          <div className="space-y-4">
            {appointments.map((appointment) => (
              <div key={appointment.id} className="flex items-center justify-between space-x-4">
                <div className="flex items-center space-x-4">
                  <Avatar>
                    <AvatarImage src={appointment.avatar || "/placeholder.svg"} alt={appointment.patient_name} />
                    <AvatarFallback>{appointment.initials}</AvatarFallback>
                  </Avatar>
                  <div>
                    <p className="text-sm font-medium leading-none">{appointment.patient_name}</p>
                    <p className="text-sm text-muted-foreground">
                      {appointment.time} - {appointment.type}
                    </p>
                  </div>
                </div>
                <Badge variant={appointment.status === "confirmed" ? "default" : "outline"}>{appointment.status}</Badge>
              </div>
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  )
}
