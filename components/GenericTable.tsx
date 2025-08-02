import * as React from 'react'
import {
  ColumnDef,
  ColumnFiltersState,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  OnChangeFn,
  SortingState,
  useReactTable,
  VisibilityState,
} from '@tanstack/react-table'
import { ChevronDown } from 'lucide-react'

import { Button } from '@/components/ui/button'
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { Input } from '@/components/ui/input'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'

type GenericTableProps<TData> = {
  data: TData[]
  columns: ColumnDef<TData, any>[]
  filterColumnIds?: string[] // optional: IDs de columnas para el input de filtro
  emptyMessage?: string // mensaje personalizado
  columnVisibility?: VisibilityState
  setColumnVisibility?: OnChangeFn<VisibilityState>
}

export function GenericTable<TData>({
  data,
  columns,
  filterColumnIds,
  emptyMessage = 'No hay datos disponibles.',
  columnVisibility: controlledColumnVisibility,
  setColumnVisibility: controlledSetColumnVisibility,
}: GenericTableProps<TData>) {
  const [sorting, setSorting] = React.useState<SortingState>([])
  const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>([])
  const [uncontrolledColumnVisibility, uncontrolledSetColumnVisibility] = React.useState<VisibilityState>({})
  const [rowSelection, setRowSelection] = React.useState({})
  const [pageSize, setPageSize] = React.useState(10)
  const [isMobile, setIsMobile] = React.useState(false)

  // Use controlled or uncontrolled state
  const columnVisibility = controlledColumnVisibility ?? uncontrolledColumnVisibility
  const setColumnVisibility = controlledSetColumnVisibility ?? uncontrolledSetColumnVisibility

  const table = useReactTable({
    data,
    columns,
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    onColumnVisibilityChange: setColumnVisibility,
    onRowSelectionChange: setRowSelection,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    state: {
      sorting,
      columnFilters,
      columnVisibility,
      rowSelection,
    },
  })

  // Detectar si es mobile y configurar visibilidad de columnas
  React.useEffect(() => {
    const checkMobile = () => {
      const mobile = window.innerWidth < 768
      setIsMobile(mobile)
      
      // Configurar visibilidad de columnas basada en meta.hideOnMobile
      const newVisibility: VisibilityState = {}
      columns.forEach((column) => {
        const columnId = column.id || (column.meta as any)?.accessorKey || ''
        if (columnId) {
          const shouldHideOnMobile = (column.meta as any)?.hideOnMobile
          if (shouldHideOnMobile && mobile) {
            newVisibility[columnId] = false
          } else if (shouldHideOnMobile && !mobile) {
            newVisibility[columnId] = true
          }
        }
      })
      
      if (Object.keys(newVisibility).length > 0) {
        setColumnVisibility(prev => ({ ...prev, ...newVisibility }))
      }
    }
    
    checkMobile()
    window.addEventListener('resize', checkMobile)
    return () => window.removeEventListener('resize', checkMobile)
  }, [columns, setColumnVisibility])

  React.useEffect(() => {
    table.setPageSize(pageSize)
  }, [pageSize, table])

  return (
    <div className='w-full'>
      <div className='flex flex-col sm:flex-row items-start sm:items-center py-3 sm:py-4 gap-2 sm:gap-0'>
        <div className='flex flex-col sm:flex-row gap-2 sm:gap-4 w-full sm:w-auto'>
          {filterColumnIds?.map((columnId) => {
            const column = table.getColumn(columnId)
            if (!column) return null

            const label =
              typeof column.columnDef.header === 'string'
                ? column.columnDef.header
                : columnId

            return (
              <Input
                key={columnId}
                placeholder={`Filtrar por ${label}`}
                value={(column.getFilterValue() as string) ?? ''}
                onChange={(e) => column.setFilterValue(e.target.value)}
                className='w-full sm:max-w-sm text-xs sm:text-sm'
              />
            )
          })}
        </div>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant='outline' className='w-full sm:w-auto sm:ml-auto text-xs sm:text-sm'>
              Columnas <ChevronDown className='w-3 h-3 sm:w-4 sm:h-4' />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align='end' className='bg-white dark:bg-black border shadow-md rounded-md'>
            {table
              .getAllColumns()
              .filter((column) => column.getCanHide())
              .map((column) => (
                <DropdownMenuCheckboxItem
                  key={column.id}
                  className='capitalize text-xs sm:text-sm'
                  checked={column.getIsVisible()}
                  onCheckedChange={(value) => column.toggleVisibility(!!value)}
                >
                                    {(column.columnDef.meta as any)?.displayName ||
                   (typeof column.columnDef.header === 'string' ? column.columnDef.header : column.id)}
                </DropdownMenuCheckboxItem>
              ))}
          </DropdownMenuContent>
        </DropdownMenu>
      </div>

      <div className='rounded-md border overflow-x-auto'>
        <Table>
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => (
                  <TableHead key={header.id}>
                    {header.isPlaceholder
                      ? null
                      : flexRender(header.column.columnDef.header, header.getContext())}
                  </TableHead>
                ))}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {table.getRowModel().rows.length ? (
              table.getRowModel().rows.map((row) => (
                <TableRow key={row.id} data-state={row.getIsSelected() && 'selected'}>
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id}>
                      {flexRender(cell.column.columnDef.cell, cell.getContext())}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={columns.length} className='h-24 text-center'>
                  {emptyMessage}
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>

      <div className='flex flex-col sm:flex-row items-start sm:items-center justify-between py-3 sm:py-4 gap-3 sm:gap-4'>
        <p className='text-xs sm:text-sm text-muted-foreground'>
          Mostrando {table.getRowModel().rows.length} de{' '}
          {table.getFilteredRowModel().rows.length} resultados
        </p>
        <div className='flex flex-col sm:flex-row items-start sm:items-center gap-3 sm:gap-4 w-full sm:w-auto'>
          <div className='flex items-center gap-2'>
            <Button
              variant='outline'
              size='sm'
              onClick={() => table.previousPage()}
              disabled={!table.getCanPreviousPage()}
              className='text-xs sm:text-sm'
            >
              Previo
            </Button>
            <Button
              variant='outline'
              size='sm'
              onClick={() => table.nextPage()}
              disabled={!table.getCanNextPage()}
              className='text-xs sm:text-sm'
            >
              Siguiente
            </Button>
          </div>
          <div className='text-xs sm:text-sm opacity-90'>
            Página{' '}
            {table.getState().pagination.pageIndex + 1} de{' '}
            {table.getPageCount()}
          </div>
          <div className='flex items-center gap-2'>
            <label htmlFor='page-size' className='text-xs text-muted-foreground'>Filas por página:</label>
            <select
              id='page-size'
              className='border rounded px-2 py-1 text-xs sm:text-sm bg-background'
              value={pageSize}
              onChange={e => setPageSize(Number(e.target.value))}
            >
              {[5, 10, 20, 50, 100].map(size => (
                <option key={size} value={size}>{size}</option>
              ))}
            </select>
          </div>
        </div>
      </div>
    </div>
  )
}
