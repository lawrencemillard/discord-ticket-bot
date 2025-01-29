module.exports = {
  name: 'ping',
  description: 'Respond with "Pong!" to check if the bot is online',
  execute(message, args) {
    message.channel.send('Pong!');
  },
};
