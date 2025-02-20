import { boldFont, whiteColor } from '@app/styles';
import styled from 'styled-components';

export const Container = styled.div`
	padding-bottom:60px;
`;
export const Title = styled.div`
	font-size: 21px;
	line-height: 25px;
	padding: 10px 20px;
	letter-spacing: -0.02em;
	${boldFont};
	color: ${whiteColor};
	display: flex;
	justify-content: space-between;
`;
export const DetailsContainer = styled.div`
	background: #ffffff;
	box-shadow: 0px -4px 10px rgba(84, 84, 84, 0.15);
	border-radius: 24px 24px 0px 0px;
	padding-top: 10px;
`;
export const TabDetails = styled.div`
	padding: 10px 20px;
	background: #fff;
	min-height: 200px;
	position: relative;
`;
