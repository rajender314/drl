import { boldFont, mediumFont, primaryColor, primaryPeach, primaryRed, whiteColor } from '@app/styles';
import styled from 'styled-components';
import DefaultImageUrl from '../../../../assets/images/user_profile.svg';

type Props = {
	image?: string;
};
export const Card = styled.div`
	background: ${primaryRed};
	box-shadow: 0px 5px 20px rgba(255, 148, 153, 0.24);
	border-radius: 16px;
	/* max-width: 80%;
	margin-right: 30px; */
	display: flex;
	padding: 20px 15px;
`;
export const ProfileIcon = styled.div`
	width: 60px;
	height: 60px;
	border-radius: 50%;
	background-size: cover;
	background-position: center;
	background-repeat: no-repeat;
	cursor: pointer;
	border: 2px solid #fff;
	background-image: url(${DefaultImageUrl});
	margin-right: 15px;
	display: flex;
    justify-content: center;
    align-items: center;
    color: ${whiteColor};
     ${boldFont};
	${({ image }: Props) => {
		if (image) {
			return `background-image:url(${image});`;
		}
	}}
`;
export const UserInfo = styled.div`
	flex: 1;
`;

export const Title = styled.div`
	font-size: 16px;
	line-height: 1;
	letter-spacing: -0.02em;
	${boldFont};
	color: ${whiteColor};
	margin: 0 0 8px;
`;
export const Text = styled.p`
	font-size: 13px;
	line-height: 1;
	letter-spacing: -0.02em;
	margin: 0;
	color: ${whiteColor};
	&:not(:last-child){
		margin-bottom: 6px;
	}
`;
export const Pill = styled.span`
	display: inline-block;
	min-height: 20px;
	line-height: 20px;
	padding: 0 16px;
	background-color: ${whiteColor};
	border-radius: 12px;
	font-size: 12px;
	${mediumFont};
	text-transform: capitalize;
`;
export const StatusText = styled.span`
	height: 32px;
    border:1px solid ${whiteColor};
	display: flex;
	flex-direction: row;
	justify-content: center;
	align-items: center;
	font-size: 12px;
	line-height: 1;
	${boldFont};
	letter-spacing: -0.02em;
	color: ${whiteColor};
	border-radius: 6px;
	margin-top: 10px;
`;
