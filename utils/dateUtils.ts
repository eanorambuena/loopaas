/**
 * Utilidades para manejo de fechas en zona horaria de Chile
 */

/**
 * Convierte una fecha a la zona horaria de Chile
 * @param date - Fecha a convertir
 * @returns Fecha en zona horaria de Chile
 */
export function toChileTime(date: Date | string): Date {
  const dateObj = typeof date === 'string' ? new Date(date) : date
  return new Date(dateObj.toLocaleString('en-US', { timeZone: 'America/Santiago' }))
}

/**
 * Verifica si una fecha límite ya pasó comparando en zona horaria de Chile
 * @param deadline - Fecha límite (puede estar en UTC)
 * @param currentTime - Hora actual (opcional, por defecto usa la hora del sistema)
 * @returns true si la fecha límite ya pasó, false si aún está disponible
 */
export function isDeadlinePassed(deadline: Date | string, currentTime?: Date): boolean {
  const deadlineInChile = toChileTime(deadline)
  const currentChileTime = currentTime ? toChileTime(currentTime) : toChileTime(new Date())
  
  return deadlineInChile < currentChileTime
}

/**
 * Verifica si una fecha límite aún está disponible comparando en zona horaria de Chile
 * @param deadline - Fecha límite (puede estar en UTC)
 * @param currentTime - Hora actual (opcional, por defecto usa la hora del sistema)
 * @returns true si la fecha límite aún está disponible, false si ya pasó
 */
export function isDeadlineAvailable(deadline: Date | string, currentTime?: Date): boolean {
  return !isDeadlinePassed(deadline, currentTime)
}

/**
 * Obtiene la diferencia en días entre una fecha límite y la hora actual en zona horaria de Chile
 * @param deadline - Fecha límite (puede estar en UTC)
 * @param currentTime - Hora actual (opcional, por defecto usa la hora del sistema)
 * @returns Diferencia en días (positiva si aún no pasó, negativa si ya pasó)
 */
export function getDaysUntilDeadline(deadline: Date | string, currentTime?: Date): number {
  const deadlineInChile = toChileTime(deadline)
  const currentChileTime = currentTime ? toChileTime(currentTime) : toChileTime(new Date())
  
  const diffTime = deadlineInChile.getTime() - currentChileTime.getTime()
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24))
  
  return diffDays
} 