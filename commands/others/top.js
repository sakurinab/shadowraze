const { Client, Message, MessageEmbed } = require("discord.js")
const convertVoice = require("../../functions/convertVoiceTime")
const razbitNumber = require("../../functions/razbitNumber")
const a = ["message", "voice", "money", "$", "bal", "balance"]

/**
 * @param {Client} bot
 * @param {Message} message
 * @param {Array} args
 */

module.exports.run = async (bot, message, args) => {
    let numbers = {
        0: "<:S_1:942084483765637220>",
        1: "<:S_1:942084483765637220>",
        2: "<:S_2:942084483664998450> ",
        3: "<:S_3:942084483774025778>",
        4: "<:S_4:942084483694338068>",
        5: "<:S_5:942084483220377610>",
        6: "<:S_6:942084483383971841>",
        7: "<:S_7:942084483472056390>",
        8: "<:S_8:942084483186843648>",
        9: "<:S_9:942084483019067412>",
        10: "<:S_10:942084483648208976>"
    };
    if(args[0] == a[0]){
        User.find({inTopChat: true}).sort([['msgs','descending']]).exec((err,res) => {
            if(err) throw err;
            if(res && res.length > 0){
                let toptext = ""
                let mon = ""
                if(res.length <= 10){
                    for(let i = 0;i < res.length;i++){
                        toptext = toptext + `${numbers[i + 1]} <@!${res[i].userID}>\n`
                        mon = mon + `**${res[i].msgs}**\n`
                    }
                } else {
                    for(let i = 0;i < 10;i++){
                        toptext = toptext + `${numbers[i + 1]} <@!${res[i].userID}>\n`
                        mon = mon + `**${res[i].msgs}**\n`
                    }
                }
                let topmoney = new MessageEmbed()
                .setTitle("Топ пользователей по чату")
                .addField(`** **`, toptext, true)
                .addField(`** **`, mon, true)
                .setColor("#36393f")
                //.setImage("https://cdn.discordapp.com/attachments/852532626878103632/852532673255702568/TopServer.gif")
                message.channel.send(topmoney)
            } else {
                return bot.panel(null, `Таблица этого сервера пуста`, null, null, "panel", null, 15)
            }
        })
    } else if(args[0] == a[1]){
        User.find({inTopVoice: true}).sort([['voice','descending']]).exec((err,res) => {
            if(err) throw err;
            if(res && res.length > 0){
                let toptext = ""
                let mon = ""
                if(res.length < 10){
                    for(let i = 0;i < res.length;i++){
                        toptext = toptext + `${numbers[i + 1]} <@!${res[i].userID}>\n`
                        mon = mon + `**${convertVoice(res[i].voice) || "0ч. 0м."}**\n`
                    }
                } else {
                    for(let i = 0;i < 10;i++){
                        toptext = toptext + `${numbers[i + 1]} <@!${res[i].userID}>\n`
                        mon = mon + `**${convertVoice(res[i].voice) || "0ч. 0м."}**\n`
                    }
                }
                let topmoney = new MessageEmbed()
                .setTitle("Топ пользователей по онлайну")
                .addField(`** **`, toptext, true)
                .addField(`** **`, mon, true)
                .setColor("#36393f")
                //.setImage("https://cdn.discordapp.com/attachments/852532626878103632/852532673255702568/TopServer.gif")
                message.channel.send(topmoney)
            } else {
                return bot.panel(null, `Таблица этого сервера пуста`, null, null, "panel", null, 15)
            }
        })
    } else if(args[0] == a[2] || args[0] == a[3] || args[0] == a[4] || args[0] == a[5]){
        User.find({inTopMoney: true}).sort([['crown','descending']]).exec((err,res) => {
            if(err) throw err;
            if(res && res.length > 0){
                let toptext = ""
                let mon = ""
                if(res.length < 10){
                    for(let i = 0;i < res.length;i++){
                        toptext = toptext + `${numbers[i + 1]} <@!${res[i].userID}>\n`
                        mon = mon + `**${razbitNumber(res[i].crown)}**\n`
                    }
                } else {
                    for(let i = 0;i < 10;i++){
                        toptext = toptext + `${numbers[i + 1]} <@!${res[i].userID}>\n`
                        mon = mon + `**${razbitNumber(res[i].crown)}**\n`
                    }
                }
                let topmoney = new MessageEmbed()
                .setTitle("Топ пользователей по душам")
                .addField(`** **`, toptext, true)
                .addField(`** **`, mon, true)
                .setColor("#36393f")
                //.setImage("https://cdn.discordapp.com/attachments/852532626878103632/852532673255702568/TopServer.gif")
                message.channel.send(topmoney)
            } else {
                return bot.panel(null, `Таблица этого сервера пуста`, null, null, "panel", null, 15)
            }
        })
    }
}