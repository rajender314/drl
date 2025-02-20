import { boldFont } from '@app/styles';
import styled from 'styled-components';

export const FilterOuter = styled.div`
	position: relative;
	padding: 8px 0;
	border-bottom: 1px solid #bdbdbd;
	display: flex;
	margin: 10px 0;
	justify-content: flex-start;
    flex-wrap: wrap;
`;
export const SelectedOption = styled.div`
	background: linear-gradient(
		141.81deg,
		rgba(238, 238, 238, 0.2) 31.15%,
		rgba(94, 99, 180, 0.2) 103.14%
	);
	border-radius: 8px;
	display: inline-flex;
	flex-direction: row;
	justify-content: center;
	align-items: center;
	padding: 4px 8px;
	min-width: 123px;
	height: 12px;
	margin: 0 5px;
	border: 1px solid #494e9d;
	font-size: 11px;
	line-height: 14px;
	color: #494e9d;
	opacity: 0.8;
	position: relative;
	margin:2px;
`;
export const Close = styled.span`
	cursor: pointer;
	position: absolute;
	right: 10px;
	display: flex;
	svg {
		height: 18px;
		width: 18px;
		path {
			fill: #333;
		}
	}
`;
export const ArrowDown = styled.div`
	position: absolute;
	right: 0;
`;
export const FiltersOuter = styled.div`
	position: fixed;
	bottom: 0;
	left: 0;
	width: 100vw;
	height: 85%;
	overflow: auto;
	background: #fff;
	border-radius: 24px 24px 0px 0px;
	z-index: 10;
`;
export const InnerContainer = styled.div`
	padding: 20px 0;
`;
export const Backdrop = styled.div`
	position: fixed;
	left: 0;
	top: 0;
	height: 100vh;
	width: 100vw;
	background: rgba(0, 0, 0, 0.7);
`;
export const GroupLabel = styled.div`
	font-size: 12px;
	line-height: 18px;
	letter-spacing: 0.02em;
	text-transform: uppercase;
	color: #5a5a5a;
	${boldFont};
	margin: 8px 20px;
`;
export const RadioGroup = styled.div`
	display: flex;
	flex-direction: column;
	.drl-radio {
		font-size: 11px;
		line-height: 14px;
		padding: 10px 20px;
		border-bottom: 1px solid #e7e7e7;
	}
`;
export const ButtonContainer = styled.div`
	padding: 20px;
`;
