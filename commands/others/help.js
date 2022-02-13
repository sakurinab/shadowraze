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
    let trouble = args.join(' ')
    if(!trouble) return bot.panel(null, "Укажите проблему!", null, null, "panel", null, 15)
    let help = new MessageEmbed()
    .setTitle("Обратная связь")
    .addField("Пользователь:", message.author, true)
    .addField("Проблема:", trouble, true)
    .setColor(colors.default)
    bot.channels.cache.get(cfg.helpChannel).send(help)
}