CREATE DATABASE DiscordDb;

CREATE TABLE Guilds (
    guildId VARCHAR(100) NOT NULL PRIMARY KEY,
    guildOwnerId VARCHAR(100) NOT NULL
);

CREATE TABLE GuildConfigurable (
    guildId VARCHAR(100) NOT NULL PRIMARY KEY,
    cmdPrefix VARCHAR(10) DEFAULT 'fx',
    serverLang VARCHAR(10) DEFAULT 'en',
    welcomeChannel VARCHAR(100) DEFAULT '/',
    welcomeRole VARCHAR(100) DEFAULT '/',
    welcomeRole2 VARCHAR(100) DEFAULT '/',
    welcomeRole3 VARCHAR(100) DEFAULT '/',
);