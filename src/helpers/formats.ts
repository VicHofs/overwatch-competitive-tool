// export interface Player {
//   battleTag: string;
//   role: 'tank' | 'damage' | 'support' | Array<'tank' | 'damage' | 'support'>;
//   rank:
//     | number
//     | {
//         tank?: number;
//         damage?: number;
//         support?: number;
//       };
// }
export interface Player {
  id: string;
  battleTag: string;
  role: string;
  rank: number;
}

export type Elo =
  | 'bronze'
  | 'silver'
  | 'gold'
  | 'platinum'
  | 'diamond'
  | 'master'
  | 'grandmaster';

export type Tier = 1 | 2 | 3 | 4 | 5;

export interface Role {
  id: 0 | 1 | 2 | 3;
  name: 'tank' | 'support' | 'damage' | 'flex';
  aliases: Array<string>;
  icon: string;
}
