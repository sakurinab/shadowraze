const { Client, Message, MessageEmbed } = require("discord.js")
const colors = require("../../settings/colors")
const getMemb = require("../../functions/getMember")
const cnvTime = require("../../functions/convertVoiceTime")
const createDbUser = require("../../functions/createDbUser")
const razbitNumber = require("../../functions/razbitNumber")

let emoji = {
    voice: ":microphone2:",
    msg: ":envelope:",
    love: ":heart:",
    lvl: ":crystal_ball:",
    inventory: ":school_satchel:"
}
/**
 * @param {Client} bot 
 * @param {Message} message 
 * @param {Array} args 
 */

module.exports.run = async (bot, message, args) => {
    function razbitXp(lvl) {
        return parseInt(5 * (lvl * lvl) + (50 * lvl) + 100);
    };
    function getBar(exp, nextAt){
        const empty = "<:lvl0:853291683277701120>";
        const bar = ["<:lvl1:853291682972172338>", "<:lvl2:853291682979512330>", "<:lvl3:853291683063791636>", "<:lvl4:853291682959196180>", "<:lvl5:853291683050815512>", empty]

        let procent = exp/nextAt;
        let line = "";
        for (let i=0;i<5;i-=-1) {
            if(procent > 0.20)
            line += bar[i]
            else
            line += empty;
            procent -=0.20
        }
        return line;
    };
    let memb = getMemb(message, args[0])
    if(!memb) memb = message.member

    User.findOne({userID: memb.id}, (err, res) => {
        if(err) throw err
        if(res){
            let marry;
            let voiceOnline = res.voice == 0 ? "0ч. 0м." : cnvTime(res.voice)
            if(res.marryID == "0") {
                marry = "Никто";
            } else {
                marry = getMemb(message, res.marryID);
                marry = marry.user.tag;
            };
        
            let profile = new MessageEmbed()
            .setTitle(`Профиль пользователя ${memb.user.tag}`)
            .setThumbnail(memb.user.displayAvatarURL({format: "png", dynamic: true, size: 1024}))
            .addField("> Статус:", `\`\`\`${res.status}\`\`\``, false)
            .addField(`> Голосовой онлайн:`, `\`\`\`${voiceOnline}\`\`\``, true)
            .addField(`> Сообщений:`, `\`\`\`${razbitNumber(res.msgs)}\`\`\``, true)
            .addField(`> Отношения:`, `\`\`\`${marry}\`\`\``, true)
            .addField(`> Уровень:`, "```"+`${res.lvl}`+"```", true)
            .addField(`> Инвентарь:`, `${bot.values.crown} \`${razbitNumber(res.crown)}\` ${bot.values.gem} \`${razbitNumber(res.gem)}\`\n${bot.values.key} \`${razbitNumber(res.key)}\` ${bot.values.gift} \`${razbitNumber(res.gift)}\``, true)
            .setColor(colors.default)
            //.setImage(res.profileImg)

            message.channel.send(profile)
        } else {
            res = createDbUser(memb)

            let voiceOnline = res.voice == 0 ? "0ч. 0м." : cnvTime(res.voice)
            let marry = getMemb(message, res.marryID)
            if(!marry) marry = "Отсутствует"
            else marry = marry.user.tag
        
            let profile = new MessageEmbed()
            .setTitle(`Профиль пользователя ${memb.user.tag}`)
            .setThumbnail(memb.user.displayAvatarURL({format: "png", dynamic: true, size: 1024}))
            .addField("> Статус:", `\`\`\`${res.status}\`\`\``,false)
            .addField(`> Голосовой онлайн:`, `\`\`\`${voiceOnline}\`\`\``, true)
            .addField(`> Сообщений:`, `\`\`\`${razbitNumber(res.msgs)}\`\`\``, true)
            .addField(`> Отношения:`, `\`\`\`${marry}\`\`\``, true)
            .addField(`> Уровень:`, "```"+`${res.lvl}`+"```", true)
            .addField(`> Инвентарь:`, `${bot.values.crown} \`${razbitNumber(res.crown)}\` ${bot.values.gem} \`${razbitNumber(res.gem)}\`\n${bot.values.key} \`${razbitNumber(res.key)}\` ${bot.values.gift} \`${razbitNumber(res.gift)}\``, true)
            .setColor(colors.default)
            //.setImage(res.profileImg)

            message.channel.send(profile)
        }
    })
}