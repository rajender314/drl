import React from 'react'
import { ButtonContainer } from './button-components'

type Props = {
  variant?: 'primary' | 'secondary' | 'disabled' | 'warm'
  size?: 'small' | 'medium' | 'large'
  width?: string
  type?: 'button' | 'submit'
  onClick?: (e: any) => void
  children: any
  className?: any
}

export default function Button({
  variant = 'primary',
  size = 'large',
  width = '100%',
  type = 'button',
  onClick,
  children,
  className
}: Props) {
  return (
    <ButtonContainer
      variant={variant}
      size={size}
      width={width}
      type={type}
      onClick={onClick}
      className={className}>
      {children}
    </ButtonContainer>
  )
}
