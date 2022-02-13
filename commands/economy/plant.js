const { Client, Message } = require("discord.js")
const razbitNumber = require("../../functions/razbitNumber")
const stn = require("../../functions/strToNumber")

/**
 * @param {Client} bot
 * @param {Message} message
 * @param {Array} args
 */

module.exports.run = async (bot, message, args) => {
    User.findOne({userID: message.author.id}, (err, res) => {
        if(err) throw err
        if(res){
            let summ = stn(args.join(' '))
            if(args[0] == "all") summ = res.crown
            if(isNaN(summ)) return bot.panel(null, "Укажите корректную сумму", null, null, "panel", null, 15)
            if(summ < 1) return bot.panel(null, "Укажите корректную сумму", null, null, "panel", null, 15)
            if(summ > res.crown) return bot.panel(null, `У вас недостаточно средств`, null, null, "panel", null, 15)
            res.crown -= summ
            res.save()
            Drop.findOne({channelID: message.channel.id}, (error, data) => {
                if(error) throw error
                if(data){
                    data.count += summ
                    data.save()
                } else {
                    res = new Drop({channelID: message.channel.id, count: summ})
                    res.save()
                }
                bot.panel(null, `Вы выбросили ${razbitNumber(summ)}${bot.values.crown}`, null, null, "panel")
            })
        }
    })
}