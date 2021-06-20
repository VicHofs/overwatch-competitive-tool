import React, { useContext, useEffect, useState } from 'react';

import TeamDisplay from 'components/TeamDisplay';
import { players as mockPlayers } from 'mock';
import { rankMask, sortPlayers, sortTeams, TeamInfo } from 'helpers/functions';
import Header from 'components/Header';
import { Context } from 'components/DataWrapper';
import { FormattedMessage, useIntl } from 'react-intl';
import {
  Input,
  PlayerList,
  PrimaryButton,
  RoleIcon,
  SecondaryButton,
  TeamContainer,
} from 'styles';

import tankIcon from 'assets/images/icons/tank.svg';
import damageIcon from 'assets/images/icons/damage.svg';
import supportIcon from 'assets/images/icons/support.svg';
import { Player } from 'helpers/formats';
import PlayerDisplay from 'components/TeamDisplay/PlayerDisplay';

import { animateScroll } from 'react-scroll';

import 'animate.css';

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

const App: React.FC = () => {
  const { currTheme } = useContext(Context);
  const [players, setPlayers] = useState<Player[]>(mockPlayers);

  const intl = useIntl();

  const [newPlayer, setNewPlayer] = useState<Player>({
    rank: 0,
    battleTag: '',
    role: '',
  });

  const [teams, setTeams] = useState<TeamInfo[]>([]);

  const handleAddPlayer = (player: Player) => {
    if (
      !!player.rank &&
      !!player.battleTag &&
      !!player.role &&
      !alreadyIncludedIn(player, players)
    ) {
      console.log('player ', player, ' added');
      setPlayers((prevState) => [...prevState, player]);
      setTimeout(
        () => animateScroll.scrollToBottom({ containerId: 'playerList' }),
        50,
      );
      setNewPlayer({
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
          minHeight: 'calc(100vh - 80px)',
        }}
      >
        <h1 style={{ textTransform: 'uppercase', marginBottom: 40 }}>
          <FormattedMessage id="app.teamSorter.title" />
        </h1>
        <span
          style={{
            height: 20,
            display: 'flex',
            flexDirection: 'row',
            placeContent: 'center',
            placeItems: 'center',
            marginBottom: 5,
          }}
        >
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
        <SecondaryButton
          type="button"
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
        </SecondaryButton>
        <PlayerList id="playerList">
          {players.map((player) => (
            <PlayerDisplay
              {...player}
              className="animate__animated animate__fadeInUp animate__faster"
            />
          ))}
        </PlayerList>
        {players.length >= 2 && (
          <PrimaryButton
            type="button"
            onClick={() => {
              setTeams(sortTeams(players));
              animateScroll.scrollToBottom();
            }}
            style={{ marginTop: 20 }}
            disabled={players.length < 2}
            className="animate__animated animate__fadeIn animate__faster"
          >
            <FormattedMessage id="app.teamSorter.sort" />
          </PrimaryButton>
        )}
        <TeamContainer>
          {!!teams &&
            teams.map((team) => (
              <TeamDisplay
                members={team.members}
                color={team.color}
                name={`Team ${team.id}`}
                number={team.id}
                className={`animate__animated animate__zoomIn animate__faster animate__delay-${
                  team.id - 1
                }s`}
              />
            ))}
        </TeamContainer>
      </div>
    </>
  );
};

export default App;
