import { boldFont, greyTextColor, mediumFont, regularFont, textColor } from '@app/styles';
import styled from 'styled-components';

export const PrescriptionsContainer = styled.div``;
export const PrescriptionsHeader = styled.div`
	display: flex;
	align-items: center;
	justify-content: space-between;
	flex: 1 1;
	padding: 0 10px;
	button {
		font-size: 12px;
	}
`;
export const PrescriptionsList = styled.div`
	padding: 0px 20px 0px;
	margin-bottom:30px;
	background:#FFF;
`;
export const PrescriptionCard = styled.div`
	width: 100%;
	/* min-height: 90px; */
	margin: 20px 0;
	background: linear-gradient(139.77deg, #ffffff 3.55%, #fafafa 113.79%);
	border: 1px solid #e7e7e7;
	box-sizing: border-box;
	box-shadow: 0px 5px 20px rgba(214, 212, 222, 0.24);
	border-radius: 16px;
	display: flex;
	padding: 20px;
	cursor: pointer;
`;
export const PrescriptionInfo = styled.div`
	margin: 0 15px;
    width: calc(100% - 30px);
`;
export const Title = styled.p`
	font-size: 14px;
	${regularFont};
	color: ${greyTextColor};
	margin: 0;
`;
export const DocName = styled.h4`
	font-size: 16px;
	${mediumFont};
	color: ${textColor};
	margin: 0 0 4px;
`;
export const ValidityContainer = styled.div`
	width: 120px; 
	display: flex;
	flex-direction: column;
	justify-content: center;
`;
export const ValidityLabel = styled.label`
	font-size: 12px;
	line-height: 15px;
	color: #828282;
`;
export const Validity = styled.p`
    margin:5px 0;
    ${boldFont};
    color:#42BB72;
    font-size: 12px;
	line-height: 15px;
`
