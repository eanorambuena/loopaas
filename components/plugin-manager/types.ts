export interface CustomPlugin {
  id: string
  name: string
  description: string
  code: string
  transpiledCode?: string
  enabled: boolean
  published?: boolean
}

export interface PluginEditorProps {
  plugin?: CustomPlugin | null
  onSave: (plugin: CustomPlugin) => void
  onCancel: () => void
}
