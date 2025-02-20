import styled from 'styled-components'
import { primaryColor, successGreen } from '@app/styles'

export const InputContainer = styled.div`
  position: relative;
  margin-bottom: 16px;
`
export const RadioWrapper = styled.div`
  display: inline-block;
`
export const Mark = styled.span`
  display: inline-block;
  position: relative;
  border: 2px solid #e3e5e9;
  transition: 180ms all ease-in-out;
  width: 14px;
  height: 14px;
  left: 0;
  border-radius: 50%;
  margin-right: 5px;
  vertical-align: middle;
  
`


export const Label = styled.label`
display: flex;
cursor: pointer;
padding: 5px 10px 5px 0;
position: relative;
font-weight: 500;
font-size: 11px;
line-height: 14px;
/* identical to box height, or 127% */


/* Black */

color: #313131;
align-items: center;

${(props: any) =>
    props.disabled &&
    `
      cursor: not-allowed;
      opacity: 0.4;
  `}
`
export const InputComponent = styled.input`
  position: absolute;
  visibility: hidden;
  display: none;
  &:checked + ${Label} {
    color:  ${successGreen};
  }
  &:checked + ${Mark} {
    width: 4px;
    height: 4px;
    border: 7px solid ${successGreen};
   
  }
`
