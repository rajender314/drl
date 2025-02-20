import { whiteColor } from '@app/styles';
import styled from 'styled-components'


export const Logo = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 25px 0;
`
export const Logolabel = styled.div`
font-style: normal;
font-weight: normal;
font-size: 16px;
line-height: 24px;
letter-spacing: -0.02em;
color: #BC333A;
text-align: center;

`
export const DeliveryContainer = styled.div`
	background: #ffffff;
	box-shadow: 0px -4px 10px rgba(84, 84, 84, 0.15);
	border-radius: 24px 24px 0px 0px;
	margin-top: 20px;
	height: 100%;	
`;

export const AddressContainer = styled.div`

  height: 100%;
  margin: 0 auto;
  background: linear-gradient(137.28deg, #FFFFFF 3.72%, #FAFAFA 119.2%);
  border: 1px solid #E7E7E7;
  box-sizing: border-box;
  box-shadow: 0px 5px 20px rgba(214, 212, 222, 0.24);
  border-radius: 16px;  
  margin: 20px 10px;
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
    padding-top: 25px;
    padding-left: 20px;
    padding-bottom: 5px;
    font-size: 16px;
    font-weight: normal;
    letter-spacing: -0.02em;
    color: #FFFFFF;
    color: ${whiteColor};
    font-family: PF Handbook Pro;
    &.t-cen{
      text-align: center;
    }
`