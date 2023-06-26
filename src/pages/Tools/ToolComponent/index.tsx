import React from 'react';
import { IconType } from 'react-icons/lib';
import { Container, InfoContainer } from './styles';
import { TitleDivider } from 'styles';
import { useTheme } from 'styled-components';

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
  const theme = useTheme();
  return (
    <a href={path} style={{ textDecoration: 'none', color: 'unset' }}>
      <Container>
        <IconComponent size={80} color={(theme as any).colors.accent} />
        <InfoContainer>
          <h2>{title}</h2>
          <TitleDivider />
          <p>{description}</p>
        </InfoContainer>
      </Container>
    </a>
  );
};

export default ToolComponent;
