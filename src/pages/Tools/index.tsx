import React from 'react';
import { Container } from './styles';
import ToolComponent from './ToolComponent';

import { GiTeamIdea } from 'react-icons/gi';
import { CiStreamOn } from 'react-icons/ci';

const toolsList = [
  {
    icon: GiTeamIdea,
    name: 'Team Sorter',
    description:
      'Team sorter for organized tournaments. Players are added by role and rank and sorted automatically into the most balanced teams.',
    path: '/sorter',
  },
  {
    icon: CiStreamOn,
    name: 'Stream Overlay',
    description:
      "Animated stream overlay that displays a live reading of the set player's rank by role or all-around. Updates automatically every 20 minutes",
    path: '/overlay',
  },
];

const Tools: React.FC = () => {
  return (
    <Container>
      {toolsList.map((tool) => (
        <ToolComponent
          IconComponent={tool.icon}
          title={tool.name}
          description={tool.description}
          path={tool.path}
        />
      ))}
    </Container>
  );
};

export default Tools;
