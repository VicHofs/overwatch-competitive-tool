import { Player } from 'helpers/formats';
import { rankIcon, rankName } from 'helpers/functions';
import React from 'react';
import { FormattedMessage } from 'react-intl';
import PlayerDisplay from './PlayerDisplay';
import { Container, Heading } from './styles';

interface TeamDisplayProps {
  members: Array<Player>;
  name?: string;
  number?: number;
  color?: string;
  className?: string;
  animationDelay?: string;
}

const TeamDisplay: React.FC<TeamDisplayProps> = ({
  name,
  color,
  members,
  number,
  className,
  animationDelay,
}) => {
  const averageRank = Math.round(
    members.reduce((accum, player) => accum + player.rank, 0) / 5,
  );
  return (
    <Container className={className} animationDelay={animationDelay}>
      <Heading color={color}>
        <h3
          style={{
            fontFamily: 'Futura',
            fontStyle: 'normal',
            fontSize: 25,
            textTransform: 'uppercase',
          }}
        >
          <FormattedMessage
            id="app.teamSorter.team"
            values={{ number: number ?? 1 }}
          />
        </h3>
        <span>
          <img src={rankIcon(averageRank)} alt={rankName(averageRank)} />
          <h3>
            {averageRank}
            <sup>SR</sup>
          </h3>
        </span>
      </Heading>
      {members.map((player) => (
        <PlayerDisplay {...player} color={color} key={player.id} />
      ))}
    </Container>
  );
};

TeamDisplay.defaultProps = {
  name: 'Unnamed Team',
  number: 0,
  color: '#b8b8b8',
  className: '',
  animationDelay: '',
};

export default TeamDisplay;
