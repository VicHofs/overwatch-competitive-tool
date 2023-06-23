import React from 'react';
import { Container } from './styles';

const toolsList = [
  { name: 'Team Sorter', path: '/sorter' },
  { name: 'Stream Overlay', path: '/overlay' },
];

const Tools: React.FC = () => {
  return (
    <Container>
      {toolsList.map((tool) => (
        <a href={tool.path}>{tool.name}</a>
      ))}
    </Container>
  );
};

export default Tools;
