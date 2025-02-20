import { greyTextColor, infoBlue, primaryRed, regularFont, successGreen, textColor } from '@app/styles';
import styled from 'styled-components'
/**
 * Appointment type
 * 
 * Upcoming appointment
 * Past Appointment
 * In- Progress
 */

/**
 * Statuses for appointment
 * 
 * Pending Confirmation
 * Confirmed
 * Declined
 * Cancelled
 * In-Progress
 * Completed
 */
type Props = {
    disabled?: boolean
    status?: string;
};
export const Container = styled.div`

width: 100%;
margin: 0;
background: #FFFFFF;
box-shadow: 0px -4px 10px rgb(84 84 84 / 15%);
border-radius: 24px 24px 0px 0px;
bottom: 10px;
`
export const Content = styled.div`
padding:0 20px;
padding-bottom:75px;
`
export const Anchor = styled.a`
	display: flex;
	align-items: center;
	justify-content: center;
	text-decoration: none;
	color: #FFF !important;
    opacity: 1 !important;
`;
export const Header = styled.div`    
    padding: 10px 0;
    display:flex;
    flex-direction:row;
    justify-content:space-between;
    align-items: center;
    border-bottom: 1px dashed #e1e1e1;
    margin-bottom:20px;
`
export const TitleContainer = styled.div`
    display:flex;
    flex-direction:row;
    align-items: center;
    svg{
        margin-right: 8px;
    }
`
export const TitleText = styled.div`
font-style: normal;
font-weight: bold;
padding-left:4px;
font-size: 15px;
line-height: 18px;

/* Black */
color: #313131;
`
export const Status = styled.div`
    display:flex;
    flex-direction:row;
    &.withLabel{
        .label{
            color: ${greyTextColor};
            ${regularFont}
        }
        display: block;
        text-align: -webkit-center;
    }
`
export const Body = styled.div`
    display:flex;
    flex-direction:column;
`
export const Label = styled.div`
font-style: normal;
font-weight: 700;
font-size: 13px;
line-height: 14px;
color: ${textColor};
`
export const CodeText = styled.div`
font-family: 'PFHandbook';
font-style: normal;
font-weight: bold;
font-size: 28px;
line-height: 34px;
letter-spacing: -0.02em;
color: ${successGreen};
&.c-gray{
    color: ${greyTextColor};
}
${({ status }: Props) => {
        if (status === 'IN_PROGRESS' || status === 'CANCELLED' || status === 'COMPLETED') {
            return `color: #BDBDBD;;`
        }
    }}
`
export const InfoContent = styled.div`
    display:flex;
    flex-direction:row;
    margin-top:16px;
    svg{
        path{
            fill: ${infoBlue};
        }
    }
`
export const InfoText = styled.div`
font-style: normal;
font-weight: normal;
font-size: 12px;
line-height: 21px;
padding-left:8px;
color: ${greyTextColor};
`
export const InlineButtonContainer = styled.div`
display: flex;
justify-content: space-around;
.rupee-icon{
    svg{
        path:first-child{
            fill: transparent;
        }
        path:nth-child(2){
            fill: ${primaryRed};
        }
    }
}

`
export const ButtonText = styled.div`
font-size: 14px;
line-height: 17px;
color: #58565F;
margin-right:8px;
font-weight:500;

`
export const ErxIcon = styled.div`
svg path {
    fill:#BC333A;
}
`
export const ButtonContainer = styled.div`
	padding:20px 0;
   
	button{
		margin:0 0 15px;
        position: relative;
		/* a {
			position: absolute;
			left: 0;
			width: 100%;
			top: 0;
			height: 100%;
			color: inherit;
			display: flex;
			text-decoration: none;
            opacity:0;
			align-items: center;
			justify-content: center;
		} */
	}
    ${({ disabled }: Props) => {
        if (disabled) {
            return `button{
                a{
                    pointer-events:none;
                }
            }`
        }
    }}
`





