import { MonefyUploader } from '@/app/provider'
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
        <h1 className="text-center text-3xl font-extrabold m-8">Supercharge your Monefy data</h1>
        <MonefyUploader>{children}</MonefyUploader>
      </body>
    </html>
  )
}
