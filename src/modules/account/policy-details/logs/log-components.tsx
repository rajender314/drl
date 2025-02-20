import { boldFont, primaryColor, primaryRed, whiteColor } from '@app/styles';
import styled from 'styled-components';

export const CoverageContainer = styled.div``;

export const Title = styled.div`
font-style: normal;
font-weight: bold;
font-size: 21px;
padding:20px;
line-height: 25px;
letter-spacing: -0.02em;
color:${whiteColor};
`;
export const InfoCard = styled.div`
margin: 0;
bottom:0;
background: #FFFFFF;
box-shadow: 0px -4px 10px rgb(84 84 84 / 15%);
border-radius: 24px 24px 0px 0px;
margin-bottom: -20px;
padding-bottom: 20px;
`
export const InfoContainer = styled.div`
	padding:20px;
	display: flex;
    flex-direction: column
`
export const LogCardContainer = styled.div`
background: linear-gradient(137.28deg, #FFFFFF 3.72%, #FAFAFA 119.2%);
border: 1px solid #E7E7E7;
box-sizing: border-box;
box-shadow: 0px 5px 20px rgba(214, 212, 222, 0.24);
border-radius: 16px;
margin-bottom:15px; 
`;
export const LogCardContent = styled.div`
padding:20px;
button{
    margin:15px 0;
}
`;
export const DoctorCardContainer = styled.div`

height: 150px;
background:${primaryRed};
border-radius: 12px;
margin-bottom:20px;
`;

export const DoctorCardContent = styled.div`
padding: 20px;
display: flex;
flex-direction: row;
justify-content: space-between;

`;
export const DoctorImageContainer = styled.div`
width: 100px;
margin-right: 8px;
`;
export const DoctorInfoContainer = styled.div`

`;
export const DoctorInfoLabel = styled.div`
font-weight: normal;
font-size: 12px;
line-height: 15px;
/* identical to box height */


color: #FFFFFF;
`;
export const DoctorInfoName = styled.div`
font-weight: bold;
font-size: 16px;
line-height: 19px;

color: #FFFFFF;
margin-bottom:12px;
`;
export const DoctorInfoContact = styled.div`
font-weight: 600;
font-size: 14px;
line-height: 17px;
/* identical to box height */


/* White */

color: #FFFFFF;

`;

export const LogCardTitle = styled.div`
font-weight: bold;
font-size: 15px;
line-height: 18px;
/* identical to box height, or 120% */


color: #333333;
`;


