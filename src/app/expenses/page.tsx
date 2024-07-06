'use client'

import { MonefyContext } from '@/app/monefyContext'
import { Leaderboard } from '@/lib/components/leaderboard'
import { useContext } from 'react'

export default function Page() {
  const data = useContext(MonefyContext)

  const expenses = data.filter((entry) => entry.amount.lt(0))

  return (
    <div>
      <Leaderboard entries={expenses} type="expenses" />
    </div>
  )
}
