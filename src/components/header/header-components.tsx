import { errorRed, mediumFont, semiBoldFont, whiteColor } from '@app/styles';
import styled from 'styled-components';

export const HeaderContainer = styled.div`
	display: flex;
	flex-direction: row;
	justify-content: space-between;
	min-height: 60px;
	padding: 0 20px;
	align-items: center;
`;
export const ProfileContent = styled.div`
	display: flex;
	align-items: center;
`;
export const ProfileName = styled.h4`
	font-size: 14px;
	${semiBoldFont};
	color: ${whiteColor};
	line-height: 1;
	margin: 0 0 0 8px;
`;
export const ProfileAvatar = styled.span`
	width: 36px;
    height: 36px;
    background: ${errorRed};
    border: 2px solid ${whiteColor};
    border-radius: 50%;
    display: flex;
	align-items: center;
	justify-content: center;
	font-size: 16px;
	${mediumFont};
	color: ${whiteColor};
	line-height: 1;
`;
export const Back = styled.div`
	display: flex;
	flex-direction: row;
	cursor:pointer;
`;
export const BackText = styled.div`
	font-weight: bold;
	font-size: 15px;
	padding-left: 10px;
	line-height: 18px;
	color: ${whiteColor};
`;
export const RightArea = styled.div`
display: flex;
`;
export const LogoutArea = styled.div`
margin-left: 25px;
cursor: pointer;
`;

export const CartArea = styled.div`
	cursor:pointer;
	position: relative;
`;
export const CartMemory = styled.div`
display:none
`
export const Cartcount = styled.div`
position: absolute;
text-align: center;
border-radius: 7px;
width: 18px;
height: 18px;
background-color: #ff6161;
border: 1px solid #fff;
font-weight: 400;
color: #f0f0f0;
line-height: 16px;
font-size: 12px;
bottom: 16px;
left: 14px;
`;