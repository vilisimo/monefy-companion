import { HtmlElementProps } from '@/lib/types'
import { PropsWithChildren } from 'react'

export function LargeText({ children, className }: PropsWithChildren & HtmlElementProps) {
  return <p className={`text-center text-6xl font-extrabold ${className ? className : ''}`.trim()}>{children}</p>
}
