'use client'
import SortableTable from '@/components/SortableTable';
import { MemberInfo } from '@/models/Member';
import { ColumnDef } from '@tanstack/react-table';
import React, { useEffect, useMemo, useState } from 'react'

export default function ClientMembers({
    params
}: {
    params : {
        id: string
    }
}) {

  const [loading, setLoading] = useState(true);
  const [members, setMembers] = useState<MemberInfo[]>();

  useEffect(() => {
    if(params?.id){
      //get members here
      setMembers([])

      setTimeout(() => setLoading(false), 2000);
    }
  }, [params?.id]);

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
      }
    ], [])


 
  return (
    <div>
        {loading? 
        <p>Please wait...</p>: 
        <>
          <h1>Members</h1>

          <SortableTable 
              data={members} 
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
