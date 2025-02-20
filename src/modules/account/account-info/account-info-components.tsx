import { errorRed, mediumFont, semiBoldFont, whiteColor } from '@app/styles';
import { boldFont } from '@app/styles';
import styled from 'styled-components';

export const Title = styled.p`
	font-size: 12px;
	line-height: 18px;
	letter-spacing: 0.02em;
	text-transform: uppercase;
	color: #5a5a5a;
	${boldFont};
`;

export const PackageLabel = styled.div`
font-weight: 500;
font-size: 10px;
line-height: 14px;

color: #5A5A5A;
`;
export const PackageTitle = styled.div`
	flex: 1;
`;
export const ProfileCardsOuter = styled.div`
	margin-bottom: 40px;
	.slick-dots li {
		button {
			&:before {
				color: #ff9499;
				opacity: 0.8;
			}
		}
	}
	.slick-dots li.slick-active {
		width: 40px;
		height: 5px;
		border-radius: 50px;
		button {
			width: 40px;
			height: 5px;
			&:before {
				opacity: 1;
				width: 40px;
				height: 5px;
				content: '';
				background: linear-gradient(131.05deg, #ff9499 30.11%, #ffffff 174.71%);
				border-radius: 50px;
			}
		}
	}
`;
export const ButtonContainer = styled.div`
	button {
		margin: 15px 0;
		justify-content: end;
	}
	svg {
		margin-right: 30px;
	}
	&.start{
		button {
			justify-content: start;
		}
	}
`;
export const SavedAddressOuter = styled.div`
	position: relative;
	min-height: 220px;
`;
