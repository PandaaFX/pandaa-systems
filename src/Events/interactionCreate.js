const Event = require("../Structures/Event.js");
const Discord = require("discord.js");
const config = require("../Data/config.json");
const languageTranslation = require("../language");

module.exports = new Event("interactionCreate", async (client, interaction) => {

// if (!interaction.isCommand()) {
//   return
// }

if(interaction.isSelectMenu()) {
  if(interaction.customId == 'reactroles'){
    const value = interaction.values[0];
      if (value == 'reset') {
        return interaction.reply({content: `${languageTranslation(interaction.guild, 'AUTOROLE_DROPDOWN_RESET_MSG')}`, ephemeral: true})
      }
    let rolleV = interaction.guild.roles.cache.find((r) => r.name === value);
    let member = interaction.guild.members.cache.get(interaction.user.id);
    // await interaction.deferUpdate();
    if(!member.roles.cache.some(role => role.name === value)) {
        await member.roles.add(rolleV)
        return interaction.reply({content: `✅ ${languageTranslation(interaction.guild, 'AUTOROLE_DROPDOWN_ADDED_ROLE')}: ${value}`, ephemeral: true})
    } else if(member.roles.cache.some(role => role.name === value)) {
        await member.roles.remove(rolleV)
        return interaction.reply({content: `❌ ${languageTranslation(interaction.guild, 'AUTOROLE_DROPDOWN_REMOVED_ROLE')}: ${value}`, ephemeral: true})
    }
    // console.log(interaction.customId);
    // await interaction.deferUpdate();
    // interaction.channel.send({
    //   content: `You chose ${interaction.values[0]}`
    // });
  }
}

// const { commandName, options } = interaction

// if (commandName === 'ping') {
//   interaction.reply({
//     content: `Pong! ${client.ws.ping}ms`,
//     ephemeral: true,
//   }) 
// }else if (commandName === 'calc') {
//     const num1 = options.getNumber('num1')
//     const type = options.getString('type')
//     const num2 = options.getNumber('num2')
//   if (type === '+') {

//     interaction.reply({
//       content: `The sum from **${num1 + type + num2}** is **${num1 + num2}**`,
//       ephemeral: true,
//     })
//   } else if (type === '-') {

//     interaction.reply({
//       content: `The sum from **${num1 + type + num2}** is **${num1 - num2}**`,
//       ephemeral: true,
//     })
//   } else if (type === '*') {

//     interaction.reply({
//       content: `The sum from **${num1 + type + num2}** is **${num1 * num2}**`,
//       ephemeral: true,
//     })
//   } else if (type === '/') {

//     interaction.reply({
//       content: `The sum from **${num1 + type + num2}** is **${num1 / num2}**`,
//       ephemeral: true,
//     })
//   } else if (type === '×') {

//     interaction.reply({
//       content: `The sum from **${num1 + type + num2}** is **${num1 * num2}**`,
//       ephemeral: true,
//     })
//   }   else {
//     interaction.reply({
//       content: `ERROR!\nOnly allowed **TYPE** characters are **+ - * or × /**`,
//       ephemeral: true,
//     })
//   }
// }

if (interaction.isCommand()) {
  await interaction.deferReply({ ephemeral: false }).catch(() => {});

  const cmd = client.slashCommands.get(interaction.commandName);
  if (!cmd)
      return interaction.followUp({ content: "An error has occured " });

  const args = [];

  for (let option of interaction.options.data) {
      if (option.type === "SUB_COMMAND") {
          if (option.name) args.push(option.name);
          option.options?.forEach((x) => {
              if (x.value) args.push(x.value);
          });
      } else if (option.value) args.push(option.value);
  }
  interaction.member = interaction.guild.members.cache.get(interaction.user.id);

  cmd.run(client, interaction, args);
}


});
