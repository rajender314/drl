import styled from 'styled-components'
import { boldFont, primaryColor } from '@app/styles';

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
export const Separator = styled.div`
border-bottom: 1px dashed #BBB;
margin: 20px;
`;

export const CardTitle = styled.div`
font-family: Inter;
font-style: normal;
font-weight: bold;
font-size: 12px;
line-height: 18px;
letter-spacing: 0.02em;
text-transform: uppercase;
color: #5A5A5A;
padding: 25px 20px 0px 20px;
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
export const LabContainer = styled.div`

`
export const LabHeader = styled.div`
display: flex;
`
export const LabHeaderName = styled.div`
width: 70%;
text-align: left;
font-family: Inter;
font-style: normal;
font-weight: 500;
font-size: 11px;
line-height: 14px;
color: #313131;
`
export const LabHeaderPrice = styled.div`
width: 30%;
text-align: right;
font-family: Inter;
font-style: normal;
font-weight: 500;
font-size: 11px;
line-height: 14px;
color: #313131;
`
export const Customer = styled.div`
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
`
export const MediCineCont = styled.div`
margin:15px 0;
`
export const MediCine = styled.div`
display:flex;
margin: 10px 0;
`
export const MediCineList = styled.div`
display:flex;
`
export const MediCineListLable = styled.div`
font-family: Inter;
font-style: normal;
font-weight: 500;
font-size: 11px;
line-height: 14px;
width: 60%;

color: #313131;
`
export const MediCineListIcon = styled.div`
width: 40%;
display: flex;
justify-content: flex-end;
cursor: pointer;
`


export const MediLeftCont = styled.div`
width: 60%;
font-family: Inter;
font-style: normal;
font-weight: bold;
font-size: 16px;
line-height: 14px;
color: #000000;
`
export const MediRightCont = styled.div`
width: 40%;
text-align:right;
font-family: Inter;
font-style: normal;
font-weight: bold;
font-size: 16px;
line-height: 14px;
color: #000000;
display: flex;
justify-content: flex-end;
`
export const PillLeft = styled.div`
width: 60%;
font-family: Inter;
font-style: normal;
font-weight: normal;
font-size: 12px;
line-height: 18px;
color: #000000;
`
export const PillRight = styled.div`
width: 40%;
text-align:right;
display: flex;
justify-content: flex-end;
`
export const ErrorMessageCont = styled.div`
display: flex;
flex-direction: column;
align-items: flex-end;
`
export const ErrorMessage = styled.div`
width:200px;
font-family: Inter;
font-style: normal;
font-weight: 500;
font-size: 12px;
line-height: 18px;
text-align: right;
color: #000000;
margin-top: 8px;
`
export const EditMedicine = styled.div`
display: flex;
    background: #F2F3FF;
    border: 1px solid #BBBEEF;
    box-sizing: border-box;
    box-shadow: 0px 4px 10px rgba(73, 78, 157, 0.1);
    border-radius: 8px;
    height: 45px;
    width: 124px;
    float:right;
`
export const EditMedicineBoxInput = styled.div`
border-left: 1px solid #BBBEEF;
border-right: 1px solid #BBBEEF;
width: 40px;
& input {
  width: 36PX;
  height: 95%;  
  text-align: center;
  border: 0;
}

`
export const EditMedicineCont = styled.div`

`
export const EditMedicineBox = styled.div`
width: 42px;
display: flex;
align-items: center;
justify-content: center;
`

export const UnavailableIcn = styled.div`
margin-top: 10px;
color:#fff;
height: 24px;
line-height: 24px;
display: flex;
align-items: center;
padding: 0 10px;
font-family: "Inter", sans-serif !important;
background: #EB5757;
border-radius: 12px;
width: 83px;
& svg {
  padding-right: 6px;
}    
`
export const UpdatePickup = styled.div`

${({ isOpened}: { isOpened: boolean }) => {

  if (isOpened) {
    return `background: #EFF8F3;`
  }
  if (!isOpened) {
    return `return background: #fff;`
  }  
 }}
`
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
export const FilterContainer = styled.div`
	padding: 10px 20px;
`;
export const FilterLabel = styled.label`
	font-size: 12px;
	line-height: 14px;
	${boldFont};
	color: ${primaryColor};
	margin: 0;
`;
export const Price = styled.div`
display:flex;
`
export const Selection = styled.div`
width: 40px;
bottom: 5px;
position: relative;
`
export const Address = styled.div`
width: 70%;
`
export const TotalPrice = styled.div`
width: 30%;
text-align:right;
font-weight: 400;
font-size: 16px;


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
