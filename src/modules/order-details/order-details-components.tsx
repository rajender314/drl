import { boldFont, mediumFont, primaryRed, textColor, whiteColor } from '@app/styles';
import styled from 'styled-components';

export const OuterContainer = styled.div`
	display: flex;
	background: linear-gradient(45deg, #fcfdff 0%, #d9e2f4 100%);
	margin: 0 auto;
	height: calc(100vh - 74px);
	flex-direction: column;
	overflow-x: hidden;
	padding: 10px 0;
`;
export const Container = styled.div`
	background: #ffffff;
	box-shadow: 0px -4px 10px rgba(84, 84, 84, 0.15);
	border-radius: 24px 24px 0px 0px;
	padding: 20px 20px 50px;
	margin-top: 20px;
	height: 100%;
`;

export const CardTitleWrapper = styled.div`
display: flex;
align-items: center;
justify-content: space-between;
margin-bottom: 16px;
`
export const CardTitle = styled.h4`
font-size: 16px;
line-height: 1;
${boldFont};
letter-spacing: -0.02em;
color: ${textColor};
margin: 0;
`;
export const Heading = styled.h4`
font-size: 16px;
${mediumFont};
line-height: 1;
text-transform: capitalize;
margin: 0 0 10px;
`

export const Title = styled.div`
	font-size: 21px;
	line-height: 25px;
	padding: 0 20px;
	letter-spacing: -0.02em;
	${boldFont};
	color: ${whiteColor};
	display: flex;
	justify-content: space-between;
`;
export const InfoText = styled.p`
	font-size: 12px;
	line-height: 15px;
	color: ${whiteColor};
	margin: 5px 20px;
`;
export const StatusText = styled.div`
	background: #ffefef;
	border-radius: 8px;
	width: 100%;
	font-size: 14px;
	height: 38px;
	line-height: 17px;
	color: #58565f;
	display: flex;
	align-items: center;
	justify-content: center;
	margin: 16px 0;
	span {
		font-size: 14px;
		line-height: 17px;
		${boldFont};
		color: ${primaryRed};
		margin-left: 5px;
	}
	&.mb-16{
		margin-bottom: 16px;
	}
`;
export const Text = styled.p`
	font-size: 14px;
	line-height: 17px;
	${boldFont};
	text-align: center;
	color: #000000;
`;
export const PayStatus = styled.div`
	font-size: 14px;
	margin-right:8px;
	line-height: 17px;
	color: #58565F;
	font-weight: 500;
`;
export const NoDataMessage = styled.div`
	width: 100%;
	min-height: 200px;
	display: flex;
	align-items: center;
	justify-content: center;
`;
export const SubTitle = styled.div`
	font-size: 16px;
	line-height: 18px;
	letter-spacing: -0.02em;
	${boldFont};
	color: #5a5a5a;
	display: flex;
	justify-content: end;
	align-items: center;
`;
export const IconOuter = styled.div`
	width: 40px;
	height: 40px;
	border-radius: 50%;
	display: flex;
	align-items: center;
	justify-content: center;
	background: #f6f6fa;
	margin-right: 10px;
`;
export const ButtonContainer = styled.div`
	padding:20px 0;
   
	button{
		margin:0 0 15px;
        position: relative;
		
	}
   
`