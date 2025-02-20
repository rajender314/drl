import { boldFont, primaryColor, whiteColor } from '@app/styles';
import styled from 'styled-components';

type Props = {
	lat?: any,
	lng?: any
}
export const CloseIcn = styled.div`
display: flex;
align-items: center;
justify-content: center;
background: #fff;
position: absolute;
top: 12px;
z-index: 1;
right: 55px;
height: 37px;
width: 44px;
cursor: pointer;
`
export const Container = styled.div`
	position: fixed;
	top: 0;
	left: 0;
	height: calc(100vh - 70px);
	overflow-y: auto;
	width: 100%;
	z-index: 2;
	background: #fff;
`;
export const MapContainer = styled.div`
	width: 100%;
`;
export const DetailContainer = styled.div`
	background: #ffffff;
	box-shadow: 0px -4px 10px rgba(84, 84, 84, 0.15);
	min-height: 250px;
	border-radius: 24px 24px 0px 0px;
`;
export const SearchContainer = styled.div`
	padding: 0 20px;
	height: 80px;
	display: flex;
	align-items: center;
	svg {
		position: absolute;
	}
`;
export const CloseBttn = styled.div`
margin-top: 18px;
`;
export const Input = styled.input`
	height: 38px;
	border: 0;
	width: 100%;
	padding: 0 0 0 30px;
	border-radius: 0;
	border-bottom: 2px solid #bdbdbd;
	box-shadow: none;
	outline: none;
	transition: background-color 0.2s ease-in-out, border-color 0.2s ease-in-out;
	&:focus {
		border-color: ${primaryColor};
		background-color: ${whiteColor};
	}
`;
export const LocationDetails = styled.div`
	background: #ffffff;
	box-shadow: 0px -4px 10px rgba(84, 84, 84, 0.15);
	min-height: 250px;
	border-radius: 24px 24px 0px 0px;
	padding: 20px;
	input {
		margin: 8px 0;
		padding: 0;
	}
	button {
		margin: 20px 0;
	}
`;
export const SelectedLocation = styled.div`
	display: flex;
	justify-content: space-between;
	align-items: end;
	button {
		height: 36px;
		padding:0;
		margin:0;
	}
`;
export const SelectedLocDetail = styled.div`
	width: calc(100% - 120px);
`;
export const LocationTitle = styled.p`
	font-size: 12px;
	line-height: 18px;
	${boldFont};
	letter-spacing: 0.02em;
	text-transform: uppercase;
	color: #5a5a5a;
    margin:0 0 8px;
`;
export const LocationInfo = styled.p`
	font-size: 12px;
	line-height: 18px;
    margin:0;
	color: #5a5a5a;
`;
export const Marker = styled.div`
	${({ lat, lng }: Props) => {
		return `
		position: absolute;
		top: -24px;
		right: -14px;		
		`
	}}
`
export const ErrorMessage = styled.p`
	margin:3px 0;
	color:red;
	height:16px;
	font-size:14px;
`

export const ServerError = styled.div`
margin: 20px 0;
background: #D2D3FF;
  border-radius: 8px;
  height: 38px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 14px;
  line-height: 17px;
  text-align: right;
  color: #58565F;
  border: 1px solid #FFB4B4;
  color: #EB5757;
  background-color: #FFEFEF;
`