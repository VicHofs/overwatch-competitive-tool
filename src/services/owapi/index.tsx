import axios from 'axios';
import { PlayerData } from './types';

const owapi = axios.create({ baseURL: 'https://owapi.io/profile/pc/us' });

export const getPlayerData = async (tag: string): Promise<PlayerData> => {
  const { data } = await owapi.get<PlayerData>(`${tag}`);
  if (data.private) {
    return Promise.reject(Error('Private Career Profile.'));
  }
  if (data.private === false) {
    return data;
  }

  return Promise.reject(Error('Profile not found.'));
};

export default owapi;
