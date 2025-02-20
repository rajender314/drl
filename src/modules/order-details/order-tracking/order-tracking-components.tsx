import { screenSize } from '@app/styles';
import styled from 'styled-components';

export const TrackingContainer = styled.div`
	background: #ffffff;
	box-shadow: 0px -4px 10px rgba(84, 84, 84, 0.15);
	border-radius: 24px 24px 0px 0px;
	padding: 20px;
	height: 100%;
    margin-top: -40px;
`;
export const ButtonContainer = styled.div`
    padding:15px;
    display:flex;
    align-items:center;
    justify-content:space-between;
    button{
        width:48%;
        @media screen and (max-width: 575px) {
        width:100%          
}
    }
`