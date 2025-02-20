import * as React from 'react'
import { RadioWrapper, Label, Mark, InputComponent } from './radio-components'

type Props = {
  type?: string
  options?: any
  label?: string
  selected?: any
  placeholder?: string
  name?: string
  value?: string
  children: any
  onChange?: (e: any) => void
  register?: any
}

export default function Radio({
  type = 'radio',
  name,
  selected,
  children,
  value,
  onChange,
  register,
}: Props) {
  return (
    <RadioWrapper className="drl-radio">
      <Label>
        <InputComponent
          name={name}
          type={type}
          checked={value === selected ? selected : null}
          onChange={onChange}
          value={value}
          ref={register}
        />
        <Mark />
        {children}
      </Label>
    </RadioWrapper>
  )
}
