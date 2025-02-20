import styled from 'styled-components';
type Props = {
	status?:Boolean;
};
export const Container = styled.div``;
export const PageContainer = styled.div`
	height: calc(100vh);
	
	${({ status }: Props) => {
		if (status) {
			return `display:none;`;
		}
		
	}}
	
	
`;
export const PageContent = styled.div`
	// height: 100vh;
	padding-bottom: 75px;
	overflow-x: hidden;
`;
