import bronze5Icon from 'assets/images/icons/bronze/bronze5.png';
import bronze4Icon from 'assets/images/icons/bronze/bronze4.png';
import bronze3Icon from 'assets/images/icons/bronze/bronze3.png';
import bronze2Icon from 'assets/images/icons/bronze/bronze2.png';
import bronze1Icon from 'assets/images/icons/bronze/bronze1.png';
import silver5Icon from 'assets/images/icons/silver/silver5.png';
import silver4Icon from 'assets/images/icons/silver/silver4.png';
import silver3Icon from 'assets/images/icons/silver/silver3.png';
import silver2Icon from 'assets/images/icons/silver/silver2.png';
import silver1Icon from 'assets/images/icons/silver/silver1.png';
import gold5Icon from 'assets/images/icons/gold/gold5.png';
import gold4Icon from 'assets/images/icons/gold/gold4.png';
import gold3Icon from 'assets/images/icons/gold/gold3.png';
import gold2Icon from 'assets/images/icons/gold/gold2.png';
import gold1Icon from 'assets/images/icons/gold/gold1.png';
import platinum5Icon from 'assets/images/icons/platinum/platinum5.png';
import platinum4Icon from 'assets/images/icons/platinum/platinum4.png';
import platinum3Icon from 'assets/images/icons/platinum/platinum3.png';
import platinum2Icon from 'assets/images/icons/platinum/platinum2.png';
import platinum1Icon from 'assets/images/icons/platinum/platinum1.png';
import diamond5Icon from 'assets/images/icons/diamond/diamond5.png';
import diamond4Icon from 'assets/images/icons/diamond/diamond4.png';
import diamond3Icon from 'assets/images/icons/diamond/diamond3.png';
import diamond2Icon from 'assets/images/icons/diamond/diamond2.png';
import diamond1Icon from 'assets/images/icons/diamond/diamond1.png';
import master5Icon from 'assets/images/icons/master/master5.png';
import master4Icon from 'assets/images/icons/master/master4.png';
import master3Icon from 'assets/images/icons/master/master3.png';
import master2Icon from 'assets/images/icons/master/master2.png';
import master1Icon from 'assets/images/icons/master/master1.png';
import grandmaster5Icon from 'assets/images/icons/grandmaster/grandmaster5.png';
import grandmaster4Icon from 'assets/images/icons/grandmaster/grandmaster4.png';
import grandmaster3Icon from 'assets/images/icons/grandmaster/grandmaster3.png';
import grandmaster2Icon from 'assets/images/icons/grandmaster/grandmaster2.png';
import grandmaster1Icon from 'assets/images/icons/grandmaster/grandmaster1.png';
import { Elo, Player, Tier } from './formats';
import { randomBytes } from 'crypto';
import { v5 as uuidv5 } from 'uuid';
import { elos } from './objects';
import { animateScroll } from 'react-scroll';

export interface TeamInfo {
  id: number;
  color?: string;
  members: Array<Player>;
  totalSR: number;
}

export interface SortResult {
  teams: TeamInfo[];
  bench?: Player[];
}

export const rankToSR = (elo: Elo, tier: Tier): number =>
  (elos.indexOf(elo) + 2) * 500 + 95 * (6 - tier);

export const rankIcons = {
  bronze: [
    undefined,
    bronze1Icon,
    bronze2Icon,
    bronze3Icon,
    bronze4Icon,
    bronze5Icon,
  ],
  silver: [
    undefined,
    silver1Icon,
    silver2Icon,
    silver3Icon,
    silver4Icon,
    silver5Icon,
  ],
  gold: [undefined, gold1Icon, gold2Icon, gold3Icon, gold4Icon, gold5Icon],
  platinum: [
    undefined,
    platinum1Icon,
    platinum2Icon,
    platinum3Icon,
    platinum4Icon,
    platinum5Icon,
  ],
  diamond: [
    undefined,
    diamond1Icon,
    diamond2Icon,
    diamond3Icon,
    diamond4Icon,
    diamond5Icon,
  ],
  master: [
    undefined,
    master1Icon,
    master2Icon,
    master3Icon,
    master4Icon,
    master5Icon,
  ],
  grandmaster: [
    undefined,
    grandmaster1Icon,
    grandmaster2Icon,
    grandmaster3Icon,
    grandmaster4Icon,
    grandmaster5Icon,
  ],
};

export const rankIcon = (rank: number): string | undefined => {
  if (rank < 1500)
    return rankIcons.bronze[Math.min(Math.ceil((1500 - rank) / 100), 5)];
  if (rank < 2000) return rankIcons.silver[Math.ceil((2000 - rank) / 100)];
  if (rank < 2500) return rankIcons.gold[Math.ceil((2500 - rank) / 100)];
  if (rank < 3000) return rankIcons.platinum[Math.ceil((3000 - rank) / 100)];
  if (rank < 3500) return rankIcons.diamond[Math.ceil((3500 - rank) / 100)];
  if (rank < 4000) return rankIcons.master[Math.ceil((4000 - rank) / 100)];
  return rankIcons.grandmaster[
    Math.max(Math.abs(Math.ceil((4500 - rank) / 100)), 1)
  ];
};

export const rankName = (rank: number): string => {
  if (rank < 1500)
    return `bronze ${Math.min(Math.ceil((1500 - rank) / 100), 5)}`;
  if (rank < 2000) return `silver ${Math.ceil((2000 - rank) / 100)}`;
  if (rank < 2500) return `gold ${Math.ceil((2500 - rank) / 100)}`;
  if (rank < 3000) return `platinum ${Math.ceil((3000 - rank) / 100)}`;
  if (rank < 3500) return `diamond ${Math.ceil((3500 - rank) / 100)}`;
  if (rank < 4000) return `master ${Math.ceil((4000 - rank) / 100)}`;
  return `grandmaster ${Math.max(Math.abs(Math.ceil((4500 - rank) / 100)), 1)}`;
};

export const sortPlayers = (members: Array<Player>): Array<Player> => {
  const order = ['tank', 'damage', 'support'];

  return members
    .slice()
    .sort((a, b) => order.indexOf(a.role) - order.indexOf(b.role));
};

export const rankMask = (rank: string): string => {
  if (Number(rank[0]) > 4) return '';
  if (rank === '0') return '';
  return rank.replace(/\D/, '');
};

const standardDeviation = (values: number[]): number => {
  const mean = values.reduce((acc, value) => acc + value, 0) / values.length;
  const variance = values.reduce(
    (acc, value) => acc + Math.abs(value - mean) ** 2,
  );
  return Math.sqrt(variance / values.length);
};

export const sortTeams = (players: Array<Player>): SortResult => {
  const tankPool = players
    .filter((player) => player.role === 'tank')
    .sort((a, b) => b.rank - a.rank);
  const damagePool = players
    .filter((player) => player.role === 'damage')
    .sort((a, b) => b.rank - a.rank);
  const supportPool = players
    .filter((player) => player.role === 'support')
    .sort((a, b) => b.rank - a.rank);

  const groups = Math.floor(
    Math.min(
      tankPool.length,
      Math.min(damagePool.length, supportPool.length) / 2,
    ),
  );
  const playersToAdd = groups * 5;
  const teams: Array<TeamInfo> = [];
  const bench: Array<Player> = [];

  let colors = [
    '#C4C4C4',
    '#174B97',
    '#FFA000',
    '#032340',
    '#122C42',
    '#FB7299',
    '#59CBE8',
    '#3C1053',
    '#1888C6',
    '#171C38',
    '#303D56',
    '#D22630',
    '#09226B',
    '#990034',
  ];

  let currTank = 0;
  let currDamage = 0;
  let currSupport = 0;

  for (let i = 0; i < groups; i++) {
    const colorIndex = Math.floor(Math.random() * colors.length);
    teams.push({
      id: i + 1,
      color: colors[colorIndex],
      members: [],
      totalSR: 0,
    });
    colors = colors.filter((item, index) => index !== colorIndex);
  }

  console.log('teams: ', JSON.parse(JSON.stringify(teams)));

  for (let i = 0; i < playersToAdd / 5; i++) {
    console.log('sorting tanks');
    if (i < groups) {
      teams[i].members.push(tankPool[currTank]);
      teams[i].totalSR += tankPool[currTank].rank;
    } else {
      const priorityTeam = teams
        .filter((team) => team.members.length < 1)
        .reduce((a, b) => (a.totalSR < b.totalSR ? a : b));
      const priority = teams.findIndex((team) => team.id === priorityTeam.id);
      teams[priority].members.push(tankPool[currTank]);
      teams[priority].totalSR += tankPool[currTank].rank;
    }
    currTank++;
  }
  console.log('with tanks: ', JSON.parse(JSON.stringify(teams)));

  for (let i = 0; i < playersToAdd / 2.5; i++) {
    console.log('sorting dps');
    const priorityTeam = teams
      .filter((team) => team.members.length < 3)
      .reduce((a, b) => (a.totalSR < b.totalSR ? a : b));
    const priority = teams.findIndex((team) => team.id === priorityTeam.id);
    teams[priority].members.push(damagePool[currDamage]);
    teams[priority].totalSR += damagePool[currDamage].rank;

    currDamage++;
  }
  console.log('with dps: ', JSON.parse(JSON.stringify(teams)));

  for (let i = 0; i < playersToAdd / 2.5; i++) {
    console.log('sorting supports');
    const priorityTeam = teams
      .filter((team) => team.members.length < 5)
      .reduce((a, b) => (a.totalSR < b.totalSR ? a : b));
    const priority = teams.findIndex((team) => team.id === priorityTeam.id);
    teams[priority].members.push(supportPool[currSupport]);
    teams[priority].totalSR += supportPool[currSupport].rank;
    currSupport++;
  }

  while (currTank < tankPool.length) {
    bench.push(tankPool[currTank]);
    currTank++;
  }

  while (currDamage < damagePool.length) {
    bench.push(damagePool[currDamage]);
    currDamage++;
  }

  while (currSupport < supportPool.length) {
    bench.push(supportPool[currSupport]);
    currSupport++;
  }

  console.log(
    `σ = ${standardDeviation(teams.map((team) => team.totalSR / 5))}`,
  );
  return { teams, bench };
};

export const altSortTeams = (players: Array<Player>): SortResult => {
  let tankPool = players
    .filter((player) => player.role === 'tank')
    .sort((a, b) => b.rank - a.rank);
  let damagePool = players
    .filter((player) => player.role === 'damage')
    .sort((a, b) => b.rank - a.rank);
  let supportPool = players
    .filter((player) => player.role === 'support')
    .sort((a, b) => b.rank - a.rank);

  const groups = Math.floor(
    Math.min(
      tankPool.length,
      Math.min(damagePool.length, supportPool.length) / 2,
    ),
  );
  const playersToAdd = groups * 5;
  const teams: Array<TeamInfo> = [];
  const bench: Array<Player> = [];

  let colors = [
    '#C4C4C4',
    '#174B97',
    '#FFA000',
    '#032340',
    '#122C42',
    '#FB7299',
    '#59CBE8',
    '#3C1053',
    '#1888C6',
    '#171C38',
    '#303D56',
    '#D22630',
    '#09226B',
    '#990034',
  ];

  for (let i = 0; i < groups; i++) {
    const colorIndex = Math.floor(Math.random() * colors.length);
    teams.push({
      id: i + 1,
      color: colors[colorIndex],
      members: [],
      totalSR: 0,
    });
    colors = colors.filter((item, index) => index !== colorIndex);
  }

  for (let i = 0; i < playersToAdd / 5; i++) {
    if (i < groups) {
      teams[i].members.push(tankPool[0]);
      teams[i].totalSR += tankPool[0].rank;
      tankPool = tankPool.slice(1);
    } else {
      const highestSR = teams.reduce((a, b) =>
        a.totalSR < b.totalSR ? b : a,
      ).totalSR;
      const priorityTeam = teams
        .filter((team) => team.members.length < 1)
        .reduce((a, b) => (a.totalSR < b.totalSR ? a : b));
      const priority = teams.findIndex((team) => team.id === priorityTeam.id);
      const delta = highestSR - priorityTeam.totalSR;
      let target = tankPool[0];
      if (i !== groups)
        for (let k = 1; k < tankPool.length; k++) {
          if (
            Math.abs(delta - tankPool[k].rank) < Math.abs(delta - target.rank)
          )
            target = tankPool[k];
          else break;
        }
      teams[priority].members.push(target);
      teams[priority].totalSR += target.rank;
      tankPool = tankPool.filter(
        (player) => player.battleTag !== target.battleTag,
      );
    }
  }

  for (let i = 0; i < playersToAdd / 2.5; i++) {
    const highestSR = teams.reduce((a, b) =>
      a.totalSR < b.totalSR ? b : a,
    ).totalSR;
    const priorityTeam = teams
      .filter((team) => team.members.length < 3)
      .reduce((a, b) => (a.totalSR < b.totalSR ? a : b));
    const priority = teams.findIndex((team) => team.id === priorityTeam.id);
    const delta = highestSR - priorityTeam.totalSR;
    let target = damagePool[0];
    if (i !== groups)
      for (let k = 1; k < damagePool.length; k++) {
        if (
          Math.abs(delta - damagePool[k].rank) < Math.abs(delta - target.rank)
        )
          target = damagePool[k];
        else break;
      }
    teams[priority].members.push(target);
    teams[priority].totalSR += target.rank;
    damagePool = damagePool.filter(
      (player) => player.battleTag !== target.battleTag,
    );
  }

  for (let i = 0; i < playersToAdd / 2.5; i++) {
    const highestSR = teams.reduce((a, b) =>
      a.totalSR < b.totalSR ? b : a,
    ).totalSR;
    const priorityTeam = teams
      .filter((team) => team.members.length < 5)
      .reduce((a, b) => (a.totalSR < b.totalSR ? a : b));
    const priority = teams.findIndex((team) => team.id === priorityTeam.id);
    const delta = highestSR - priorityTeam.totalSR;
    let target = supportPool[0];
    if (i !== groups)
      for (let k = 1; k < supportPool.length; k++) {
        if (
          Math.abs(delta - supportPool[k].rank) < Math.abs(delta - target.rank)
        )
          target = supportPool[k];
        else break;
      }
    teams[priority].members.push(target);
    teams[priority].totalSR += target.rank;
    supportPool = supportPool.filter(
      (player) => player.battleTag !== target.battleTag,
    );
  }

  tankPool.forEach((player) => bench.push(player));
  damagePool.forEach((player) => bench.push(player));
  supportPool.forEach((player) => bench.push(player));

  console.log(
    `σ = ${standardDeviation(teams.map((team) => team.totalSR / 6))}`,
  );
  return { teams, bench };
};

const countRole = (players: Array<Player>, role: string): number => {
  return players.reduce(
    (acc, player) => (player.role === role ? acc + 1 : acc),
    0,
  );
};

const isIdealScenario = (players: Array<Player>): boolean => {
  const damagePlayers = countRole(players, 'damage');
  const tankPlayers = countRole(players, 'tank');
  const supportPlayers = countRole(players, 'support');

  return damagePlayers === supportPlayers && tankPlayers === supportPlayers - 1;
};

export const smartSort = (players: Array<Player>): SortResult => {
  if (isIdealScenario(players)) return altSortTeams(players);
  return sortTeams(players);
};

const dict: Record<string, string[]> = {
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
};

export const keygen: () => string = () =>
  uuidv5(randomBytes(16), `${process.env.REACT_APP_CRYPTO_NAMESPACE}`);

interface readCSVConfig {
  headers: boolean;
  headerAliases?: Record<string, string[]>;
  masks?: Record<string, (value: string) => unknown>;
}

export const readCSV = async (
  csv: File,
  config: readCSVConfig = { headers: true, headerAliases: dict },
) => {
  try {
    const validKeys = config.headerAliases
      ? Object.keys(config.headerAliases)
      : [];
    const raw = (await csv.text()).replace(/"|'/, '');
    const [columns, ...rows] = raw.split('\n').map((row) => row.split(','));
    if (config.headerAliases)
      columns.forEach((column, index) =>
        validKeys.includes(column)
          ? column
          : validKeys.some((key) => {
              if (
                (config.headerAliases as Record<string, string[]>)[
                  key
                ].includes(column)
              ) {
                columns[index] = key;
                return true;
              }
              return false;
            }),
      );
    const masks = config.masks
      ? columns.map((column) => config.masks?.[column])
      : [];
    return rows.map((row) =>
      row.reduce(
        (acc, value, index) => ({
          ...acc,
          [columns[index]]: masks[index]
            ? (masks[index] as (value: string) => unknown)(value)
            : value,
        }),
        {},
      ),
    );
  } catch (error) {
    console.error(error);
    return [];
  }
};

export const scrollToTop = (): void => {
  animateScroll.scrollToTop({
    delay: 0,
    duration: 800,
    smooth: 'easeOutCubic',
  });
};
