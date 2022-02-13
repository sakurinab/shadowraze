const { Client, Message, MessageEmbed } = require("discord.js")
const moment = require("moment")
const getMember = require("../../functions/getMember")
const formats = require("../../functions/formatPayment")
const ms = require("ms")

/**
 * @param {Client} bot
 * @param {Message} message
 * @param {Array} args
*/

module.exports.run = async (bot, message, args) => {
    let memb = getMember(message, args[0])
    if(!memb) memb = message.member
    if(memb.user.bot == true) memb = message.member
    Pair.findOne({authorID: memb.user.id}, (error, pair) => {
        if(error) throw error
        if(pair) {
            User.findOne({userID: memb.user.id}, (err, res) => {
                if(err) throw err
                if(res) {
                    let u = getMember(message, res.marryID)
                    let e = new MessageEmbed()
                    .setTitle("⸝⸝ ♡₊˚ Профиль пары◞")
                    .setThumbnail(message.author.displayAvatarURL({format: "png", dynamic: true, size: 1024}))
                    .setColor("#36393f")
                    .addField("Статус:", `\`\`\`${pair.status}\`\`\``)
                    .addField(`💞 В отношениях с:`, `> ${u ? u.user : "Неизвестно"}`)
                    .addField(`🗓️ Дата регистрации пары:`, "> " + moment(pair.date).format("DD.MM.YYYY"))
                    .addField(`💳 Баланс пары:`, "> " + pair.bank + bot.values.crown)
                    .addField(`🕚 До оплаты осталось:`, "> " + formats(parseInt((pair.payment + ms("31d")) - Date.now())))
                    return message.channel.send(e)
                }
            })
        } else {
            Pair.findOne({memberID: memb.user.id}, (err, pairs) => {
                if(err) throw err
                if(pairs) {
                    User.findOne({userID: memb.user.id}, (err, res) => {
                        if(err) throw err
                        if(res) {
                            let u = getMember(message, res.marryID)
                            let e = new MessageEmbed()
                            .setTitle("⸝⸝ ♡₊˚ Профиль пары◞")
                            .setThumbnail(message.author.displayAvatarURL({format: "png", dynamic: true, size: 1024}))
                            .setColor("#36393f")
                            .addField("Статус:", `\`\`\`${pairs.status}\`\`\``)
                            .addField(`💞 В отношениях с:`, `> ${u ? u.user : "Неизвестно"}`)
                            .addField(`🗓️ Дата регистрации пары:`, "> " + moment(pairs.date).format("DD.MM.YYYY"))
                            .addField(`💳 Баланс пары:`, "> " + pairs.bank + bot.values.crown)
                            .addField(`🕚 До оплаты осталось:`, "> " +  formats(parseInt((pairs.payment + ms("31d")) - Date.now())))
                            return message.channel.send(e)
                        }
                    })
                } else {
                    return bot.panel(null, `У пользователя нету пары`, null, null, "panel") 
                }
            })
        }
    })
}