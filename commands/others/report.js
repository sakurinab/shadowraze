const { Client, Message, MessageEmbed } = require("discord.js")
const getMemb = require("../../functions/getMember")
const cfg = require("../../settings/config")
const colors = require("../../settings/colors")

/**
 * @param {Client} bot
 * @param {Message} message
 * @param {Array} args
 */

module.exports.run = async (bot, message, args) => {
    let memb = getMemb(message, args[0])
    if(!memb) return bot.panel(null, "Укажите пользователя", null, null, "panel", null, 15)
    if(memb == message.member) return bot.panel(null, "На себя репортить нельзя", null, null, "panel", null, 15)
    let reas = args.slice(1).join(' ')
    if(!reas) return bot.panel(null, "Укажите причину жалобы", null, null, "panel", null, 15)
    let rep = new MessageEmbed()
    .setTitle("Новая жалоба!")
    .addField("Нарушитель:", memb.user, true)
    .addField("Свидетель:", message.author, true)
    .addField("Причина жалобы:", reas, true)
    .setColor(colors.default)
    bot.channels.cache.get(cfg.reportChannel).send(rep)
    .then(() => message.delete())
}