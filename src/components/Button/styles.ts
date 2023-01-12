import styled from 'styled-components';

interface ButtonSCProps {
  variant?: 'primary' | 'secondary';
}

export const Button = styled.button<ButtonSCProps>`
  background-color: ${({ theme, variant }) =>
    variant === 'secondary' ? theme.colors.secondary : theme.colors.accent};
  font-family: Futura;
  font-size: 25px;
  text-transform: uppercase;
  color: white;
  border: 2.5px solid
    ${({ theme, variant }) =>
      variant === 'secondary' ? theme.colors.secondary : theme.colors.accent};
  border-radius: 5px;
  padding: 8px 20px;
  transition: all 100ms ease;

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

  ${({ disabled }) => (disabled ? 'opacity: 0.3; cursor: default' : '')}
`;
