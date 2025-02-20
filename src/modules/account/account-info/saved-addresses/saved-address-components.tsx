import { boldFont, greyTextColor, primaryRed, regularFont, textColor, whiteColor } from '@app/styles';
import styled from 'styled-components';

type Props = {
	selected?: string;
	tab?: string;
};
export const Container = styled.div`
	background: linear-gradient(119.89deg, #ffffff 4.92%, #fafafa 157.65%);
	border: 1px solid #e7e7e7;
	box-sizing: border-box;
	box-shadow: 0px 5px 20px rgba(214, 212, 222, 0.24);
	border-radius: 16px;
	// overflow:hidden;
	margin: 25px 0;
`;
export const TabContainer = styled.div`
	height: 42px;
	display: flex;
	width: 100%;
	border-radius: 16px;
	background: #f6fdfc;
`;
export const Tab = styled.div`
	display: flex;
	align-items: center;
	justify-content: center;
	box-sizing: border-box;
	width: calc(100% / 3);
	height: 42px;
	text-align: center;
	font-size: 12px;
	line-height: 21px;
	letter-spacing: -0.02em;
	color: ${primaryRed};
	${boldFont};
	svg {
		position: relative;
		top: -3px;
		margin-right: 5px;
		path {
			fill: ${primaryRed};
		}
	}
	${({ selected, tab }: Props) => {
		if (selected === 'Home') {
			if (tab === 'Home') {
				return `background:#FFF;
                        height:52px;
                        border:1px solid #e5e6fa;
                        border-bottom:0;
                        border-right:0;
                        position:relative;
                        top:-10px;
                        left:-1px;
                        border-radius: 16px 16px 0 0;
						svg{
							path{
								fill:${primaryRed};
							}
						}`;
			}
			if (tab === 'Office') {
				return `border-right:1px solid #e5e6fa;
                        border-left:1px solid #e5e6fa;
                        border-radius: 0 16px 0 16px;
                        border-bottom:1px solid #e5e6fa;`;
			}
			if (tab === 'Other') {
				return `border-bottom:1px solid #e5e6fa;`;
			}
		}
		if (selected === 'Office') {
			if (tab === 'Home') {
				return `border-radius: 0 0 16px 0;
                        border-right:1px solid #e5e6fa;
                        border-bottom:1px solid #e5e6fa;`;
			}
			if (tab === 'Office') {
				return `background:#FFF;
                        height:52px;
                        position:relative;
                        top:-10px;
                        border-top:1px solid #e5e6fa;
                        border-radius: 16px 16px 0 0;
						svg{
							path{
								fill:${primaryRed};
							}
						}`;
			}
			if (tab === 'Other') {
				return `border-radius: 0 0 0 16px;
                        border-left:1px solid #e5e6fa;
                        border-bottom:1px solid #e5e6fa;`;
			}
		}
		if (selected === 'Other') {
			if (tab === 'Other') {
				return `background:#FFF;
                        height:52px;
                        border:1px solid #e5e6fa;
                        border-bottom:0;
                        border-left:0;
                        position:relative;
                        top:-10px;
                        right:-1px;
                        border-radius: 16px 16px 0 0;
						svg{
							path{
								fill:${primaryRed};
							}
						}`;
			}
			if (tab === 'Office') {
				return `border-right:1px solid #e5e6fa;
                        border-left:1px solid #e5e6fa;
                        border-radius: 16px 0  16px 0 ;
                        border-bottom:1px solid #e5e6fa;`;
			}
			if (tab === 'Home') {
				return `border-bottom:1px solid #e5e6fa;`;
			}
		}
	}}
`;
export const TabDetails = styled.div`
	border-radius: 0 0 16px 16px;
	border-right: 1px solid #e5e6fa;
	min-height: 150px;
	width: 100%;
	background: #fff;
	button {
		margin: 20px;
		width: calc(100% - 40px);
	}
`;
export const AddressContainer = styled.div`
	margin: 15px 20px;
	padding: 15px 0;
	display: flex;
	justify-content: space-between;
	border-bottom: 2px dotted #e5e6fa;
`;
export const AddressData = styled.div`
	width: calc(100% - 70px);
`;
export const Name = styled.p`
	font-size: 16px;
	line-height: 1;
	${boldFont};
	margin: 0 0 8px;
	color: ${textColor};
`;
export const AddressText = styled.p`
	font-size: 14px;
	${regularFont};
	line-height: 1.5;
	margin: 0;
	color: ${greyTextColor};
`;
export const EllipsisContainer = styled.div`
	background: ${whiteColor};
	border: 1px solid ${primaryRed};
	box-sizing: border-box;
	box-shadow: 0px 4px 10px rgba(73, 78, 157, 0.1);
	border-radius: 8px;
	height: 40px;
	width: 40px;
	display: flex;
	align-items: center;
	justify-content: center;
	position: relative;
	outline: none;
	svg {
		pointer-events: none;
	}
`;
export const DropDown = styled.div`
	width: 120px;
	position: absolute;
	right: 0;
	top: 42px;
	background: #fff;
	min-height: 50px;
	border: 1px solid #eaeaea;
	box-shadow: 0px 5px 20px rgb(214 212 222 / 24%);
	border-radius: 8px;
	overflow: hidden;
	div:last-child {
		border: 0;
	}
`;
export const Option = styled.div`
	display: flex;
	align-items: center;
	padding: 0 8px;
	height: 40px;
	border-bottom: 1px solid #eaeaea;
	font-size: 14px;
	line-height: 18px;
	${boldFont};
	color: #333333;
	svg{
		margin-right:8px;
		width:16px;
		height:16px;
	}
`;
