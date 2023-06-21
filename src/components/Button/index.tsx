import React from 'react';
import { Button as ButtonSC } from './styles';

interface ButtonProps
  extends Omit<React.ComponentProps<typeof ButtonSC>, 'type'> {
  type?: 'primary' | 'secondary';
  onClick?: React.MouseEventHandler<HTMLButtonElement>;
}

const Button: React.FC<ButtonProps> = ({ type, ...props }) => (
  <ButtonSC {...props} type="button" variant={type} tabIndex={0} />
);

Button.defaultProps = {
  type: 'primary',
  onClick() {
    /* do nothing */
  },
};

export default Button;
