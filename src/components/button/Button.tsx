'use client';

import { useGlobalState } from '@/context/globalProvider';
import { ReactNode } from 'react';
import styled from 'styled-components';

interface Props {
  icon?: ReactNode;
  name?: string;
  background?: string;
  padding?: string;
  borderRad?: string;
  fw?: string;
  fs?: string;
  click?: () => void;
  type?: 'submit' | 'button' | 'reset' | undefined;
  border?: string;
}

const Button = ({
  icon,
  name,
  background,
  padding,
  borderRad,
  fw,
  fs,
  click,
  type,
  border,
}: Props) => {
  const { theme } = useGlobalState();

  return (
    <ButtonStyled
      theme={theme}
      type={type}
      style={{
        backgroundColor: background,
        padding: padding || '0.5rem 1rem',
        borderRadius: borderRad || '0.5rem',
        fontWeight: fw || '500',
        fontSize: fs,
        border: border || 'none',
      }}
      onClick={click}
    >
      {icon && icon}
      {name}
    </ButtonStyled>
  );
};

const ButtonStyled = styled.button`
  position: relative;
  display: flex;
  align-items: center;
  color: ${(props) => props.theme.colorWhite};
  z-index: 5;
  cursor: pointer;

  transition: all 0.55s ease-in-out;

  i {
    margin-right: 1rem;
    color: ${(props) => props.theme.colorGrey3};
    font: 1.5rem;
    transition: all 0.55s ease-in-out;
  }

  &:hover {
    color: ${(props) => props.theme.colorGrey0};
    i {
      color: ${(props) => props.theme.colorGrey0};
    }
  }
`;

export default Button;
