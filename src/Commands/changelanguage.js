const Command = require("../Structures/Command.js");
const Discord = require("discord.js");
const StateManager = require('../StateManager');
const languageTranslation = require('../language');
const guildCommandPrefixes = new Map();
const guildCommandLanguages = new Map();
const lang = require('../Data/lang.json');
const auditlogger = require("../audit-log");

module.exports = new Command({
  name: "language",
  description: "Change Language of Guild",
  permission: "SEND_MESSAGES",
  async run(message, args, client) {
      // DATABASE
    //   console.log(guildCommandPrefixes);
    this.connection = StateManager.connection;
    const prefix = guildCommandPrefixes.get(message.guild.id);
    const language = guildCommandLanguages.get(message.guild.id);
    const owner = await message.guild.fetchOwner();
    if (message.member.id === owner.user.id || "492749274648543233") {
            const hasValue = Object.values(lang.languages).includes(args[1]);
            // console.log(hasValue);
            if (hasValue) {

                const [ cmdName, newLang ] = message.content.split(" ");
                if (newLang) {
                    if (newLang != language) {
                        try {
                            await this.connection.query(
                                `UPDATE GuildConfigurable SET serverLang = '${newLang}' WHERE guildId = '${message.guild.id}'`
                                );
                                guildCommandLanguages.set(message.guild.id, newLang);
                                StateManager.emit('languageFetched', message.guild.id, newLang);
                                sucess(newLang);
                                // message.channel.send(`Updated guild prefix to ${newPrefix}`);
                            } catch(err) {
                                console.log(err);
                                FUpdate(newLang);
                                // message.channel.send(`Failed to update guild prefix to ${newPrefix}`);
                            }
                        } else {
                            samelang(newLang);
                        }
                    } else {
                            error();
                    }
                    
                } else {
                    error();
                }
        } else {
            noperms();
        }
    
    // console.log(prefix);
    function error() {
        const embed = new Discord.MessageEmbed();
        
        embed
        .setColor("RED")
        .setFooter(message.author.tag)
        .setTimestamp()
        .addFields(
            {
                name: `${languageTranslation(message.guild, 'USAGE')}`,
                value: "» `" + prefix + "language {lang}`",
                inline: false,
              }
              );
              
              message.reply({ embeds: [embed] });
        }
    function noperms() {
    const embed = new Discord.MessageEmbed();
    
    embed
    .setColor("RED")
    .setFooter(message.author.tag)
    .setTimestamp()
    .addFields(
        {
            name: `${languageTranslation(message.guild, 'CHANGELANGUAGE_CMD_EMBED_NOPERMST')}`,
            value: "» " + languageTranslation(message.guild, 'CHANGELANGUAGE_CMD_EMBED_NOPERMS') + "",
            inline: false,
            }
            );
            
            message.reply({ embeds: [embed] });
        }
    function samelang(newLang) {
        const embed = new Discord.MessageEmbed();
        
        embed
        .setColor("RED")
        .setFooter(message.author.tag)
        .setTimestamp()
        .addFields(
            {
                name: `${languageTranslation(message.guild, 'ERROR')}`,
                value: "» " + languageTranslation(message.guild, 'CHANGELANGUAGE_CMD_EMBED_SAMELANG') + " `" + newLang + "`",
                inline: false,
                }
                );
                
                message.reply({ embeds: [embed] });
        }
        function FUpdate(newLang) {
            const embed = new Discord.MessageEmbed();
            
            embed
            .setColor("RED")
            .setFooter(message.author.tag)
            .setTimestamp()
            .addFields(
                {
                    name: `${languageTranslation(message.guild, 'ERROR')}`,
                    value: "» " + languageTranslation(message.guild, 'CHANGELANGUAGE_CMD_EMBED_SAMELANG') + " `" + newLang + "`",
                    inline: false,
                    }
                    );
                    
                    message.reply({ embeds: [embed] });
            }
    function sucess(newLang) {
        auditlogger(client, "changelang", message.author.id, message.author.tag, message.channel.id, message.guild.id);
        const embed = new Discord.MessageEmbed();
        
        embed
        .setColor("GREEN")
        .setFooter(message.author.tag)
        .setTimestamp()
        .addFields(
            {
                name: `${languageTranslation(message.guild, 'SUCCESS')}`,
                value: "» " + languageTranslation(message.guild, 'CHANGELANGUAGE_CMD_EMBED_SUCCESS') + " `" + newLang + "`",
                inline: false,
                }
                );
                
                message.reply({ embeds: [embed] });
        }
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