import { HtmlElementProps } from '@/lib/types'
import { PropsWithChildren } from 'react'

export function LargeText({ children, className }: PropsWithChildren & HtmlElementProps) {
  return (
    <Text size="large" className={className}>
      {children}
    </Text>
  )
}

interface Props {
  size: 'large'
}

const sizes = {
  large: '6xl',
}

function Text({ size, children, className }: Props & PropsWithChildren & HtmlElementProps) {
  const textSize = `text-${sizes[size]}`
  return <p className={`text-center font-extrabold ${textSize} ${className ? className : ''}`.trim()}>{children}</p>
}
