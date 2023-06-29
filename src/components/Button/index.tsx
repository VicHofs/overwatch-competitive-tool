import React from 'react';
import { Button as ButtonSC } from './styles';
import Loader from 'components/Loader';

interface ButtonProps
  extends Omit<React.ComponentProps<typeof ButtonSC>, 'type'> {
  type?: 'primary' | 'secondary';
  loading?: boolean;
  onClick?: React.MouseEventHandler<HTMLButtonElement>;
}

const Button: React.FC<ButtonProps> = ({
  type,
  onClick,
  loading,
  children,
  ...props
}) => (
  <ButtonSC
    {...props}
    onClick={(e) => {
      if (!loading && onClick) onClick(e);
    }}
    type="button"
    variant={type}
    tabIndex={0}
    loading={loading}
  >
    {loading && <Loader size={46} />}
    {children}
  </ButtonSC>
);

Button.defaultProps = {
  type: 'primary',
  loading: false,
  onClick() {
    /* do nothing */
  },
};

export default Button;
