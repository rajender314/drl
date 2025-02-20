import styled from 'styled-components'


export const DeliveryContainer = styled.div`
	background: #ffffff;
	box-shadow: 0px -4px 10px rgba(84, 84, 84, 0.15);
	border-radius: 24px 24px 0px 0px;
	margin-top: 20px;
	height: 100%;	
`;

export const AddressContainer = styled.div`
margin: 20px 10px;
  height: 100%;
  /*width: calc(100vw - 40px);
  margin: 0 auto;
  */
  
  

  background: linear-gradient(137.28deg, #FFFFFF 3.72%, #FAFAFA 119.2%);
  border: 1px solid #E7E7E7;
  box-sizing: border-box;
  box-shadow: 0px 5px 20px rgba(214, 212, 222, 0.24);
  border-radius: 16px;  
`;
export const PlaceHolder = styled.div`
padding: 20px;
`;
export const BttnHolder = styled.div`
padding: 15px 0;
`

export const CardTitle = styled.div`
font-family: Inter;
font-style: normal;
font-weight: bold;
font-size: 15px;
line-height: 18px;
color: #333333;
margin-top: 20px;
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
export const Summary = styled.div`
display: flex;
height: 25px;
align-items: center;
${({ type = '' }: { type: any }) => {

  if (type == 'header') {
    return `
    padding: 5px 0;
    border-bottom: 1px dashed #BBB;    
    `
  }  

  if (type == 'row') {
    return `
    padding: 15px 0;
    border-bottom: 1px dashed #BBB;    
    `
  }
  if (type == 'total-cost') {
    return `
    padding: 15px 0;
    border-bottom: 1px dashed #BBB;    
    `
  }
  if (type == 'other') {
    return `
    padding: 10px 0;`
  }    

 }}
`
export const Qty = styled.div`
width:15%;
font-family: Inter;
font-style: normal;
font-weight: 500;
font-size: 12px;
line-height: 14px;
color: #313131;
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
