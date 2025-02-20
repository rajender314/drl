import React from 'react'
import SelectComponent from 'react-select'
import { SelectContainer } from './select-components'
import { Icon } from '@app/components'

type Props = {
  options: any
  value?: any 
  onChange?: (e: any) => void,
  placeholder?: string,
  isMulti?: boolean,
  isCustom?: boolean
}

export default function Select(props: Props) {
  function DropdownIndicator() {
    return <Icon name="arrowDown" />
  }
  return (
    <SelectContainer>
        <SelectComponent
          className="clutch-select"
          classNamePrefix="clutch"
          components={{ DropdownIndicator }}
          {...props}
        />
    </SelectContainer>
  )
}
