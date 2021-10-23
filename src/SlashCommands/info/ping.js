const { Client, CommandInteraction } = require("discord.js");

module.exports = {
    name: "ping",
    description: "Pong 🏓",
    type: 'CHAT_INPUT',
    /**
     *
     * @param {Client} client
     * @param {CommandInteraction} interaction
     * @param {String[]} args
     */
    run: async (client, interaction, args) => {
        interaction.followUp({ content: `Pong! ${client.ws.ping}ms!` });
    },
};
