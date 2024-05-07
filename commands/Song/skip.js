module.exports = {
  name: `pause`,
  category: `Song`,
  aliases: [`stop`],
  description: `Pauses the current playing track`,
  usage: `pause`,
  run: async (client, message, args, cmduser, text, prefix) => {
    // Get the voice channel of the member
    const { channel } = message.member.voice;
    // If the member is not connected to a voice channel, return an error
    if (!channel) return message.channel.send(`:x: **You have to be in a voice channel to use this command.**`);
    // Send error if member is deafened
    if (message.member.voice.selfDeaf) return message.channel.send(`:x: **You cannot run this command while deafened.**`);
    // Get the voice channel of the bot
    const botChannel = message.guild.me.voice.channel;
    // Get the music player
    const player = client.manager.players.get(message.guild.id);
    // If no player or no bot channel, return an error
    if (!player || !botChannel) return message.channel.send(`**:x: Nothing playing in this server.**`);
    // If there's no current song, return an error
    if (!player.queue.current) return message.channel.send(`**:x: Nothing playing in this server.**`);
    // If the user is not in the same channel as the bot, return an error
    if (player && channel.id !== player.voiceChannel)
      return message.channel.send(`**:x: You need to be in the same voice channel as the bot to use this command.**`);
    // If the player is already paused, return an error
    if (!player.playing)
      return message.channel.send(`**:x: The player is already paused.**`);
    // Pause the player
    player.pause(true);
    // Return success message
    return message.channel.send(`**Paused :pause_button:**`);
  }
};
