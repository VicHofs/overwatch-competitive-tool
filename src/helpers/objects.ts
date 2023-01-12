import tankIcon from 'assets/images/icons/tank.png';
import damageIcon from 'assets/images/icons/damage.png';
import supportIcon from 'assets/images/icons/support.png';

export const iconMap: { [key: string]: string } = {
  tank: tankIcon,
  damage: damageIcon,
  support: supportIcon,
};

export const roles = {
  tank: { id: 1, name: 'tank', aliases: ['heavy'] },
  damage: { id: 2, name: 'damage', aliases: ['DPS', 'dmg'] },
  support: { id: 3, name: 'support', aliases: ['sup', 'supp', 'healer'] },
};
