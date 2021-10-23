/** @format */
const Command = require("../Structures/Command.js");
const Discord = require("discord.js");
const languageTranslation = require("../language");
const { MessageActionRow, MessageSelectMenu } = require("discord.js");

module.exports = new Command({
  name: "roledropdown",
  description: "Dropdown menu",
  permission: "SEND_MESSAGES",
  async run(message, args, client) {
    let argiss = dropdown(args.slice(1));
    message.delete();
    function dropdown(argis) {
        let options = [];

        // console.log(argis)

        const guild = message.guild;
        
        const embed = new Discord.MessageEmbed();
        embed
        .setColor("GREEN")
        .addFields({
            name: ""+ guild.name +"",
            value: ""+ languageTranslation(message.guild, 'AUTOROLE_DROPDOWN_EMBED')+"",
            inline: false,
        });
        argis.forEach(function(item){
            options.push({
                label: item,
                description: ""+languageTranslation(message.guild, 'AUTOROLE_DROPDOWN_DESCRIPTION')+" "+item+"",
                value: item,
            });
        })
        options.push({
            label: ""+languageTranslation(message.guild, 'AUTOROLE_DROPDOWN_RESET_LABEL')+"",
            description: ""+languageTranslation(message.guild, 'AUTOROLE_DROPDOWN_RESET')+"",
            value: "reset",
        });
        const row = new MessageActionRow()
        .addComponents(
            new MessageSelectMenu()
            .setCustomId('reactroles')
            .setPlaceholder(languageTranslation(message.guild, 'AUTOROLE_DROPDOWN_PLACEHOLDER'))
            .setMinValues(1)
            .setMaxValues(1)
            .addOptions(options),
            );
            message.channel.send({ embeds: [embed], components: [row] });

        }
    },
});