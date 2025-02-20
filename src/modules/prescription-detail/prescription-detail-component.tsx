import { boldFont, greyTextColor, mediumFont, primaryRed, successGreen, textColor, whiteColor } from '@app/styles';
import styled from 'styled-components';

type Props = {
	isExpand?: boolean;
};
export const Container = styled.div`
	display: flex;
	/* background: linear-gradient(45deg, #fcfdff 0%, #d9e2f4 100%); */
	background-color: ${primaryRed};
	margin: 0 auto;
	min-height: calc(100vh - 110px);
	flex-direction: column;
	overflow: hidden;
	padding: 10px 0;
`;
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
export const Title = styled.h4`
	font-size: 24px;
	font-family: 'PFHandbook';
	letter-spacing: -0.02em;
	${boldFont};
	color: ${whiteColor};
	margin: 0;
`;
export const DocName = styled.div`
	font-size: 14px;
	line-height: 1;
	${mediumFont};
	padding: 10px 0px 20px;
	margin: 0 20px;
	border-bottom: 1px dashed ${whiteColor};
	display: flex;
	align-items: center;
	color: ${whiteColor};
	svg {
		margin-right: 15px;
		rect {
			fill: ${whiteColor};
		}
		path{
			fill: ${primaryRed};
		}
	}
`;
export const PatientDetails = styled.div`
	display: inline-block;
	padding: 10px 20px;
`;
export const Detail = styled.div`
	width: 50%;
	min-height: 40px;
	padding: 10px 0;
`;
export const Label = styled.label`
	font-size: 12px;
	line-height: 1;
	color: ${whiteColor};
`;
export const Text = styled.p`
	margin: 2px 0 0;
	font-size: 14px;
	line-height: 1.25;
	${boldFont};
	color: ${whiteColor};
	padding: 0 10px 0 0;
`;
export const DetailsContainer = styled.div`
	background: #ffffff;
	box-shadow: 0px -4px 10px rgba(84, 84, 84, 0.15);
	border-radius: 24px 24px 0px 0px;
	padding-top: 10px;
`;
export const TabDetails = styled.div`
	padding: 20px;
	position: relative;
`;
export const DataOuter = styled.div`
	/* height: 75px; */
	width: 100%;
	background: #f1f1f1;
	border-radius: 16px;
	transition: 0.2s ease;
	overflow: hidden;
	&:not(:last-child){
		margin-bottom: 16px;
	}
	/* ${({ isExpand }: Props) => {
		if (isExpand) {
			return `height:184px;`;
		}
	}} */
`;
export const Data = styled.div`
	width: 100%;
	/* height: 75px; */
	background: linear-gradient(139.77deg, #ffffff 3.55%, #fafafa 113.79%);
	border: 1px solid #e7e7e7;
	box-sizing: border-box;
	box-shadow: 0px 5px 20px rgba(214, 212, 222, 0.24);
	border-radius: 16px;
	/* margin: 20px 0; */
	padding: 20px;
	cursor: pointer;
	/* button {
		font-size: 12px;
		padding: 0;
		display: flex;
		align-items: center;
		justify-content: center;
		height: 34px;
	} */
`;
export const PrescriptionLabel = styled.label`
	display: block;
	font-size: 12px;
	line-height: 1;
	color: ${greyTextColor};
`;
export const PrescriptionTitle = styled.div`
	font-size: 14px;
	${boldFont};
	color: ${textColor};
	display: flex;
	align-items: center;
`;

export const PillMessage = styled.div`
	background: #fff;
    color: #000;
    text-align: end;
    font-size: 12px;
    text-align: center;
    width: 100%;
`;
export const ErrorPanel = styled.div`
background: #fff;
    color: red;
    text-align: end;
    font-size: 12px;
    text-align: center;
    
`;
export const MedicineDetails = styled.div`
	display: flex;
	flex-wrap: wrap;
	padding: 20px 0 20px 20px;
	margin: 0 -10px -16px;
	box-sizing: border-box;
`;
export const MedicineData = styled.div`
	width: calc(100% / 3 - 20px);
	margin: 0 10px 16px;
	text-transform: capitalize;
`;
export const MedicineText = styled.h4`
	font-size: 14px;
	line-height: 1;
	${mediumFont};
	color: ${textColor};
	margin: 0 0 6px;
`;
export const TestDetails = styled.div`
	display: flex;
	padding: 0 20px;
`;
export const TestData = styled.div`
	margin: 0;
`;
export const ButtonContainer = styled.div`
	padding: 20px;
	button {
		margin: 0 0 15px;
		position: relative;
		a {
			// position: absolute;
			// left: 0;
			// width: 100%;
			top: 0;
			height: 100%;
			color: inherit;
			display: flex;
			text-decoration: none;
			align-items: center;
			justify-content: center;
		}
	}
`;
export const ActiveDot = styled.span`
	width: 6px;
	height: 6px;
	border-radius: 50%;
	background: ${successGreen};
	margin-right: 6px;
`;
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
`;

export const DefaultTextHolder = styled.div`
width: 100%;
min-height: 100px;
display: flex;
align-items: center;
justify-content: center;
`

export const DefaultText = styled.span`
text-align: center;
font-size: 14px;
${mediumFont};
color: ${greyTextColor};
margin: 0;
`