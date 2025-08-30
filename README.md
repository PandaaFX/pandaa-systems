# pandaafx-bot (Archive)

This repository contains my **first Discord bot project**, built with **Discord.js**.  
I created it a few years ago as a way to learn how to work with the Discord API, Node.js,  
and later also experimented with a **web panel connected via WebSocket**.  

## About
- Basic moderation features such as **ban** and **kick**.  
- Ability to set roles for users.  
- Includes a simple **dashboard / web panel** (private use only).  
- WebSocket connection between the bot and the panel for real-time updates.  
- Written almost entirely in **JavaScript**.  

## Status
This project is **archived** and no longer maintained.  
It represents my first steps into Discord bot development and was mainly a **learning project**.  

## Important Note
- The **secrets, tokens, and API keys** that were once stored in `.env` and `config.json`  
  are **no longer active** and will not work anymore.  
- The bot is not intended to be used in production in its current state.  

## Project Structure
The bot was organized into different modules for easier maintenance:  

- **Commands/** – Contains all bot commands:  
  - `ban.js` – Ban a user  
  - `kick.js` – Kick a user  
  - `unban.js` – Unban a user  
  - `clear.js` – Clear messages  
  - `help.js` – Show help menu  
  - `ping.js` – Check bot latency  
  - `serverinfo.js` – Display server information  
  - `status.js` – Show bot status  
  - `role.js` / `role-dropdown.js` – Manage user roles  
  - `welcomes.js` – Welcome new members  
  - `changelanguage.js` / `listlanguage.js` – Change or list available languages  
  - `changeprefix.js` – Change the bot prefix  
  - `disconnect.js` – Disconnect from voice  
  - `channelnuker.js` – (test/dev command, destructive)  
  - `eval.js` – Developer-only evaluation command  

- **Events/** – Handles Discord events (e.g. `message`, `guildMemberAdd`).  
- **SlashCommands/** – Early experiments with Discord slash commands.  
- **Database/** – Contains the **MySQL connection setup** and the **schema**:  
  - `Guilds` table: stores guild ID and owner ID.  
  - `GuildConfigurable` table: stores configurable settings like prefix, language,  
    welcome channel, and up to three welcome roles.  

- **Handler/** – Command and event loader.  
- **Structures/** – Custom classes and utilities.  
- **WebSocket (ws/)** – Connection between the bot and the web panel.  

## Tech Stack / Dependencies
The project was built with **Node.js** and used the following main dependencies:  

- `discord.js` (v13 dev build) – Core library for interacting with the Discord API  
- `@discordjs/voice`, `@discordjs/opus` – Voice support  
- `@koenie06/discord.js-music` – Music playback functionality  
- `express`, `express-handlebars`, `body-parser` – Web panel backend and templating  
- `mysql`, `mysql2` – Database connection  
- `dotenv` – Environment variable management  
- `discord-oauth2` – OAuth2 integration for the web panel  
- `node-fetch`, `btoa` – Utility libraries  

## Personal Note
This was my **first Discord bot project**, and it helped me understand the basics of  
Discord.js, event handling, WebSocket communication, database integration, and how to  
structure a Node.js application with both a bot and a web panel.  

---
*Archived project – pandaafx-bot (first Discord bot project)*
