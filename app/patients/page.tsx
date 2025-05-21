import { DashboardHeader } from "@/components/dashboard-header"
import { DashboardShell } from "@/components/dashboard-shell"
import { PatientsList } from "@/components/patients-list"
import { Button } from "@/components/ui/button"
import { PlusCircle } from "lucide-react"

export default function PatientsPage() {
  return (
    <DashboardShell>
      <DashboardHeader heading="Patients" text="Manage your patient records">
        <Button>
          <PlusCircle className="mr-2 h-4 w-4" />
          Add Patient
        </Button>
      </DashboardHeader>
      <PatientsList />
    </DashboardShell>
  )
}
