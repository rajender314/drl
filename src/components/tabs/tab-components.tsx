import { boldFont, extraBoldFont, greyTextColor, secondaryYellow, successGreen, textColor } from '@app/styles';
import styled from 'styled-components';

type Props = {
    isSelected?: boolean,
    type?: 'primary' | 'secondary' | 'custom-yellow'
}
export const TabContainer = styled.div`
    width:100%;
    border-bottom:1px solid #BDBDBD;
    display:inline-flex;
`
export const Tab = styled.div`
    padding: 20px 8px;
    /* border-bottom: 3px solid #FFF; */
    margin:0 15px;
    cursor:pointer;
    font-size:12px;
    ${extraBoldFont};
    display: flex;
    color: ${greyTextColor};
    align-items: center;
    justify-content: center;
    position: relative;
    &::after{
        content: '';
        width: 100%;
        height: 4px;
        border-top-left-radius: 6px;
        border-top-right-radius: 6px;
        position: absolute;
        bottom: -1px;
        left: 0;
    }
    ${({ isSelected, type }: Props) => {
        if (isSelected) {
            if (type == 'secondary') {
                return `
                color: ${textColor};
                ${boldFont};
                &::after{
                    background-color: ${successGreen};
                }`
            } else if (type == 'custom-yellow') {
                return `
                color: ${textColor};
                ${boldFont};
                &::after{
                    background-color: #FFC06C;
                }`
            } else {
                return `
                color:${textColor};
                ${boldFont};
                &::after{
                    background-color: ${secondaryYellow};
                }`
            }
        }
    }}
`