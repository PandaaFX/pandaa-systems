const Discord = require("discord.js");

const Client = require("./Client.js");

/**
 * @template {keyof Discord.ClientEvents} K
 * @param {client} client 
 * @param  {Discord.ClientEEvents[K]} eventArgs 
 */
function RunFunction(client, ...eventArgs) {}
/**
 * @template {keyof Discord.ClientEvents} K
 */
class Event {
    /**
     * 
     * @param {K} event 
     * @param {RunFunction<K>} runFunction 
     */
    constructor(event, runFunction) {
        this.event = event;
        this.run = runFunction;
    }

}

module.exports = Event;