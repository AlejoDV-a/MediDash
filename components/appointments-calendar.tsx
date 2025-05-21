"use client"

import { useState, useEffect } from "react"
import { format } from "date-fns"
import { Calendar } from "@/components/ui/calendar"
import { Card, CardContent } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { getAppointmentsByDate } from "@/app/actions"

type Appointment = {
  id: string | number
  time: string
  avatar?: string
  patient_name: string
  initials?: string
  type: string
  duration: number
  status: string
}

export function AppointmentsCalendar() {
  const [date, setDate] = useState<Date | undefined>(new Date())
  const [view, setView] = useState<"day" | "week">("day")
  const [appointments, setAppointments] = useState<Appointment[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function loadAppointments() {
      if (!date) return

      setLoading(true)
      try {
        const formattedDate = format(date, "yyyy-MM-dd")
        const data = await getAppointmentsByDate(formattedDate)
        setAppointments(data)
      } catch (error) {
        console.error("Failed to load appointments:", error)
      } finally {
        setLoading(false)
      }
    }

    loadAppointments()
  }, [date])

  return (
    <div className="grid grid-cols-1 gap-y-6 md:grid-cols-[360px_1fr] md:gap-x-6">
  {/* Calendario */}
  <Card className="w-full">
    <CardContent className="p-6 space-y-6">
      <div className="flex items-center justify-between">
        <Select defaultValue="day" onValueChange={(value) => setView(value as "day" | "week")}>
          <SelectTrigger className="w-28">
            <SelectValue placeholder="View" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="day">Day</SelectItem>
            <SelectItem value="week">Week</SelectItem>
          </SelectContent>
        </Select>
        <Button variant="outline" size="lg" onClick={() => setDate(new Date())}>
          Today
        </Button>
      </div>
      <div className="w-full">
        <Calendar
          mode="single"
          selected={date}
          onSelect={setDate}
          className="w-full rounded-md border"
        />
      </div>
    </CardContent>
  </Card>

  {/* Lista de citas */}
  
      {/* contenido de la lista */}
       {/* Appointment List */}
      <Card className="min-h-[400px]">
        <CardContent className="p-6 space-y-6">
          <div className="flex items-center justify-between">
            <h3 className="text-xl font-semibold">
              {date?.toLocaleDateString("en-US", {
                weekday: "long",
                month: "long",
                day: "numeric",
                year: "numeric",
              })}
            </h3>
            <div className="flex items-center space-x-2">
              <Badge variant="outline" className="bg-green-50 text-green-700">Available</Badge>
              <Badge variant="outline" className="bg-blue-50 text-blue-700">Booked</Badge>
              <Badge variant="outline" className="bg-yellow-50 text-yellow-700">Pending</Badge>
            </div>
          </div>

          {loading ? (
            <div className="flex h-[300px] items-center justify-center">
              <p className="text-muted-foreground">Loading appointments...</p>
            </div>
          ) : appointments.length === 0 ? (
            <div className="flex h-[300px] items-center justify-center">
              <p className="text-muted-foreground">No appointments scheduled for this date</p>
            </div>
          ) : (
            <div className="space-y-4 max-h-[500px] overflow-y-auto pr-2">
              {appointments.map((appointment) => (
                <div
                  key={appointment.id}
                  className="flex items-center justify-between p-4 rounded-md border bg-muted/20"
                >
                  <div className="flex items-center space-x-4">
                    <div className="text-sm font-medium text-muted-foreground w-16 shrink-0">
                      {appointment.time}
                    </div>
                    <Avatar>
                      <AvatarImage src={appointment.avatar || "/placeholder.svg"} alt={appointment.patient_name} />
                      <AvatarFallback>{appointment.initials}</AvatarFallback>
                    </Avatar>
                    <div>
                      <p className="text-sm font-medium">{appointment.patient_name}</p>
                      <p className="text-sm text-muted-foreground">
                        {appointment.type} • {appointment.duration} min
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Badge
                      variant={appointment.status === "confirmed" ? "default" : "outline"}
                      className={appointment.status === "confirmed" ? "bg-green-600 text-white" : ""}
                    >
                      {appointment.status}
                    </Badge>
                    <Button variant="ghost" size="sm">Details</Button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>
</div>

  )
}
