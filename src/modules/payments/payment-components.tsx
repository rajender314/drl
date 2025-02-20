import { primaryBackground, primaryColor, primaryRed, screenSize } from '@app/styles';
import styled from 'styled-components';

export const Container = styled.div`
    display:flex;
    justify-content:space-around;
    flex-direction:column;
    align-items:center;
    width:100%;
    height:calc(100vh - 75px);
    background:${primaryRed};
`
export const TopSection = styled.div`
display: flex;
flex-direction: column;
align-items: center;
color: #fff;
max-width: 350px;
padding: 20px;
`
export const IconContainer = styled.div`

`
export const SuccessIcon = styled.div`
display: flex;
width: 60px;
height: 60px;
background: #fff;
border-radius: 50%;
justify-content: center;
align-items: center;
svg {
    width: 45px;
    height: 30px;
    margin-left: 16px;
    path {
        stroke:${primaryRed};
    }
}
`
export const Title = styled.div`
font-size: 28px;
font-weight: 900;
text-align: center;
margin-top: 20px;
margin-bottom: 10px;
`
export const SubTitle = styled.div`
    font-size:12px;
    font-weight: 500;
    text-align: center;
`

export const MiddleSection = styled.div`
display: flex;
flex-direction: column;
align-items: center;
background: #FFF;
max-width: 350px;
padding: 20px;
border-radius: 20px;
`
export const Label = styled.div`
font-size: 18px;
font-weight: 600;
color: #565656;
`
export const AuthCode = styled.div`
font-size: 28px;
font-weight: 900;
text-align: center;
margin-top: 20px;
margin-bottom: 10px;
color:${primaryRed};
`
export const SubText = styled.div`
font-size: 12px;
font-weight: 500;
text-align: center;
margin-top: 20px;
color:#868686;
margin-bottom: 10px;
`

export const BottomSection = styled.div`

`
