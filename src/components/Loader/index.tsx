import React from 'react';
import { LoaderContainer, Block } from './styles';

interface LoaderProps {
  color?: string;
  size?: number;
}

const Loader: React.FC<LoaderProps> = ({ color, size }) => (
  <LoaderContainer color={color} style={{ width: size }} className="loader">
    <Block />
    <Block />
    <Block />
  </LoaderContainer>
);

Loader.defaultProps = {
  color: '#fff',
  size: 56,
};

export default Loader;
