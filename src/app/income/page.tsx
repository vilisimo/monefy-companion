'use client'

import { Leaderboard } from '@/lib/components/leaderboard'
import { useContext } from 'react'
import { MonefyContext } from '../monefyContext'

export default function Page() {
  const data = useContext(MonefyContext)

  const income = data.filter((entry) => entry.amount.gt(0))

  return (
    <div>
      <Leaderboard entries={income} type="income" />
    </div>
  )
}
