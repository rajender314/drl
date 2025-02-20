import { boldFont, greyTextColor, whiteColor } from '@app/styles';
import styled from 'styled-components';

export const OuterContainer = styled.div`
	display: flex;
	margin: 0 auto;
	flex-direction: column;
	overflow-x: hidden;
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
export const Container = styled.div`
	background: #ffffff;
	box-shadow: 0px -4px 10px rgba(84, 84, 84, 0.15);
	border-radius: 24px 24px 0px 0px;
	margin-top: 20px;
`;
export const TabDetails = styled.div`
	position: relative;
	height: auto;
	background:#FFF;
	min-height: 300px;
	padding: 0 20px 20px;
`;
export const Label = styled.label`
	font-size: 11px;
	line-height: 14px;
	color: #58565f;
	opacity: 0.8;
	margin:15px 0 10px;
`;
export const NoDataMessage = styled.div`
	font-size:18px;
	color:${greyTextColor};
	display:flex;
	align-items:center;
	justify-content:center;
	min-height:200px;
	width:100%;	
`