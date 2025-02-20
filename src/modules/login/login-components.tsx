import { boldFont, errorRed, primaryBackground, primaryColor, primaryRed, screenSize, whiteColor } from '@app/styles';
import styled from 'styled-components';

type Props = {
    showMpin?: boolean
}
export const Container = styled.div`
    display:flex;
    justify-content:center;
    align-items:center;
    width:100%;
   
`
export const InnerContainer = styled.div`
    width:100%;
    border-radius:12px;
    height:100%;
    display:flex;
    align-items:center;
    justify-content:center;
    background:#FFF;
    flex-direction:column;
    padding:0 15px;
    @media (${screenSize.tablet}){
        max-width:500px;
        max-height:450px;
        button{
            width:304px;
        }
       
    }
`
export const ErrorMessage = styled.p`
    margin:3px 0;
    color: ${errorRed};
    font-size:14px;
    width:100%;
    height:16px;
`
export const Input = styled.input`
    width:100%;
    height:44px;
    padding:0 8px;
    border:2px solid #ccc;
    background:#fafafa;
    margin:0 0 5px;
    font-size:16px;
    border-radius:6px;
    outline:none;
    &:hover,&:focus{
        background:#FFFFFF;
    }
    &:focus{
        border-color:${primaryRed};
    }
    @media (${screenSize.tablet}){
        width:284px;
       
    }
`
export const Title = styled.div`
	font-size: 21px;
	line-height: 25px;
	padding: 0 20px;
	letter-spacing: -0.02em;
	${boldFont};
	color: #5a5a5a;
	display: flex;
	justify-content: space-between;
    margin-bottom:20px;
    ${({ showMpin }: Props) => {
        if (!showMpin) {
            return `display:block;
                    text-align:center;
                    padding: 0;`
        }
    }}
    
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
		//width: 90%;
		margin : 15px 0px;
	}
`;
export const LoginInput = styled.input`
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
export const SubTitle = styled.p`
	${boldFont}
	font-size: 12px;
	line-height: 18px;
	letter-spacing: 0.02em;
	text-transform: uppercase;
	color: #5a5a5a;
    &.tit-cen{
        text-align :center;
        color: ${primaryRed};
    }
`;
export const Label = styled.p`
	${boldFont}
	font-size: 12px;
	line-height: 18px;
	letter-spacing: 0.02em;
	margin: 0;
	color: ${primaryRed};
`;
export const ForgotText = styled.p`
	color: ${primaryRed};
	font-size: 14px;
	cursor: pointer;
	display: inline-block;
`;
