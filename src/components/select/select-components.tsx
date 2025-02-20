import styled from 'styled-components'
import {
  primaryRed,
  screenSize,
  whiteColor,
} from '@app/styles'

export const SelectContainer = styled.div`
  position: relative;
  z-index: 5;
  *{
    font-size:14px !important;
  }
  .clutch-select {
    .clutch__control {
      height: 38px;
      border:0;
      border-radius:0;
      border-bottom:1px solid #BDBDBD;
      box-shadow: none;
      transition: background-color 0.2s ease-in-out,
        border-color 0.2s ease-in-out;
      &.clutch__control--is-focused {
        border-color: ${primaryRed};
        background-color: ${whiteColor};
      }
    }
    .clutch__value-container{
      padding:0;
    } 
    .clutch__single-value{
      margin:0;
    }
    .clutch__indicator-separator {
      display: none;
    }
    .clutch__indicators {
      padding: 8px;
    }
    .clutch__clear-indicator{
      display:none;
    }
    .clutch__multi-value{
      font-size:17px;
    }
    @media (${screenSize.tablet}){
      *{
        font-size:15px !important;
      }
    }
  }
`
