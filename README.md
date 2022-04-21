# Steamcord Bot

A bot that displays the number of linked Steamcord players as its activity.

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
  "botToken": "<your bot token>",
  "guildID": "<your guild id>",
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
