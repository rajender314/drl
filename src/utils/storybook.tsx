import React from 'react'
import { DecoratorFn } from '@storybook/react'
import StoryRouter from 'storybook-react-router'
import styled from 'styled-components'
import { GlobalStyles } from '../components'
import { screenSize } from '../styles'

export const WhiteContainer = styled.div`
  position: relative;
  height: 100%;
  padding: 15px;
  @media (${screenSize.tablet}) {
    background-color: #fff;
  }
`

export const DecorateWithGlobalStyles: DecoratorFn = (storyFn) => {
  return (
    <React.Fragment>
      <GlobalStyles />
      {storyFn()}
    </React.Fragment>
  )
}

export const DecorateWithRouter = StoryRouter(undefined, {
  initialEntries: [''],
})
