const Discord = require("discord.js");
const client = new Discord.Client();

const token = require('dotenv').config();

const config = {
    token: process.env.TOKEN,
    mail: process.env.MAIL,
    pass: process.env.PASSWORD,
};

// Module to made bot with proxy
// Tạo bot bằng proxy
var mineflayer = require('mineflayer');

client.on('ready', () => {
    console.log('Bot online!');

    createBot();
});

function createBot() {
    const bot = mineflayer.createBot({
		host: 'connect.2b2t.org',
		port: 25565,
        username: config.mail,
        password: config.pass,
		version: "1.12.2"
    });

    // set id channel to get notify
    var notifyChannel = "<Channel to restart notify>";

    bot.on('message', msg => {
        var message = msg.toString();
        if(message === "[SERVER] Server restarting in 15 minutes...") {
            if(!restarts15m) {
                restarts15m = true;
                // Custom you like: @everyone
                client.channels.cache.get(notifyChannel).send("@everyone " + message);
            }
        }

        if(message === "[SERVER] Server restarting in 5 minutes...") {
            if(!restarts5m) {
                restarts5m = true;
                // Custom you like: @veryone
                client.channels.cache.get(notifyChannel).send("@everyone " + message);
            }
        }
        
        if( message === "[SERVER] Server restarting in 15 seconds...") {
            if(message == undefined) return;
            // Custom you like: @veryone
            client.channels.cache.get(notifyChannel).send("@everyone " + message);
        }
    });


    bot.on('end', () => {
        setTimeout(() => {
            createBot();
        }, 3 * 60 * 1000); // DEFAULT is 3 mins and reconnect to the server.
    });
}

client.login(config.token).catch(err => console.log(err));
client.on("error", (e) => { console.error(e) });