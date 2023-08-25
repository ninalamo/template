import { useReactTable, getCoreRowModel, flexRender, SortingState, getSortedRowModel } from '@tanstack/react-table';
import { useState } from "react";

export default function SortableTable(
    {data, columns}: {data: any, columns: any}
) {
    const [sorting, setSorting] = useState<SortingState>([])

    
    const table = useReactTable({data, columns, state:{
        sorting,
        columnVisibility: {
          'id': false
        }
    }, 
    onSortingChange: setSorting,
    getSortedRowModel: getSortedRowModel(),
    getCoreRowModel: getCoreRowModel()})

  return (
    <div>
        <table className="table-fixed items-center bg-transparent w-full border-collapse">
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
    </div>
  )
}
