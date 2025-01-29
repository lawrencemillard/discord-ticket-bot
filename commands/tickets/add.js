const { MessageEmbed } = require('discord.js');

module.exports = {
  name: 'add',
  description: 'Add a user to a ticket',
  async execute(message, args) {
    if (!message.member.permissions.has('MANAGE_CHANNELS')) {
      return message.reply('You do not have permission to use this command.');
    }

    const user = message.mentions.users.first();
    if (!user) {
      return message.reply('Please mention a user to add to the ticket.');
    }

    const channel = message.channel;
    if (!channel.name.startsWith('ticket-')) {
      return message.reply('This command can only be used in ticket channels.');
    }

    try {
      await channel.permissionOverwrites.create(user, {
        VIEW_CHANNEL: true,
        SEND_MESSAGES: true,
        READ_MESSAGE_HISTORY: true,
      });

      const embed = new MessageEmbed()
        .setColor('#00FF00')
        .setTitle('User Added')
        .setDescription(`${user.tag} has been added to the ticket.`)
        .setTimestamp();

      message.channel.send({ embeds: [embed] });
    } catch (error) {
      console.error(error);
      message.reply('There was an error adding the user to the ticket.');
    }
  },
};
