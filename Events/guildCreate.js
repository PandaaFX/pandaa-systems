const Event = require("../Structures/Event.js");
const Discord = require("discord.js");
const config = require("../Data/config.json");
const StateManager = require("../StateManager");

module.exports = new Event("guildCreate", async (client, guild) => {
    this.connection = StateManager.connection;

    try {
        await this.connection.query(
            `INSERT INTO Guilds VALUES('${guild.id}', '${guild.ownerId}')`
        );
        await this.connection.query(
            `INSERT INTO GuildConfigurable (guildId) VALUES ('${guild.id}')`
        );
    } catch (err) {
        console.log(err);
    }
});
