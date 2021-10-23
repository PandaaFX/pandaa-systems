const Discord = require("discord.js");
const StateManager = require('./StateManager');
const guildCommandPrefixes = new Map();
const guildCommandLanguages = new Map();
const guildCommandWChannel = new Map();
const guildCommandBChannel = new Map();
const guildCommandWRole = new Map();
const guildCommandWRole2 = new Map();
const guildCommandWRole3 = new Map();

module.exports = (client) => {
    try {
  this.connection = StateManager.connection;
        client.guilds.cache.forEach(guild => {
            this.connection.query(
              `SELECT cmdPrefix FROM GuildConfigurable WHERE guildId = '${guild.id}'`
              ).then(result => {
                const guildId = guild.id;
                const prefix = result[0][0].cmdPrefix;
                // console.log(result[0][0].cmdPrefix);
                guildCommandPrefixes.set(guildId, prefix);
                StateManager.emit('prefixFetched', guildId, prefix);
              }).catch(err => console.log(err));
            });
        client.guilds.cache.forEach(guild => {
            this.connection.query(
              `SELECT serverLang FROM GuildConfigurable WHERE guildId = '${guild.id}'`
              ).then(result => {
                const guildId = guild.id;
                const language = result[0][0].serverLang;
                guildCommandLanguages.set(guildId, language);
                StateManager.emit('languageFetched', guildId, language);
              }).catch(err => console.log(err));
            });
        client.guilds.cache.forEach(guild => {
            this.connection.query(
              `SELECT welcomeChannel FROM GuildConfigurable WHERE guildId = '${guild.id}'`
              ).then(result => {
                const guildId = guild.id;
                const WChannel = result[0][0].welcomeChannel;
                guildCommandWChannel.set(guildId, WChannel);
                StateManager.emit('welcomeFetched', guildId, WChannel);
              }).catch(err => console.log(err));
            });
        client.guilds.cache.forEach(guild => {
            this.connection.query(
              `SELECT byeChannel FROM GuildConfigurable WHERE guildId = '${guild.id}'`
              ).then(result => {
                const guildId = guild.id;
                const BChannel = result[0][0].byeChannel;
                guildCommandBChannel.set(guildId, BChannel);
                StateManager.emit('byeFetched', guildId, BChannel);
              }).catch(err => console.log(err));
            });
        client.guilds.cache.forEach(guild => {
            this.connection.query(
            `SELECT welcomeRole FROM GuildConfigurable WHERE guildId = '${guild.id}'`
            ).then(result => {
                const guildId = guild.id;
                const WRole = result[0][0].welcomeRole;
                guildCommandWRole.set(guildId, WRole);
                StateManager.emit('welcomeRoleFetched', guildId, WRole);
            }).catch(err => console.log(err));
            });
        client.guilds.cache.forEach(guild => {
            this.connection.query(
                `SELECT welcomeRole2 FROM GuildConfigurable WHERE guildId = '${guild.id}'`
                ).then(result => {
                const guildId = guild.id;
                const WRole2 = result[0][0].welcomeRole2;
                guildCommandWRole2.set(guildId, WRole2);
                StateManager.emit('welcomeRole2Fetched', guildId, WRole2);
                // console.log(WRole2);
                }).catch(err => console.log(err));
            });
        client.guilds.cache.forEach(guild => {
                this.connection.query(
                `SELECT welcomeRole3 FROM GuildConfigurable WHERE guildId = '${guild.id}'`
                ).then(result => {
                    const guildId = guild.id;
                    const WRole3 = result[0][0].welcomeRole3;
                    guildCommandWRole3.set(guildId, WRole3);
                    StateManager.emit('welcomeRole3Fetched', guildId, WRole3);
                    // console.log(WRole3);
                }).catch(err => console.log(err));
            });
    } catch (err) {
        console.log(err);
    }
}