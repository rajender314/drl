import { boldFont, primaryColor, whiteColor, primaryRed, regularFont, textColor, mediumFont, greyTextColor } from '@app/styles';
import styled from 'styled-components';
import PlaceholderImage from '@app/assets/images/placeholder_order.png';
import PlaceholderImage1 from '@app/assets/images/doctorclaim.jpg';
import PlaceholderImage2 from '@app/assets/images/medclaim.jpg';

type Props = {
	isExpand?: boolean;
	isPolicyWordings?: boolean;
};

export const PolicyCard = styled.div`
	min-height: 76px;
	width: 100%;
	background: #f1f1f1;
	border-radius: 16px;
	margin: 20px 0;
	transition: 0.2s ease;
	overflow: hidden;
	background: linear-gradient(139.77deg, #ffffff 3.55%, #fafafa 113.79%);
	border: 1px solid #e7e7e7;
	box-sizing: border-box;
	box-shadow: 0px 5px 20px rgba(214, 212, 222, 0.24);
	border-radius: 16px;
	${({ isExpand }: Props) => {
		if (isExpand) {
			return ``;
		}
	}}
	${({ isPolicyWordings }: Props) => {
		if (isPolicyWordings) {
			return `background:#F6F6FA;`;
		}
	}}
`;
export const DigImg = styled.div`
	width: 100%;
	height: 150px;
	background-image: url(${PlaceholderImage});
	background-repeat: no-repeat;
	background-position: center;
	background-size: cover;
`;
export const DocImg = styled.div`
	width: 100%;
	height: 150px;
	background-image: url(${PlaceholderImage1});
	background-repeat: no-repeat;
	background-position: center;
	background-size: cover;
`;
export const MedImg = styled.div`
	width: 100%;
	height: 150px;
	background-image: url(${PlaceholderImage2});
	background-repeat: no-repeat;
	background-position: center;
	background-size: cover;
`;
export const PolicyInner = styled.div`
	padding: 20px;
	display: flex;
	align-items: center;
	justify-content: space-between;
	${({ isPolicyWordings }: Props) => {
		if (isPolicyWordings) {
			return ``;
		}
	}}
`;
export const Data = styled.div`
	display: flex;
	svg {
		margin-right:12px;
		width:24px;
	}
`;
export const PriceInfo = styled.div`
	text-align: right;
	.price{
		font-family: 'PFHandbook';
		font-size: 20px;
		${mediumFont};
		color: ${textColor};
		line-height: 1;
		margin: 0 0 2px;
		span{
			font-size: 18px;
		}
	}
	.data{
		font-size: 12px;
		${regularFont};
		color: ${greyTextColor};
		margin: 0;
	}
`;
export const LabelText = styled.p`
font-size: 13px;
${regularFont}
line-height: 1.35;
color: ${greyTextColor};
margin: 0;
`
export const UpdateClaim = styled.div`
height: 42px;
cursor: pointer;
background: linear-gradient(139.77deg, #FCFCFE 3.55%, #FAFAFA 113.79%);
border: 1px solid #E7E7E7;
box-sizing: border-box;
border-radius: 16px;
display: flex;
justify-content: center;
align-items: center;
font-size: 14px;
${mediumFont};
color: ${primaryRed};
`
export const CardTitle = styled.h4`
	font-size: 14px;
	line-height: 1;
	${boldFont};
	color: ${textColor};
	margin: 0 0 8px;
	p {
		${regularFont};
		margin: 5px 0 0;
		font-size: 12px;
	}
`;
export const InnerData = styled.div`
	padding: 20px;
`;
export const Field = styled.div`
	display: flex;
	align-items: center;
	margin: 0px 0 8px;
	justify-content: space-between;
`;
export const Label = styled.p`
	margin: 0;
	width: 50%;
	font-size: 12px;
	line-height: 14px;
	color: #313131;
`;
export const Text = styled.p`
	margin: 0;
	width: 50%;
	font-size: 12px;
	line-height: 15px;
	text-align: right;
	${boldFont};
	color: #000000;
`;
export const PdfLink = styled.p`
	min-width: 70px;
	color:${primaryRed};
	margin: 0;
	font-size: 12px;
	line-height: 1;
	text-align: right;
	${boldFont};
`
export const Container = styled.div`
  display: flex;
  
  margin: 0 auto;
  overflow:auto;
  flex-direction: column;
  &.w-100{
	  width : 100%;
  }
`
export const NoDataMessage = styled.div`
	display: flex;
	align-items: center;
	justify-content: center;
	margin: 40px auto;
	font-size: 16px;
	color: ${primaryRed};
	width: 100%;
	&.claim {
		font-size:18px;
		color:${greyTextColor};
		display:flex;
		align-items:center;
		justify-content:center;
		min-height:200px;
		width:100%;	
	}
`;
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
export const Title = styled.h4`
font-family: 'PFHandbook';
font-size: 24px;
line-height: 1;
padding: 0 20px;
letter-spacing: -0.02em;
${boldFont};
color: ${whiteColor};
margin: 20px 0 0;
&.body-text{
	font-family: 'PFEncore';
	font-size: 16px;
	color: ${textColor};
	margin: 0;
	padding: 0;
}
&.mtb-20{
margin: 20px 0;

}
`
export const CancelCard = styled.div`
background: #FFFFFF;
box-shadow: 0px -4px 10px rgb(84 84 84 / 15%);
border-radius: 24px 24px 0px 0px;
margin-top: 20px;
padding: 20px;
&.pm-0{
	margin-top: 0px;
	border-radius:0px;
}
`
export const ClaimTitle = styled.div`
font-style: normal;
font-weight: 700;
font-size: 12px;
color: #5A5A5A;
padding: 10px 0;
margin-top: 12px;
width: 100%;
`
export const ClaimContainer = styled.div`
margin: 0 auto;
display: flex;
flex-direction: column;
align-items: center;
padding-bottom:120px;
button{
	margin:0 0 15px;
}
&.pb-50{
padding-bottom:50px;
}
`
export const VisitCard = styled.div`
padding:20px;
min-height: 120px;
width: 100%;
margin-top:16px;
background: linear-gradient(137.28deg, #FFFFFF 3.72%, #FAFAFA 119.2%);
border: 1px solid #E7E7E7;
box-sizing: border-box;
box-shadow: 0px 5px 20px rgba(214, 212, 222, 0.24);
border-radius: 16px;
display: flex;
flex-direction: column;
align-items: flex-start;
`
export const VisitTitle = styled.div`
 font-weight: bold;
 font-size: 15px;
 line-height: 18px;
 color: #333333;
`
export const VisitRow = styled.div`
width: 100%;
display: flex;
justify-content: space-between;
flex-direction: row;
flex-direction: row;
padding: 16px 0px;
border-bottom: 1px dashed #bc333a;
&:last-child {
    border-bottom: 0px dashed #bc333a;
}
`
export const VisitName = styled.div`
font-weight: normal;
font-size: 12px;
line-height: 14px;
color: #000000;
`
export const VisitAction = styled.div`
 display:flex;
 flex-direction:row;
 align-items:center;
`
export const VisitStatus = styled.div`
margin-right:16px;
font-style: normal;
font-weight: bold;
font-size: 12px;
line-height: 12px;
display: flex;
align-items: center;
color: #666666;
`
export const ViewLog = styled.div`
font-weight: 600;
font-size: 12px;
line-height: 12px;
display: flex;
align-items: center;
color: #bc333a;
cursor:pointer;
`
export const ViewAvailable = styled.div`
font-weight: 600;
font-size: 12px;
line-height: 12px;
display: flex;
align-items: center;
color: #229653;
`