import { boldFont, primaryRed, regularFont } from '@app/styles';
import styled from 'styled-components';

type Props = {
	isLogo?: boolean;
};
export const Container = styled.div`
	background: #fff;
	height: 100vh;
	width: 100%;
	display: flex;
	flex-direction: column;
	align-items: center;
`;
export const InnerContainer = styled.div`
	background: ${primaryRed};
	height: 100%;
	max-height: 90%;
    position:relative;
    overflow:hidden;
	box-shadow: 0px -4px 10px rgba(84, 84, 84, 0.15);
	border-radius: 0px 0px 24px 24px;
	width: 100%;
	display: flex;
	align-items: center;
	justify-content: center;
	flex-direction: column;
    margin-bottom:20px;
	button {
		width: 90%;
		margin: 40px;
		background: transparent;
		border: 2px solid #fff;
	}
`;
export const Text = styled.p`
	text-align: left;
	font-size: 21px;
	line-height: 24px;
	${boldFont};
	color: #FFF;
    position: absolute;
    bottom: 20px;
    left:25px;
    max-width:70%;
    p{
        font-size:12px;
        ${regularFont};
        letter-spacing:0.2px;
    }
`;
export const BgCircle = styled.div`
	width: 561px;
	height: 456px;
	border-radius: 50%;
	position: absolute;
	top: -281px;
	left: -175px;
	background: linear-gradient(
		313.27deg,
		rgba(255, 255, 255, 0.5) 17.12%,
		rgba(255, 255, 255, 0) 67.47%
	);
	opacity: 0.1;
`;
export const LogoContainer = styled.div`
	position: absolute;
	top: 90px;
	left: -15px;
	overflow: hidden;
	svg {
		width: 120px;
		height: 40px;
		path:nth-child(1),
		path:nth-child(2),
		path:nth-child(3),
		path:nth-child(4) {
			display: none;
		}
		path {
			fill: #fff;
		}
	}
	${({ isLogo }: Props) => {
		if (isLogo) {
			return `top: 50px;
                    width:50px;
                    left: 50px;
                    svg{
                        path:nth-child(1),path:nth-child(2),path:nth-child(3),path:nth-child(4){
                            display:block;
                        }
                    }`;
		}
	}}
`;
