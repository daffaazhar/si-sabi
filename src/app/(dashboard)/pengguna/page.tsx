'use client'

// React/Next Imports
import { useState, useEffect, useMemo } from 'react'
import Link from 'next/link'

// MUI Imports
import {
  Box,
  Button,
  Card,
  Chip,
  Collapse,
  Divider,
  Grid,
  IconButton,
  Typography,
  MenuItem,
  TextFieldProps,
  TablePagination
} from '@mui/material'

// Third Party Imports
import {
  useReactTable,
  getCoreRowModel,
  getFilteredRowModel,
  getFacetedRowModel,
  getFacetedUniqueValues,
  getFacetedMinMaxValues,
  getPaginationRowModel,
  getSortedRowModel,
  flexRender,
  createColumnHelper
} from '@tanstack/react-table'
import { rankItem } from '@tanstack/match-sorter-utils'
import type { ColumnFiltersState, FilterFn, ColumnDef } from '@tanstack/react-table'
import type { RankingInfo } from '@tanstack/match-sorter-utils'
import classNames from 'classnames'

// Hooks Imports
import { useFetchUser } from '@/hooks/user/useFetchUser'
import { useDeleteUser } from '@/hooks/user/useDeleteUser'

// Custom Component Imports
import Icon from '@core/components/icon'
import TableHeader from '@core/components/datagrid/TableHeader'
import CustomTextField from '@core/components/mui/TextField'
import TablePaginationComponent from '@/components/TablePaginationComponent'
import OpenDialogOnElementClick from '@/@core/components/dialogs/OpenDialogOnElementClick'
import DeleteConfirmation from '@/@core/components/dialogs/DeleteConfirmation'
import PenggunaDialog from '@/@core/components/dialogs/pengguna'

// Other Imports
import styles from '@core/styles/table.module.css'
import ChevronRight from '@/@menu/svg/ChevronRight'
import { ICON_IDS } from '@/data/iconIds'
import { useRouter } from 'next/navigation'

const columnHelper = createColumnHelper<any>()

declare module '@tanstack/table-core' {
  interface FilterFns {
    fuzzy: FilterFn<unknown>
  }
  interface FilterMeta {
    itemRank: RankingInfo
  }
}

const fuzzyFilter: FilterFn<any> = (row, columnId, value, addMeta) => {
  // Rank the item
  const itemRank = rankItem(row.getValue(columnId), value)

  // Store the itemRank info
  addMeta({
    itemRank
  })

  // Return if the item should be filtered in/out
  return itemRank.passed
}

const DebouncedInput = ({
  value: initialValue,
  onChange,
  debounce = 500,
  ...props
}: {
  value: string | number
  onChange: (value: string | number) => void
  debounce?: number
} & Omit<TextFieldProps, 'onChange'>) => {
  // States
  const [value, setValue] = useState(initialValue)

  useEffect(() => {
    setValue(initialValue)
  }, [initialValue])

  useEffect(() => {
    const timeout = setTimeout(() => {
      onChange(value)
    }, debounce)

    return () => clearTimeout(timeout)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [value])

  return <CustomTextField {...props} value={value} onChange={e => setValue(e.target.value)} />
}

export default function Page() {
  const router = useRouter()

  // ** General Filter State
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([])
  const [globalFilter, setGlobalFilter] = useState('')
  const [page, setPage] = useState(0)
  const [pageSize, setPageSize] = useState(10)
  const skip = page * pageSize

  // ** Advanced Filter State
  const [isFilterOpen, setIsFilterOpen] = useState<boolean>(false)

  // ** Hooks
  const { data, isPending, isFetching } = useFetchUser(skip, pageSize, globalFilter)
  const { mutate, isPending: isDeleting } = useDeleteUser()

  const columns = useMemo<ColumnDef<any, any>[]>(
    () => [
      columnHelper.accessor('name', {
        cell: info => info.getValue(),
        header: 'Nama'
      }),
      columnHelper.accessor('email', {
        cell: info => info.getValue(),
        header: 'Email'
      }),
      columnHelper.accessor('role', {
        cell: info => info.getValue(),
        header: 'Peran'
      }),
      columnHelper.accessor('action', {
        header: 'Aksi',
        cell: info => (
          <div className='flex items-center'>
            <OpenDialogOnElementClick
              element={IconButton}
              elementProps={{ children: <i className='tabler-pencil text-[22px] text-textSecondary' /> }}
              dialog={PenggunaDialog}
              dialogProps={{ data: info.row.original }}
            />
            <OpenDialogOnElementClick
              element={IconButton}
              elementProps={{ children: <i className='tabler-trash text-[22px] text-textSecondary' /> }}
              dialog={DeleteConfirmation}
              dialogProps={{ data: info, mutate, isDeleting }}
            />
          </div>
        ),
        enableSorting: false
      })
    ],
    // eslint-disable-next-line react-hooks/exhaustive-deps
    []
  )

  const table = useReactTable({
    data: data?.data,
    columns,
    filterFns: {
      fuzzy: fuzzyFilter
    },
    state: {
      columnFilters,
      globalFilter
    },
    onColumnFiltersChange: setColumnFilters,
    onGlobalFilterChange: setGlobalFilter,
    globalFilterFn: fuzzyFilter,
    getCoreRowModel: getCoreRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getFacetedRowModel: getFacetedRowModel(),
    getFacetedUniqueValues: getFacetedUniqueValues(),
    getFacetedMinMaxValues: getFacetedMinMaxValues()
  })

  useEffect(() => {
    if (table.getState().columnFilters[0]?.id === 'fullName') {
      if (table.getState().sorting[0]?.id !== 'fullName') {
        table.setSorting([{ id: 'fullName', desc: false }])
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [table.getState().columnFilters[0]?.id])

  return (
    <Card>
      <div className='flex justify-between flex-col gap-4 items-start sm:flex-row sm:items-center p-6'>
        <div className='flex items-center gap-2'>
          <Typography>Show</Typography>
          <CustomTextField
            select
            value={pageSize}
            onChange={e => setPageSize(Number(e.target.value))}
            className='is-[70px]'
          >
            <MenuItem value='10'>10</MenuItem>
            <MenuItem value='25'>25</MenuItem>
            <MenuItem value='50'>50</MenuItem>
          </CustomTextField>
        </div>
        <div className='flex gap-4 flex-col !items-start is-full sm:flex-row sm:is-auto sm:items-center'>
          <IconButton
            key={`pengguna-filter-open-button`}
            color='primary'
            onClick={() => setIsFilterOpen(!isFilterOpen)}
            sx={{ mr: 2 }}
          >
            <Icon icon={ICON_IDS.FILTER_1} />
          </IconButton>
          <DebouncedInput
            value={globalFilter}
            className='is-[250px]'
            onChange={value => setGlobalFilter(String(value))}
            placeholder='Cari sesuatu disini...'
          />
          <OpenDialogOnElementClick
            element={Button}
            elementProps={{ variant: 'contained', children: 'Tambah Pengguna' }}
            dialog={PenggunaDialog}
          />
        </div>
      </div>
      <Collapse in={isFilterOpen} timeout='auto'>
        <Divider sx={{ my: '0 !important' }} />
        <Grid container spacing={4} sx={{ p: 4, mb: 4 }}>
          <Grid item xs={12} md={6}></Grid>
          <Grid item xs={12} md={6}></Grid>
        </Grid>
      </Collapse>
      <div className='overflow-x-auto'>
        <table className={styles.table}>
          <thead>
            {table.getHeaderGroups().map(headerGroup => (
              <tr key={headerGroup.id}>
                {headerGroup.headers.map(header => {
                  return (
                    <th key={header.id}>
                      {header.isPlaceholder ? null : (
                        <>
                          <div
                            className={classNames({
                              'flex items-center': header.column.getIsSorted(),
                              'cursor-pointer select-none': header.column.getCanSort()
                            })}
                            onClick={header.column.getToggleSortingHandler()}
                          >
                            {flexRender(header.column.columnDef.header, header.getContext())}
                            {{
                              asc: <ChevronRight fontSize='1.25rem' className='-rotate-90' />,
                              desc: <ChevronRight fontSize='1.25rem' className='rotate-90' />
                            }[header.column.getIsSorted() as 'asc' | 'desc'] ?? null}
                          </div>
                        </>
                      )}
                    </th>
                  )
                })}
              </tr>
            ))}
          </thead>
          <tbody>
            {isPending || isFetching ? (
              <>
                <tr>
                  <td colSpan={4} className='text-center'>
                    Memuat...
                  </td>
                </tr>
              </>
            ) : table.getFilteredRowModel().rows.length === 0 ? (
              <>
                <tr>
                  <td colSpan={table.getVisibleFlatColumns().length} className='text-center'>
                    Tidak ada data yang tersedia
                  </td>
                </tr>
              </>
            ) : (
              <>
                {table.getRowModel().rows.map(row => {
                  return (
                    <tr key={row.id} className='hover:bg-gray-100 transition-colors duration-300 relative'>
                      {row.getVisibleCells().map(cell => {
                        return <td key={cell.id}>{flexRender(cell.column.columnDef.cell, cell.getContext())}</td>
                      })}
                    </tr>
                  )
                })}
              </>
            )}
          </tbody>
        </table>
      </div>
      <TablePagination
        component={() => (
          <TablePaginationComponent
            skip={skip}
            page={page + 1}
            pageSize={pageSize}
            setPage={(page: number) => setPage(page)}
            total={data?.total || 0}
          />
        )}
        count={data?.total || 0}
        rowsPerPage={pageSize}
        page={page}
        onPageChange={(_, page) => {
          setPage(page)
        }}
        onRowsPerPageChange={event => {
          setPageSize(parseInt(event.target.value, 10))
          setPage(0)
        }}
      />
    </Card>
  )
}
