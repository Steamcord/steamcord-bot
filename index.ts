import { Client, Intents } from 'discord.js';
import { activityMessages, botToken } from './config.json';
import IActivityMessage from './models/activityMessage';
import { startActivityLoop } from './services/activity';
import { logInfo, logError } from './util/logging';

const client = new Client({ intents: [Intents.FLAGS.GUILDS] });

client.on('ready', async () => {
  logInfo('Bot started successfully');

  startActivityLoop(client, activityMessages as IActivityMessage[]);
});

(async function main() {
  try {
    await client.login(botToken);
  } catch (err) {
    logError('Could not login, is your bot token correct?');
  }
}());
