const { Client, Message } = require("discord.js")

/**
 * @param {Client} bot
 * @param {Message} message
 * @param {Array} args
 */

module.exports.run = async (bot, message, args) => {
    if(!bot.admins.includes(message.author.id)) return
    bot.panel(null, `Количество ролей на сервере — **${message.guild.roles.cache.size}**`, null, null, "panel")
}