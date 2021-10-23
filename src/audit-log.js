const Discord = require("discord.js");

module.exports = (client, cmd, authorId, authorTag, channel, guild) => {
    try {
        const embed = new Discord.MessageEmbed();

        embed
            .setTitle("COMMAND")
            .addFields(
                {
                    name: "USER INFO:",
                    value: "```USER TAG: " + authorTag + "\nUSER ID: " + authorId + "```",
                    inline: false,
                },
                {
                    name: "EXECUTED COMMAND:",
                    value: "**" + cmd + "** command was executed in <#" + channel + ">",
                    inline: false,
                },
            )
            .setColor("GREEN")
            .setFooter("SERVER ID: " + guild)
            .setTimestamp()

            client.channels.cache.get(`897472167258751018`).send({ embeds: [embed] });
    } catch (err) {
        console.log(err);
    }
}