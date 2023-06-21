import tankIcon from 'assets/images/icons/tank.svg';
import damageIcon from 'assets/images/icons/damage.svg';
import supportIcon from 'assets/images/icons/support.svg';
import flexIcon from 'assets/images/icons/flex.svg';
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
  flex: {
    id: 0,
    name: 'flex',
    aliases: ['all', 'any', 'flx'],
    icon: flexIcon,
  },
};
