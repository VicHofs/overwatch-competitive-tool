import React from 'react';
import { IconType } from 'react-icons/lib';
import { Container, InfoContainer } from './styles';
import { TitleDivider } from 'styles';
import { useTheme } from 'styled-components';
import { useNavigate } from 'react-router-dom';

interface ToolComponentProps {
  IconComponent: IconType;
  title: string;
  description: string;
  path: string;
}

const ToolComponent: React.FC<ToolComponentProps> = ({
  IconComponent,
  title,
  description,
  path,
}) => {
  const navigate = useNavigate();
  const theme = useTheme();
  return (
    <Container onClick={() => navigate(path)}>
      <IconComponent size={80} color={(theme as any).colors.accent} />
      <InfoContainer>
        <h2>{title}</h2>
        <TitleDivider />
        <p>{description}</p>
      </InfoContainer>
    </Container>
  );
};

export default ToolComponent;
