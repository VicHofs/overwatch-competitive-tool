import { Player } from 'helpers/formats';
import { rankIcon, rankName } from 'helpers/functions';
import { iconMap } from 'helpers/objects';
import React from 'react';
import { Container } from './styles';

interface PlayerDisplayProps extends Player {
  color?: string;
  className?: string;
  animationDelay?: string;
}

const PlayerDisplay: React.FC<PlayerDisplayProps> = ({
  battleTag,
  role,
  rank,
  color,
  className,
  animationDelay,
}) => {
  return (
    <Container
      style={{
        borderLeft: `10px solid ${color}`,
        animationDelay,
      }}
      className={className}
    >
      <span>
        <img src={rankIcon(rank)} alt={rankName(rank)} />
        {battleTag.split('#')[0]}
      </span>
      <img src={iconMap[role]} alt={`${role}`} className="roleIcon" />
    </Container>
  );
};

export default PlayerDisplay;
