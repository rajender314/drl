import styled from 'styled-components'
import { boldFont, primaryColor } from '@app/styles';

export const DeliveryContainer = styled.div`
	background: #ffffff;
	box-shadow: 0px -4px 10px rgba(84, 84, 84, 0.15);
	border-radius: 24px 24px 0px 0px;
	margin-top: 20px;
	height: 100%;
`;
export const PlaceHolder = styled.div`
padding: 20px;
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
    font-style: normal;
    font-weight: bold;
    font-size: 22px;
    line-height: 25px;
    color: #fff;
    margin: 0 20px;
    
`