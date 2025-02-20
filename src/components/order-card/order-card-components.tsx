import styled from 'styled-components';
import PlaceholderImage from '@app/assets/images/placeholder_order.png';
import { boldFont, greyTextColor, mediumFont, primaryColor, primaryRed, successGreen, textColor } from '@app/styles';

type Props = {
	isExpand?: boolean;
	isPrescriptionIcon?: boolean;
	disabled?: boolean;
};
export const CardContainer = styled.div`
	width: 100%;
	// min-height: 305px;
	background: linear-gradient(139.77deg, #ffffff 3.55%, #fafafa 113.79%);
	border: 1px solid #e7e7e7;
	box-sizing: border-box;
	box-shadow: 0px 5px 20px rgba(214, 212, 222, 0.24);
	border-radius: 16px;
	overflow: hidden;
	margin-bottom: 16px;
	${({ isExpand }: Props) => {
		if (isExpand) {
			return `//min-height:385px;`;
		}
	}}
`;
export const Image = styled.div`
	width: 100%;
	height: 90px;
	background-image: url(${PlaceholderImage});
	background-repeat: no-repeat;
	background-position: center;
	background-size: cover;
`;
export const OrderInfoContainer = styled.div`
	display: flex;
	flex-direction: column;
	padding: 20px;
	border-radius: 0px 0px 16px 16px;
`;
export const OrderDetailsWrapper = styled.div`
display: flex;
&:not(:last-child){
	margin-bottom: 8px;
}
svg{
	width: 24px;
	height: 24px;
}
`
export const Details = styled.div`
flex: 1;
margin-left: 10px;
`
export const Title = styled.p`
	font-family: 'PFHandbook';
	font-size: 20px;
	line-height: 1;
	${boldFont};
	margin: 0 0 8px;
	color: ${textColor};
	&.mb-15{
		margin : 0 0 15px;
	}
`;
export const Text = styled.p`
	font-size: 14px;
	line-height: 1.5;
	${mediumFont};
	margin: 0;
	color: ${textColor};
	&.bold{
		${boldFont};
	}
`;
export const Label = styled.p`
	font-size: 10px;
	line-height: 14px;
	margin: 25px 0 0px;
	color: ${greyTextColor};
	&.a-code{
		font-weight: 700;
		font-size: 14px;		
	}
`;
export const SessionCode = styled.p`
	font-size: 28px;
	line-height: 1;
	${boldFont};
	letter-spacing: -0.02em;
	color: ${successGreen};
	margin: 5px 0;
	&.c-gray{
		color:${greyTextColor}
	}
`;
export const InfoText = styled.p`
	font-size: 14px;
	line-height: 1.35;
	color: ${textColor};
	display: flex;
	align-items: center;
	margin: 10px 0 0;
	svg {
		min-width: 20px;
		height: 20px;
		margin-right: 10px;
		path {
			// fill: ${primaryColor};
		}
	}
	&.address{
		color: ${greyTextColor};
	}
`;
export const PrescriptionContainer = styled.div`
	padding: 8px 20px;
	background: #f2f3ff;
	height: 80px;
	display: flex;
	align-items: center;
`;
export const IconsContainer = styled.div`
	width: 100%;
	display: flex;
	align-items: center;
`;
export const Action = styled.div`
	min-width: 50%;
	flex-grow: 1;
	display: flex;
	flex-direction: column;
	justify-content: center;
	align-items: center;
	color: ${primaryRed};
	font-size: 12px;
	line-height: 1;
	text-align: center;
	letter-spacing: 0.02em;
	margin: 0;
	${({ isPrescriptionIcon, disabled }: Props) => {
		if (isPrescriptionIcon && disabled) {
			return `color:${greyTextColor};
			opacity:0.7;
			pointer-events:none;
			svg{
				path{
					fill:${greyTextColor};
				}
			}`;
		}
		if (isPrescriptionIcon) {
			return `svg{
				path{
					fill:${primaryRed};
				}
			}`;
		}
		if (disabled) {
			return `color:${greyTextColor};
					opacity:0.7;
					pointer-events:none;
					svg{
						path:nth-child(1){
							fill:${greyTextColor};
						}
					}`;
		}
	}}
	&:not(:last-child){
		border-right: 1px dashed ${primaryRed};
	}
	p{
		margin: 8px 0 0;
	}
`;
