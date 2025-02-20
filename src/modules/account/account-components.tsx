import { boldFont, textColor, whiteColor } from '@app/styles';
import styled from 'styled-components';

export const Container = styled.div`
	padding-bottom:60px;
`;
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
`;
export const DetailsContainer = styled.div`
	background: #ffffff;
	box-shadow: 0px -4px 10px rgba(84, 84, 84, 0.15);
	border-radius: 24px 24px 0px 0px;
	margin-top: 20px;
`;
export const TabDetails = styled.div`
	padding: 20px;
	background: #fff;
	position: relative;
`;
