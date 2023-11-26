import { HtmlElementProps } from '@/lib/types'
import { PropsWithChildren } from 'react'

export function LargeHeader({ children, className }: PropsWithChildren & HtmlElementProps) {
  return <h1 className={`text-center text-6xl font-extrabold ${className ? className : ''}`.trim()}>{children}</h1>
}
