import { primaryRed, whiteColor } from '@app/styles';
import styled from 'styled-components'


export const DeliveryContainer = styled.div`
	background: #ffffff;
	box-shadow: 0px -4px 10px rgba(84, 84, 84, 0.15);
	border-radius: 24px 24px 0px 0px;
	margin-top: 20px;
	height: 100%;	
`;

export const CongratsContainer = styled.div`
display: flex;
`
export const CongratsIcon = styled.div`
padding-right: 15px;
`
export const CongratsTxtCont = styled.div`
padding-top: 4px;
`
export const CongratsTxt = styled.div`
${({ type }: { type: any }) => {

    if (type == 'header') {
      return `
    font-family: Inter;
    font-style: normal;
    font-weight: bold;
    font-size: 16px;
    line-height: 18px;
    color: #313131;
    `
    }
    if (type == 'text') {
      return `font-family: Inter;
    font-style: normal;
    font-weight: normal;
    font-size: 12px;
    line-height: 18px;
    color: #313131;`
    }
    if (type == 'orderConfirm') {
      return `
    padding-top: 12px;
    font-family: Inter;
    font-style: normal;
    font-weight: bold;
    font-size: 12px;
    line-height: 18px;
    letter-spacing: 0.02em;
    text-transform: uppercase;    
    color: #313131;`
    }

  }}
`


export const OrderSummary = styled.div`
background: #F2F3FF;
border: 1px solid #E7E7E7;
box-sizing: border-box;
box-shadow: 0px 5px 20px rgba(214, 212, 222, 0.24);
border-radius: 16px;
`;

export const Invoice = styled.div`
display: flex;
height: 120px;
`
export const InvoiceLabel = styled.div`
width:50%;
display: flex;
flex-direction: column;
margin: 0 auto;
justify-content: center;
align-items: center;

font-family: Inter;
font-style: normal;
font-weight: 500;
font-size: 11px;
line-height: 14px;
text-align: center;
letter-spacing: 0.02em;
text-transform: capitalize;
color: #979797;
opacity: 0.8;
& svg {
  padding-bottom: 10px;
}
`

export const OrderSummaryInfo = styled.div`
background: white;
border: 1px solid #E7E7E7;
box-sizing: border-box;
box-shadow: 0px 5px 20px rgba(214, 212, 222, 0.24);
border-radius: 16px;

`;
export const StoreSummary = styled.div`
display: flex;
padding: 20px;
`;
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
export const Product = styled.div`
width:60%;
font-family: Inter;
font-style: normal;
font-weight: bold;
font-size: 12px;
line-height: 14px;
color: #313131;
`
export const SummaryIcn = styled.div`
width: 40px;
margin-right: 6px;
`;
export const SummaryTxt = styled.div`
padding-top: 5px;
`
export const StoreIdentity = styled.div`
    display: flex;
    justify-content: center;
    /* align-items: center; */
    & div {
      cursor: pointer;
    }
`
export const AddressContainer = styled.div`

  height: 100%;
  margin: 0 auto;
  background: linear-gradient(137.28deg, #FFFFFF 3.72%, #FAFAFA 119.2%);
  border: 1px solid #E7E7E7;
  box-sizing: border-box;
  box-shadow: 0px 5px 20px rgba(214, 212, 222, 0.24);
  border-radius: 16px;  
  
`;
export const SummaryLabel = styled.div`
${({ roll }: { roll: any }) => {

    if (roll == 'header') {
      return `
    padding-bottom: 5px;
    font-family: Inter;
    font-style: normal;
    font-weight: bold;
    font-size: 16px;
    line-height: 18px;
    color: #313131;    
    `
    }
    if (roll == 'txt') {
      return `font-style: normal;
    font-weight: normal;
    font-size: 12px;
    line-height: 18px;
    color: #313131;
    `
    }
    if (roll == 'addr') {
      return `
    
    font-family: Inter;
    font-style: normal;
    font-weight: 500;
    font-size: 10px;
    line-height: 14px;
    color: #5A5A5A;
    `
    }
    if (roll == 'code') {
      return `
    padding-top: 20px;
    font-family: Inter;
    font-style: normal;
    font-weight: 500;
    font-size: 10px;
    line-height: 14px;
    color: #5A5A5A;
    `
    }
    if (roll == 'count') {
      return `
    font-family: Inter;
    font-style: normal;
    font-weight: bold;
    font-size: 28px;
    line-height: 34px;
    letter-spacing: -0.02em;    
    color: #27AE60;
    padding: 4px 0;    
    `
    }
    if (roll == 'phone') {
      return`
      color: #000000;
      display: flex;
      padding: 6px 0;
      font-size: 12px;
      align-items: center;  
      & svg {
        padding-right: 6px;
      }
      `
       
      }    
    if (roll == 'info') {
      return `
      display: inline-flex;
      padding: 10px 0;
      & svg {
        padding-right: 10px;
      }
      `
    }
  }
  }}
`;

export const PlaceHolder = styled.div`
padding: 20px;
`;
export const BttnHolder = styled.div`
padding: 15px 0;
`

export const CardTitle = styled.div`
padding: 25px 20px 0px 20px;
font-family: Inter;
font-style: normal;
font-weight: bold;
font-size: 15px;
line-height: 18px;
color: #333333;
margin-top: 20px;
`
export const ProgressWrapper = styled.div`
width:460px;
& .progress-step::before  {
  top: 46%;
} 
`
export const Qty = styled.div`
width:40%;
font-family: Inter;
font-style: normal;
font-weight: 500;
font-size: 12px;
line-height: 14px;
color: #313131;
text-align:right;
${({ type = '' }: { type: any }) => {

    if (type == 'total') {
      return `
    width:75%;
    font-weight: bold;
    font-size: 14px;
    line-height: 17px;    
    color: #313131;     
    `
    }
    if (type == 'other') {
      return `
    width:75%;
    `
    }
  }}
`
export const Description = styled.div`
width:60%;
font-family: Inter;
font-style: normal;
font-weight: 500;
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
export const ConfirmImg = styled.div`
height: 200px;
    background: ();
    background-image: url(images/strip.jpeg);
    background-repeat: no-repeat;
    width: 100%;
    background-size: 100%;
    background-position-y: center;
    border-radius: 16px 16px 0 0;
    margin: 0 auto;    
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
  margin: 0 auto;
`

export const InfoTextContainer = styled.div`
  display: flex;
  flex-direction: column;
  padding:16px 20px;
`
export const Title = styled.div`
    font-style: normal;
    font-weight: bold;
    font-size: 21px;
    line-height: 25px;

/* Title Grey */

    color: #5A5A5A;
`
export const ButtonElement = styled.span`
width: 40px;
height: 40px;
border: 1px solid transparent;
border-radius: 6px;
box-shadow: 0px 4px 10px 0px #BC333A1A;
display: flex;
align-items: center;
justify-content: center;
&.primary{
  background-color: ${primaryRed};
  color: ${whiteColor};
}
&.secondary{
  background-color: #FFEFEF;
  border-color: ${primaryRed};
  color: ${primaryRed};
}
&:not(:last-child){
  margin-right: 8px;
}
`