const { Client, Message } = require("discord.js")
const razbitNumber = require("../../functions/razbitNumber")

/**
 * @param {Client} bot
 * @param {Message} message
 * @param {Array} args
 */

module.exports.run = async (bot, message, args) => {
    User.findOne({userID: message.author.id}, (err, res) => {
        if(err) throw err
        if(res){
            Drop.findOne({channelID: message.channel.id}, (error, data) => {
                if(error) throw error
                if(data){
                    res.crown += data.count
                    data.remove()
                    res.save()
                    bot.panel(null, `Вы подняли ${razbitNumber(data.count)}${bot.values.crown}`, null, null, "panel")
                }
            })
        }
    })
}