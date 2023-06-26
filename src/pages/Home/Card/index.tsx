import React from 'react';
import { Container } from './styles';
import { IconType } from 'react-icons/lib';
import { useTheme } from 'styled-components';
import { TitleDivider } from 'styles';

interface CardProps {
  IconComponent: IconType;
  title: string;
  description: string;
}

const Card: React.FC<CardProps> = ({ IconComponent, title, description }) => {
  const theme = useTheme();
  return (
    <Container>
      <IconComponent color={(theme as any).colors.accent} />
      <h2>{title}</h2>
      <TitleDivider />
      <p>{description}</p>
    </Container>
  );
};

export default Card;
