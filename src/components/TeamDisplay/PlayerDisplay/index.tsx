import { Player } from 'helpers/formats';
import { rankIcon, rankName } from 'helpers/functions';
import { iconMap } from 'helpers/objects';
import React from 'react';
import { Container, Overlay } from './styles';
import { FiX } from 'react-icons/fi';

interface PlayerDisplayProps extends Player {
  onClick?: () => void;
  overlay?: boolean;
  color?: string;
  className?: string;
  animationDelay?: string;
}

const PlayerDisplay: React.FC<PlayerDisplayProps> = ({
  onClick,
  overlay,
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
      {overlay && (
        <Overlay
          onClick={() => {
            if (onClick) onClick();
          }}
        >
          <FiX />
        </Overlay>
      )}
      <span>
        <img src={rankIcon(rank)} alt={rankName(rank)} />
        {battleTag.split('#')[0]}
      </span>
      <img src={iconMap[role]} alt={`${role}`} className="roleIcon" />
    </Container>
  );
};

PlayerDisplay.defaultProps = {
  onClick() {
    /* do nothing */
  },
  overlay: false,
  color: '#b8b8b800',
  className: '',
  animationDelay: '',
};

export default PlayerDisplay;
