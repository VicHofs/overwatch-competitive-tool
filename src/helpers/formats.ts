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
  battleTag: string;
  role: string;
  rank: number;
}
