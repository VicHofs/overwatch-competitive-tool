import React, { useContext, useEffect, useState } from 'react';

import TeamDisplay from 'components/TeamDisplay';
import { players as mockPlayers } from 'mock';
import { sortPlayers } from 'helpers/functions';
import Header from 'components/Header';
import { Context } from 'components/DataWrapper';
import { FormattedMessage } from 'react-intl';
import { Input, PlayerList, RoleIcon, SecondaryButton } from 'styles';

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

const App: React.FC = () => {
  const { currTheme } = useContext(Context);
  const [players, setPlayers] = useState<Player[]>([]);

  const [newPlayer, setNewPlayer] = useState<Player>({
    rank: 0,
    battleTag: '',
    role: '',
  });

  const handleAddPlayer = (player: Player) => {
    if (!!player.rank && !!player.battleTag && !!player.role) {
      console.log('player ', player, ' added');
      setPlayers((prevState) => [...prevState, player]);
      setTimeout(
        () => animateScroll.scrollToBottom({ containerId: 'playerList' }),
        50,
      );
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
            style={{ width: 50, marginRight: 10 }}
            maxLength={4}
            onChange={(e) =>
              setNewPlayer((prevState) => {
                if (e.target.value)
                  return { ...prevState, rank: Number(e.target.value) };
                return { ...prevState, rank: 0 };
              })
            }
            className={newPlayer.rank ? 'filled' : ''}
          />
          <Input
            type="text"
            placeholder="Battletag#00000"
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
        {/* <TeamDisplay members={mockPlayers} /> */}
      </div>
    </>
  );
};

export default App;
