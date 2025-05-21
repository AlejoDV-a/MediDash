import { DashboardHeader } from "@/components/dashboard-header"
import { DashboardShell } from "@/components/dashboard-shell"
import { AppointmentsCalendar } from "@/components/appointments-calendar"
import { Button } from "@/components/ui/button"
import { PlusCircle } from "lucide-react"

export default function AppointmentsPage() {
  return (
    <DashboardShell>
      <DashboardHeader heading="Appointments" text="Schedule and manage appointments">
        <Button>
          <PlusCircle className="mr-2 h-4 w-4" />
          New Appointment
        </Button>
      </DashboardHeader>
      <AppointmentsCalendar />
    </DashboardShell>
  )
}
