const { MessageEmbed, Message } = require("discord.js");
const config = require("../../botconfig/config.json");
const ee = require("../../botconfig/embed.json");
const { paginationEmbed } = require("../../handlers/functions");
module.exports = {
    name: "commands",
    category: "Information",
    aliases: ["cmd", "cmds"],
    cooldown: 4,
    usage: "commands",
    description: "Shows all available Commands",
    run: async (client, message, args, user, text, prefix) => {
      try{
       
        //SONG CMD
let string1 = `\`\`\`fix
--disconnect -- Disconnects the bot from the voice channel
--loop       -- Toggles looping for the current playing song
--pause      -- Pauses the current playing track
--play       -- Play a song from YouTube with the given name/url
--resume     -- Resumes paused music
--skip       -- Votes to skip the current playing song
\`\`\``
//QUEUE CMD
let string2 = `\`\`\`fix
--clear      -- Clears the whole queue
\`\`\``
//Information CMD 
let string3 = `\`\`\`fix
--commands   -- Shows all available Commands
--help       -- Shows you Help for Milrato x Rythm
\`\`\``     
        let pages = [
          {"title": "SONG COMMANDS", "msg": string1},
          {"title": "QUEUE COMMANDS", "msg": string2},
          {"title": "INFORMATION COMMANDS", "msg": string3},
        ]
        paginationEmbed(message, pages, ['⏪', '⏩', "⏹"], 60000)

    } catch (e) {
        console.log(String(e.stack).bgRed)
        return message.channel.send(new MessageEmbed()
            .setColor(ee.wrongcolor)
            .setFooter(ee.footertext, ee.footericon)
            .setTitle(`❌ ERROR | An error occurred`)
            .setDescription(`\`\`\`${e.stack}\`\`\``)
        );
    }
  }
}
