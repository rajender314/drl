
import { boldFont, titleGray, primaryColor, whiteColor } from '@app/styles';
import styled from 'styled-components';

export const Container = styled.div`
`;
export const PriceDetails = styled.div`
display: flex;
justify-content: space-between;
font-size: 12px;
line-height: 14px;
color: #313131;
padding:15px 0px;
${({ type = '' }: { type: any }) => {
		if (type == 'total') {
			return `
			font-weight: bold;
			border-bottom: 1px dashed ${primaryColor};
    `
		}
		if (type == 'price') {
			return `
			border-bottom: 1px dashed #BDBDBD;
    `
		}
	}}
`
export const Pricekey = styled.div`
display: flex;

`
export const Price = styled.div`
display: flex;
font-weight: 300;
font-size: 14px;
line-height: 17px;
text-align: right;
color: #000000;
`
export const NoDataMessage = styled.div`
	display: flex;
	align-items: center;
	justify-content: center;
	margin: 40px auto;
	font-size: 16px;
	color: ${whiteColor};
	width: 100%;
`;