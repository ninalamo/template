'use client'

import SortableTable from "@/components/SortableTable"
import { Button } from "@/components/ui/button";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { Client } from "@/models/Company";
import { getClients } from "@/services/ClientService";
import { ColumnDef } from "@tanstack/react-table";
import Link from "next/link";
import { useEffect, useState, useMemo } from "react";
import Loading from "./loading";
import { PaginatedResponse } from "@/models/PaginatedResponse";

import { useRouter } from "next/navigation";

export default function Companies(){
    const router = useRouter();
    const [loading, setLoading] = useState(true);
    const [clients, setClients] = useState<PaginatedResponse<Client>>();  


    useEffect(() => {
      const fetchClients = async () => {
          const resp = await getClients(1, 10)

          console.log(resp.data)
          console.log(resp.page_size);
          setClients(resp);
          setLoading(false);
      }

      fetchClients();
    },[]);



    const columns = useMemo<ColumnDef<Client>[]>(
      () => [
        {
          accessorKey: 'id'
        },
        {
          header: 'Name',
          accessorKey: 'company_name',
          cell: ({row}) => (<Link className="hover:text-orange-400 hover:font-bold" href={{pathname: `/companies/${row.getValue('id')}`}}>{row.getValue('company_name')}</Link>)
        },
        {
          header: 'Industry',
          accessorKey: 'industry',
        },
        {
          header: 'Active',
          accessorKey: 'is_active',
        },
        {
          header: 'Subscriptions',
          accessorKey: 'subscriptions',
        },{
          id: "actions",
          cell: ({row}) => {

            const companyId = row.getValue('id')
            const industry = row.getValue('industry')
            const companyName = row.getValue('company_name');

            const data = {
               companyId,
               industry,
               companyName,
            }

          

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
                <DropdownMenuItem onClick={() => router.push(`/companies/${row.getValue('id')}/edit`)}>
                  Edit Company
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => router.push(`/companies/${row.getValue('id')}/members`)}>
                  Show Members
                </DropdownMenuItem>
                <DropdownMenuItem>Remove Company</DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
            )
          }
        }
      ]
    ,[]);

    return (
        <div>
          <h1>Companies</h1>
          <div className="mb-5">
                <Button asChild >
                    <Link href="/companies/create">New Company</Link>
                </Button>
          </div>
          {loading? <Loading />: 
            <SortableTable 
              data={clients?.data} 
              columns={columns}
              columnVisibility={{
                'id': false
              }}
            />
          }
        </div>
      )
}