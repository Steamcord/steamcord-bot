import axios from 'axios';
import { IPlayer } from '../models/player';

export async function getPlayerCount(): Promise<number> {
  const response = await axios.get('https://api.steamcord.io/players');

  return parseInt(response.headers['x-total'], 10);
}

export async function getPlayers(id: string): Promise<IPlayer[]> {
  const { data: players } = await axios.get<IPlayer[]>('https://api.steamcord.io/players', {
    params: {
      discordID: id,
      status: 'all',
      steamID: id,
    },
  });

  return players;
}
