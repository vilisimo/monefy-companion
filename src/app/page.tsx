'use client'

import { useContext } from 'react'
import { MonefyContext, MonefyCurrencyContext } from './monefyContext'
import Big from 'big.js'
import { localizeAmount } from '@/lib/tools/formatting'

interface Props {
  amount: Big
  text: string
}

const SummaryLine = ({ amount, text }: Props) => {
  const { currency, locale } = useContext(MonefyCurrencyContext)

  return (
    <div>
      <h2 className="text-center text-3xl font-extrabold m-8">{text}</h2>
      <span className="block text-center text-6xl font-extrabold">{localizeAmount(amount, currency, locale)}</span>
    </div>
  )
}

export default function Home() {
  const data = useContext(MonefyContext)

  let income = Big(0)
  let expenses = Big(0)

  for (const entry of data) {
    const amount = entry.amount
    if (amount.gt(0)) {
      income = income.plus(amount)
    } else {
      expenses = expenses.plus(amount)
    }
  }
  const qualifier = income.gt(expenses) ? 'gain' : 'loss'

  return (
    <div className="flex flex-col gap-10">
      <SummaryLine amount={income} text="You have earned:" />
      <SummaryLine amount={expenses} text="You have spent:" />
      <SummaryLine amount={income.plus(expenses)} text={`Your ${qualifier}:`} />
      {/* <Summary /> */}
    </div>
  )
}
