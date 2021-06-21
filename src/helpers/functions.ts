import bronzeIcon from 'assets/images/icons/bronze.png';
import silverIcon from 'assets/images/icons/silver.png';
import goldIcon from 'assets/images/icons/gold.png';
import platinumIcon from 'assets/images/icons/platinum.png';
import diamondIcon from 'assets/images/icons/diamond.png';
import masterIcon from 'assets/images/icons/master.png';
import grandmasterIcon from 'assets/images/icons/grandmaster.png';
import { Player } from './formats';

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

export const rankIcon = (rank: number): string => {
  if (rank < 1500) return bronzeIcon;
  if (rank < 2000) return silverIcon;
  if (rank < 2500) return goldIcon;
  if (rank < 3000) return platinumIcon;
  if (rank < 3500) return diamondIcon;
  if (rank < 4000) return masterIcon;
  return grandmasterIcon;
};

export const rankName = (rank: number): string => {
  if (rank < 1500) return 'bronze';
  if (rank < 2000) return 'silver';
  if (rank < 2500) return 'gold';
  if (rank < 3000) return 'platinum';
  if (rank < 3500) return 'diamond';
  if (rank < 4000) return 'master';
  return 'grandmaster';
};

export const sortPlayers = (members: Array<Player>): Array<Player> => {
  const order = ['tank', 'damage', 'support'];

  return members
    .slice()
    .sort((a, b) => order.indexOf(a.role) - order.indexOf(b.role));
};

export const rankMask = (rank: string): string => {
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
    Math.min(tankPool.length, damagePool.length, supportPool.length) / 2,
  );
  const playersToAdd = groups * 6;
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

  for (let i = 0; i < playersToAdd / 3; i++) {
    if (i < groups) {
      teams[i].members.push(damagePool[currDamage]);
      teams[i].totalSR += damagePool[currDamage].rank;
    } else {
      const priorityTeam = teams
        .filter((team) => team.members.length < 2)
        .reduce((a, b) => (a.totalSR < b.totalSR ? a : b));
      const priority = teams.findIndex((team) => team.id === priorityTeam.id);
      teams[priority].members.push(damagePool[currDamage]);
      teams[priority].totalSR += damagePool[currDamage].rank;
    }
    currDamage++;
  }

  for (let i = 0; i < playersToAdd / 3; i++) {
    const priorityTeam = teams
      .filter((team) => team.members.length < 4)
      .reduce((a, b) => (a.totalSR < b.totalSR ? a : b));
    const priority = teams.findIndex((team) => team.id === priorityTeam.id);
    teams[priority].members.push(tankPool[currTank]);
    teams[priority].totalSR += tankPool[currTank].rank;
    currTank++;
  }

  for (let i = 0; i < playersToAdd / 3; i++) {
    const priorityTeam = teams
      .filter((team) => team.members.length < 6)
      .reduce((a, b) => (a.totalSR < b.totalSR ? a : b));
    const priority = teams.findIndex((team) => team.id === priorityTeam.id);
    teams[priority].members.push(supportPool[currSupport]);
    teams[priority].totalSR += supportPool[currSupport].rank;
    currSupport++;
  }

  while (currDamage < damagePool.length) {
    bench.push(damagePool[currDamage]);
    currDamage++;
  }

  while (currTank < tankPool.length) {
    bench.push(tankPool[currTank]);
    currTank++;
  }

  while (currSupport < supportPool.length) {
    bench.push(supportPool[currSupport]);
    currSupport++;
  }

  console.log(
    `σ = ${standardDeviation(teams.map((team) => team.totalSR / 6))}`,
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
    Math.min(tankPool.length, damagePool.length, supportPool.length) / 2,
  );
  const playersToAdd = groups * 6;
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

  for (let i = 0; i < playersToAdd / 3; i++) {
    if (i < groups) {
      teams[i].members.push(damagePool[0]);
      teams[i].totalSR += damagePool[0].rank;
      damagePool = damagePool.slice(1);
    } else {
      const highestSR = teams.reduce((a, b) =>
        a.totalSR < b.totalSR ? b : a,
      ).totalSR;
      const priorityTeam = teams
        .filter((team) => team.members.length < 2)
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
  }

  for (let i = 0; i < playersToAdd / 3; i++) {
    const highestSR = teams.reduce((a, b) =>
      a.totalSR < b.totalSR ? b : a,
    ).totalSR;
    const priorityTeam = teams
      .filter((team) => team.members.length < 4)
      .reduce((a, b) => (a.totalSR < b.totalSR ? a : b));
    const priority = teams.findIndex((team) => team.id === priorityTeam.id);
    const delta = highestSR - priorityTeam.totalSR;
    let target = tankPool[0];
    if (i !== groups)
      for (let k = 1; k < tankPool.length; k++) {
        if (Math.abs(delta - tankPool[k].rank) < Math.abs(delta - target.rank))
          target = tankPool[k];
        else break;
      }
    teams[priority].members.push(target);
    teams[priority].totalSR += target.rank;
    tankPool = tankPool.filter(
      (player) => player.battleTag !== target.battleTag,
    );
  }

  for (let i = 0; i < playersToAdd / 3; i++) {
    const highestSR = teams.reduce((a, b) =>
      a.totalSR < b.totalSR ? b : a,
    ).totalSR;
    const priorityTeam = teams
      .filter((team) => team.members.length < 6)
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

  return damagePlayers === tankPlayers && tankPlayers === supportPlayers;
};

export const smartSort = (players: Array<Player>): SortResult => {
  if (isIdealScenario(players)) return altSortTeams(players);
  return sortTeams(players);
};
