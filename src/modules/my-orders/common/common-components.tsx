import { boldFont, greyTextColor, mediumFont, regularFont, successGreen, textColor } from '@app/styles';
import styled from 'styled-components';

type Props = {
	isExpand?: boolean;
};
export const OrderCardContainer = styled.div`
	width: 100%;
	background: #f1f1f1;
	border-radius: 16px;
	overflow: hidden;
	margin: 10px 0 20px;
	cursor:pointer;
	/* ${({ isExpand }: Props) => {
		if (isExpand) {
			return `
                    height:132px;
            `;
		}
	}} */
`;
export const OrderInfoCard = styled.div`
	border-radius: 16px;
	background: linear-gradient(139.77deg, #ffffff 3.55%, #fafafa 113.79%);
	border: 1px solid #e7e7e7;
	box-sizing: border-box;
	padding: 20px;
	display: flex;
	/* align-items: center; */
	justify-content: space-between;
	box-shadow: 0px 5px 20px rgba(214, 212, 222, 0.24);
`;
export const Name = styled.h4`
	font-size: 16px;
	${mediumFont};
	color: ${textColor};
	margin: 0 0 4px;
`;
export const Label = styled.label`
	font-size: 14px;
	${regularFont};
	color: ${greyTextColor};
	margin: 0;
`;
export const CardInfo = styled.div`
	width: 75%;
`;
export const OtherInfo = styled.div`
	padding: 20px;
	font-size: 12px;
	line-height: 1;
	color: rgba(49, 49, 49, 0.8);
    ${boldFont};
    display:flex;
    svg{
        margin-right:10px;
    }
`;

export const AuthenticationBlock = styled.div`
display: flex;
flex-direction: column;
p{
	font-size: 14px;
	${mediumFont};
	margin:0 0 6px;
}
`

export const SessionCode = styled.span`
	margin: 0;
	font-family: 'PFHandbook';
	font-size: 28px;
	line-height: 1;
	${boldFont};
	letter-spacing: -0.02em;
	color: ${successGreen};
	&.c-gray{
		color :${greyTextColor}
	}
`
