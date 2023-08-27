'use client'

import Nav from '@/components/Nav'
import './globals.css'
import type { Metadata } from 'next'
import { Fira_Sans } from 'next/font/google';
import { usePathname } from 'next/navigation';


const firaSans = Fira_Sans({
  weight: ["400", "500", "600", "700", "800", "900"],
  subsets: ['latin'],
  display: 'swap'
});

export const metadata: Metadata = {
  title: 'SonicLynx Business Card',
  description: 'SonicLynx Business Card Web App',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {

  const pathName = usePathname();

  
  return (
    <html lang="en">
      <body className={firaSans.className}>
        <div className="bg-gray-100 w-full min-h-screen m-0">

          {
            !pathName.includes('/ext/v1/member')? 
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
      </body>
    </html>
  )
}
