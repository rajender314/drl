import { boldFont, secondaryColorV2, primaryRed, whiteColor, greyTextColor, textColor, regularFont, semiBoldFont, mediumFont } from '@app/styles';
import styled from 'styled-components';

export const CoverageContainer = styled.div``;
export const CoverageHeader = styled.div`
	display: flex;
	align-items: center;
	justify-content: space-between;
	flex: 1 1;
	padding: 20px 10px;
	
`;
export const CoverageList = styled.div`
	padding: 20px 20px 90px;
	margin-bottom:30px;
`;
export const NoDataMessage = styled.div`
	display: flex;
	height:100%;
	flex-direction:column;
	align-items: center;
	justify-content: center;
	margin: 40px auto;
	font-size: 16px;
	color: ${greyTextColor};
	width: 100%;
`;
export const NoTextTitle = styled.div`
font-weight: bold;
margin-top:24px;
font-size: 16px;
line-height: 18px;
/* identical to box height, or 112% */
text-align: center;
color: ${greyTextColor};
`;
export const SubHeader = styled.div`
display:flex;
align-items: center;
justify-content: space-between;
margin-top: 10px;
`
export const SubTextTitle = styled.div`
font-weight: bold;
font-size: 12px;
line-height: 18px;
letter-spacing: 0.02em;
text-transform: uppercase;
color: ${textColor};
`;
export const ViewMore = styled.div`
font-size: 14px;
text-align: center;
padding: 16px 8px;
/* width: 120px; */
margin: 8px auto;
border-radius: 8px;
border: 1px solid ${primaryRed};
color: ${primaryRed};
`;
export const ReviewPolicy = styled.span`
height: 32px;
padding: 0 16px;
background-color: ${whiteColor};
border: 1px solid ${primaryRed};
border-radius: 8px;
display: flex;
align-items: center;
font-size: 12px;
line-height: 1;
/* letter-spacing: -0.02em; */
color: ${primaryRed};
`
export const NoText = styled.div`
font-style: normal;
margin-top:6px;
font-weight: normal;
font-size: 12px;
line-height: 18px;
width: 250px;
text-align: center;
color: #313131;
opacity: 0.8;
`;

export const CoverageCard = styled.div`
	width: 100%;
	margin: 14px 0 0 0;
	background: linear-gradient(139.77deg, #ffffff 3.55%, #fafafa 113.79%);
	border: 1px solid #e7e7e7;
	box-sizing: border-box;
	box-shadow: 0px 5px 20px rgba(214, 212, 222, 0.24);
	border-radius: 16px;
	display: flex;
	padding: 20px;
	justify-content: space-between;
	align-items: flex-start;
`;

export const CoverageInfo = styled.div`
width: 100%;
display: flex;
flex-direction: row;
svg {
	margin-right:8px;
}
`;
export const Title = styled.p`
	font-size: 14px;
	${semiBoldFont};
	line-height: 1.25;
	color: ${textColor};
	margin: 0 0 8px;

`;
export const DocName = styled.p`
	margin: 5px 0;
	font-size: 12px;
	line-height: 15px;
	color: #333333;
`;

export const FlexGrid = styled.div`
display: flex;
flex-direction: row;
`
export const CoverageInfoContainer = styled.div`
flex: 1;
`
export const ValidityContainer = styled.div`
	display: flex;
	flex-direction: column;
	justify-content: flex-start;
	align-items: flex-end;
	max-width:120px;
`;
export const ValidityLabel = styled.div`
	display: flex;
	flex-direction: column;
	align-items: flex-end;
`;
export const Validity = styled.p`
    margin:5px 0;
    ${boldFont};
    color:#42BB72;
    font-size: 12px;
	line-height: 15px;
`
export const InfoCard = styled.div`
margin: 0;
bottom:0;
background: #FFFFFF;
box-shadow: 0px -4px 10px rgb(84 84 84 / 15%);
border-radius: 24px 24px 0px 0px;
margin-bottom: -20px;
padding-bottom: 20px;
`
export const InfoContainer = styled.div`
	padding:20px;
	display: flex;
    flex-direction: column;
`
export const InfoLabel = styled.span`
font-weight: 500;
font-size: 13px;
line-height: 1;
color: ${greyTextColor};
margin-bottom: 4px;
`
export const InfoData = styled.div`
display: flex;
justify-content: space-between;
flex-direction: row;
`
export const SpentAmount = styled.h4`
font-family: 'PFHandbook';
font-weight: 700;
font-size: 38px;
line-height: 1;
letter-spacing: -0.02em;
color: ${textColor};
margin: 0;
span{
	font-size: 30px;
}
`
export const BalanceAmount = styled.div`
display: flex;
justify-content: space-between;
flex-direction: column;

`
export const Highlight = styled.p`
padding: 0 6px;
font-size: 18px;
font-weight: 700;
color: ${textColor};
display: flex;
flex-direction: row;
margin: 0;

`
export const Currency = styled.span`
font-size: 14px;
font-weight: 500;
line-height: 1.35;
margin-right: 4px;
${({ type = '' }: { type: any }) => {
		if (type === 'large') {
			return `
			font-size: 24px;
  		`
		}

	}}
`
export const InfoText = styled.div`
font-weight: 500;
font-size: 12px;
line-height: 14px;
flex-direction: row;
display: flex;
text-align: right;
color: ${greyTextColor};
&:not(:last-child){
	margin-bottom: 6px;
}
`

export const DoctorInfoContainer = styled.div`
	display:flex;
	flex-direction: row;
    justify-content: space-between;

`
export const IconContainer = styled.div`
	display:flex;
	
`
export const Label = styled.label`
display: block;
font-size: 14px;
${regularFont};
line-height: 1;
color: ${greyTextColor};
margin: 0 0 4px;
`
export const DoctorName = styled.div`
font-weight: 600;
font-size: 14px;
line-height: 17px;
margin-bottom:5px;
color: #313131;
`
export const DoctorSlot = styled.div`
font-weight: normal;
font-size: 11px;
line-height: 14px;
margin-bottom:5px;
color: #5A5A5A;
`
export const PayInfo = styled.div`
display:flex;
flex-direction:row;
align-items: center;
margin-bottom: 4px;
`
export const DoctorPay = styled.span`
font-size: 14px;
${regularFont};
line-height: 1;
text-align: right;
color: ${greyTextColor};
&.mr-4{
	margin-right: 4px;
}
`
export const DoctorPayCurrency = styled.span`
font-family: 'PFHandbook';
font-weight: 600;
font-size: 20px;
line-height: 1;
text-align: right;
color: ${textColor};
span{
	font-size: 18px;
}
`
export const IconContent = styled.div`
	display:flex;
	width:24px;
	svg {
		margin-top:4px;
		margin-right: 8px;
	}
`
export const InfoContent = styled.div`
	display:flex;
	flex-direction:column;
	justify-content: flex-start;
    align-items: flex-start;
`
export const ActionContainer = styled.div`
	display:flex;
	flex-direction:column;
	justify-content: flex-start;
    align-items: flex-end;
`
export const TransactionContainer = styled.div`
background: linear-gradient(137.28deg, #FFFFFF 3.72%, #FAFAFA 119.2%);
border: 1px solid #E7E7E7;
box-sizing: border-box;
box-shadow: 0px 5px 20px rgba(214, 212, 222, 0.24);
border-radius: 16px;
margin:16px 0px;
`
export const TransactionContent = styled.div`
	display:flex;
	flex-direction:row;
	justify-content:space-between;
	padding:16px;
`
export const TransactionLogContent = styled.div`
	display:flex;
	padding:16px;
	flex-direction: column;
`

export const Action = styled.div`
font-weight: 600;
font-size: 12px;
line-height: 15px;
color: ${primaryRed};
`
export const Anchor = styled.a`
	display: flex;
	font-weight:bold;
	align-items: center;
	justify-content: center;
	text-decoration: none;
	color: ${primaryRed};
    opacity: 1 !important;
`;
export const CostContainer = styled.div`
	display:flex;
	flex-direction:column;
	justify-content: center;
    align-items: flex-start;
`
export const TransactionCardContainer = styled.div`
	display:flex;
	flex-wrap:  wrap ;
	justify-content: flex-start;
`

export const TransactionCard = styled.div`
min-width: 72px;
height: 72px;
background: ${secondaryColorV2};
border: 1px solid rgb(188 51 58 / 25%);
box-sizing: border-box;
box-shadow: 0px 4px 10px rgba(73, 78, 157, 0.1);
border-radius: 8px;
padding: 20px 12px;
margin-top:16px;
margin-right:8px;
cursor:pointer;
color: ${primaryRed};
${({ status = '' }: { status: any }) => {
		if (status == '0') {
			return `
			border:0;
		background: #F2F2F2;
		color: #BDBDBD;
	  `
		}

	}}
`;
export const TransactionMonth = styled.div`
font-weight: bold;
font-size: 18px;
line-height: 22px;
text-align: center;

`
export const TransactionCount = styled.div`
font-weight: 500;
font-size: 12px;
line-height: 14px;
text-align: center;

`
export const InsuranceProduct = styled.div`
font-weight: 500;
font-size: 12px;
line-height: 14px;
padding: 14px 0 0 0;
`

export const BalanceDetails = styled.div`
display: flex;
flex-direction: column;
align-items: flex-end;
`

export const BalanceInfo = styled.span`
font-size: 14px;
${regularFont};
color: ${textColor};
& > span{
	font-size: 16px;
	${semiBoldFont};
	color: ${textColor};
}
`