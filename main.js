require('dotenv').config()
const { Client, Intents, MessageEmbed} = require('discord.js');
const client = new Client({ intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MESSAGES] });
const {prefix, id, author, channelid} = require('./config.json');
const reponse = require('./data/reponse.json');

client.on('message', msg => {

    if(!msg.guild) return;
    if(msg.author.bot) return;
    const args = msg.content.slice(prefix.length).trim().split("-");
    if (msg.channel.id === channelid) {

        if(msg.content === (`<@!${id}>`)){    
            let helpembed = new MessageEmbed()
                .setColor('#0099ff')
                .setTitle('Page d\'aide :')
                .setDescription(
                    "Oui je sais je m’appelle Actix et pas Actyx en fait je suis le bot d’Actyx....\nPour l’instant je sert uniquement pour l’évent de son anniv (cette blg elle est né le 17 décembre)."
                )
                .addField('Commandes :', '`!<n° question>-<réponse>`', true)
                .setFooter(`<> = information obligatoire • made by ${author}`);
    
            msg.channel.send({ embeds: [helpembed] });
        }
        if(msg.content.startsWith(prefix)){
            if(args[0] < 1 || args[0] > 30){
                msg.channel.send(':x: Désolé cette question n\'existe pas.')
            } else {
                if(reponse[args[0]] === args[1]){
                    msg.channel.send('bravo')
                } else {
                    msg.channel.send('fail')
                }
            }
        }
    }
})

client.on('ready', () => {
    console.log('I\'m ready !')
})

client.login(process.env.TOKEN);