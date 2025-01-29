const { MessageEmbed } = require('discord.js');

module.exports = {
  name: 'remove',
  description: 'Remove a user from a ticket',
  async execute(message, args) {
    if (!message.member.permissions.has('MANAGE_CHANNELS')) {
      return message.reply('You do not have permission to use this command.');
    }

    const user = message.mentions.users.first();
    if (!user) {
      return message.reply('Please mention a user to remove from the ticket.');
    }

    const channel = message.channel;
    if (!channel.name.startsWith('ticket-')) {
      return message.reply('This command can only be used in ticket channels.');
    }

    try {
      await channel.permissionOverwrites.delete(user);

      const embed = new MessageEmbed()
        .setColor('#FF0000')
        .setTitle('User Removed')
        .setDescription(`${user.tag} has been removed from the ticket.`)
        .setTimestamp();

      message.channel.send({ embeds: [embed] });
    } catch (error) {
      console.error(error);
      message.reply('There was an error removing the user from the ticket.');
    }
  },
};
