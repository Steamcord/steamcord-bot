import axios from 'axios';
import { steamcordToken } from '../config.json';

// eslint-disable-next-line import/prefer-default-export
export async function getPlayerCount(): Promise<number> {
  const response = await axios.get('https://api.steamcord.io/players', {
    headers: {
      Authorization: `Bearer ${steamcordToken}`,
    },
  });

  return parseInt(response.headers['x-total'], 10);
}
