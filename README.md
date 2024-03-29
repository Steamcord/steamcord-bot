# Steamcord Bot

A Discord utliity bot for [Steamcord](https://steamcord.io)

## Features

* Displays linked players and other messages as activity messages
* Search linked players using `/search`

## Required Scopes

* `bot`
* `applications.commands` (to create the `/search` command)

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
Or, with Docker:

```bash
# download config
$ wget https://raw.githubusercontent.com/Steamcord/steamcord-bot/main/config.json

# download the image from Docker Hub and run it
$ docker run -v $(pwd)/config.json:/app/config.json:ro steamcord/bot
```

## License

MIT
