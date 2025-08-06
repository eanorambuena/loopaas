'use client'

import React from 'react'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Switch } from '@/components/ui/switch'
import { IconEdit, IconTrash, IconShare, IconEye } from '@tabler/icons-react'
import { type CustomPlugin } from './types'

interface PluginCardProps {
  plugin: CustomPlugin
  onToggle: (id: string, enabled: boolean) => void
  onEdit: (plugin: CustomPlugin) => void
  onDelete: (id: string) => void
  onView: (plugin: CustomPlugin) => void
  onShare: (plugin: CustomPlugin) => void
}

export function PluginCard({
  plugin,
  onToggle,
  onEdit,
  onDelete,
  onView,
  onShare
}: PluginCardProps) {
  return (
    <div className={`
      relative overflow-hidden rounded-lg border transition-all duration-300 hover:shadow-lg group
      ${plugin.enabled 
        ? 'border-emerald-200 dark:border-emerald-800 bg-white dark:bg-gray-800 shadow-sm hover:shadow-emerald-100 dark:hover:shadow-emerald-900/20' 
        : 'border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-900 opacity-75'
      }
    `}>
      {/* Indicador de estado activo/inactivo */}
      <div className={`
        absolute top-0 left-0 w-full h-1 
        ${plugin.enabled 
          ? 'bg-gradient-to-r from-emerald-400 to-emerald-500' 
          : 'bg-gradient-to-r from-gray-300 to-gray-400'
        }
      `} />

      <div className="p-4">
        {/* Header con nombre y estado */}
        <div className="flex items-start justify-between mb-3">
          <div className="flex-1">
            <div className="flex items-center gap-2 mb-1">
              <h3 className={`
                font-semibold text-lg truncate 
                ${plugin.enabled 
                  ? 'text-gray-900 dark:text-white' 
                  : 'text-gray-500 dark:text-gray-400'
                }
              `}>
                {plugin.name}
              </h3>
              <Badge 
                variant={plugin.enabled ? 'default' : 'secondary'} 
                className={`
                  text-xs px-2 py-1 shrink-0
                  ${plugin.enabled 
                    ? 'bg-emerald-100 text-emerald-800 dark:bg-emerald-900 dark:text-emerald-200' 
                    : 'bg-gray-100 text-gray-600 dark:bg-gray-700 dark:text-gray-400'
                  }
                `}
              >
                {plugin.enabled ? 'Activo' : 'Inactivo'}
              </Badge>
            </div>
          </div>
        </div>

        {/* Descripción */}
        <div className="mb-4">
          <p className={`
            text-sm leading-relaxed line-clamp-2
            ${plugin.enabled 
              ? 'text-gray-600 dark:text-gray-300' 
              : 'text-gray-500 dark:text-gray-500'
            }
          `}>
            {plugin.description || 'Plugin personalizado sin descripción'}
          </p>
        </div>

        {/* Metadata del plugin */}
        <div className="mb-4 space-y-1">
          <div className="flex items-center gap-2 text-xs text-gray-500 dark:text-gray-400">
            <span>ID:</span>
            <code className="px-1 py-0.5 bg-gray-100 dark:bg-gray-700 rounded text-xs font-mono">
              {plugin.id}
            </code>
          </div>
          <div className="flex items-center gap-2 text-xs text-gray-500 dark:text-gray-400">
            <span>Líneas de código:</span>
            <span className="font-mono">
              {plugin.code.split('\n').length}
            </span>
          </div>
        </div>

        {/* Switch para activar/desactivar */}
        <div className="flex items-center justify-between mb-4">
          <label 
            htmlFor={`plugin-switch-${plugin.id}`}
            className="text-sm font-medium text-gray-700 dark:text-gray-300 cursor-pointer"
          >
            Activar Plugin
          </label>
          <Switch
            id={`plugin-switch-${plugin.id}`}
            checked={plugin.enabled}
            onCheckedChange={(checked) => onToggle(plugin.id, checked)}
            className="data-[state=checked]:bg-emerald-500"
          />
        </div>

        {/* Botones de acción */}
        <div className="flex gap-2 pt-2 border-t border-gray-100 dark:border-gray-700">
          <Button
            variant="outline"
            size="sm"
            onClick={() => onView(plugin)}
            className="flex-1 text-xs"
          >
            <IconEye className="w-3 h-3 mr-1.5" />
            Ver
          </Button>
          
          <Button
            variant="outline"
            size="sm"
            onClick={() => onEdit(plugin)}
            className="flex-1 text-xs"
          >
            <IconEdit className="w-3 h-3 mr-1.5" />
            Editar
          </Button>

          <Button
            variant="outline"
            size="sm"
            onClick={() => onShare(plugin)}
            className="flex-1 text-xs"
          >
            <IconShare className="w-3 h-3 mr-1.5" />
            Compartir
          </Button>

          <Button
            variant="destructive"
            size="sm"
            onClick={() => onDelete(plugin.id)}
            className="flex-1 text-xs"
          >
            <IconTrash className="w-3 h-3 mr-1.5" />
            Eliminar
          </Button>
        </div>

        {/* Hover effect overlay */}
        <div className={`
          absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none
          bg-gradient-to-br from-transparent to-blue-50/20 dark:to-blue-900/20
          ${plugin.enabled ? '' : 'from-gray-100/20 to-gray-200/20 dark:from-gray-800/20 dark:to-gray-700/20'}
        `} />
      </div>
    </div>
  )
}
