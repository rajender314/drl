import styled from 'styled-components';
import {
  whiteColor,
  primaryColor,
  screenSize,
  inputBorderColor,
  inputBackgroundColor,
  inputBackgroundHoverColor,
  successGreen,
} from '@app/styles';

type checkboxProps = {
  size?: 'default' | 'small';
};

export const Container = styled.div`
  position: relative;
  font-size: 11px;
  line-height: 14px;
  padding: 10px 20px;
  border-bottom: 1px solid #e7e7e7;
`;

export const Label = styled.label`
display: flex;
cursor: pointer;
padding: 5px 10px 5px 0;
position: relative;
font-weight: 500;
font-size: 11px;
line-height: 14px;
align-items: center;
`;

export const CheckboxContainer = styled.span`
  display: inline-block;
  position: relative;
  margin-right: 10px;
  ${({ size }: checkboxProps) => {
    if (size === 'small') {
      return `
                width: 16px;
                height: 16px;
            `;
    } else {
      return `
                width: 20px;
                height: 20px;
            `;
    }
  }}
`;

export const HiddenInput = styled.input`
  position: absolute;
  left: 0;
  top: 0;
  opacity: 0;
  width: 100%;
  height: 100%;
  margin: 0 !important;
  &:checked + span {
    background-color: ${successGreen};
    border-color: ${successGreen};
    &:before {
      opacity: 1;
    }
  }
`;

export const CheckboxComponent = styled.span`
  display: inline-block;
  width: 100%;
  height: 100%;
  background-color: ${whiteColor};
  border: 2px solid ${inputBorderColor};
  border-radius: 3px;
  margin-right: 6px;
  box-sizing: border-box;
  transition: background-color 0.2s ease-in-out, border-color 0.2s ease-in-out;
  &:before {
    position: absolute;
    opacity: 0;
    content: ' ';
    border-left: 2px solid ${whiteColor};
    border-bottom: 2px solid ${whiteColor};
    transform: rotate(-45deg);
    transition: background-color 0.2s ease-in-out, border-color 0.2s ease-in-out;
    ${({ size }: checkboxProps) => {
    if (size === 'small') {
      return `
                    width: 6px;
                    height: 3px;
                    top: 3px;
                    left: 3px;
                `;
    } else {
      return `
        width: 10px;
        height: 5px;
        top: 4px;
        left: 4px;
                `;
    }
  }}
  }
  @media (${screenSize.tablet}) {
    background-color: ${inputBackgroundColor};
    border-color: ${inputBorderColor};
    &:hover {
      background-color: ${inputBackgroundHoverColor};
    }
  }
`;

export const Text = styled.span`
  color: #313131;
  ${({ size }: checkboxProps) => {
    if (size === 'small') {
      return `font-size: 11px;`;
    } else {
      return `font-size: 11px;`;
    }
  }}
`;
