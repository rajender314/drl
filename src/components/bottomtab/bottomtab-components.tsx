import { boldFont, primaryRed } from '@app/styles';
import styled from 'styled-components';
import { Link, NavLink } from 'react-router-dom';

const activeClassName = 'active'
type Props = {
    isSelected?: boolean
}
export const Container = styled.div`
position: fixed;
width: 100%;
margin: 0;
background-color: rgba(255,255,255,0.6);
backdrop-filter: blur(16px);
border: 1px solid #DFDBF2;
box-sizing: border-box;
border-radius: 16px 16px 0 0;
bottom: 0px;
z-index:9;
box-shadow: 0px -4px 10px rgb(84 84 84 / 15%);
`
export const Nav = styled.div`
display: flex;
flex-grow: 1;
height: 72px;
/* border-radius: 12px; */
overflow: hidden;
`
export const NavLinkLi = styled(NavLink).attrs({
    activeClassName,
})`
display: flex;
flex-direction: column;
justify-content: center;
align-items: center;
flex-grow: 1;
text-decoration: none;
/* border-bottom: 2px solid transparent;                                        */
opacity: 0.8;
position: relative;
&::after{
    content: '';
    width: 100%;
    height: 2px;
    background-color: transparent;
    border-radius: 24px;
    position: absolute;
    bottom: 0;
    left: 0;
}
svg path{
    fill: none;
    stroke: ${primaryRed};
}
&.${activeClassName} {
    opacity: 1;
    &::after{
        background-color: ${primaryRed};
    }
    svg path {
        fill:${primaryRed};
        stroke: #fff;
    }
  }
&:focus,
&:hover {
    opacity: 1;    
}

`
export const Label = styled.span`
display: block;
font-size: 12px;
font-weight: 500;
color: ${primaryRed};
transition: 0.25s ease;
margin-top: 4px;
`