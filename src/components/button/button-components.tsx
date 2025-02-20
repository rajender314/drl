import styled from 'styled-components'
import {
  primaryHoverColor,
  primaryActiveColor,
  secondaryColor,
  secondaryHoverColor,
  secondaryActiveColor,
  whiteColor,
  warmHoverColor,
  warmActiveColor,
  warmColor,
  warmBorderColor,
  secondaryBorderColor,
  secondaryBackground,
  warmBackground,
  primaryBackground,
  boldFont,
  primaryRed,
} from '../../styles'

type ButtonProps = {
  variant?: 'primary' | 'secondary' | 'disabled' | 'warm'
  size?: 'small' | 'medium' | 'large'
  width?: string
}

export const ButtonContainer = styled.button`
    height: 50px;
    min-width: 100px;
    border: 0 none;
    border-radius: 8px;
    outline: none;
    cursor: pointer;
    display:flex;
    justify-content: center;
    align-items: center;
    svg {
      margin-right:8px;
    }
    &.just-ar{
    justify-content: space-around !important;

    }
    ${boldFont};
    ${({ width }: ButtonProps) => {
    if (width) {
      return `width: ${width};`
    }
  }}
    ${({ size }: ButtonProps) => {
    if (size === 'large') {
      return `
                padding: 10px 15px;
            `
    } else if (size === 'medium') {
      return `
                padding: 10px 15px;
            `
    } else if (size === 'small') {
      return `
                height: 36px;
                padding: 8px;
            `
    }
  }}
    ${({ variant }: ButtonProps) => {
    if (variant === 'primary') {
      return `
                background: ${primaryRed};
                color: ${whiteColor};
            `
    } else if (variant === 'secondary') {
      return `
                background-color: ${whiteColor};
                color: ${primaryRed};
                border:1px solid ${primaryRed};
            `
    } else if (variant === 'disabled') {
      return `
                background: linear-gradient(161.48deg, #7B7B7B -36.17%, #DFDFDF 115.42%);
                color: #FFF;
                cursor: not-allowed;
               
            `
    } else if (variant === 'warm') {
      return `
                background-color: ${warmBackground};
                font-size: 0.9rem;
                color: ${warmColor};
                border:1px solid ${warmBorderColor};
                &:hover {
                    background-color: ${warmHoverColor};
                }
                &:active {
                    background-color: ${warmActiveColor};
                }
            `
    }
  }}
`
