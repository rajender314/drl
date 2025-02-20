import { whiteColor } from '@app/styles'
import styled from 'styled-components'

export const Container = styled.div`
  display: flex;
  
  margin: 0 auto;
  overflow:auto;
  flex-direction: column;
`

export const Header = styled.div`
  display: flex;
  flex-direction: row;
  justify-content:space-between;
  height: 48px;
  padding: 0 20px;
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
export const LabCard = styled.div`
margin: 0;
bottom:0;
background: #FFFFFF;
box-shadow: 0px -4px 10px rgb(84 84 84 / 15%);
border-radius: 24px 24px 0px 0px;
margin-bottom: -20px;
padding-bottom: 20px;
`
export const RescheduleCard = styled.div`
margin: 0;
bottom:0;
background: #FFFFFF;
box-shadow: 0px -4px 10px rgb(84 84 84 / 15%);
border-radius: 24px 24px 0px 0px;
`
export const RescheduleContainer = styled.div`
  margin: 0 auto;
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 0 20px;
    padding-bottom:100px;
`
export const LabVisitContainer = styled.div`
    margin: 0 auto;
    display: flex;
    flex-direction: row;
    align-items: center;
    padding: 0 20px;
`
export const DoctorInfoContainer = styled.div`
display: flex;
  flex-direction: row;
  justify-content:space-between;
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
    font-style: normal;
    font-weight: bold;
    font-size: 21px;
    line-height: 25px;

/* Title Grey */

    color: #5A5A5A;
`
export const CancelTitle = styled.div`
font-style: normal;
letter-spacing: 0.02em;
font-weight: 700;
font-size: 12px;
color: #5A5A5A;
padding: 10px 0;
width: 100%;
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

export const Text = styled.div`
font-weight: 500;
font-size: 12px;
line-height: 15px;
/* Title Grey */
color: #5A5A5A;
`
export const HighlightText = styled.span`
font-weight: 600;
font-size: 12px;
line-height: 15px;
/* Title Grey */
color: #5A5A5A;
`

export const SlotsDetails = styled.div`
display: flex;
padding: 10px 0px;
flex-wrap: wrap;
justify-content: space-between;
`;
export const Detail = styled.div`

width: 150px;
color:#a7a7a7;
height: 40px;
background: linear-gradient(
45deg
,#FDFEFF 0%,#F1F4FB 100%);
border: 1px solid #D1D5E8;
box-sizing: border-box;
border-radius: 8px;
margin: 8px 0px;
display: flex;
justify-content: center;
align-items: center;
border-radius: 8px;
${({ type = '' }: { type: any }) => {
    if (type === 'active') {
      return `
        background: linear-gradient(108.24deg, #42BB73 40.19%, #98F2BD 129.14%);
        border: 1px solid rgba(92, 185, 129, 0.4);
        box-sizing: border-box;
        color: #FFFFFF;
        font-weight:700;
  `
    }
    if (type === 'available') {
      return `
        color: #313131;
        border: 1px solid rgba(92, 185, 129, 0.4);
        background: linear-gradient(139.98deg, rgba(77, 206, 191, 0.2) 12.45%, rgba(255, 255, 255, 0.2) 98.32%);
      `
    }
  }}

`;
export const Label = styled.label`
font-size: 11px;
line-height: 14px;
`;
export const NoDataMessage = styled.div`
	display: flex;
	align-items: center;
	justify-content: center;
	margin: 40px auto;
	font-size: 16px;
	color: ${whiteColor};
	width: 100%;
`;





