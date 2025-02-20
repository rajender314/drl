import { boldFont, titleGray, primaryColor, primaryRed, whiteColor, semiBoldFont, textColor, mediumFont, regularFont, greyTextColor, infoBlue } from '@app/styles';
import styled from 'styled-components';

export const Container = styled.div`
	display: flex;
	background: ${primaryRed};
	margin: 0 auto;
	height: calc(100vh-74px);
	flex-direction: column;
	overflow-x: hidden;
	padding-bottom:74px;
`;
export const Header = styled.div`
	display: flex;
	flex-direction: row;
	justify-content: space-between;
	height: 48px;
	padding: 10px 20px;
	align-items: center;
`;
export const TitleContainer = styled.div`
	display: flex;
	flex-direction: row;
	justify-content: space-between;
	height: 48px;
	padding: 10px 16px;
	align-items: center;
`;
export const Back = styled.div`
	display: flex;
	flex-direction: row;
`;
export const BackText = styled.div`
	font-weight: bold;
	font-size: 15px;
	padding-left: 10px;
	line-height: 18px;
	color: #5a5a5a;
`;
export const Title = styled.div`
	font-family: 'PFHandbook';
	font-size: 24px;
	line-height: 1;
	padding: 0 20px;
	letter-spacing: -0.02em;
	${boldFont};
	color: ${whiteColor};
	margin-top: 20px;
`;
export const InnerTitle = styled.div`
	font-size: 15px;
	line-height: 18px;
	${boldFont};
	padding: 10px 0px;
	display: flex;
	align-items: end;
	justify-content:space-between;
	color: #5a5a5a;
	span{
		text-align:right;
		width:calc(100% - 150px);
		font-weight:400;
		&.w-75{
		width:calc(100% - 75px);
		}
	}
	svg {
		margin-right: 15px;
		rect {
			fill: #5a5a5a;
		}
	}
	&.rev{
		font-weight :400;
		span{
			${boldFont};
		}
	}
`;
export const Address = styled.div`
font-weight: 500;
font-size: 12px;
line-height: 18px;
color: #5A5A5A;
padding:12px 0;
`
export const TimeInfo = styled.div`
background: #FFF1BA;
border-radius: 12px;
padding: 16px;
display: flex;
align-items: center;
justify-content: center;
font-size: 12px;
${mediumFont};
line-height: 1;
color: ${textColor};
margin: 16px 0;
svg{
	margin-right: 10px;
	path{
		fill: ${textColor};

	}
}
`
export const InfoDate = styled.div`

`
export const TimeSlot = styled.div`

`
export const DetailsWrapper = styled.div`
padding-top: 20px;
`
export const DetailsContainer = styled.div`
	background: ${whiteColor};
	box-shadow: 0px -4px 10px rgba(84, 84, 84, 0.15);
	border-radius: 24px 24px 0px 0px;
	padding: 20px;
	&:not(:last-child){
		padding-bottom: 60px;
	}
	&:not(:first-child){
		margin-top: -20px;
	}
`;

export const BillingDetails = styled.div`
background: linear-gradient(137.28deg, #FFFFFF 3.72%, #FAFAFA 119.2%);
border: 1px solid #E7E7E7;
box-sizing: border-box;
box-shadow: 0px 5px 20px rgba(214, 212, 222, 0.24);
border-radius: 16px;
padding:16px;
`
export const ButtonContainer = styled.div`
	padding:20px;
	button{
		margin:0 0 15px;
	}
`
export const PriceDetails = styled.div`
display: flex;
justify-content: space-between;
font-size: 12px;
line-height: 14px;
color: #313131;
padding:20px 0px;
${({ type = '' }: { type: any }) => {
		if (type == 'total') {
			return `
			font-weight: bold;
			border-bottom: 1px dashed ${primaryColor};
    `
		}
		if (type == 'price') {
			return `
			border-bottom: 1px dashed #BDBDBD;
    `
		}
	}}
`
export const Pricekey = styled.div`
display: flex;
position:relative;

`
export const Price = styled.div`
display: flex;
font-weight: 300;
font-size: 14px;
line-height: 17px;
text-align: right;
color: #000000;
`
export const AvailableBalance = styled.div`
display: flex;
justify-content:center;
align-items: center;
border-top: 1px dashed #BDBDBD;
border-bottom: 1px dashed #BDBDBD;
padding: 16px 0px;
flex-direction: column;
margin: 0 -16px;
`
export const Label = styled.label`
display: block;
font-size: 14px;
${regularFont};
line-height: 1;
color: ${textColor};
margin: 0;
white-space: nowrap;
&.alt{
	font-size: 16px;
	margin: 0 0 8px;
}
&.mb-8{
	margin-bottom: 8px;
}
&.alt-wt{
	${mediumFont};
}
`
export const PriceRemain = styled.div`
font-weight: 200;
font-size: 28px;
line-height: 34px;
text-align: center;
letter-spacing: -0.02em;
color: #313131;
`
export const InfoText = styled.div`
font-weight: 500;
font-size: 12px;
line-height: 21px;
padding:8px 0px;
color: #5A5A5A;
display: flex;
align-items: center;
svg{
	width:40px;
	margin-right:10px;
	fill: #737bec;
}	
`
export const ViewDetail = styled.p`
display: block;
position: absolute;
top: 18px;
width: 100px;
font-size: 12px;
color: #5d63b4;
cursor: pointer;
margin:0;
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

export const FlexWrapper = styled.div`
display: flex;
align-items: center;
&:not(:last-child){
	margin-bottom: 12px;
}
&.space-between{
	justify-content: space-between;
}
&.bordered{
	min-height: 50px;
	margin-bottom: 0;
	&:not(:last-child){
		border-bottom: 1px dashed #BDBDBD;
	}
}
&.align-start{
	align-items: flex-start;
}
`

export const Text = styled.p`
font-size: 14px;
${mediumFont};
color: ${textColor};
line-height: 1;
text-align: right;
margin: 0;
&.grey-text{
	color: ${greyTextColor};
}
&.left-aligned{
	text-align: left;
}
&.lh{
	line-height: 1.35;
}
&.price{
	font-family: 'PFHandbook';
	font-size: 18px;
	${semiBoldFont};
}
&.bold{
	${semiBoldFont};
}
&.alt-wt{
	${regularFont};
}
`

export const PriceWrapper = styled.div`
display: flex;
align-items: center;
padding-bottom: 14px;
border-bottom: 1px dashed ${greyTextColor};
margin-bottom: 14px;
p{
  font-size: 13px;
  margin: 0;
  color: ${textColor}
}
.item-label{
  flex: 1;
  ${mediumFont};
  &.alt{
    font-size: 14px;
    ${semiBoldFont};
  }
}
.price{
  width: 20%;
  text-align: right;
  font-size: 14px;
  ${semiBoldFont};
  span{
	  font-size: 13px;
  }
}
&.no-border{
  padding-bottom: 8px;
  border: none;
  margin: 0;
}
.regular-font{
  ${regularFont};
}
`

export const InfoWrapper = styled.div`
display: flex;
align-items: flex-start;
margin: 8px 0 12px;
svg{
  margin-right: 8px;
}
&.clickable{
  svg{
    path{
      fill: ${infoBlue};
    }
  }
}
.info{
  flex: 1;
  font-size: 14px;
  ${regularFont};
  color: ${greyTextColor};
  line-height: 1.35;
  padding-top: 3px;
  margin: 0;
}
&.m-0{
  margin: 0;
}
`