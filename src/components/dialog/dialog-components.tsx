import styled from 'styled-components'
import { mediumFont, boldFont } from '@app/styles';
import { isMobile } from 'react-device-detect';
type DialogProps = {
  backdrop?: boolean
  fullScreen?: boolean
}
export const Container = styled.div`
  display: flex;
  align-items: ${isMobile ? 'flex-end' : 'center'};
  justify-content: center;
  position: fixed;
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
  z-index: 10;
  &.c-dialog{
    align-items:center;   
  }
  &.logout-dialog{
    align-items:center;   
  }
`

export const Backdrop = styled.div`
  position: absolute;
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
  background-color: transparent;
  ${({ backdrop }: DialogProps) => {
    if (backdrop) {
      return `background-color: rgba(0, 0, 0, 0.5);`
    }
  }}
`

export const DialogContainer = styled.div`
  display: flex;
  flex-direction: column;
  min-width: ${isMobile ? '100%' : '480px'};
  max-width: ${isMobile ? '100%' : ' 90%'};
  min-height: 260px;
  max-height: 90%;
  overflow: hidden;
  position: relative;
  background-color: #fff;
  box-shadow: 0px -4px 10px rgb(84 84 84 / 15%);
  border-radius:${isMobile ? '24px 24px 0px 0px' : '24px'};
  ${({ fullScreen }: DialogProps) => {
    if (fullScreen && isMobile) {
      return `height:100%;
      max-height: 100%;
      border-radius:0};
      
      `
    }
  }}
  &.c-dialog{
    min-width:80%;
    border-radius:24px;
  }
  &.logout-dialog{
    min-width: 312px;
    min-height: 220px;
    border-radius: unset;
  }  
`

export const Header = styled.div`
  display: flex;
  align-items: center;
  min-height: 60px;
  height: 60px;
  padding: 0 20px;
  border-bottom: 1px solid rgba(0, 0, 0, 0.12);
`

export const Title = styled.div`

font-weight: bold;
font-size: 12px;
line-height: 18px;
letter-spacing: 0.02em;
text-transform: uppercase;
color: #5A5A5A;
  ${boldFont}
`

export const CloseIcon = styled.div`
  position: absolute;
  right: 12px;
  cursor: pointer;
`

export const Body = styled.div`
  flex: 1;
  padding: 24px;
  overflow-y:auto;
`

export const Footer = styled.div`
  padding: 12px 24px;
  border-top: 1px solid rgba(0, 0, 0, 0.12);
  button{
		margin:0 0 15px;
	}
`
