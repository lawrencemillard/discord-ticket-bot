const { Client, Intents } = require('discord.js');
const fs = require('fs');
const express = require('express');
const app = express();
const port = 6969;
const dotenv = require('dotenv');

dotenv.config();

const client = new Client({ intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MESSAGES] });

client.commands = new Map();

// Load commands
const commandFolders = fs.readdirSync('./commands');

for (const folder of commandFolders) {
  const commandFiles = fs.readdirSync(`./commands/${folder}`).filter(file => file.endsWith('.js'));
  for (const file of commandFiles) {
    const command = require(`./commands/${folder}/${file}`);
    client.commands.set(command.name, command);
  }
}

client.once('ready', () => {
  console.log(`Logged in as ${client.user.tag}!`);
});

client.on('messageCreate', async message => {
  if (!message.content.startsWith('!') || message.author.bot) return;

  const args = message.content.slice(1).trim().split(/ +/);
  const commandName = args.shift().toLowerCase();

  if (!client.commands.has(commandName)) return;

  const command = client.commands.get(commandName);

  try {
    await command.execute(message, args);
  } catch (error) {
    console.error(error);
    message.reply('There was an error trying to execute that command!');
  }
});

// Set up HTTP server to host transcripts
app.get('/transcripts/:id', (req, res) => {
  const transcriptId = req.params.id;
  const transcriptPath = `./transcripts/${transcriptId}.html`;

  if (fs.existsSync(transcriptPath)) {
    res.sendFile(transcriptPath, { root: __dirname });
  } else {
    res.status(404).send('Transcript not found');
  }
});

app.listen(port, () => {
  console.log(`Transcript server listening at http://localhost:${port}`);
});

client.login(process.env.BOT_TOKEN);
