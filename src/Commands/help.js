const Command = require("../Structures/Command.js");
const StateManager = require('../StateManager');
const guildCommandPrefixes = new Map();
const guildCommandLanguages = new Map();
const Discord = require("discord.js");
const languageTranslation = require('../language');
module.exports = new Command({
    name: "help",
    description: "Shows all commands",
    permission: "SEND_MESSAGES",
    async run(message, args, client) {
        const config = require("../Data/config.json");
        const embed = new Discord.MessageEmbed();
        const prefix = guildCommandPrefixes.get(message.guild.id);
        const language = guildCommandLanguages.get(message.guild.id);

        embed
            .setTitle("Help • Information")
            .setDescription("" + languageTranslation(message.guild, 'HELP_CMD_EMBED_DESC1') + " `" + `${prefix}` + "`\n" + languageTranslation(message.guild, 'HELP_CMD_EMBED_DESC2') + " `v" + `${config.version}` + "`\n" + languageTranslation(message.guild, 'HELP_CMD_EMBED_DESC3') + " `" + `${language}` + "`")
            .setColor("BLURPLE")
            .setThumbnail(message.author.avatarURL({ dynamic: true }))
            .addFields(
                {
                    name: "" + languageTranslation(message.guild, 'HELP_CMD_EMBED_COMMAND_COUNT') + " [13]",
                    value: "» `" + prefix +"help` • " + languageTranslation(message.guild, 'HELP_CMD_EMBED_COMMAND_HELP') + "\n» `" + prefix +"ping` • Pong\n» `" + prefix +"serverinfo` • " + languageTranslation(message.guild, 'HELP_CMD_EMBED_COMMAND_SERVERINFO') + "\n» `" + prefix +"ban {user} {reason}` • " + languageTranslation(message.guild, 'HELP_CMD_EMBED_COMMAND_BAN') + "\n» `" + prefix +"unban {user}` • " + languageTranslation(message.guild, 'HELP_CMD_EMBED_COMMAND_UNBAN') + "\n» `" + prefix +"kick {user} {reason}` • " + languageTranslation(message.guild, 'HELP_CMD_EMBED_COMMAND_KICK') + "\n» `" + prefix +"role {user} {role}` • " + languageTranslation(message.guild, 'HELP_CMD_EMBED_COMMAND_ROLE') + "\n» `" + prefix +"prefix {prefix}` • " + languageTranslation(message.guild, 'HELP_CMD_EMBED_COMMAND_CHANGEPREFIX') + "\n» `" + prefix +"language {lang}` • " + languageTranslation(message.guild, 'HELP_CMD_EMBED_COMMAND_CHANGELANGUAGE') + "\n» `" + prefix +"listlang` • " + languageTranslation(message.guild, 'HELP_CMD_EMBED_COMMAND_LISTLANGUAGES') + "\n» `" + prefix +"clear {1-100}` • " + languageTranslation(message.guild, 'HELP_CMD_EMBED_COMMAND_CLEAR') + "\n» `" + prefix +"welcome {channel1 | channel2 | role | role2 | role3 | settings}` • " + languageTranslation(message.guild, 'HELP_CMD_EMBED_COMMAND_WELCOME') + "\n» `" + prefix +"roledropdown {roles}` • " + languageTranslation(message.guild, 'HELP_CMD_EMBED_COMMAND_ROLEDROPDOWN') + "",
                    inline: false,
                },
                {
                    name: "" + languageTranslation(message.guild, 'HELP_CMD_EMBED_UNIVERSALCOMMAND') + " [1]",
                    value: "» `getcurrentprefix` • " + languageTranslation(message.guild, 'HELP_CMD_EMBED_UNIVERSALCOMMAND_GETCURRENTPREFIX') + "",
                    inline: false,
                },
                {
                    name: `${languageTranslation(message.guild, 'HELP_CMD_EMBED_INFORMATION')}`,
                    value: "» "+ languageTranslation(message.guild, 'HELP_CMD_EMBED_INFORMATION_INFO') + "",
                    inline: false,
                },
            );

        message.reply({ embeds: [embed] });
    },
});

StateManager.on('prefixFetched', (guildId, prefix) => {
    // console.log(guildId, prefix);
    guildCommandPrefixes.set(guildId, prefix);
  })
StateManager.on('languageFetched', (guildId, language) => {
// console.log(guildId, prefix);
guildCommandLanguages.set(guildId, language);
})