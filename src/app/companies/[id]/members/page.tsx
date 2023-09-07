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
      setMembers([
        {
          member_id: "1",
          full_name: "Juan Dela Cruz",
          first_name: "Juan",
          middle_name: "Ildefonso",
          last_name: "Dela Cruz",
          name_suffix: "",
          phone_number: "0909",
          email: "juan@testgmail.com",
          address: "Quezon City, Metro Manila",
          occupation: "Accountant",
          facebook: "",
          linkedin: "",
          instagram: "",
          pinterest: "",
          twitter: "",
          card_key: "",
          subscription_level: 1
        },
        {
          member_id: "2",
          full_name: "Maria Clara Dela Cruz",
          first_name: "Juan",
          middle_name: "Ildefonso",
          last_name: "Dela Cruz",
          name_suffix: "",
          phone_number: "0909",
          email: "juan@testgmail.com",
          address: "Quezon City, Metro Manila",
          occupation: "Accountant",
          facebook: "",
          linkedin: "",
          instagram: "",
          pinterest: "",
          twitter: "",
          card_key: "",
          subscription_level: 1
        },
        {
          member_id: "3",
          full_name: "Pedro Dela Cruz",
          first_name: "Juan",
          middle_name: "Ildefonso",
          last_name: "Dela Cruz",
          name_suffix: "",
          phone_number: "0909",
          email: "juan@testgmail.com",
          address: "Quezon City, Metro Manila",
          occupation: "Accountant",
          facebook: "",
          linkedin: "",
          instagram: "",
          pinterest: "",
          twitter: "",
          card_key: "",
          subscription_level: 1
        }
      ])

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
