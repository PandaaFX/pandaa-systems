const { Client, CommandInteraction } = require("discord.js");

module.exports = {
    name: "calc",
    description: "Calculator",
    options: [
      {
        name: 'num1',
        description: 'The first number.',
        required: true,
        type: 'NUMBER'
      },
      {
        name: 'type',
        description: 'The type of the calculation.',
        required: true,
        type: 'STRING'
      },
      {
        name: 'num2',
        description: 'The second number.',
        required: true,
        type: 'NUMBER'
      },
    ],
    type: 'CHAT_INPUT',
    /**
     *
     * @param {Client} client
     * @param {CommandInteraction} interaction
     * @param {String[]} args
     */
    run: async (client, interaction, args) => {
        // interaction.followUp({ content: `${client.ws.ping}ms!` });
            const { options } = interaction;
            const num1 = options.getNumber('num1')
            const type = options.getString('type')
            const num2 = options.getNumber('num2')
            
            interaction.followUp({
                content: `Calculating...`,
                ephemeral: true,
            })

        setTimeout(function(){ 
            
        if (type === '+') {

            interaction.editReply({
            content: `The sum from **${num1 + type + num2}** is **${num1 + num2}**`,
            ephemeral: true,
            })
        } else if (type === '-') {

            interaction.editReply({
            content: `The sum from **${num1 + type + num2}** is **${num1 - num2}**`,
            ephemeral: true,
            })
        } else if (type === '*') {

            interaction.editReply({
            content: `The sum from **${num1 + type + num2}** is **${num1 * num2}**`,
            ephemeral: true,
            })
        } else if (type === '/') {

            interaction.editReply({
            content: `The sum from **${num1 + type + num2}** is **${num1 / num2}**`,
            ephemeral: true,
            })
        } else if (type === '×') {

            interaction.editReply({
            content: `The sum from **${num1 + type + num2}** is **${num1 * num2}**`,
            ephemeral: true,
            })
        }   else {
            interaction.editReply({
            content: `ERROR!\nOnly allowed **TYPE** characters are **+ - * or × /**`,
            ephemeral: true,
            })
        }
        }, 3000);
    },
};
