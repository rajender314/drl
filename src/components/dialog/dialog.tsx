import React from 'react'
import { Portal, Icon } from '@app/components'
import ReactDOM from 'react-dom'
import {
  Container,
  Backdrop,
  DialogContainer,
  Header,
  Title,
  CloseIcon,
  Body,
  Footer,
} from './dialog-components'

type Props = {
  title: string
  backdrop?: boolean
  fullScreen?: boolean
  classN?:string
  children?: React.ReactNode
  onClose?: (e: any) => void
}

export default function Dialog(
  { title, children, classN,onClose, backdrop = true, fullScreen = false }: Props) {
  return (
    <Portal>
      <Container className={classN ? classN : ''}>
        <Backdrop backdrop={backdrop} onClick={onClose} />
        <DialogContainer className={classN ? classN : ''} fullScreen={fullScreen}>
         {!classN && <Header>
            <Title>{title}</Title>
            {onClose && (<CloseIcon onClick={onClose}>
              <Icon name="close" />
            </CloseIcon>)}

          </Header>}
          {children}
        </DialogContainer>
      </Container>
    </Portal>
  )
}

Dialog.Body = Body
Dialog.Footer = Footer
