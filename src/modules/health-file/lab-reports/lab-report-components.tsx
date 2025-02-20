import { boldFont, greyTextColor, mediumFont, regularFont, textColor } from '@app/styles';
import styled from 'styled-components';

export const LabReportsContainer = styled.div``;
export const LabReportsList = styled.div`
	padding: 0px 20px 0px;
	margin-bottom:30px;
`;
export const LabReportCard = styled.div`
	width: 100%;
	margin: 20px 0;
	background: linear-gradient(139.77deg, #ffffff 3.55%, #fafafa 113.79%);
	border: 1px solid #e7e7e7;
	box-sizing: border-box;
	box-shadow: 0px 5px 20px rgba(214, 212, 222, 0.24);
	border-radius: 16px;
	display: flex;
	padding: 20px;
	cursor:pointer;
`;
export const LabReportInfo = styled.div`
	margin: 0 20px;
	flex: 1;
`;
export const Title = styled.p`
	font-size: 16px;
	${mediumFont};
	color: ${textColor};
	margin: 0 0 4px;
`;
export const LabName = styled.p`
	font-size: 14px;
	${regularFont};
	color: ${greyTextColor};
	margin: 0;
`;
