import { errorRed, infoBlue, successGreen, textColor, warningOrange, whiteColor } from '@app/styles';
import styled from 'styled-components';

type Props = {
	variant?: any
};
export const Container = styled.span`
	padding: 4px 10px 4px;
	width: fit-content;
	height: fit-content;
	/* background: #494e9d; */
	border-radius: 20px;
	margin: 5px 0;
	color: #fff;
	display: flex;
	${({ variant }: Props) => {
		if (
			variant === 'ACCEPTED' ||
			variant === 'COMPLETED' ||
			variant === 'CONFIRMED' ||
			variant === 'ACTIVE'
		) {
			return `background:${successGreen};`;
		} else
			if (variant === 'PRIMARY') {
				return `background:${infoBlue};`;
			} else
				if (variant === 'IN_PROGRESS') {
					return `background:${warningOrange};
                color:${textColor};`;
				} else
					if (variant === 'PENDING') {
						return `background:${infoBlue};`;
					} else
						if (
							variant === 'CANCELLED' ||
							variant === 'REJECTED' ||
							variant === 'DECLINED'
						) {
							return `background: ${errorRed};`;
						} else
							if (variant === 'DEFAULTACCEPTED') {
								return `background:${whiteColor};
			span{
				font-size: 12px;
				color: ${successGreen} !important
			}`;
							} else {
								return `background:${infoBlue};`;
							}
	}}
	&.mb-0{
		margin-bottom: 0 !important;
	}
	&.m-0{
		margin: 0;
	}
`;
export const Text = styled.span`
	font-style: normal;
	font-weight: 600;
	font-size: 10px;
	// line-height: 12px;
	display: flex;
	align-items: center;
`;
