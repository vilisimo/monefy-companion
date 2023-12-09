import { HtmlElementProps } from '@/lib/types'
import { PropsWithChildren } from 'react'

export function LargeHeader({ children, className }: PropsWithChildren & HtmlElementProps) {
  return (
    <Header size="large" className={className}>
      {children}
    </Header>
  )
}

export function MediumHeader({ children, className }: PropsWithChildren & HtmlElementProps) {
  return (
    <Header size="medium" className={className}>
      {children}
    </Header>
  )
}

export function SmallHeader({ children, className }: PropsWithChildren & HtmlElementProps) {
  return (
    <Header size="small" className={className}>
      {children}
    </Header>
  )
}

interface Props {
  size: 'small' | 'medium' | 'large'
}

const sizes = {
  small: 'text-2xl',
  medium: 'text-4xl',
  large: 'text-6xl',
}

function Header({ size, children, className }: Props & PropsWithChildren & HtmlElementProps) {
  const textSize = sizes[size]
  return <h1 className={`text-center font-extrabold ${textSize} ${className ? className : ''}`.trim()}>{children}</h1>
}
