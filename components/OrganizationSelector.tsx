'use client'

import { useEffect, useState } from 'react'
import { Button } from '@/components/ui/button'
import { Label } from '@/components/ui/label'

interface Organization {
  id: string
  name: string
  plan: string
}

interface OrganizationSelectorProps {
  value?: string
  onChange: (organizationId: string) => void
  label?: string
  placeholder?: string
  required?: boolean
  disabled?: boolean
}

export default function OrganizationSelector({
  value,
  onChange,
  label = 'Organización',
  placeholder = 'Selecciona una organización',
  required = false,
  disabled = false
}: OrganizationSelectorProps) {
  const [organizations, setOrganizations] = useState<Organization[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    async function fetchOrganizations() {
      try {
        const response = await fetch('/api/organizations')
        if (!response.ok) {
          throw new Error('Error al cargar organizaciones')
        }
        const data = await response.json()
        setOrganizations(data.organizations)
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Error desconocido')
      } finally {
        setLoading(false)
      }
    }

    fetchOrganizations()
  }, [])

  if (loading) {
    return (
      <div className="space-y-2">
        <Label htmlFor="organization-selector">{label}</Label>
        <div className="h-10 bg-secondary/50 rounded animate-pulse"></div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="space-y-2">
        <Label htmlFor="organization-selector">{label}</Label>
        <div className="p-2 border border-destructive rounded text-destructive text-sm">
          Error: {error}
        </div>
      </div>
    )
  }

  if (organizations.length === 0) {
    return (
      <div className="space-y-2">
        <Label htmlFor="organization-selector">{label}</Label>
        <div className="p-3 border rounded bg-muted/50 text-muted-foreground text-sm">
          No tienes organizaciones disponibles.{' '}
          <Button 
            variant="link" 
            className="p-0 h-auto text-primary underline"
            onClick={() => window.open('/organizaciones', '_blank')}
          >
            Crear una organización
          </Button>
        </div>
      </div>
    )
  }

  return (
    <div className="space-y-2">
      <Label htmlFor="organization-selector">
        {label}
        {required && <span className="text-destructive ml-1">*</span>}
      </Label>
      <select
        id="organization-selector"
        value={value || ''}
        onChange={(e) => onChange(e.target.value)}
        disabled={disabled}
        required={required}
        className="w-full h-10 px-3 border border-input bg-background rounded-md text-sm ring-offset-background placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
      >
        <option value="">{placeholder}</option>
        {organizations.map((org) => (
          <option key={org.id} value={org.id}>
            {org.name} ({org.plan})
          </option>
        ))}
      </select>
    </div>
  )
}
