export interface ISteamAccount {
  steamId: string;
  username: string;
  avatar: string;
  isSteamGroupMember: boolean | undefined;
  isSoftUnlinked: boolean
}
