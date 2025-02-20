import { primaryColor, primaryRed, whiteColor } from '@app/styles'
import styled from 'styled-components'

export const Container = styled.div`
display: flex;
margin: 0 auto;
flex-direction: column;
`
export const Header = styled.div`
  display: flex;
  flex-direction: row;
  justify-content:space-between;
  height: 48px;
  padding: 16px 20px;
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

export const DoctorInfoContainer = styled.div`
padding: 0 20px;
  display: flex;
  flex-direction: row;
  justify-content:space-between;
`

export const InfoTextContainer = styled.div`
  display: flex;
  flex-direction: column;
  padding-bottom:16px;
`
export const Specializations = styled.div`
display: flex;
flex-direction: row;
justify-content: flex-start;
align-items: end;
margin: 6px 0;
svg{
  rect{
    fill: ${whiteColor}
  }
  path{
    fill: ${primaryRed}
  }
}
`
export const SpecializationText = styled.div`
font-style: normal;
font-weight: 500;
font-size: 13px;
color: ${whiteColor};
padding-left:8px;
text-transform: capitalize;
width: calc(100vw - 230px);
overflow-wrap: break-word;
padding: 0 10px;
span{
  color:${whiteColor};
  margin-left:5px;
  display:inline-block;
}
`
export const ImageContainer = styled.div`
height:auto;
`
export const DoctorImg = styled.img`
width:100%;
border-radius: 50%;
max-width: 150px;
`

export const Title = styled.div`
font-weight: bold;
font-family: 'PFHandbook';
font-size: 24px;
line-height: 25px;
color:${whiteColor};
`
export const IconContainer = styled.div`
display: flex;
width: 30px;
height: 30px;
background: #1F8A7E;
border-radius: 8px;
justify-content: center;
align-items: center;
`
export const Label = styled.label`
font-weight: medium;
font-size: 12px;
line-height: 1;
margin-top:18px;
margin-bottom: 4px;
color: ${whiteColor};
`
export const Text = styled.p`
font-weight: bold;
font-size: 14px;
line-height: 1;
color: ${whiteColor};
margin: 0;
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




