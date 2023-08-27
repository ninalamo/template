'use client'

import SortableTable from "@/components/SortableTable"
import { Button } from "@/components/ui/button";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { Company } from "@/models/Company";
import { ColumnDef } from "@tanstack/react-table";
import Link from "next/link";
import { useMemo } from "react";

export default function Companies(){

    const companies = [
      {
        id: 1,
        name: "Cognizant",
        industry: "Outsourcing",
        subscription: "Level 1"
      },
      {
        id: 2,
        name: "ABC Company",
        industry: "Outsourcing",
        subscription: "Level 1"
      },
      {
        id: 3,
        name: "SM Corp",
        industry: "Outsourcing",
        subscription: "Level 1"
      },
      {
        id: 4,
        name: "Ayala Group",
        industry: "Outsourcing",
        subscription: "Level 1"
      },
      {
        id: 5,
        name: "Diversify",
        industry: "Outsourcing",
        subscription: "Level 1"
      },
      {
        id: 6,
        name: "J&J",
        industry: "Outsourcing",
        subscription: "Level 1"
      },
      {
        id: 7,
        name: "KMC",
        industry: "Outsourcing",
        subscription: "Level 1"
      },
      {
        id: 8,
        name: "Arla",
        industry: "Outsourcing",
        subscription: "Level 1"
      },
      {
        id: 9,
        name: "Green Archers",
        industry: "Outsourcing",
        subscription: "Level 1"
      },
      {
        id: 10,
        name: "Jollibee Corp",
        industry: "Outsourcing",
        subscription: "Level 1"
      }
    ]

    const columns = useMemo<ColumnDef<Company>[]>(
      () => [
        {
          accessorKey: 'id'
        },
        {
          header: 'Name',
          accessorKey: 'name',
          cell: ({row}) => (<Link className="hover:text-orange-400 hover:font-bold" href={{pathname: `/companies/${row.getValue('id')}`}}>{row.getValue('name')}</Link>)
        },
        {
          header: 'Industry',
          accessorKey: 'industry',
        },
        {
          header: 'Subscription',
          accessorKey: 'subscription',
        },{
          id: "actions",
          cell: ({row}) => {
            const companyId = row.getValue('id')
            return (
              <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="h-8 w-8 p-0">
                  <span className="sr-only">Open menu</span>
                  ...
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuLabel>Actions</DropdownMenuLabel>
                <DropdownMenuItem
                  onClick={() => navigator.clipboard.writeText(row.getValue('id'))}
                >
                  Copy company ID
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={() => location.replace(`/companies/${row.getValue('id')}/edit`)}>
                  Edit Company
                </DropdownMenuItem>
                <DropdownMenuItem>Remove Company</DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
            )
          }
        }
      ]
    ,[]);

    // const columns = useMemo(() => [
    //     {
    //         header: 'Name',
    //         accessorKey: 'name'
    //     },
    //     {
    //         header: 'Industry',
    //         accessorKey: 'industry'
    //     },
    //     {
    //         header: 'Description',
    //         accessorKey: 'description'
    //     }
    // ],[])


    return (
        <div>
          <h1>Companies</h1>

          {/* className="bg-orange-400 py-3 px-5 rounded-full text-white hover:bg-orange-300" */}

          <div className="mb-5">
                <Button asChild >
                    <Link href="/companies/create">New Company</Link>
                </Button>
          </div>
          <SortableTable data={companies} columns={columns}/>
        </div>
      )
}