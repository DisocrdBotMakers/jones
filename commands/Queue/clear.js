module.exports = {
  name: `clear`,
  category: `Queue`,
  aliases: [`clearqueue`, "clearqu", "clearq", "cl"],
  description: `Clears the whole queue`,
  usage: `clearqueue`,
  run: async (client, message, args, cmduser, text, prefix) => {
      // Get the voice channel of the member
      const { channel } = message.member.voice;
      // If the member is not connected to a voice channel, return error
      if (!channel)  return message.channel.send(`:x: **You must be in a voice channel to use this command.**`);
      // Send error if member is deafened
      if(message.member.voice.selfDeaf) return message.channel.send(`:x: **You cannot run this command while deafened.**`);
      // Get voice channel of the bot
      const botchannel = message.guild.me.voice.channel;
      // Get the music player
      const player = client.manager.players.get(message.guild.id);
      // If no player or no botchannel return error
      if(!player || !botchannel) return message.channel.send(`**:x: There's nothing playing in this server.**`);
      // If queue size too small return error
      if(!player.queue.size < 1) return message.channel.send(`**:x: There's nothing playing in this server.**`);
      // If user is not in the right channel as bot, then return error
      if(player && channel.id !== player.voiceChannel)
        return message.channel.send(`**:x: You need to be in the same voice channel as Milrato x Rythm to use this command.**`);
      // If bot connected bot not with the Lavalink player then try to delete the player
      if(player && botchannel && channel.id !== botchannel.id){
        player.destroy();
      }
      // Clear the QUEUE
      player.queue.clear();
      // Send Success Message
      return message.channel.send(`**:boom: Queue cleared. :stop_button:**`);
  }
};
