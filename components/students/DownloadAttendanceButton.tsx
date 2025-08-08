import { Button } from '@/components/ui/button'

export default function DownloadAttendanceButton() {
  const handleDownload = () => {
    window.open('/api/plugins/attendance/download', '_blank')
  }

  return (
    <Button onClick={handleDownload} variant="secondary">
      Descargar asistencias (Excel)
    </Button>
  )
}
