
const { Client, IntentsBitField } = require('discord.js');
const config = require('./config');
const axios = require('axios')
const {bot} = require('./config');
const api = bot.api;
const api2 = bot.api2;
const prefix = config.bot.prefix;

const abot = new Client({
    intents: [
        IntentsBitField.Flags.Guilds,
        IntentsBitField.Flags.GuildMessages,
        IntentsBitField.Flags.MessageContent,
        IntentsBitField.Flags.GuildMembers,
        IntentsBitField.Flags.DirectMessages,
        IntentsBitField.Flags.GuildMessageReactions,
        IntentsBitField.Flags.DirectMessageReactions,
        IntentsBitField.Flags.GuildMessageTyping,
        IntentsBitField.Flags.DirectMessageTyping,
    ],
});

abot.once('ready', async () => {
  console.log(`Logged in as ${abot.user.tag}`);
  

});



abot.on('messageCreate', async (message) => {
  if (message.author.bot) {
    return;
  }
if (message.content.startsWith(`${prefix}h`)){
 message.reply('h')
}

if (message.content.startsWith(`${prefix}test`)) {
    try {
        axios.get(api)
            .then((response) => {
                const data = response.data.result;
                if (data) {
                    message.channel.send(`${data}`);
                    message.channel.send(`API Response: ${data}`);
                } else {
                    message.channel.send('The API response format is not as expected.');
                }
            })
            .catch((error) => {
                if (error.response && error.response.status === 429) {
                    const rateLimitMessage = error.response.data.error;
                    message.channel.send(rateLimitMessage);
                } else {
                    console.error('Error:', error);
                    message.channel.send('An error occurred while processing the command.');
                }
            });
    } catch (error) {
        console.error('Error fetching data from the API:', error);
        message.channel.send('An error occurred while fetching data from the API.');
    }
}

if (message.content.startsWith(`${prefix}api`)) {
    try {
        axios.get(api2)
            .then((response) => {
                const data = response.data.result;
                if (data) {
                    message.channel.send(`${data}`);
                } else {
                    message.channel.send('The API response format is not as expected.');
                }
            })
            .catch((error) => {
                if (error.response && error.response.status === 429) {
                    const rateLimitMessage = error.response.data.error;
                    message.channel.send(rateLimitMessage);
                } else {
                    console.error('Error:', error);
                    message.channel.send('An error occurred while processing the command.');
                }
            });
    } catch (error) {
        console.error('Error fetching data from the API:', error);
        message.channel.send('An error occurred while fetching data from the API.');
    }
}
        
});
        
abot.login(config.bot.token);


