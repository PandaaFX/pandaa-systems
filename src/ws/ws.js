const express = require('express');
const hbs = require('express-handlebars');
const bodyParser = require('body-parser');
const path = require('path');
const config = require("../Data/config.json");
const Discord = require("discord.js");

class WebSocket {
    
    constructor(token, port, client) {
        this.token = token
        this.client = client
        // console.log(this.token);
        this.app = express()
        this.app.engine('hbs', hbs({
            extname: 'hbs',
            defaultLayout: 'layout',
            layoutsDir: __dirname + '/layouts'
        }))
        this.app.set('views', path.join(__dirname, 'views'))
        this.app.set('view engine', 'hbs')
        this.app.set('trust proxy', true)
        this.app.use(express.static(path.join(__dirname, 'public')))
        this.app.use(bodyParser.urlencoded({ extended: false }))
        this.app.use(bodyParser.json())
        this.registerRoots()

        this.server = this.app.listen(port, () => {
            console.log(`Websocket listening on port ${this.server.address().port}`)
        })
    }
    
    checkToken(_token) {
        if(this.token.indexOf(_token) !== -1){
            // alert("Value exists!")
            // console.log("EXSISTING");
            if (_token == config.webToken[1]) {
                console.log("---------------------------------------------");
                console.log("QUIXY ACCESS PAGE " + new Date().toLocaleString("de-DE", { timeZone: "Europe/Berlin" }));
                return "quixy";
            } else {
                console.log("---------------------------------------------");
                console.log("ADMIN ACCESS PAGE " + new Date().toLocaleString("de-DE", { timeZone: "Europe/Berlin" }));
                return "admin";
            }
        } else{
            // console.log("NON EXSISTING");
            // alert("Value does not exists!")
            return false;
        }
    }
    checkTokenLogin(_token) {
        // console.log(_token);

        if(this.token.indexOf(_token) !== -1){
            // alert("Value exists!")
            // console.log("EXSISTING");
            if (_token == config.webToken[1]) {
                console.log("---------------------------------------------");
                console.log("QUIXY GUILD SELECT PAGE " + new Date().toLocaleString("de-DE", { timeZone: "Europe/Berlin" }));
                return "quixyL";
            } else {
                console.log("---------------------------------------------");
                console.log("ADMIN GUILD SELECT PAGE " + new Date().toLocaleString("de-DE", { timeZone: "Europe/Berlin" }));
                return "adminL";
            }
        } else{
            // console.log("NON EXSISTING");
            // alert("Value does not exists!")
            return false;
        }
    }
    registerRoots() {
        this.app.get('/', (req, res) => {

            res.render('login', {
                title: 'LOGIN'
            })
            
        })
        this.app.post('/guild', (req, res) => {
            var _token = req.body.token
            if (!this.checkTokenLogin(_token)) {
                // console.log(this.checkToken(_token));
                res.render('error', { title: 'ERROR', errtype: 'INVALID TOKEN' })
                return
            } else if (this.checkTokenLogin(_token) == "quixyL"){
                // quixy(this.client);
                try {
                    const logd = this.client.guilds.cache.map(guild => guild.id);
                    const logdd = this.client.guilds.cache.map(guild => guild.name);
                    quixyL(this.client, logd, logdd, _token);
                 }
                 catch (e) {
                    // Anweisungen für jeden Fehler
                    console.log(e); // Fehler-Objekt an die Error-Funktion geben
                 }
                // console.log("quixy");
            } else if (this.checkTokenLogin(_token) == "adminL"){
                // quixy(this.client);
                try {
                    const logd = this.client.guilds.cache.map(guild => guild.id);
                    const logdd = this.client.guilds.cache.map(guild => guild.name);
                        adminL(this.client, logd, logdd, _token);

                        // console.log(logd);
                        // console.log(logdd);
                 }
                 catch (e) {
                    // Anweisungen für jeden Fehler
                    console.log(e); // Fehler-Objekt an die Error-Funktion geben
                 }
                // console.log("admin");
            }
            function quixyL(client, serverID, serverN, token) {


                var serverselect = []

                serverID.forEach(function(item, index){
                    // console.log(item, serverN[index])
                    if (item == "808260125709828116") {

                        serverselect.push({id: item, name: serverN[index]})
                    }

                  });


            res.render('guild', {
                title: 'SELECT GUILD',
                token,
                serverselect
            })
            }
            function adminL(client, serverID, serverN, token) {


                var serverselect = []

                serverID.forEach(function(item, index){
                    // console.log(item, serverN[index])
                    serverselect.push({id: item, name: serverN[index]})
                  });

                res.render('guild', {
                    title: 'SELECT GUILD',
                    token,
                    serverselect
                })
            }
            
        })
        this.app.post('/login', (req, res) => {
            var _token = req.body.token
            var _guild = req.body.guild
            // console.log(JSON.stringify(_token));
            // console.log(JSON.stringify(_guild));

            if (!this.checkToken(_token)) {
                // console.log(this.checkToken(_token));
                // res.render('error', { title: 'ERROR', errtype: 'INVALID TOKEN' })
                return
            }
            else if (this.checkToken(_token) == "quixy"){
                // quixy(this.client);
                try {
                        quixy(this.client, _guild);
                 }
                 catch (e) {
                    // Anweisungen für jeden Fehler
                    console.log(e); // Fehler-Objekt an die Error-Funktion geben
                 }
                // console.log("quixy");
            } else if (this.checkToken(_token) == "admin"){
                // quixy(this.client);
                try {
                        admin(this.client, _guild);
                 }
                 catch (e) {
                    // Anweisungen für jeden Fehler
                    console.log(e); // Fehler-Objekt an die Error-Funktion geben
                 }
                // console.log("admin");
            }

            function quixy(client, guild) {
                var chans = []
            let server = client.guilds.cache.get(guild)
            server.channels.cache
                .filter(c => c.type === 'GUILD_TEXT')
                .forEach(c => {
                    chans.push({id: c.id, name: c.name})
                    })

            res.render('indexQ', {
                title: 'discordBot webinterface QUIXY',
                token: _token,
                guild: _guild,
                chans
            })
            }
            function admin(client, guild) {
                
                var chans = []
                let server = client.guilds.cache.get(guild)
                const RolesName = server.roles.cache.map(role => role.name);
                const RolesID = server.roles.cache.map(role => role.id);
                var roleselect = []
                RolesID.forEach(function(item, index){
                    // console.log(item, serverN[index])
                    if (RolesName[index] != "@everyone") {
                    roleselect.push({id: item, name: RolesName[index]})
                    }
                  });
                
                //   console.log(roleselect);
                // console.log(index);

                server.channels.cache
                .filter(c => c.type === 'GUILD_TEXT')
                .forEach(c => {
                    chans.push({id: c.id, name: c.name})
                })
                
                res.render('index', {
                    title: 'discordBot webinterface',
                    token: _token,
                    guild: _guild,
                    chans,
                    roleselect
                })
            }
        })

        this.app.post('/sendMessage', (req, res) => {
            var _token = req.body.token
            var text = req.body.text
            var _guild = req.body.guild
            var channelid = req.body.channelid

            if (!this.checkToken(_token))
                return

            var chan = this.client.channels.cache.get(channelid)

            if (chan) {
                chan.send(text)
                auditlog(this.client, "sendMessage", "Es wurde eine Nachricht in <#" + channelid + "> versendet!\n ```TEXT: " + text + "```\n", _guild)
            }
        })
        function auditlog(client, log, msg, server) {

            const embed = new Discord.MessageEmbed();

        embed
            .setTitle(log)
            .setDescription(msg)
            .setColor("BLURPLE")
            .setFooter("SERVER ID: " + server)
            .setTimestamp()

            client.channels.cache.get(`891685366694805554`).send({ embeds: [embed] });

        
        }
        this.app.post('/sendEmbed', (req, res) => {
            var _token = req.body.token
            var _guild = req.body.guild
            var title = req.body.title
            var desc = req.body.desc
            var color = req.body.color
            // var fieldname = req.body.fieldname
            // var title = req.body.title
            // var fieldvalue = req.body.fieldvalue
            var channelid = req.body.channelid

            if (!this.checkToken(_token))
                return

            var chan = this.client.channels.cache.get(channelid)

            const embed = new Discord.MessageEmbed();

        embed
            .setTitle(title)
            .setDescription(desc)
            .setColor(color)
            .setFooter("darkbluepandaa.de")
            .setTimestamp()
            // .addFields(
            //     {
            //         name: fieldname,
            //         value: fieldvalue,
            //         inline: false,
            //     },
            // );
            if (!title ||!desc || !color) {
                console.log("FILL OUT EVERYTHING");
                return;
            }
            if (chan) {
                chan.send({ embeds: [embed] })
                auditlog(this.client, "sendEmbed", "Es wurde eine Embed-Nachricht in <#" + channelid + "> versendet!\n ```TITLE: " + title + "\nDESC: " + desc + "\nCOLOR: " + color + "```\n", _guild)

            }
        })
        this.app.post('/setRole', (req, res) => {
            var _token = req.body.token
            var _guild = req.body.guild
            var MID = req.body.memberid
            var RID = req.body.roleid
            // console.log("MEMBERID: " + MID + " ROLEID: " + RID)
            var ipe = req.headers['x-forwarded-for'] || req.connection.remoteAddress;
            var ip = ipe.replace(/::ffff:/g, '')
            // console.log(ip);
            var allowedip = [
                "91.32.101.106"

            ]
            if (allowedip.indexOf(ip) !== -1) {
                
                if (!this.checkToken(_token))
                return
                // PANDAAFX SERVER ID
                let server = this.client.guilds.cache.get(_guild)
                let role = server.roles.cache.find(r => r.id === RID)
                let member = server.members.cache.get(MID)
                let hasrole = member.roles.cache.has(RID)
                if (role) {
                    if(!role.editable) return auditlog(this.client, "setRole", "Es wurde versucht eine Rolle zu vergeben, aber der Bot besitzt nicht genügend Rechte!\n```USER ID: " + MID + "\nROLE ID: " + RID + "```", _guild);
                    if (!hasrole) {
                        member.roles.add(role)
                        auditlog(this.client, "setRole", "Es wurde eine Rolle vergeben!\n```USER ID: " + MID + "\nROLE ID: " + RID + "```", _guild)
                        res.render('success', { title: 'SUCCESS', successtype: 'SUCCESSFULLY SET ROLE OF MEMBER' })
                    } else {
                        auditlog(this.client, "setRole", "Es wurde versucht eine Rolle vergeben, aber der User besitzt diese schon!\n```USER ID: " + MID + "\nROLE ID: " + RID + "```", _guild)
                        return
                    }
                }
            } else {
                res.render('error', { title: 'ERROR', errtype: 'THIS IP IS NOT WHITELISTED!' })
                console.log('ERROR: THE IP: ' + ip + ' IS NOT WHITELISTED!')
            }
        })
        this.app.post('/removeRole', (req, res) => {
            var _token = req.body.token
            var _guild = req.body.guild
            var MID = req.body.memberid
            var RID = req.body.roleid
            // console.log("MEMBERID: " + MID + " ROLEID: " + RID)
            var ipe = req.headers['x-forwarded-for'] || req.connection.remoteAddress;
            var ip = ipe.replace(/::ffff:/g, '')
            // console.log(ip);
            var allowedip = [
                "91.32.101.106"
            ]
            if (allowedip.indexOf(ip) !== -1) {
                
                if (!this.checkToken(_token))
                return
                let server = this.client.guilds.cache.get(_guild)
                let role = server.roles.cache.find(r => r.id === RID)
                let member = server.members.cache.get(MID)
                let hasrole = member.roles.cache.has(RID)

                if (role) {
                    if (hasrole) {

                        member.roles.remove(role)
                        auditlog(this.client, "removeRole", "Es wurde eine Rolle entfernt!\n```USER ID: " + MID + "\nROLE ID: " + RID + "```", _guild)
                        res.render('success', { title: 'SUCCESS', successtype: 'SUCCESSFULLY REMOVED ROLE OF MEMBER' })
                    } else {
                        auditlog(this.client, "removeRole", "Es wurde versucht eine Rolle zu entfernen, aber der User besitzt diese nicht!\n```USER ID: " + MID + "\nROLE ID: " + RID + "```", _guild)
                        return
                    }
                }
            } else {
                res.render('error', { title: 'ERROR', errtype: 'THIS IP IS NOT WHITELISTED!' })
                console.log('ERROR: THE IP: ' + ip + ' IS NOT WHITELISTED!')
            }
        })
    }

}

module.exports = WebSocket