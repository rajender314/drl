import { errorRed, mediumFont, semiBoldFont, whiteColor } from '@app/styles'
import styled from 'styled-components'

export const LogoutTitle = styled.p`
background: #BC333A;
    padding: 0;
    margin: 0;
    text-align: center;
    padding: 20px 0;
    color: #fff;
    font-family: PF Encore Sans Pro;
    font-size: 14px;
`;
export const ProfileAvatar = styled.span`
	width: 36px;
    height: 36px;
    background: ${errorRed};
    border: 2px solid ${whiteColor};
    border-radius: 50%;
    display: flex;
	align-items: center;
	justify-content: center;
	font-size: 16px;
	${mediumFont};
	color: ${whiteColor};
	line-height: 1;
	margin-right: 4px;
`;
export const LogoutBody = styled.div`
height: 98px;
display: flex;
align-items: center;
justify-content: center;
border-radius: 4px;
    background-color: #fff;
    position: relative;
    bottom: 4px;
`
export const LogoutFooter = styled.div`
display: flex;
    justify-content: center;
    align-items: end;
    width: 100%;
& button {
	width:100px;
  height:40px;
	margin-right: 12px;
}
`