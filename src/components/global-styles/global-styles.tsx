import { createGlobalStyle } from 'styled-components'
import { normalize } from 'styled-normalize'
import {
  appBackgroundColor,
  appFontColor,
  regularFont,
  screenSize,
  primaryColor,
} from '../../styles'


const GlobalStyles = createGlobalStyle`
  ${normalize}

  * {
    box-sizing: border-box;
  }

  html, body, #root {
    height: 100%;
  }

  body {
    font-family: 'Rubik', sans-serif;
    font-size: 15px;
    ${regularFont}
    background-color: ${appBackgroundColor};
    color: ${appFontColor};

    @media (${screenSize.tablet}) {
      font-size: 14px;
    }
  }

  #root {
    display: flex;
    flex-direction: column;
  }
  *::-webkit-scrollbar {
    width: 3px;
}
.chatlio-title-bar,.chatlio-message-from-me .chatlio-message-body{
  background-color:${primaryColor} !important;
}

*::-webkit-scrollbar-track {
    background: #fafafa; 
    width: 3px;
}
 

*::-webkit-scrollbar-thumb {
    background:#c1c1c1 ; 
    border-radius: 3px;
}
`

export default GlobalStyles
