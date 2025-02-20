import { boldFont, textColor, whiteColor } from '@app/styles';
import styled from 'styled-components'


export const DeliveryContainer = styled.div`
	background: ${whiteColor};
	box-shadow: 0px -4px 10px rgba(84, 84, 84, 0.15);
	border-radius: 24px 24px 0px 0px;
	margin-top: 20px;
	height: 100%;	
  padding: 20px;
  button:not(:last-of-type){
    margin-bottom: 16px;
  }
`;

export const AddressContainer = styled.div`
  height: 100%;
  background: linear-gradient(137.28deg, #FFFFFF 3.72%, #FAFAFA 119.2%);
  border: 1px solid #E7E7E7;
  box-sizing: border-box;
  box-shadow: 0px 5px 20px rgba(214, 212, 222, 0.24);
  border-radius: 16px;  
  padding: 20px;
  margin: 40px 0 20px;
`;
export const PlaceHolder = styled.div`
padding: 20px;
`;
export const Btncntr = styled.div`
padding: 20px;
background: #fff;
`;
export const BttnHolder = styled.div`
margin-bottom: 20px;
`

export const CardTitle = styled.div`
/* padding: 25px 20px 0px 20px; */
font-weight: bold;
font-size: 15px;
line-height: 18px;
color: ${textColor};
margin-bottom: 16px;
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
& .completed .step-label-review.step-label {
  color: #FBB500;
}
& .progress-step::before {
  top:12px;
}
`
export const Summary = styled.div`
display: flex;
height: 25px;
align-items: center;
${({ type = '' }: { type: any }) => {

    if (type == 'header') {
      return `
    padding: 5px 0;
    border-bottom: 1px dashed #313131;
        
    `
    }

    if (type == 'row') {
      return `
    padding: 15px 0;
    border-bottom: 1px dashed #BBB;    
    `
    }
  }}
`
export const Qty = styled.div`
width:40%;
font-family: Inter;
font-style: normal;
font-weight: 500;
font-size: 12px;
line-height: 14px;
color: #313131;
text-align: right;
${({ type = '' }: { type: any }) => {

    if (type == 'header') {
      return `
    font-family: Inter;
    font-style: normal;
    font-weight: bold;
    font-size: 12px;
    line-height: 14px;
    color: #313131; 
    `
    }

  }}
`
export const Product = styled.div`
width:60%;
font-family: Inter;
font-style: normal;
font-weight: bold;
font-size: 12px;
line-height: 14px;
color: #313131;
`
export const Separator = styled.div`
border: 1px dashed #BBB;
`;
export const Amount = styled.div`
width:25%;
text-align: right;
font-family: Inter;
font-style: normal;
font-weight: 300;
font-size: 14px;
color: #000000;

${({ lablel = '' }: { lablel: any }) => {

    if (lablel == 'prescription') {
      return ``
    }

    if (lablel == 'totlal-prescription') {
      return `
    font-weight: bold;
    font-size: 14px;
    line-height: 17px;    
    color: #313131;     
    `
    }
  }}
`
export const LabContainer = styled.div`
`

export const OrderInfo = styled.div`
display: flex;
height: 25px;
align-items: center;
padding: 20px 0;
${({ isBorder }: { isBorder: boolean }) => {
    if (isBorder) {
      return `border-bottom: 1px dashed #BBB;`
    }

  }}
`
export const OrderInfoIcn = styled.div`
width:24px;
height:24px;
padding-right:15px;
`
export const OrderInfoTxt = styled.div`
font-family: Inter;
font-style: normal;
font-weight: 500;
font-size: 12px;
line-height: 16px;
color: #5A5A5A;
${({ pos }: { pos: string }) => {
    if (pos == 'center') {
      return `text-align: center;`
    }

  }}
`
export const UpdatePickup = styled.div`
background: #EFF8F3;
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
	margin 0 20px;
`;
export const OrderStatusHolder = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 14px;
  text-align: right;
  color: #58565F;
  margin: 0 auto;
  color: #EB5757;

`

