export interface IDiscordAccount {
  discordId: string;
  username: string;
  avatar: string;
  isGuildMember: boolean | undefined;
  isGuildBooster: boolean | undefined;
  isSoftUnlinked: boolean
}
