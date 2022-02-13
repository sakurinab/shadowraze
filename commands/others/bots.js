const { Client, Message, MessageEmbed } = require("discord.js")
const getMemb = require("../../functions/getMember")
const colors = require("../../settings/colors")

const botz = ["853583833747161091", "866956216420007946"]
const botzinfo = {
    "853583833747161091": ".>",
    "866956216420007946": "./",
}
/**
 * @param {Client} bot
 * @param {Message} message
 * @param {Array} args
 */

module.exports.run = async (bot, message, args) => {
    let info = new MessageEmbed()
    .setTitle(" Музыкальные боты ")
    .setColor(colors.default)
    for(let i = 0;i < botz.length;i++){
        let bot = getMemb(message, botz[i], true)
        let name = botzinfo[botz[i]].split(".")[0]
        let prefix = botzinfo[botz[i]].split(".")[1]
        let status = "🟢"
        if(bot.voice.channel) status = "🔴"
        info.addField(`${name} ${bot.user.username}`, `>>> Префикс: \`${prefix}\`\nСостояние: ${status}`, true)
    }
    message.channel.send(info)
}