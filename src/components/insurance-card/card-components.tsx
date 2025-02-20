import styled from 'styled-components';
import { boldFont, mediumFont, primaryColor } from '@app/styles';



export const Container = styled.div`
width: 100%;
height: 200px;
border-radius: 20px;
display: flex;
justify-content: center;
align-items: center;
position: relative;
	
`;
export const Card = styled.div`
width: 320px;
height: 200px;
   
background: linear-gradient(289.41deg, #0F7166 20.69%, #1F8A7E 85%);
box-shadow: 0px 4px 4px rgb(0 0 0 / 25%);
border-radius: 20px;
    
`;
export const CardBg = styled.div`
width: 320px;
height: 200px;
position:absolute;  
z-index:0;  

border-radius: 20px;
    
`;
export const CardLayer = styled.div`
width: 320px;
height: 200px;
position:absolute;  
z-index:1;  

border-radius: 20px;
    
`;
export const CardContent = styled.div`
padding:20px; 
display:flex;
flex-direction: column;
justify-content: space-between;
height: calc(100% - 40px );

`;
export const InfoContainer = styled.div`
`;
export const Label = styled.div`
font-weight: 500;
font-size: 10px;
line-height: 14px;
/* identical to box height, or 140% */


/* White */

color: #FFFFFF;
`;
export const Name = styled.div`
font-style: normal;
font-weight: 600;
margin-top:14px;
font-size: 14px;
line-height: 17px;
/* identical to box height */


/* White */

color: #FFFFFF;
`;
export const Number = styled.div`
font-family: Courier Prime;
font-style: normal;
font-weight: bold;
font-size: 18px;
line-height: 20px;
letter-spacing: 0.08em;

/* White */

color: #FFFFFF;
`;

