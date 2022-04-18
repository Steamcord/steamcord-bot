import { ActivityTypes } from 'discord.js/typings/enums';
import { ExcludeEnum } from 'discord.js';

export default interface IActivityMessage {
  type: ExcludeEnum<typeof ActivityTypes, 'CUSTOM'>;
  message: string;
  duration: number;
// eslint-disable-next-line semi
}
