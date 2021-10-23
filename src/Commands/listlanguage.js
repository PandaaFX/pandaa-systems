const Command = require("../Structures/Command.js");
const auditlogger = require("../audit-log");
const Discord = require("discord.js");
const StateManager = require('../StateManager');
const languageTranslation = require('../language');
const guildCommandPrefixes = new Map();
const guildCommandLanguages = new Map();
const lang = require('../Data/lang.json');

module.exports = new Command({
  name: "listlang",
  description: "List all avalible languages",
  permission: "SEND_MESSAGES",
  async run(message, args, client) {
      // DATABASE
    //   console.log(guildCommandPrefixes);
    this.connection = StateManager.connection;
    const prefix = guildCommandPrefixes.get(message.guild.id);
    const language = guildCommandLanguages.get(message.guild.id);
    const langarray = lang.languages;
    var langarray2 = String(langarray).replace(/,/g, "`\n» `");
    // console.log(langarray2);

    const listlangarray = sucess(langarray2)
    
    // console.log(prefix);
    function sucess(LangList) {
        try {
            auditlogger(client, "listlang", message.author.id, message.author.tag, message.channel.id, message.guild.id);
            const embed = new Discord.MessageEmbed();
            
            embed
            .setColor("GREEN")
            .setFooter(message.author.tag)
            .setTimestamp()
            .addFields(
                {
                    name: `${languageTranslation(message.guild, 'LISTLANGUAGE_CMD_EMBED_SUCCESST')}`,
                    value: "» `" + LangList + "`",
                    inline: false,
                }
                );
                
                message.reply({ embeds: [embed] });
            } catch (err) {
                console.log(err);
            }
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