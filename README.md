# Steamcord Bot

A Discord utliity bot for [Steamcord](https://steamcord.io)

## Commands

### `/search <id|user>`

Searches for a Steamcord player by an account ID or Discord mention

## Config

```json
{
  "activityMessages": [
    {
      "type": "WATCHING",
      "message": "{{ PLAYER_COUNT }} players linked!",
      "duration": 3
    },
    {
      "type": "PLAYING",
      "message": "demo.steamcord.link",
      "duration": 3
    }
  ],
  "botToken": "<your Discord bot token>",
  "clientID": "<your Discord application client ID>",
  "commandChannelID": "<the channel ID to use the search command>",
  "guildID": "<your guild id>",
  "roleID": "<the role ID required to use the search command>",
  "steamcordToken": "<your Steamcord token>"
}
```

## Installation

```bash
# install dependencies
$ npm install

# run the bot
$ npm start
```

## License

MIT
