const Event = require("../Structures/Event.js");
const Discord = require("discord.js");
const config = require("../Data/config.json");
const StateManager = require('../StateManager');
const DBForEachLoops = require('../db-foreach');
const guildCommandPrefixes = new Map();
const guildCommandLanguages = new Map();
const guildCommandWChannel = new Map();
const guildCommandBChannel = new Map();
const guildCommandWRole = new Map();
const guildCommandWRole2 = new Map();
const guildCommandWRole3 = new Map();

require('dotenv').config()

module.exports = new Event("ready", (client) => {
  StateManager.emit('ready');
  this.connection = StateManager.connection;

  setInterval(function(){ 
    
    try {
      this.connection = StateManager.connection;
      this.connection.query(
        `SELECT cmdPrefix FROM GuildConfigurable WHERE guildId = '582218335521865750'`
        ).then(result => {
          console.log("DB PING " + new Date().toLocaleString("de-DE", { timeZone: "Europe/Berlin" }));

        }).catch(err => console.log(err));
    } catch(err) {
      console.log(err);
    }
   }, 21600000);
  const embed = new Discord.MessageEmbed();

  embed
    .setTitle("Bot Status")
    .setDescription("Bot wurde gestartet!")
    .setColor("BLURPLE")
    .setTimestamp()
    .addFields(
      {
        name: "Bot Version",
        value: config.version,
        inline: true,
      },
      {
        name: "Bot Name",
        value: client.user.username,
        inline: true,
      }
    );

  client.channels.cache.get(`901471079481090068`).send({ embeds: [embed] });
  console.log("Bot " + client.user.tag + " is online! " + new Date().toLocaleString("de-DE", { timeZone: "Europe/Berlin" }));
  client.user.setPresence({ activities: [{ name: 'fxhelp' }], status: 'online' });
  console.log(" ");
  console.log("JOINED SERVER");
  const Guilds = client.guilds.cache.map(guild => guild.name);
  console.log(Guilds);

  // const guildId = process.env.DISCORD_GUILD_ID
  // const guild = client.guilds.cache.get(guildId)
  // let commands

  // if (guild) {
  //   commands = guild.commands
  // } else {
  //   commands = client.application?.commands
  // }

  // commands?.create({
  //   name: 'ping',
  //   description: 'Replies with pong.'
  // })

  // commands?.create({
  //   name: 'calc',
  //   description: 'Adds two numbers.',
  //   options: [
  //     {
  //       name: 'num1',
  //       description: 'The first number.',
  //       required: true,
  //       type: 'NUMBER'
  //     },
  //     {
  //       name: 'type',
  //       description: 'The type of the calculation.',
  //       required: true,
  //       type: 'STRING'
  //     },
  //     {
  //       name: 'num2',
  //       description: 'The second number.',
  //       required: true,
  //       type: 'NUMBER'
  //     },
  //   ],
  // })
  
  DBForEachLoops(client);
  });