/** @format */

console.clear();

const Client = require("./Structures/Client.js");
const { Collection } = require("discord.js");
const config = require("./Data/config.json");

const client = new Client();

const StateManager = require('./StateManager.js');

const WS = require("./ws/ws.js");

var ws = new WS(config.webToken, 10177, client)
client.slashCommands = new Collection();
client.aliases = new Collection();
require("./handler")(client);
client.start(config.token);
