'use client'

import { localizeAmount } from '@/lib/tools/formatting'
import Big from 'big.js'
import { formatDuration, intervalToDuration } from 'date-fns'
import { PropsWithChildren, useContext } from 'react'
import { MonefyContext, MonefyCurrencyContext } from './monefyContext'
import Link from 'next/link'

interface AmountProp {
  amount: Big
}

const Header = ({ children }: PropsWithChildren) => {
  return <h2 className="text-center text-3xl font-extrabold m-8">{children}</h2>
}

const Amount = ({ amount }: AmountProp) => {
  const { currency, locale } = useContext(MonefyCurrencyContext)

  return <span className="block text-center text-6xl font-extrabold">{localizeAmount(amount, currency, locale)}</span>
}

const Income = ({ amount }: AmountProp) => {
  return (
    <div>
      <Header>You have earned</Header>
      <Link href="income">
        <Amount amount={amount} />
      </Link>
    </div>
  )
}

const Expenses = ({ amount }: AmountProp) => {
  return (
    <div>
      <Header>You have spent</Header>
      <Link href="expenses">
        <Amount amount={amount} />
      </Link>
    </div>
  )
}

const Summary = ({ income, expenses }: { income: Big; expenses: Big }) => {
  const noun = income.gte(expenses) ? 'gain' : 'loss'
  return (
    <div>
      <Header>Your {noun}</Header>
      <Amount amount={income.plus(expenses)} />
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
  const firstEntryDate = data[0].date
  const lastEntryDate = data[data.length - 1].date
  const duration = intervalToDuration({ start: firstEntryDate, end: lastEntryDate })

  return (
    <div className="flex flex-col gap-10">
      <h1 className="text-center text-6xl font-extrabold m-10">In {formatDuration(duration)}</h1>
      <Income amount={income} />
      <Expenses amount={expenses} />
      <Summary income={income} expenses={expenses} />
      {/* <Summary /> */}
    </div>
  )
}
