import { boldFont, primaryRed, whiteColor } from '@app/styles';
import styled from 'styled-components';


export const Container = styled.div`
	display: flex;
	background: ${primaryRed};
	margin: 0 auto 74px;
	// height: calc(100vh - 74px);
	flex-direction: column;
	overflow-x: hidden;
`;
export const BlankPdf = styled.div`
display: flex;
background: #FFF1BA;
margin: 0 auto;
height: 150px;
justify-content: center;
align-items: center;
border-radius: 16px;
`

export const Header = styled.div`
	display: flex;
	flex-direction: row;
	justify-content: space-between;
	height: 48px;
	padding: 10px 20px;
	align-items: center;
`;
export const Back = styled.div`
	display: flex;
	flex-direction: row;
`;
export const BackText = styled.div`
	font-weight: bold;
	font-size: 15px;
	padding-left: 10px;
	line-height: 18px;
	color: #5a5a5a;
`;
export const Title = styled.div`
	font-size: 24px;
	font-family: 'PFHandbook';
	letter-spacing: -0.02em;
	${boldFont};
	color: ${whiteColor};
	margin: 0;
`;
export const LabName = styled.h5`
	font-size: 13px;
	${boldFont};
	padding: 10px 0;
	margin: 0 20px;
	border-bottom: 1px dashed ${whiteColor};
	display: flex;
	align-items: center;
	color: ${whiteColor};
	svg {
		margin-right: 15px;
		rect {
			fill: #5a5a5a;
		}
	}
`;
export const ReportDetails = styled.div`
	display: inline-block;
	padding: 10px 20px;
`;
export const Detail = styled.div`
	width: 50%;
	width: 50%;
	float: left;
	padding: 10px 0;
`;
export const Label = styled.label`
	font-size: 12px;
	line-height: 15px;
	color: ${whiteColor};
`;
export const Text = styled.p`
	margin: 3px 0;
	font-size: 12px;
	line-height: 15px;
	${boldFont};
	color: ${whiteColor};
`;
export const PdfContainer = styled.div`
padding: 0 20px;
.react-pdf__Document {
	margin: 0px 0 10px;
	border: 1px solid #e7e7e7;
}
.react-pdf__Page {
	border-bottom: 1px solid #ccc;
}
canvas {
	width: 100% !important;
}
`
export const DetailsContainer = styled.div`
	background: #ffffff;
	box-shadow: 0px -4px 10px rgba(84, 84, 84, 0.15);
	border-radius: 24px 24px 0px 0px;
	padding-top: 10px;
`;
export const ButtonContainer = styled.div`
	padding:20px;
	button{
		margin:0 0 15px;
	}
`
export const ReportTitle = styled.div`
font-weight: bold;
padding:14px 0;
font-size: 12px;
line-height: 18px;
/* identical to box height, or 150% */

letter-spacing: 0.02em;
text-transform: uppercase;

color: #5A5A5A;
`

export const Row = styled.div`
	display: flex;
	justify-content: space-between;
	padding: 0 20px;
	&.align-center{
		align-items: center;
	}
	&.p-0{
		padding: 0;
	}
`