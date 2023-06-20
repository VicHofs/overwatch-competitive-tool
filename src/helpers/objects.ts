import tankIcon from 'assets/images/icons/tank.png';
import damageIcon from 'assets/images/icons/damage.png';
import supportIcon from 'assets/images/icons/support.png';
import { Elo, Role, Tier } from './formats';

export const elos: Elo[] = [
  'bronze',
  'silver',
  'gold',
  'platinum',
  'diamond',
  'master',
  'grandmaster',
];
export const tiers: Tier[] = [1, 2, 3, 4, 5];

export const iconMap: { [key: string]: string } = {
  tank: tankIcon,
  damage: damageIcon,
  support: supportIcon,
};

export const roles: Record<string, Role> = {
  tank: { id: 1, name: 'tank', aliases: ['heavy'], icon: tankIcon },
  damage: { id: 2, name: 'damage', aliases: ['dps', 'dmg'], icon: damageIcon },
  support: {
    id: 3,
    name: 'support',
    aliases: ['sup', 'supp', 'healer'],
    icon: supportIcon,
  },
};
