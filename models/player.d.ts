import { IDiscordAccount } from './accounts/discordAccount';
import { ISteamAccount } from './accounts/steamAccount';

export interface IPlayer {
  playerId: number;
  discordAccounts: IDiscordAccount[];
  steamAccounts: ISteamAccount[];
  createdDate: Date;
  modifiedDate: Date;
}
