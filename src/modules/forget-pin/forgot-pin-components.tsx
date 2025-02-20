import styled from 'styled-components';
import { boldFont, errorRed, primaryColor, primaryRed, whiteColor } from '@app/styles';

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
export const DetailsContainer = styled.div`
	background: #ffffff;
	box-shadow: 0px -4px 10px rgba(84, 84, 84, 0.15);
	border-radius: 24px 24px 0px 0px;
	padding: 10px 20px;
	height: calc(100vh - 130px);
	margin-top: 30px;
	position: relative;
	button {
		// position: absolute;
		// bottom: 50px;
		width: 100%;
		margin : 15px 0px;
	}
`;
export const SubTitle = styled.p`
	${boldFont};
	font-size: 12px;
	line-height: 18px;
	letter-spacing: 0.02em;
	text-transform: uppercase;
	color: #5a5a5a;
`;
export const Label = styled.p`
	${boldFont};
	font-size: 12px;
	line-height: 18px;
	letter-spacing: 0.02em;
	margin: 0;
	color: ${primaryRed};
`;
export const Input = styled.input`
	height: 38px;
	border: 0;
	width: 100%;
	border-radius: 0;
	border-bottom: 2px solid #bdbdbd;
	box-shadow: none;
	outline: none;
	transition: background-color 0.2s ease-in-out, border-color 0.2s ease-in-out;
	&:focus {
		border-color: ${primaryRed};
		background-color: ${whiteColor};
	}
`;
export const ErrorMessage = styled.p`
	color: ${errorRed};
	font-size: 14px;
	height: 18px;
`;
export const ResendText = styled.p`
	color: ${primaryColor};
	font-size: 14px;
	cursor: pointer;
	display: inline-block;
`;
export const RadioGroup = styled.div`
	display: flex;
	flex-direction: column;
	.drl-radio {
		font-size: 11px;
		line-height: 14px;
		padding: 10px 0;
	}
    label{
        font-size:14px;
        letter-spacing:0.2px;
    }
    span{
        margin-right:10px;
    }
`;