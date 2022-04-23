import {
  Client, Intents, Interaction,
} from 'discord.js';
import search from './commands/search';
import {
  activityMessages, botToken, guildID, roleID,
} from './config.json';
import IActivityMessage from './models/activityMessage';
import { startActivityLoop } from './services/activity';
import { logInfo, logError } from './util/logging';
import registerCommands from './util/registerCommands';
import setAxiosDefaults from './util/setAxiosDefaults';

const client = new Client({ intents: [Intents.FLAGS.GUILDS] });

client.on('ready', async () => {
  await registerCommands();

  if (!client.application?.owner) await client.application?.fetch();

  const guild = client.guilds.cache.get(guildID);

  if (!guild) {
    logError('Could not find guild');
    return;
  }

  if (!client.application?.owner) await client.application?.fetch();

  const commands = await guild.commands.fetch();

  commands.forEach(async (c) => {
    await c.setDefaultPermission(false);
    await guild.commands.permissions.add({
      command: c.id,
      permissions: [
        {
          id: roleID,
          type: 'ROLE',
          permission: true,
        },
      ],
    });
  });

  logInfo('Bot started successfully');

  startActivityLoop(client, activityMessages as IActivityMessage[]);
});

client.on('interactionCreate', async (interaction: Interaction) => {
  if (!interaction.isCommand()) {
    return;
  }

  if (interaction.commandName.toUpperCase() !== 'SEARCH') {
    return;
  }

  try {
    await search(interaction);
  } catch (err) {
    if (err instanceof Error) {
      logError(err.message);
    }
  }
});

(async function main() {
  setAxiosDefaults();

  try {
    await client.login(botToken);
  } catch (err) {
    logError('Could not login, is your bot token correct?');
  }
}());
