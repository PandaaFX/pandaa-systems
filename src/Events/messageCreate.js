const Event = require("../Structures/Event.js");
const Discord = require("discord.js");
const StateManager = require('../StateManager');
const guildCommandPrefixes = new Map();
const languageTranslation = require('../language');

module.exports = new Event("messageCreate", (client, message) => {
  const prefix = guildCommandPrefixes.get(message.guild.id);
  try {

    if(message.content.toLowerCase().startsWith('getcurrentprefix')) {
      // message.channel.send(`The current server prefix is: ${prefix}`);
      const embed = new Discord.MessageEmbed();
    
      embed
      .setColor("BLURPLE")
      .addFields(
          {
              name: `${languageTranslation(message.guild, 'GETCURRENTPREFIXTITLE')}`,
              value: "" + languageTranslation(message.guild, 'GETCURRENTPREFIX') + " `" + prefix + "`",
              inline: false,
            }
            );
            
            message.reply({ embeds: [embed] });
    }
  } catch (err) {
    console.log(err);
  }
  function UCerror() {
    const embed = new Discord.MessageEmbed();
    
    embed
    .setColor("RED")
    .setFooter(message.author.tag)
    .setTimestamp()
    .addFields(
        {
            name: `${languageTranslation(message.guild, 'UCERRORTITLE')}`,
            value: "```" + languageTranslation(message.guild, 'UCERROR1') + " " + prefix + "help " + languageTranslation(message.guild, 'UCERROR2') + "```",
            inline: false,
          }
          );
          
          message.reply({ embeds: [embed] });
      }
  function NPerror() {
    const embed = new Discord.MessageEmbed();
    
    embed
    .setColor("RED")
    .setFooter(message.author.tag)
    .setTimestamp()
    .addFields(
        {
            name: `${languageTranslation(message.guild, 'NPERRORTITLE')}`,
            value: `${languageTranslation(message.guild, 'NPERROR1')} \`${command.permission}\` ${languageTranslation(message.guild, 'NPERROR2')}`,
            inline: false,
          }
          );
          
          message.reply({ embeds: [embed] });
      }
  if (message.author.bot) return;

  if (!message.content.startsWith(prefix)) return;

  const args = message.content.substring(prefix.length).split(/ +/);
  const commandName = args.shift().toLowerCase();

  const command = client.commands.get(commandName) ||
      client.commands.find((cmd) => cmd.aliases && cmd.aliases.includes(commandName));

  // const command = client.commands.find((cmd) => cmd.name == args[0]);


  if (!command) return UCerror();

  const permission = message.member.permissions.has(command.permission, true);

  if (!permission)
    return NPerror();

  command.run(message, args, client);



});

StateManager.on('prefixFetched', (guildId, prefix) => {
  // console.log(guildId, prefix);
  guildCommandPrefixes.set(guildId, prefix);
})
