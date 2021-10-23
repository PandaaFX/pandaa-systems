const StateManager = require('./StateManager');
const guildCommandLanguages = new Map();

const lang = require('./Data/lang.json');


module.exports = (guild, textId) => {
    if (!lang.translations[textId]) {
        throw new Error(`Unknown text ID "${textId}"`)
    }

    const selectedLanguage = guildCommandLanguages.get(guild.id);

    return lang.translations[textId][selectedLanguage]
}

StateManager.on('languageFetched', (guildId, language) => {
    // console.log(guildId, prefix);
    guildCommandLanguages.set(guildId, language);
    })