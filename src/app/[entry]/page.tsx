'use client'

import { MonefyContext } from '@/app/monefyContext'
import Big from 'big.js'
import { use, useContext } from 'react'

interface Props {
  params: Promise<{
    entry: string
  }>
}

export default function Page({ params }: Props) {
  const resolvedParams = use(params)
  const data = useContext(MonefyContext)
  const totalSum = data.reduce((acc, curr) => acc.plus(curr.amount), Big(0))

  return (
    <div>
      Entry: {resolvedParams.entry}, total: {totalSum.toFixed()}
    </div>
  )
}
