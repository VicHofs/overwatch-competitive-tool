import React, { useState, useRef, useEffect } from 'react';

import TeamDisplay from 'components/TeamDisplay';
import { players as mockPlayers, randomizePlayers } from 'mock';
import {
  altSortTeams,
  keygen,
  rankMask,
  rankToSR,
  readCSV,
  scrollToTop,
  sortTeams,
  TeamInfo,
} from 'helpers/functions';
import { FormattedMessage, useIntl } from 'react-intl';
import { Input, InputContainer, PlayerList, RoleIcon } from 'styles';
import { EmptyZone, TeamContainer, BenchContainer } from './styles';
import { v5 as uuidv5 } from 'uuid';
import { randomBytes } from 'crypto';
import ReactFileReader from 'react-file-reader';

import tankIcon from 'assets/images/icons/tank.svg';
import damageIcon from 'assets/images/icons/damage.svg';
import supportIcon from 'assets/images/icons/support.svg';
import { Elo, Player, Tier, battletagRegex } from 'helpers/formats';
import PlayerDisplay from 'components/TeamDisplay/PlayerDisplay';

import { animateScroll, scroller } from 'react-scroll';

import Sleep from 'assets/images/sleep.svg';

import 'animate.css';
import Button from 'components/Button';
import { FiUpload } from 'react-icons/fi';
import RankPicker from 'components/RankPicker';
import { useDebounce } from 'hooks/useDebounce';
import { toast } from 'react-hot-toast';
import { getPlayerData } from 'services/owapi';
import { Competitive } from 'services/owapi/types';

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

const eloAliases = {
  bronze: ['b', 'br', 'bz', 'bronze'],
  silver: ['s', 'si', 'sv', 'silver'],
  gold: ['g', 'go', 'gl', 'gold'],
  platinum: ['p', 'pl', 'pt', 'plat', 'platinum'],
  diamond: ['d', 'di', 'dm', 'dim', 'dia', 'diamond'],
  master: ['m', 'ma', 'ms', 'master', 'masters'],
  grandmaster: [
    'g',
    'gr',
    'gm',
    'grandmaster',
    'grandmasters',
    'grand master',
    'grand masters',
  ],
};

const TeamSorter: React.FC = () => {
  const intl = useIntl();
  useEffect(scrollToTop, []);
  const rankInputRef = useRef<HTMLInputElement>(null);
  const [players, setPlayers] = useState<Player[]>([]);

  const [newPlayer, setNewPlayer] = useState<Player>({
    id: keygen(),
    rank: 0,
    battleTag: '',
    role: '',
  });
  const debouncedTag = useDebounce(newPlayer.battleTag, 500);
  const debouncedRole = useDebounce(newPlayer.role, 500);

  useEffect(() => {
    if (
      !!debouncedRole &&
      !!debouncedTag &&
      debouncedTag.match(battletagRegex)
    ) {
      const toastId = toast.loading('Fetching player rank...');
      const dataPromise = toast.promise(
        getPlayerData(debouncedTag.replace('#', '-')),
        {
          loading: intl.messages['app.teamSorter.playerDataLoading'] as string,
          success: intl.messages['app.teamSorter.playerDataSuccess'] as string,
          error: (error: Error) =>
            (error.message.includes('not found')
              ? intl.messages['app.teamSorter.playerDataNotFound']
              : intl.messages['app.teamSorter.playerDataPrivate']) as string,
        },
        { id: toastId },
      );
      dataPromise
        .then(({ competitive }) => {
          const modRole =
            debouncedRole === 'damage' ? 'offense' : debouncedRole;
          const [rankElo, rankTier] =
            competitive[modRole as keyof Competitive]?.rank?.split(' ') || [];
          if (rankElo && rankTier) {
            setNewPlayer((prevState) => ({
              ...prevState,
              rank: rankToSR(
                rankElo.toLowerCase() as Elo,
                Number(rankTier) as Tier,
              ),
            }));
          } else
            toast(
              intl.messages['app.teamSorter.playerDataUnranked'] as string,
              {
                icon: '⚠️',
                id: toastId,
              },
            );
        })
        .catch((err) => {
          /* handled by toast */
        });
    }
  }, [debouncedTag, debouncedRole]);

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

  const handleReadCSV = async (files: FileList) => {
    const result = (await readCSV(files[0], {
      headers: true,
      headerAliases: {
        battleTag: [
          'btag',
          'tag',
          'battle tag',
          'gamertag',
          'gamer tag',
          'player',
          'user',
          'name',
        ],
        role: ['position', 'main role', 'class'],
        rank: ['sr', 'rating', 'skill rating', 'elo'],
      },
      masks: {
        rank: (value) => {
          if (!value.match(/\D/)) {
            if (!value.match(/\d/)) throw new Error('improper rank formatting');
            return Number(value);
          }
          const eloMatch = value.match(/\D*(?=((?<=[^ ])\d)|\b\s+\d?$|$)/);
          if (!eloMatch) throw new Error('improper rank formatting');
          const elo = Object.keys(eloAliases).includes(eloMatch[0])
            ? eloMatch[0]
            : Object.keys(eloAliases)[
                Object.keys(eloAliases).findIndex((key) =>
                  eloAliases[key as keyof typeof eloAliases].includes(
                    eloMatch[0],
                  ),
                )
              ];
          return rankToSR(
            elo as Elo,
            Math.max(1, Math.min(5, Number(value.match(/\d/)) || 3)) as Tier,
          );
        },
      },
    })) as Player[];
    result.forEach((player, index) => {
      if (!player.id)
        result[index] = {
          ...player,
          id: keygen(),
        };
    });
    if (!result[0].battleTag || !result[0].rank || !result[0].role)
      console.error('ERROR: Invalid CSV fields');
    else setPlayers((prevState) => [...prevState, ...result]);
    console.log(result);
  };

  return (
    <>
      <div
        style={{
          flexGrow: 1,
          display: 'flex',
          flexDirection: 'column',
          placeItems: 'center',
          // placeContent: 'center',
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
        <InputContainer
          onKeyDown={({ key }) => {
            if (key === 'Enter') {
              rankInputRef.current?.focus();
              handleAddPlayer(newPlayer);
            }
          }}
        >
          <RankPicker
            value={newPlayer.rank}
            style={{ marginRight: 5, marginBottom: 5 }}
            onChange={(rank) =>
              setNewPlayer((prevState) => ({ ...prevState, rank }))
            }
          />
          {/* <Input
            ref={rankInputRef}
            type="text"
            placeholder="Rank"
            value={rankMask(String(newPlayer.rank))}
            style={{ width: 50 }}
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
          /> */}
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
                key={item.name}
                tabIndex={0}
                src={item.icon}
                alt={`select ${item.name}`}
                onKeyDown={(e) => {
                  if (e.key === ' ') {
                    e.preventDefault();
                    setNewPlayer((prevState) => {
                      if (prevState.role !== item.name)
                        return { ...prevState, role: item.name };
                      return { ...prevState, role: '' };
                    });
                  }
                }}
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
          type="secondary"
          onClick={() => {
            rankInputRef.current?.focus();
            handleAddPlayer(
              newPlayer.rank ? newPlayer : { ...newPlayer, rank: 2785 },
            );
          }}
          style={{ margin: '30px 0' }}
          disabled={
            (!newPlayer.rank && newPlayer.rank !== 0) ||
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
              key={player.id}
              overlay
              onClick={() =>
                setPlayers((prevState) =>
                  prevState.filter((item) => item.id !== player.id),
                )
              }
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
              setTimeout(
                () =>
                  scroller.scrollTo('team-container', {
                    smooth: 'easeOutCubic',
                    duration: 3000,
                  }),
                50,
              );
            }}
            style={{ marginTop: 20 }}
            disabled={players.length < 2}
            className="animate__animated animate__fadeIn animate__fast"
          >
            <FormattedMessage id="app.teamSorter.sort" />
          </Button>
        )}
        {!players.length && (
          <EmptyZone>
            <img src={Sleep} alt="zzz" />
            <h1>
              <FormattedMessage
                id="app.teamSorter.greeting"
                defaultMessage="Add some players to get started!"
              />
            </h1>
            <p style={{ marginTop: '15px', marginBottom: '10px' }}>
              <FormattedMessage id="app.teamSorter.or" defaultMessage="or" />
            </p>
            <ReactFileReader fileTypes={['.csv']} handleFiles={handleReadCSV}>
              <button type="button" title=".csv">
                <FormattedMessage
                  id="app.teamSorter.readCsv"
                  defaultMessage="read from a .csv file"
                />
              </button>
            </ReactFileReader>
          </EmptyZone>
        )}
        {!!teams.length && (
          <TeamContainer teams={teams.length} id="team-container">
            {teams.map((team) => (
              <TeamDisplay
                key={team.id}
                members={team.members}
                color={team.color}
                name={`Team ${team.id}`}
                number={team.id}
                className="animate__animated animate__zoomIn animate__faster"
                animationDelay={`${0.5 * (team.id - 1)}s`}
              />
            ))}
          </TeamContainer>
        )}
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
                key={player.id}
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
