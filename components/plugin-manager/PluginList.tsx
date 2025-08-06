'use client'

import React, { useState, useMemo } from 'react'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { IconSearch, IconFilter, IconSortAscending, IconSortDescending } from '@tabler/icons-react'
import { type CustomPlugin } from './types'
import { PluginCard } from './PluginCard'

interface PluginListProps {
  plugins: CustomPlugin[]
  onToggle: (id: string, enabled: boolean) => void
  onEdit: (plugin: CustomPlugin) => void
  onDelete: (id: string) => void
  onView: (plugin: CustomPlugin) => void
  onShare: (plugin: CustomPlugin) => void
}

type SortField = 'name' | 'created' | 'enabled'
type SortOrder = 'asc' | 'desc'
type FilterStatus = 'all' | 'active' | 'inactive'

export function PluginList({ 
  plugins, 
  onToggle, 
  onEdit, 
  onDelete, 
  onView, 
  onShare 
}: PluginListProps) {
  const [searchQuery, setSearchQuery] = useState('')
  const [sortField, setSortField] = useState<SortField>('name')
  const [sortOrder, setSortOrder] = useState<SortOrder>('asc')
  const [filterStatus, setFilterStatus] = useState<FilterStatus>('all')

  // Plugins filtrados y ordenados
  const filteredAndSortedPlugins = useMemo(() => {
    let result = [...plugins]

    // Filtrar por búsqueda
    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase().trim()
      result = result.filter(plugin => 
        plugin.name.toLowerCase().includes(query) ||
        plugin.description.toLowerCase().includes(query) ||
        plugin.id.toLowerCase().includes(query)
      )
    }

    // Filtrar por estado
    if (filterStatus !== 'all') {
      result = result.filter(plugin => 
        filterStatus === 'active' ? plugin.enabled : !plugin.enabled
      )
    }

    // Ordenar
    result.sort((a, b) => {
      let comparison = 0

      switch (sortField) {
        case 'name':
          comparison = a.name.localeCompare(b.name)
          break
        case 'enabled':
          comparison = (a.enabled === b.enabled) ? 0 : a.enabled ? -1 : 1
          break
        case 'created':
          // Extraer timestamp del ID si existe
          const aId = parseInt(a.id.split('_')[1]) || 0
          const bId = parseInt(b.id.split('_')[1]) || 0
          comparison = aId - bId
          break
      }

      return sortOrder === 'asc' ? comparison : -comparison
    })

    return result
  }, [plugins, searchQuery, sortField, sortOrder, filterStatus])

  const toggleSort = (field: SortField) => {
    if (sortField === field) {
      setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc')
    } else {
      setSortField(field)
      setSortOrder('asc')
    }
  }

  const activeCount = plugins.filter(p => p.enabled).length
  const totalCount = plugins.length

  if (plugins.length === 0) {
    return (
      <div className="text-center py-12">
        <div className="mx-auto w-24 h-24 bg-gray-100 dark:bg-gray-800 rounded-full flex items-center justify-center mb-4">
          <IconFilter className="w-8 h-8 text-gray-400" />
        </div>
        <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">
          No hay plugins personalizados
        </h3>
        <p className="text-gray-500 dark:text-gray-400 mb-6 max-w-sm mx-auto">
          Crea tu primer plugin personalizado para comenzar a personalizar tu experiencia.
        </p>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      {/* Header con estadísticas y controles */}
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
        <div className="flex items-center gap-4">
          <div>
            <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
              Plugins Personalizados
            </h2>
            <div className="flex items-center gap-2 mt-1">
              <Badge variant="outline" className="bg-emerald-50 text-emerald-700 border-emerald-200 dark:bg-emerald-900 dark:text-emerald-300 dark:border-emerald-700">
                {activeCount} activos
              </Badge>
              <Badge variant="outline" className="bg-gray-50 text-gray-600 border-gray-200 dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600">
                {totalCount} total
              </Badge>
            </div>
          </div>
        </div>

        {/* Controles de búsqueda y filtros */}
        <div className="flex flex-col sm:flex-row gap-3 lg:min-w-96">
          {/* Búsqueda */}
          <div className="relative flex-1">
            <IconSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
            <Input
              placeholder="Buscar plugins..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10"
            />
          </div>

          {/* Filtros de estado */}
          <div className="flex gap-2">
            <Button
              variant={filterStatus === 'all' ? 'default' : 'outline'}
              size="sm"
              onClick={() => setFilterStatus('all')}
              className="text-xs"
            >
              Todos
            </Button>
            <Button
              variant={filterStatus === 'active' ? 'default' : 'outline'}
              size="sm"
              onClick={() => setFilterStatus('active')}
              className="text-xs"
            >
              Activos
            </Button>
            <Button
              variant={filterStatus === 'inactive' ? 'default' : 'outline'}
              size="sm"
              onClick={() => setFilterStatus('inactive')}
              className="text-xs"
            >
              Inactivos
            </Button>
          </div>
        </div>
      </div>

      {/* Controles de ordenación */}
      <div className="flex items-center gap-2 text-sm">
        <span className="text-gray-500 dark:text-gray-400">Ordenar por:</span>
        <div className="flex gap-1">
          <Button
            variant={sortField === 'name' ? 'default' : 'ghost'}
            size="sm"
            onClick={() => toggleSort('name')}
            className="h-8 px-3 text-xs"
          >
            Nombre
            {sortField === 'name' && (
              sortOrder === 'asc' 
                ? <IconSortAscending className="w-3 h-3 ml-1" />
                : <IconSortDescending className="w-3 h-3 ml-1" />
            )}
          </Button>
          <Button
            variant={sortField === 'enabled' ? 'default' : 'ghost'}
            size="sm"
            onClick={() => toggleSort('enabled')}
            className="h-8 px-3 text-xs"
          >
            Estado
            {sortField === 'enabled' && (
              sortOrder === 'asc' 
                ? <IconSortAscending className="w-3 h-3 ml-1" />
                : <IconSortDescending className="w-3 h-3 ml-1" />
            )}
          </Button>
          <Button
            variant={sortField === 'created' ? 'default' : 'ghost'}
            size="sm"
            onClick={() => toggleSort('created')}
            className="h-8 px-3 text-xs"
          >
            Creación
            {sortField === 'created' && (
              sortOrder === 'asc' 
                ? <IconSortAscending className="w-3 h-3 ml-1" />
                : <IconSortDescending className="w-3 h-3 ml-1" />
            )}
          </Button>
        </div>
      </div>

      {/* Lista de plugins */}
      {filteredAndSortedPlugins.length === 0 ? (
        <div className="text-center py-12">
          <div className="mx-auto w-16 h-16 bg-gray-100 dark:bg-gray-800 rounded-full flex items-center justify-center mb-4">
            <IconSearch className="w-6 h-6 text-gray-400" />
          </div>
          <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">
            No se encontraron plugins
          </h3>
          <p className="text-gray-500 dark:text-gray-400 max-w-sm mx-auto">
            {searchQuery.trim() 
              ? `No hay plugins que coincidan con "${searchQuery}"`
              : 'No hay plugins con el filtro seleccionado'
            }
          </p>
          {(searchQuery.trim() || filterStatus !== 'all') && (
            <div className="mt-4 flex justify-center gap-2">
              <Button
                variant="outline"
                size="sm"
                onClick={() => {
                  setSearchQuery('')
                  setFilterStatus('all')
                }}
                className="text-xs"
              >
                Limpiar filtros
              </Button>
            </div>
          )}
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
          {filteredAndSortedPlugins.map((plugin) => (
            <PluginCard
              key={plugin.id}
              plugin={plugin}
              onToggle={onToggle}
              onEdit={onEdit}
              onDelete={onDelete}
              onView={onView}
              onShare={onShare}
            />
          ))}
        </div>
      )}

      {/* Información de resultados */}
      {filteredAndSortedPlugins.length > 0 && (
        <div className="text-center text-sm text-gray-500 dark:text-gray-400">
          Mostrando {filteredAndSortedPlugins.length} de {totalCount} plugins
        </div>
      )}
    </div>
  )
}
