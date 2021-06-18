import bronzeIcon from 'assets/images/icons/bronze.png';
import silverIcon from 'assets/images/icons/silver.png';
import goldIcon from 'assets/images/icons/gold.png';
import platinumIcon from 'assets/images/icons/platinum.png';
import diamondIcon from 'assets/images/icons/diamond.png';
import masterIcon from 'assets/images/icons/master.png';
import grandmasterIcon from 'assets/images/icons/grandmaster.png';
import { Player } from './formats';

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
