import { CommandInteraction, MessageEmbed } from 'discord.js';
import {
  bold, hyperlink, inlineCode, time, userMention,
} from '@discordjs/builders';
import { IPlayer } from '../models/player';
import { getPlayers } from '../services/steamcord';

function getCheckOrCross(value: boolean | undefined) {
  return value ? ':white_check_mark:' : '<:red_cross:967233130194939974>';
}

function getDiscordEmbeds(player: IPlayer) {
  const embeds: MessageEmbed[] = [];

  player.discordAccounts.forEach((acc) => {
    embeds.push(new MessageEmbed()
      .setTitle(`Discord Account: ${inlineCode(acc.username)}`)
      .setColor(acc.isSoftUnlinked ? '#cf6679' : '#66c0f4')
      .setThumbnail(acc.avatar)
      .addField('Discord ID', bold(acc.discordId.toString()), false)
      .addField('Username', acc.username, true)
      .addField('Mention', userMention(acc.discordId), true)
      .addField('Linked', getCheckOrCross(!acc.isSoftUnlinked), true)
      .addField('Guild Member', getCheckOrCross(acc.isGuildMember), true)
      .addField('Guild Booster', getCheckOrCross(acc.isGuildBooster), true));
  });

  return embeds;
}

function getSteamEmbeds(player: IPlayer) {
  const embeds: MessageEmbed[] = [];

  player.steamAccounts.forEach((acc) => {
    embeds.push(new MessageEmbed()
      .setTitle(`Steam Account: ${inlineCode(acc.username)}`)
      .setColor(acc.isSoftUnlinked ? '#cf6679' : '#5865f2')
      .setThumbnail(acc.avatar)
      .addField('Steam ID', bold(acc.steamId.toString()), false)
      .addField('Username', acc.username, false)
      .addField('Linked', getCheckOrCross(!acc.isSoftUnlinked), true)
      .addField('Steam Group Member', getCheckOrCross(acc.isSteamGroupMember), true));
  });

  return embeds;
}

function createEmbeds(player: IPlayer) {
  if (!player) {
    return [
      new MessageEmbed()
        .setTitle('Player not found')
        .setColor('#cf6679'),
    ];
  }

  const embeds: MessageEmbed[] = [];

  embeds.push(new MessageEmbed()
    .setTitle('Player')
    .setColor('#7c4dff')
    .addField('Player ID', `${player.playerId.toString()} (${hyperlink('View in Dashboard', `https://steamcord.io/dashboard/players/${player.playerId}`)})`, false)
    .addField('Created Date', time(new Date(player.createdDate)), true)
    .addField('Modified Date', time(new Date(player.modifiedDate ?? player.createdDate)), true));

  embeds.push(...getDiscordEmbeds(player));
  embeds.push(...getSteamEmbeds(player));

  return embeds;
}

export default async function search(interaction: CommandInteraction) {
  await interaction.deferReply();

  let id: string | null = '';
  if (interaction.options.getSubcommand() === 'id') {
    id = interaction.options.getString('id', true);
  }

  if (interaction.options.getSubcommand() === 'user') {
    const user = interaction.options.getUser('user', true);
    id = user.id;
  }

  const players = await getPlayers(id);
  const player = players[0];

  await interaction.editReply({
    content: player ? `
Discord IDs: ${player.discordAccounts.length === 0 ? 'None' : player.discordAccounts.map(
    (acc) => bold(acc.discordId),
  ).join(', ')}
Steam IDs: ${player.steamAccounts.length === 0 ? 'None' : player.steamAccounts.map(
    (acc) => bold(acc.steamId),
  ).join(', ')}
` : undefined,
    embeds: createEmbeds(players[0]),
  });
}
