/** @format */
const Discord = require("discord.js");
const languageTranslation = require('../language');

const Command = require("../Structures/Command.js");

module.exports = new Command({
  name: "ping",
  description: "Shows the ping of the bot!",
  permission: "SEND_MESSAGES",
  async run(message, args, client) {
    let embed = new Discord.MessageEmbed();

    embed
        .setAuthor(
            message.author.username,
            message.author.avatarURL({ dynamic: true }),
            "https://darkbluepandaa.de/"
        )
        .setColor("GREEN")
        // .setThumbnail(message.author.avatarURL({ dynamic: true }))
        .addFields(
            {
                name: "PONG",
                value: `Ping: ${client.ws.ping} ms.`,
                inline: false,
            }
        );

    message.channel.send({ embeds: [embed] }).then(msg => {
        setTimeout(function () {

            let embed = new Discord.MessageEmbed();

            embed
                .setAuthor(
                    message.author.username,
                    message.author.avatarURL({ dynamic: true }),
                    "https://darkbluepandaa.de/"
                )
              .setColor("GREEN")
              // .setThumbnail(message.author.avatarURL({ dynamic: true }))
                .addFields(
                    {
                        name: "PONG",
                        value: `Ping: ${client.ws.ping} ms, \nMessage Ping: ${
                          msg.createdTimestamp - message.createdTimestamp
                        } ms.`,
                        inline: false,
                    }
                );
            msg.edit({ embeds: [embed] });
        }, 2500);

    })
    // const msg = await message.reply(`Ping: ${client.ws.ping} ms.`);

    // msg.edit(
    //   `Ping: ${client.ws.ping} ms, \nMessage Ping: ${
    //     msg.createdTimestamp - message.createdTimestamp
    //   } ms.`
    // );
  },
});
