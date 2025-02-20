import { boldFont, primaryRed, whiteColor } from '@app/styles';
import styled from 'styled-components'


export const DeliveryContainer = styled.div`
	background: #ffffff;
	box-shadow: 0px -4px 10px rgba(84, 84, 84, 0.15);
	border-radius: 24px 24px 0px 0px;
	margin-top: 20px;
	height: 100%;
	
`;

export const AddressContainer = styled.div`
	background: #ffffff;
	box-shadow: 0px -4px 10px rgba(84, 84, 84, 0.15);
	border-radius: 24px 24px 0px 0px;
	margin-top: 20px;
	height: 100%;
`;
export const PlaceHolder = styled.div`
padding: 20px;
`;
export const Btncntr = styled.div`
padding: 20px;
background: #fff;
`;


export const Separator = styled.div`
border: 1px dashed #BBB;
`;
export const Marker = styled.div`
${({ lat, lng }: { lat?: any, lng?: any }) => {
    return `
      position: absolute;
      top: -24px;
      right: -14px;`
  }}
`;
export const Location = styled.span`
${({ space }: { space: boolean }) => {
    return `
  padding-right: 2px;
  `
  }
  }
`
export const CardTitle = styled.div`
font-family: Inter;
font-style: normal;
font-weight: bold;
font-size: 12px;
line-height: 18px;
letter-spacing: 0.02em;
text-transform: uppercase;
color: #5A5A5A;
margin: 20px 0;
`
export const ProgressWrapper = styled.div`

& .step-label   {
  font-family: Inter;
  font-style: normal;
  font-weight: 500;
  font-size: 11px;
  line-height: 14px;
  text-align: center;  
  color: #313131;
} 
& .completed .step-label {
  font-family: Inter;
font-style: normal;
font-weight: 500;
font-size: 11px;
line-height: 14px;
text-align: center;
color: #27AE60;
}
`

export const AddressSelection = styled.div`
display: flex;
margin: 20px 0;
`
export const DefaultAddress = styled.div`
padding: 0 4px;
font-family: Inter;
font-style: normal;
font-weight: 500;
font-size: 12px;
line-height: 18px;
color: #5A5A5A;
`

export const Viewmore = styled.div`
font-family: Inter;
font-style: normal;
font-weight: 600;
font-size: 12px;
line-height: 15px;
text-align: center;
color: #BC333A;
bottom: 12px;
cursor:pointer;
`
export const AddAddr = styled.div`
background: ${whiteColor};
border: 1px solid ${primaryRed};
box-sizing: border-box;
box-shadow: 0px 4px 10px rgba(73,78,157,0.1);
border-radius: 8px;
display: flex;
height: 50px;
justify-content: center;
align-items: center;
margin: 20px 0;
cursor:pointer;
`
export const AddIcn = styled.div`
height: 100%;
display: flex;
align-items: center;
`
export const AddIcnTxt = styled.div`
font-style: normal;
font-weight: 600;
color: ${primaryRed};
height: 100%;
display: flex;
align-items: center;
font-size: 14px;
justify-content: space-evenly;
margin: 6px 0 0 6px;
`
export const AddressGroup = styled.div`

`
export const Customer = styled.div`
display: flex;
font-family: Inter;
font-style: normal;
font-weight: bold;
font-size: 15px;
line-height: 18px;
color: #333333;
`
export const CustomerAddress = styled.div`
font-family: Inter;
font-style: normal;
font-weight: 500;
font-size: 12px;
line-height: 18px;
color: #5A5A5A;
word-break: break-word;
`
export const Selection = styled.div`
width: 40px;
bottom: 5px;
position: relative;
`
export const Address = styled.div`
width: calc(100vw - 122px);
`
export const EditIconCnt = styled.div`
width: 50px;
justify-content: center;
display: flex;
cursor:pointer;
`
export const EditIcon = styled.div`
height: 40px;
width: 40px;
display: flex;
justify-content: center;
align-items: center;
background: ${whiteColor};
border: 1px solid ${primaryRed};
box-sizing: border-box;
box-shadow: 0px 4px 10px rgba(73, 78, 157, 0.1);
border-radius: 8px;
`
export const Container = styled.div`
  display: flex;
  
  margin: 0 auto;
  overflow:auto;
  flex-direction: column;
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
export const Title = styled.div`
	font-family: 'PFHandbook';
	font-size: 22px;
	line-height: 1;	
	letter-spacing: -0.02em;
	${boldFont};
	color: ${whiteColor};
  margin: 0 20px;
	
`;
export const Nodata = styled.div`
${({ request }: { request: string }) => {

    if (request == 'Nodata') {
      return `
    display: flex;
    flex-direction: column;
    align-items: center; 
  `
    }

    if (request == 'header') {
      return `
    font-family: Inter;
    font-style: normal;
    font-weight: bold;
    font-size: 16px;
    line-height: 18px;
    text-align: center;
    color: #313131;
    padding: 10px 0;
  `
    }

    if (request == 'title') {
      return `
    font-family: Inter;
    font-style: normal;
    font-weight: normal;
    font-size: 12px;
    line-height: 18px;
    text-align: center;
    color: #313131;
    opacity: 0.8;
  `
    }
  }}

`
