'use client'

import SortableTable from "@/components/SortableTable"
import { useMemo, useState } from "react";

export default function Companies(){

    const companies = [
      {
        id: 1,
        name: "Cognizant",
        industry: "Outsourcing",
        description: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Facilis, inventore quisquam! Illo facilis nemo corporis aliquid perferendis obcaecati libero facere!"
      },
      {
        id: 2,
        name: "ABC Company",
        industry: "Outsourcing",
        description: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Facilis, inventore quisquam! Illo facilis nemo corporis aliquid perferendis obcaecati libero facere!"
      },
      {
        id: 3,
        name: "SM Corp",
        industry: "Outsourcing",
        description: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Facilis, inventore quisquam! Illo facilis nemo corporis aliquid perferendis obcaecati libero facere!"
      },
      {
        id: 4,
        name: "Ayala Group",
        industry: "Outsourcing",
        description: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Facilis, inventore quisquam! Illo facilis nemo corporis aliquid perferendis obcaecati libero facere!"
      },
      {
        id: 5,
        name: "Diversify",
        industry: "Outsourcing",
        description: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Facilis, inventore quisquam! Illo facilis nemo corporis aliquid perferendis obcaecati libero facere!"
      },
      {
        id: 6,
        name: "J&J",
        industry: "Outsourcing",
        description: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Facilis, inventore quisquam! Illo facilis nemo corporis aliquid perferendis obcaecati libero facere!"
      },
      {
        id: 7,
        name: "KMC",
        industry: "Outsourcing",
        description: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Facilis, inventore quisquam! Illo facilis nemo corporis aliquid perferendis obcaecati libero facere!"
      },
      {
        id: 8,
        name: "Arla",
        industry: "Outsourcing",
        description: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Facilis, inventore quisquam! Illo facilis nemo corporis aliquid perferendis obcaecati libero facere!"
      },
      {
        id: 9,
        name: "Green Archers",
        industry: "Outsourcing",
        description: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Facilis, inventore quisquam! Illo facilis nemo corporis aliquid perferendis obcaecati libero facere!"
      },
      {
        id: 10,
        name: "Jollibee Corp",
        industry: "Outsourcing",
        description: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Facilis, inventore quisquam! Illo facilis nemo corporis aliquid perferendis obcaecati libero facere!"
      }
    ]

    const columns = useMemo(() => [
        {
            header: 'Name',
            accessorKey: 'name'
        },
        {
            header: 'Industry',
            accessorKey: 'industry'
        },
        {
            header: 'Description',
            accessorKey: 'description'
        }
    ],[])


    return (
        <div>
          <h1>Companies</h1>

          <SortableTable data={companies} columns={columns}/>
        </div>
      )
}