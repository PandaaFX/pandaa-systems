const { glob } = require("glob");
const { promisify } = require("util");
const { Client } = require("discord.js");

const globPromise = promisify(glob);

/**
 * @param {Client} client
 */


 module.exports = async (client) => {

    // Slash Commands
    const slashCommands = await globPromise(
        `${process.cwd()}/src/SlashCommands/*/*.js`
    );

    const arrayOfSlashCommands = [];
    slashCommands.map((value) => {
        const file = require(value);
        if (!file?.name) return;
        client.slashCommands.set(file.name, file);

        if (["MESSAGE", "USER"].includes(file.type)) delete file.description;
        arrayOfSlashCommands.push(file);
    });
    // console.log(arrayOfSlashCommands)
    client.on("ready", async () => {
        // Register for a single guild
        await client.guilds.cache
            .get("582218335521865750")
            .commands.set(arrayOfSlashCommands);

        // console.log("STARTRDSTARTRDSTARTRDSTARTRDSTARTRDSTARTRD");

        // Register for all the guilds the bot is in
        // await client.application.commands.set(arrayOfSlashCommands);
    });
};