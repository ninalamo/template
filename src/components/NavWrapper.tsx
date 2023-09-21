'use client'

import React from 'react'
import { usePathname } from 'next/navigation';
import Nav from './Nav';

export default function NavWrapper({
    children,
  }: {
    children: React.ReactNode
  }) {

  const pathName = usePathname();

  return (
    <div>
    {!pathName.includes('/ext/') 
    && !pathName.includes('log-in')? 
        <>
          <Nav />
          <div className="container mx-auto px-4 py-4 mt-3">
            {children}
          </div>
        </>
        : 
        <div>
            {children}
        </div>
    }
    </div>
  )
}
