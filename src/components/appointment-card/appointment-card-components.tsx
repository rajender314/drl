import styled from 'styled-components';
import { semiBoldFont, boldFont, primaryRed, mediumFont, whiteColor, textColor, greyTextColor, infoBlue, successGreen } from '@app/styles';

type Props = {
	status?: string;
	isErxGen?: boolean;
	isPrescriptionIcon?: boolean;
	isExpand?: boolean;
	type?: string;
	disabled?: boolean;
};

export const DoctorCardOuter = styled.div`
	width: 320px;//calc(100vw - 40px);
	border-radius: 12px;
	border: 1px solid #e7e7e7;
	box-sizing: border-box;
	margin: 10px 5px;
	display: inline-block;
	box-shadow: 0px 5px 20px rgba(214, 212, 222, 0.24);
	overflow: hidden;
	/* ${({ isExpand }: Props) => {
		if (isExpand) {
			return `height:270px;`;
		}
	}} */
	&:hover {
		box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19);
	}
`;
export const DoctorCard = styled.div`
	width: 100%;
	background: ${primaryRed};
	border-radius: 12px;
	padding: 16px;
	display: flex;
	align-items: center;
	color: ${whiteColor};
	position: relative;
	cursor: pointer;
	box-sizing: border-box;
	z-index: 2;
	${({ status }: Props) => {
		if (status === 'COMPLETED') {
			return `background:${whiteColor};
					color: ${textColor};
					border-bottom:1px solid #e7e7e7;`;
		}
	}}
`;
export const AppointmentType = styled.div`
	position: absolute;
	right: 16px;
	top: 16px;
	${({ status, type }: Props) => {
		if (
			status !== 'COMPLETED' &&
			(type === 'IN_PERSON' || type === 'InPerson')
		) {
			return `svg{
				path,circle{
					stroke:${whiteColor};
				}
			}`;
		} else if (status !== 'COMPLETED' && (type === 'VIDEO' || type === 'OnlineConsultation')) {
			return `svg{
				path{
					fill:${whiteColor};
				}
			}`;
		}
		else if (status === 'COMPLETED') {
			return `
				svg path, svg circle{
					stroke: ${primaryRed}
				}
			`
		}
	}}
`;
export const DoctorImg = styled.div`
	width: 100%;
	border-radius: 50%;
	max-width: 102px;
`;
export const DoctorDetails = styled.div`
	flex: 1;
	margin: 0 10px;
	height: 100%;
`;
export const DoctorName = styled.p`
	font-size: 16px;
	line-height: 19px;
	margin: 0;
	${boldFont};
`;
export const Specialization = styled.p`
	font-size: 13px;
	line-height: 15px;
	${mediumFont};
	margin: 3px 0;
`;
export const ScheduleDetails = styled.div`
	display: flex;
	align-items: flex-start;
	margin: 10px 0;
	&.m-5{
		margin :5px 0;
	}
	${({ status }: Props) => {
		if (status === 'COMPLETED') {
			return `svg{
				path{
					fill:${primaryRed};
				}
			}`;
		}
	}}
`;
export const ScheduleDate = styled.p`
	font-size: 11px;
	line-height: 15px;
	${mediumFont};
	margin: 0;
	margin-left: 10px;
	letter-spacing: -0.02em;
`;

export const Label = styled.p`
	font-size: 13px;
	line-height: 1;
	${mediumFont};
	color: ${textColor};
	margin: 0 0 4px;
`;
export const SessionContainer = styled.div`
	position: relative;
	z-index: 1;
`;
export const SessionCode = styled.p`
	margin: 0;
	font-family: 'PFHandbook';
	font-size: 28px;
	line-height: 1;
	${boldFont};
	letter-spacing: -0.02em;
	color: ${successGreen};
	&.c-gray{
		color: ${greyTextColor};
	}
	${({ status }: Props) => {
		if (
			status === 'INPROGRESS' ||
			status === 'CANCELLED' ||
			status === 'COMPLETED'
		) {
			return `color: #BDBDBD;`;
		}
	}}
`;
export const SessionInfoContainer = styled.div`
	padding: 16px 20px;
	display: flex;
	flex-direction: column;
	button {
		position: relative;
		margin: 10px 0;
	}
	&.m-0{
		margin-top : 0px;
	}
	&.p-0{
		padding: 0;
	}
`;
export const InfoText = styled.p`
	font-size: 13px;
	line-height: 16px;
	color: ${greyTextColor};
	display: flex;
	align-items: center;
	margin: 10px 0 0;
	svg {
		min-width: 20px;
		margin-right: 10px;
		/* path{
			fill: ${infoBlue};
		} */
	}
`;
export const AppointmentIdText = styled.p`
	margin: 6px 0;
	font-size: 12px;
	line-height: 15px;
	text-align: right;
	${boldFont}
	color: #5A5A5A;
`;
export const PrescriptionContainer = styled.div`
	padding: 16px 20px;
	${({ isErxGen }: Props) => {
		if (isErxGen) {
			return `background:#F2F3FF;`;
		}
	}}
`;
export const IconsContainer = styled.div`
	display: flex;
	width: 100%;
	/* justify-content: space-evenly; */
`;
export const Action = styled.div`
	min-width: 50%;
	display: flex;
	flex-direction: column;
	justify-content: center;
	align-items: center;
	color: ${primaryRed};
	font-size: 12px;
	line-height: 1;
	text-align: center;
	letter-spacing: 0.02em;
	/* margin: 0 10px; */
	cursor: pointer;
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
export const Text = styled.p`
	position: absolute;
	right: 16px;
	bottom: 16px;
	color: ${whiteColor};
	font-size: 12px;
	margin: 0;
	${({ status }: Props) => {
		if (status === 'COMPLETED') {
			return `color:${primaryRed};`;
		}
	}}
`;
export const Anchor = styled.a`
	position: absolute;
	left: 0;
	right: 0;
	top: 0;
	bottom: 0;
	display: flex;
	align-items: center;
	justify-content: center;
	text-decoration: none;
	color: inherit;
`;
