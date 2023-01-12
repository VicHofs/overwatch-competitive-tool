import React, { useContext, useState } from 'react';

import TeamDisplay from 'components/TeamDisplay';
import { players as mockPlayers, randomizePlayers } from 'mock';
import {
  altSortTeams,
  keygen,
  rankMask,
  sortTeams,
  TeamInfo,
} from 'helpers/functions';
import Header from 'components/Header';
import { Context } from 'components/DataWrapper';
import { FormattedMessage, useIntl } from 'react-intl';
import {
  BenchContainer,
  Input,
  InputContainer,
  PlayerList,
  RoleIcon,
  TeamContainer,
} from 'styles';
import { v5 as uuidv5 } from 'uuid';
import { randomBytes } from 'crypto';

import tankIcon from 'assets/images/icons/tank.svg';
import damageIcon from 'assets/images/icons/damage.svg';
import supportIcon from 'assets/images/icons/support.svg';
import { Player } from 'helpers/formats';
import PlayerDisplay from 'components/TeamDisplay/PlayerDisplay';

import { animateScroll, scroller } from 'react-scroll';

import 'animate.css';
import Button from 'components/Button';

const roles = [
  {
    icon: tankIcon,
    name: 'tank',
  },
  {
    icon: damageIcon,
    name: 'damage',
  },
  {
    icon: supportIcon,
    name: 'support',
  },
];

const alreadyIncludedIn = (player: Player, players: Player[]) => {
  return players.some(
    (item) => JSON.stringify(item) === JSON.stringify(player),
  );
};

const TeamSorter: React.FC = () => {
  const [players, setPlayers] = useState<Player[]>([]);

  const [newPlayer, setNewPlayer] = useState<Player>({
    id: keygen(),
    rank: 0,
    battleTag: '',
    role: '',
  });

  const [teams, setTeams] = useState<TeamInfo[]>([]);
  const [bench, setBench] = useState<Player[]>([]);

  const handleAddPlayer = (player: Player) => {
    if (
      !!player.rank &&
      !!player.battleTag &&
      !!player.role &&
      !alreadyIncludedIn(player, players)
    ) {
      setPlayers((prevState) => [...prevState, player]);
      setTimeout(
        () => animateScroll.scrollToBottom({ containerId: 'playerList' }),
        50,
      );
      setNewPlayer({
        id: keygen(),
        rank: 0,
        battleTag: '',
        role: '',
      });
    }
  };

  return (
    <>
      <Header />
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          placeItems: 'center',
          // placeContent: 'center',
          minHeight: 'calc(100vh - 105px)',
        }}
      >
        <h1
          style={{
            textTransform: 'uppercase',
            marginBottom: 40,
            textAlign: 'center',
          }}
        >
          <FormattedMessage id="app.teamSorter.title" />
        </h1>
        {/* <button
          type="button"
          onClick={() => setPlayers(randomizePlayers(mockPlayers))}
        >
          randomize players
        </button> */}
        <InputContainer>
          <Input
            type="text"
            placeholder="Rank"
            value={rankMask(String(newPlayer.rank))}
            style={{ width: 50, marginRight: 10 }}
            maxLength={4}
            onChange={(e) =>
              setNewPlayer((prevState) => {
                if (e.target.value)
                  return {
                    ...prevState,
                    rank: Number(rankMask(e.target.value)),
                  };
                return { ...prevState, rank: 0 };
              })
            }
            className={newPlayer.rank ? 'filled' : ''}
          />
          <Input
            type="text"
            placeholder="Battletag#00000"
            value={newPlayer.battleTag}
            onChange={(e) =>
              setNewPlayer((prevState) => {
                if (e.target.value)
                  return { ...prevState, battleTag: e.target.value };
                return { ...prevState, battleTag: '' };
              })
            }
            className={newPlayer.battleTag ? 'filled' : ''}
          />
          <span>
            {roles.map((item) => (
              <RoleIcon
                src={item.icon}
                alt={`select ${item.name}`}
                onClick={() =>
                  setNewPlayer((prevState) => {
                    if (prevState.role !== item.name)
                      return { ...prevState, role: item.name };
                    return { ...prevState, role: '' };
                  })
                }
                className={newPlayer.role === item.name ? 'selected' : ''}
              />
            ))}
          </span>
        </InputContainer>
        <Button
          type="primary"
          onClick={() => handleAddPlayer(newPlayer)}
          style={{ margin: '20px 0' }}
          disabled={
            !newPlayer.rank ||
            !newPlayer.battleTag ||
            !newPlayer.role ||
            alreadyIncludedIn(newPlayer, players)
          }
        >
          <FormattedMessage id="app.teamSorter.add" />
        </Button>
        <PlayerList id="playerList">
          {players.map((player) => (
            <PlayerDisplay
              {...player}
              className="animate__animated animate__fadeInUp animate__fast"
            />
          ))}
        </PlayerList>
        {players.length >= 12 && (
          <Button
            type="primary"
            onClick={() => {
              const { teams: fullTeams, bench: benchedPlayers } =
                sortTeams(players);
              setTeams(fullTeams);
              if (benchedPlayers) setBench(benchedPlayers);
              scroller.scrollTo('team-container', {
                smooth: 'easeOutCubic',
                duration: 3000,
              });
            }}
            style={{ marginTop: 20 }}
            disabled={players.length < 2}
            className="animate__animated animate__fadeIn animate__fast"
          >
            <FormattedMessage id="app.teamSorter.sort" />
          </Button>
        )}
        <TeamContainer teams={teams.length} id="team-container">
          {!!teams.length &&
            teams.map((team) => (
              <TeamDisplay
                members={team.members}
                color={team.color}
                name={`Team ${team.id}`}
                number={team.id}
                className="animate__animated animate__zoomIn animate__faster"
                animationDelay={`${0.5 * (team.id - 1)}s`}
              />
            ))}
        </TeamContainer>
        {!!bench.length && (
          <BenchContainer>
            <h3
              className="animate__animated animate__fadeIn animate__faster"
              style={{ animationDelay: `${0.5 * teams.length}s` }}
            >
              <FormattedMessage
                id="app.teamSorter.bench"
                defaultMessage="Bench"
              />
            </h3>
            {bench.map((player, index) => (
              <PlayerDisplay
                className={`animate__animated animate__${
                  index % 2 ? 'fadeInRight' : 'fadeInLeft'
                } animate__faster`}
                {...player}
                animationDelay={`${0.5 * teams.length + 0.3 * (index + 1)}s`}
              />
            ))}
          </BenchContainer>
        )}
      </div>
    </>
  );
};

export default TeamSorter;
