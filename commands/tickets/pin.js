const { MessageEmbed } = require('discord.js');

module.exports = {
  name: 'pin',
  description: 'Pin a message in a ticket',
  async execute(message, args) {
    if (!message.member.permissions.has('MANAGE_MESSAGES')) {
      return message.reply('You do not have permission to use this command.');
    }

    const channel = message.channel;
    if (!channel.name.startsWith('ticket-')) {
      return message.reply('This command can only be used in ticket channels.');
    }

    const messageId = args[0];
    if (!messageId) {
      return message.reply('Please provide the ID of the message to pin.');
    }

    try {
      const msg = await channel.messages.fetch(messageId);
      await msg.pin();

      const embed = new MessageEmbed()
        .setColor('#FFD700')
        .setTitle('Message Pinned')
        .setDescription(`The message with ID ${messageId} has been pinned.`)
        .setTimestamp();

      message.channel.send({ embeds: [embed] });
    } catch (error) {
      console.error(error);
      message.reply('There was an error pinning the message.');
    }
  },
};
