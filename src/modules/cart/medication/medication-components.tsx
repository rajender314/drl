import { infoBlue, primaryRed, semiBoldFont, textColor } from '@app/styles'
import styled from 'styled-components'


export const DeliveryLabel = styled.div`
color: #313131;
font-weight: 700;
padding-bottom: 20px;
`
export const RadioButton = styled.div`
width: calc(100vw - 40px);
margin: 16px auto;
display: flex;
& .drl-radio label {
  display: inline-block;
}
`
export const Container = styled.div`
  display: flex;  
  margin: 0 auto;
  overflow:auto;
  flex-direction: column;  
`
export const MedicineEditContainer = styled.div`
display: flex;
`
export const Icn = styled.div`
display: flex;
align-items: center;
`
export const IcnTextSwitch = styled.div`
display: flex;
height: 18px;
margin-left: 10px;
font-family: Inter;
font-style: normal;
font-weight: 600;
font-size: 12px;
color: ${infoBlue};
position: relative;
top: 2px;
`
export const IcnTextRemove = styled.div`
display: flex;
height: 18px;
margin-left: 10px;
font-family: Inter;
font-style: normal;
font-weight: 600;
font-size: 12px;
color: ${primaryRed};
position: relative;
top: 2px;
`
export const MedicineEditBox = styled.div`
cursor: pointer;
width: 100%;
height: 40px;
display: flex;
justify-content: center;
align-items: center;

`
export const MedInfo = styled.div`
padding: 20px 15px 0px 15px;
`
export const EditMedicine = styled.div`
background: #fff;
border: 1px solid #E7E7E7;
box-sizing: border-box;
border-radius: 16px;
position: relative; 
top: 12px;
`
export const MedicineEditRuler = styled.div`

display: flex;
justify-content: center;
align-items: center;
border: 1px solid #E6E6E6;

`
export const MedicineEdit = styled.div`
display: flex;
justify-content: flex-start;
`
export const MedicineContainer = styled.div`
width: 100%;
height: auto;
background: #fff;
border: 1px solid #E7E7E7;
box-sizing: border-box;
border-radius: 16px;
margin-bottom: 30px;
`
export const MedicineTitle = styled.div`
height: 14px;
left: 40px;
top: 246px;
font-family: Inter;
font-style: normal;
font-weight: 500;
font-size: 11px;
line-height: 14px;
padding-bottom: 2px;
`
export const MedicineNameIcn = styled.div` 
cursor: pointer;
position: relative;
bottom: 2px;
width: 50%;
text-align: right;
`
export const MedicineName = styled.div` 
display:flex;
height: 17px;
left: 40px;
top: 265px;
font-family: Inter;
font-style: normal;
font-weight: 600;
font-size: 14px;
line-height: 17px;
color: #313131;
padding-bottom: 10px;
`
export const TabletContainer = styled.div` 
display: flex;
`
export const TabletName = styled.div`
font-family: Inter;
    font-style: normal;
    font-weight: 600;
    font-size: 14px;
    line-height: 17px;
    color: #313131;
    width: 50%;
`
export const MedicineDesc = styled.div` 
height: 14px;
left: 40px;
top: 286px;
font-family: Inter;
font-style: normal;
font-weight: normal;
font-size: 11px;
line-height: 14px;
color: #313131;
opacity: 0.8;

`
export const MedicinePrescriptionContainer = styled.div`
padding: 20px 0 10px;
box-sizing: border-box;
display: inline-block;
width: 100%;
background: #e7e7e7;
border-bottom-left-radius: 16px;
border-bottom-right-radius: 16px;
`
export const MedicinePrescription = styled.div`
display: flex;
padding: 6px 0;
`
export const MedicinePrescriptionCell = styled.div`
text-transform: capitalize;
${({ pos }: { pos: string }) => {

    if (pos == 'left') {
      return `margin: 0 10px;
      flex: 1;
      font-size: 12px;`;
    }
    if (pos == 'center') {
      return `margin: 0 10px;
      flex: 1;
      font-size: 12px;`
    }
    if (pos == 'right') {
      return `width: 100px;
      flex: unset;
      margin: 0 10px;
      
      @media screen and (max-width: 575px) {
        width: 50px;
      }`
    }
  }}
`
export const PrescriptionCell = styled.div`
${({ pos }: { pos: string }) => {

    if (pos == 'left') {
      return `
    padding-left: 20px;
    float:left;
     `;
    }
    if (pos == 'center') {
      return `
        width:200px;
        margin: 0 auto;  
    `
    }
    if (pos == 'right') {
      return `
    width:65px;
    padding-right: 20px; 
    float:right;
    `
    }
  }}
`
export const PrescriptionCellData = styled.div`
font-family: Inter;
color: #333333;

${({ ftype }: { ftype: string }) => {
    if (ftype == 'bold') {
      return `
    font-style: normal;
    font-weight: 600;
    font-size: 12px;
    line-height: 15px;    
    `
    }
    if (ftype == 'normal') {
      return `
    font-style: normal;
    font-weight: normal;
    font-size: 11px;
    line-height: 14px;    `
    }


  }}
`
export const Btncntr = styled.div`
margin-bottom: 40px;
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

export const Section = styled.div`
&.mb-32{
	margin-bottom: 32px;
}
`

export const SectionHeader = styled.h4`
font-size: 16px;
${semiBoldFont};
color: ${textColor};
line-height: 1;
margin: 0 0 24px;
&.m-0{
	margin: 0;
}
`