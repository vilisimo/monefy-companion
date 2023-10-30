'use client'

import { MonefyContext } from '@/app/monefyContext'
import Big from 'big.js'
import { useContext } from 'react'

interface Props {
  params: {
    entry: string
  }
}

export default function Page({ params }: Props) {
  const data = useContext(MonefyContext)
  const totalSum = data.reduce((acc, curr) => acc.plus(curr.amount), Big(0))

  return (
    <div>
      Entry: {params.entry}, total: {totalSum.toFixed()}
    </div>
  )
}
