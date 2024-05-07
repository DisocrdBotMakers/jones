module.exports = {
  name: `resume`,
  category: `Song`,
  aliases: [`continue`, "re", "res"],
  description: `Resumes paused music`,
  usage: `resume`,
  run: async (client, message, args, cmduser, text, prefix) => {
      // Get the voice channel of the member
      const { channel } = message.member.voice;
      // If the member is not connected to a voice channel, return error
      if (!channel)  return message.channel.send(`:x: **You must be in a voice channel to use this command.**`);
      // Send error if member is deafened
      if(message.member.voice.selfDeaf) return message.channel.send(`:x: **You cannot run this command while deafened.**`);
      // Get the voice channel of the bot
      const botchannel = message.guild.me.voice.channel;
      // Get the music player
      const player = client.manager.players.get(message.guild.id);
      // If no player or bot is not in a channel, return error
      if(!player || !botchannel) return message.channel.send(`**:x: There's nothing playing in this server.**`);
      // If the queue size is too small, return error
      if(player.queue.size < 1) return message.channel.send(`**:x: There's nothing playing in this server.**`);
      // If user is not in the same channel as the bot, return error
      if(player && channel.id !== player.voiceChannel)
        return message.channel.send(`**:x: You need to be in the same voice channel as Kronix x Rythm to use this command.**`);
      // If the bot is connected but not with the Lavalink player, then try to delete the player
      if(player && botchannel && channel.id !== botchannel.id){
        player.destroy();
      }
      // If the player is not paused, return error
      if (player.playing)
        return message.channel.send(`**:x: The player is not paused.**`);
      // Pause the player
      player.pause(false);
      // Return success message
      return message.channel.send(`**:play_pause: Resuming music.**`);

  }
};
