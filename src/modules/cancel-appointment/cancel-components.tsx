import { boldFont, errorRed, greyTextColor, mediumFont, semiBoldFont, successGreen, whiteColor } from '@app/styles'
import styled from 'styled-components'
export const Container = styled.div`
  display: flex;
  
  margin: 0 auto;
  overflow:auto;
  flex-direction: column;
`
export const RadioButton = styled.div`
display: block;
padding: 8px 0;
width: 100%;
border-bottom: 1px dotted #e1e1e1;
&:last-child {
  border-bottom: 0px dotted #e1e1e1;
}

`
export const Header = styled.div`
  display: flex;
  flex-direction: row;
  justify-content:space-between;
  height: 48px;
  padding: 0 8px;
  align-items: center;
`
export const Back = styled.div`
  display: flex;
  flex-direction: row;
  `
export const BackText = styled.div`
font-weight: bold;
font-size: 12px;
padding-left:4px;
line-height: 15px;
/* identical to box height */


/* Title Grey */

color: #5A5A5A;
  `
export const CancelCard = styled.div`
margin-top: 16px;
bottom:0;
background: #FFFFFF;
box-shadow: 0px -4px 10px rgb(84 84 84 / 15%);
border-radius: 24px 24px 0px 0px;
`
export const CancelContainer = styled.div`
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  padding: 20px;
  padding-bottom: 120px;
  button{
    margin:0 0 16px;
  }
`
export const DoctorInfoContainer = styled.div`
display: flex;
  flex-direction: row;
  justify-content:space-between;
`
export const SuccessContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content:center;
  height:100%;
  align-items: center;
`
export const SuccessTick = styled.div`
display: flex;
width: 100px;
height: 100px;
justify-content: center;
align-items: center;
box-shadow: 0 0 10px 2px rgb(0 0 0 / 10%);
border-radius: 50%;

svg {
  width: 64px;
    height: 64px;
    margin-left: 24px;
    path {
      stroke: green;
    }
}
`
export const SuccessTitle = styled.div`
  display: flex;
  display: flex;
  font-size: 21px;
  font-weight: 600;
  color: #4a4f9d;
  margin-top: 24px;
`
export const SuccessSubTitle = styled.div`
  display: flex;
  font-size: 14px;
  font-weight: 500;
  color: #5A5A5A;
  margin-top: 13px;
  margin-bottom: 25px;
`


export const ErrorContainer = styled.div`
  display: flex;
  flex-direction: row;
  justify-content:center;
  align-items:center;
  
`

export const InfoTextContainer = styled.div`
  display: flex;
  flex-direction: column;
  padding:16px 20px;
  
`

export const DoctorImg = styled.img`
width:100%;
border-radius: 50%;
max-width: 150px;
`

export const Title = styled.div`
  font-family: 'PFHandbook';
	font-size: 24px;
	line-height: 1;
	padding: 0 20px;
	letter-spacing: -0.02em;
	${boldFont};
	color: ${whiteColor};
  margin: 0 0 4px;
`
export const ErrorText = styled.div`
font-style: normal;
font-weight: bold;
font-size: 12px;
line-height: 25px;
color: ${errorRed};
text-align: left;
width: 100%;
padding: 20px 0px;
`
export const CancelTitle = styled.p`
font-size: 12px;
${mediumFont};
color: ${greyTextColor};
margin: 0 0 8px;
`
export const IconContainer = styled.div`
display: flex;
width: 30px;
height: 30px;
background: ${successGreen};
border-radius: 8px;
justify-content: center;
align-items: center;
`

export const Text = styled.div`
font-weight: 500;
font-size: 14px;
line-height: 1.25;
color: ${whiteColor};
padding: 0 20px;
`
export const HighlightText = styled.span`
font-weight: 600;
font-size: 12px;
line-height: 15px;
/* Title Grey */
color: #5A5A5A;
`
export const NoDataMessage = styled.div`
	display: flex;
	align-items: center;
	justify-content: center;
	margin: 40px auto;
	font-size: 16px;
	color: ${whiteColor};
	width: 100%;
`;




