import { MonefyCompanion } from '@/app/Monefy'
import type { Metadata } from 'next'
import { Quicksand } from 'next/font/google'
import React from 'react'

import './globals.css'

const inter = Quicksand({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Monefy companion',
  description: 'Supercharge Your Monefy Data',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <MonefyCompanion>{children}</MonefyCompanion>
      </body>
    </html>
  )
}
