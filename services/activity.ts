import axios from 'axios';
import { Client } from 'discord.js';
import IActivityMessage from '../models/activityMessage';
import { getPlayerCount } from './steamcord';
import { logError } from '../util/logging';

/**
 * Examples:
 *   - 1 -> 1
 *   - 100 -> 100
 *   - 1000 -> 1,000
 *   - 9999 -> 9,999
 *   - 10000 -> 10k
 *   - 10050 -> 10.1k
 */
function formatPlayerCount(count: number) {
  if (count < 10_000) {
    return count.toLocaleString();
  }

  return `${(count / 1_000).toFixed(1).replace(/\.0$/, '').toLocaleString()}k`;
}

async function formatMessage(message: string) {
  if (message.includes('{{ PLAYER_COUNT }}')) {
    const playerCount = await getPlayerCount();
    return message.replace('{{ PLAYER_COUNT }}', formatPlayerCount(playerCount));
  }

  return message;
}

export async function setActivity(client: Client, messages: IActivityMessage[], index: number) {
  if (index >= messages.length) {
    index = 0;
  }

  const { type, message, duration } = messages[index] as IActivityMessage;

  try {
    client.user?.setActivity({
      type,
      name: await formatMessage(message),
    });
  } catch (err) {
    if (axios.isAxiosError(err)) {
      logError(`Could not reach the Steamcord API.\n${err.message}`);
    }
  }

  setTimeout(() => setActivity(client, messages, ++index), duration * 1_000);
}

export async function startActivityLoop(client: Client, messages: IActivityMessage[]) {
  if (messages.length === 0) {
    logError('No activity messages found.');
    return;
  }

  setActivity(client, messages, 0);
}
