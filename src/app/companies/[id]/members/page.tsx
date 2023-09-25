'use client'
import SortableTable from '@/components/SortableTable';
import { MemberInfo } from '@/models/Member';
import { PaginatedResponse } from '@/models/PaginatedResponse';
import { getClientMembers } from '@/services/ClientService';
import { ColumnDef, PaginationState } from '@tanstack/react-table';
import Link from 'next/link';
import React, { useEffect, useMemo, useState } from 'react'

function makeid(length: number) {
  let result = '';
  const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  const charactersLength = characters.length;
  let counter = 0;
  while (counter < length) {
    result += characters.charAt(Math.floor(Math.random() * charactersLength));
    counter += 1;
  }
  return result;
}

export default function ClientMembers({
    params
}: {
    params : {
        id: string
    }
}) {

  const [loading, setLoading] = useState(true);
  const [members, setMembers] = useState<PaginatedResponse<MemberInfo>>();

  const [{ pageIndex, pageSize }, setPagination] = useState<PaginationState>({
    pageIndex: 1,
    pageSize: 10,
  })

  const pagination = useMemo(
    () => ({
      pageIndex,
      pageSize,
    }),
    [pageIndex, pageSize]
  )

  useEffect(() => {
    if(params?.id){
      const fetchClientMembers = async () => {
        const resp = await getClientMembers(params?.id, pageIndex > 0? pageIndex: 1, pageSize);

        setPagination({
          pageIndex: resp?.page_number? resp?.page_number: 1,
          pageSize: resp?.page_size? resp?.page_size: 10,
        })

        console.log(resp);
        setMembers(resp);
        setLoading(false);
      }

      fetchClientMembers();
    }
  }, [params?.id, pageIndex, pageSize]);

  const columns = useMemo<ColumnDef<MemberInfo>[]>(
    () => [
      {
        accessorKey: 'member_id'
      },
      {
        header: 'Full Name',
        accessorKey: 'full_name'
      },
      {
        header: 'Email',
        accessorKey: 'email'
      },
      {
        header: 'Position',
        accessorKey: 'occupation'
      },
      {
        header: 'Card Key',
        accessorKey: 'card_key'
      },
      {
        header: 'External Link',
        cell: ({row}) => {
          const cardKey: string = row.getValue('card_key');

          console.log(cardKey)

          
          if(!cardKey || cardKey.length == 0)
          {
            return (
              <Link href={`/ext/v1/tenants/${params?.id}/members/${row.getValue('member_id')}?uid=${makeid(10)}`}>
                External Link
              </Link>
            )
          }

          return (
            <Link href={`/ext/v1/tenants/${params?.id}/members/${row.getValue('member_id')}/profile?uid=${cardKey}`}>
                External Link
            </Link>
          )
        }
      }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    ], [])


 
  return (
    <div>
        {loading? 
        <p>Please wait...</p>: 
        <>
          <h1>Members</h1>

          <SortableTable 
              data={members?.data} 
              page_count={members?.total_count? members?.total_count: 0}
              pagination={pagination}
              setPagination={setPagination}
              columns={columns}
              columnVisibility={{
                'member_id': false
              }}
            />
        </>
        }
    </div>
  )
}
