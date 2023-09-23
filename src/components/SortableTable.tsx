import { useReactTable, getCoreRowModel, flexRender, SortingState, getSortedRowModel, PaginationState } from '@tanstack/react-table';
import { Dispatch, SetStateAction, useMemo, useState } from "react";

export default function SortableTable(
    {data,
    columns, 
    columnVisibility,
    page_count,
    pagination,
    setPagination}: {
      data: any, 
      columns: any, 
      columnVisibility: any,
      page_count: number,
      pagination: any,
      setPagination: Dispatch<SetStateAction<PaginationState>>
    }
) {
    const [sorting, setSorting] = useState<SortingState>([])

    // const [{ pageIndex, pageSize }, setPagination] = useState<PaginationState>({
    //   pageIndex: page_number,
    //   pageSize: page_size,
    // })

    // const pagination = useMemo(
    //   () => ({
    //     pageIndex,
    //     pageSize,
    //   }),
    //   [pageIndex, pageSize]
    // )

    const table = useReactTable({
    data, 
    columns, 
    state:{
        sorting,
        columnVisibility: columnVisibility,
        pagination
    }, 
    pageCount: page_count,
    onPaginationChange: setPagination,
    manualPagination: true,
    onSortingChange: setSorting,
    getSortedRowModel: getSortedRowModel(),
    getCoreRowModel: getCoreRowModel()})

  return (
    <div className='overflow-auto'>
        <table className="data-table table-auto items-center bg-transparent w-full border-collapse min-w-[1240px]">
        <thead>
          {table.getHeaderGroups().map(headerGroup => (
            <tr key={headerGroup.id}>
              {headerGroup.headers.map(header => (
               <th key={header.id} colSpan={header.colSpan}>
                {header.isPlaceholder ? null : (
                    <div
                    {...{
                        className: header.column.getCanSort()
                        ? 'cursor-pointer select-none'
                        : '',
                        onClick: header.column.getToggleSortingHandler(),
                    }}
                    >
                    {flexRender(
                        header.column.columnDef.header,
                        header.getContext()
                    )}
                    {{
                        asc: ' 🔼',
                        desc: ' 🔽',
                        
                    }[header.column.getIsSorted() as string] ?? null}
                    </div>
                )}
                </th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody>
          {table.getRowModel().rows.map(row => (
            <tr key={row.id}>
              {row.getVisibleCells().map(cell => (
                <td key={cell.id}>
                  {flexRender(cell.column.columnDef.cell, cell.getContext())}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>


      <div className="h-2" />
        <div className="flex items-center gap-2">
          <button
            className="border rounded p-1"
            onClick={() => table.setPageIndex(0)}
            disabled={!table.getCanPreviousPage()}
          >
            {'<<'}
          </button>
          <button
            className="border rounded p-1"
            onClick={() => table.previousPage()}
            disabled={!table.getCanPreviousPage()}
          >
            {'<'}
          </button>
          <button
            className="border rounded p-1"
            onClick={() => table.nextPage()}
            disabled={!table.getCanNextPage()}
          >
            {'>'}
          </button>
          <button
            className="border rounded p-1"
            onClick={() => table.setPageIndex(table.getPageCount() - 1)}
            disabled={!table.getCanNextPage()}
          >
            {'>>'}
          </button>
          <span className="flex items-center gap-1">
            <div>Page</div>
            <strong>
              {table.getState().pagination.pageIndex} of{' '}
              {table.getPageCount()}
            </strong>
          </span>
          <span className="flex items-center gap-1">
            | Go to page:
            <input
              type="number"
              defaultValue={table.getState().pagination.pageIndex}
              onChange={e => {
                const page = e.target.value ? Number(e.target.value) - 1 : 0
                table.setPageIndex(page)
              }}
              className="border p-1 rounded w-16"
            />
          </span>
          <select
            value={table.getState().pagination.pageSize}
            onChange={e => {
              table.setPageSize(Number(e.target.value))
            }}
          >
            {[10, 20, 30, 40, 50].map(pageSize => (
              <option key={pageSize} value={pageSize}>
                Show {pageSize}
              </option>
            ))}
          </select>
        </div>
      <div>{table.getRowModel().rows.length} Rows</div>



    </div>
  )
}
