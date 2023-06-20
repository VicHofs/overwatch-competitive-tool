/* eslint-disable camelcase */
export interface QuickplayRecord {
  won: number;
  played: number;
}

export interface CompetitiveRecord {
  won: number;
  lost: number;
  draw: number;
  played: number;
  win_rate: number | null;
}

export interface Game {
  quickplay: QuickplayRecord;
  competitive: CompetitiveRecord;
}

export interface Playtime {
  quickplay: string;
  competitive: string;
}

export interface Rank {
  rank: string;
  icon: string;
}

export interface Competitive {
  tank?: Rank;
  offense?: Rank;
  support?: Rank;
}

export interface PlayerData {
  username: string;
  portrait: string;
  endorsement: string;
  private: boolean;
  games: Game;
  playtime: Playtime;
  competitive: Competitive;
}
