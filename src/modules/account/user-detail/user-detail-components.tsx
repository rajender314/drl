import { boldFont } from '@app/styles';
import styled from 'styled-components';
import DefaultImageUrl from '../../../assets/images/user_profile.svg';

type Props = {
	image?: string;
};

export const Container = styled.div``;
export const ProfileImage = styled.div`
	width: 100%;
	height: 204px;
	background-size: cover;
	background-position: center;
	background-repeat: no-repeat;
	background-image: url(${DefaultImageUrl});
	${({ image }: Props) => {
		if (image) {
			return `background-image:url(${image});`;
		}
	}}
`;
export const DetailsContainer = styled.div`
	padding: 40px;
	margin-top: -15px;
	background: #ffffff;
	box-shadow: 0px -4px 10px rgba(84, 84, 84, 0.15);
	border-radius: 24px 24px 0px 0px;
`;
export const Name = styled.div`
	font-size: 21px;
	line-height: 25px;
	${boldFont}
	color: #58565F;
`;
export const Label = styled.p`
	font-size: 12px;
	line-height: 15px;
    margin:25px 0 4px;
	color: #5a5a5a;
`;
export const Text = styled.p`
	font-size: 12px;
	line-height: 15px;
	${boldFont};
	margin: 0;
	color: #5a5a5a;
`;
