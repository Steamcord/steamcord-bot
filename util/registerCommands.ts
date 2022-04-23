import { Routes } from 'discord-api-types/v9';
import { SlashCommandBuilder } from '@discordjs/builders';
import { REST } from '@discordjs/rest';
import { botToken, clientID, guildID } from '../config.json';
import { logError } from './logging';

const commands = [
  new SlashCommandBuilder()
    .setName('search')
    .setDescription('Searches for a Steamcord player')
    .addSubcommand((subcommand) => subcommand
      .setName('id')
      .setDescription('Searches for a Steamcord player by an account ID')
      .addStringOption((option) => option.setName('id').setDescription('An account ID').setRequired(true)))
    .addSubcommand((subcommand) => subcommand
      .setName('user')
      .setDescription('Searches for a Steamcord player by Discord user mention')
      .addUserOption((option) => option.setName('user').setDescription('A Discord user mention').setRequired(true)))
    .toJSON(),
];

const rest = new REST({ version: '9' }).setToken(botToken);

export default async function registerCommands() {
  try {
    await rest.put(Routes.applicationGuildCommands(clientID, guildID), {
      body: commands,
    });
  } catch (err) {
    if (err instanceof Error) {
      logError(err.message);
    }
  }
}
