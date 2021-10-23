const Event = require("../Structures/Event.js");
const Discord = require("discord.js");
const config = require("../Data/config.json");
const StateManager = require("../StateManager");

module.exports = new Event("guildDelete", async (client, guild) => {
    this.connection = StateManager.connection;

    try {
        await this.connection.query(
            // `INSERT INTO Guilds VALUES('${guild.id}', '${guild.ownerId}')`
            `DELETE FROM Guilds WHERE guildId = '${guild.id}'`
        );
        await this.connection.query(
            // `INSERT INTO GuildConfigurable (guildId) VALUES ('${guild.id}')`
            `DELETE FROM GuildConfigurable WHERE guildId = '${guild.id}'`
        );
    } catch (err) {
        console.log(err);
    }
});
