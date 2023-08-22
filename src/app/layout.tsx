import Nav from '@/components/Nav'
import './globals.css'
import type { Metadata } from 'next'
import { Fira_Sans } from 'next/font/google';

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
  return (
    <html lang="en">
      <body className={firaSans.className}>
        <div className="bg-gray-100 w-full min-h-screen m-0">
          <Nav />

          <div className="container mx-auto px-4 py-4">
            {children}
          </div>
        </div>
      </body>
    </html>
  )
}
