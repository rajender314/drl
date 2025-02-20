import { boldFont, greyTextColor, primaryColor, primaryRed, whiteColor } from '@app/styles';
import styled from 'styled-components';

export const Container = styled.div`
	display: flex;
	margin: 0 auto;
	// height: 100vh;
	flex-direction: column;
	overflow-x: hidden;
`;
export const Header = styled.div`
	display: flex;
	flex-direction: row;
	justify-content: space-between;
	height: 48px;
	padding: 10px 20px;
	align-items: center;
`;
export const ProfileContent = styled.div`
	display: flex;
	align-items: center;
`;
export const ProfileName = styled.div`
	color: #5a5a5a;
	font-weight: 600;
	font-size: 14px;
	line-height: 17px;
	margin-left: 20px;
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
export const DetailsContainer = styled.div`
	background: #ffffff;
	box-shadow: 0px -4px 10px rgba(84, 84, 84, 0.15);
	border-radius: 24px 24px 0px 0px;
	margin-top: 20px;
	min-height: calc( 100vh - 183px);
`;
export const TabDetails = styled.div`
	position: relative;
	width: 100%;
	height: auto;
	min-height: 300px;
	background:#FFF;
`;
export const FilterContainer = styled.div`
	padding: 10px 20px;
`;
export const FilterLabel = styled.label`
	font-size: 12px;
	line-height: 14px;
	${boldFont};
	color: ${primaryRed};
	margin: 0;
`;
export const NoDataMessage = styled.div`
	display: flex;
	align-items: center;
	justify-content: center;
	margin: 40px auto;
	font-size: 16px;
	color: ${greyTextColor};
	width: 100%;
	position: absolute;
	left: 0;
	height:100%;
	&.text-white{
		color: ${whiteColor}
	}
`;
