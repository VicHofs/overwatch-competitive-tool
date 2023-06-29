import Loader from 'components/Loader';
import { LoaderContainer } from 'components/Loader/styles';
import styled from 'styled-components';

interface ButtonSCProps {
  variant?: 'primary' | 'secondary';
  loading?: boolean;
}

export const Button = styled.button<ButtonSCProps>`
  position: relative;
  background-color: ${({ theme, variant }) =>
    variant === 'secondary' ? theme.colors.secondary : theme.colors.accent};
  font-family: Futura;
  font-size: 25px;
  text-transform: uppercase;
  color: ${({ loading }) => (loading ? '#ffffff00' : 'white')};
  border: 2.5px solid
    ${({ theme, variant }) =>
      variant === 'secondary' ? theme.colors.secondary : theme.colors.accent};
  border-radius: 5px;
  padding: 8px 20px;
  transition: all 100ms ease;
  ${({ disabled, loading }) =>
    disabled || loading ? 'opacity: 0.3; cursor: default' : ''}

  &:hover,
  &:focus {
    ${({ disabled, theme, variant }) =>
      disabled
        ? ''
        : `border: 2.5px solid white;
    background-color: ${
      variant === 'secondary'
        ? theme.colors.secondarySoft
        : theme.colors.accentSoft
    };
    cursor: pointer;`}
  }

  ${LoaderContainer}, .loader {
    position: absolute;
    bottom: 12px;
    left: 0;
    right: 0;
    margin-left: auto;
    margin-right: auto;
  }
`;
