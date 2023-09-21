import Link from 'next/link'
import React from 'react'

export default function DisplayItem({
    icon,
    value,
    name,
    alternateValue
}: {
    icon: React.JSX.Element,
    value: string,
    name: string,
    alternateValue: string | null 
}) {

  return (
   <div className='flex flex-row mb-5'>
    <span className='icon px-3 h-14 w-14  mr-3 flex items-center justify-center bg-orange-400 rounded-full'>
        {icon}
    </span>

    <div className='flex items-center justify-center'>
        <p className='text-sm'>
            <span className='font-bold text-slate-700'>{alternateValue? <Link href={value}>{alternateValue}</Link>: value}</span>
            <br/>
            <small>{name}</small>
        </p>
    </div>
</div>
  )
}
