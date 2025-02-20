import { boldFont, greyTextColor, textColor } from '@app/styles';
import styled from 'styled-components';

export const ActionCards = styled.div`
	background: linear-gradient(139.77deg, #ffffff 3.55%, #fafafa 113.79%);
	border: 1px solid #e7e7e7;
	box-sizing: border-box;
	box-shadow: 0px 5px 20px rgba(214, 212, 222, 0.24);
	border-radius: 16px;
	width: 100%;
	margin: 10px 0;
	display: flex;
	padding: 20px;
	cursor:pointer;
`;
export const IconOuter = styled.div`
	width: 40px;
	height: 40px;
	display: flex;
	align-items: center;
	justify-content: center;
	border-radius: 50%;
	background: #f6f6fa;
`;
export const ActionDetails = styled.div`
	margin-left: 20px;
	flex: 1;
`;
export const ActionTitle = styled.h4`
	margin: 0;
	font-size: 14px;
	line-height: 1;
	${boldFont};
	color: ${textColor};
`;
export const ActionDescription = styled.p`
	font-size: 13px;
	line-height: 1.35;
	color: ${greyTextColor};
	margin: 8px 0 0;
`;
export const MedicineDigitization = styled.div`
font-size: 11px;
line-height: 14px;
color: #313131;
line-height: 1.8;
`;
export const ButtonHolder = styled.div`

`;

export const AdCartButtonHolder = styled.div`
display: flex;
flex-direction: column;
align-items: flex-end;

`;
export const BtnHolder = styled.div`
width: fit-content;
`;
