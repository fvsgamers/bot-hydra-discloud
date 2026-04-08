require('dotenv').config();
const config = require('./config.json');
const { REST, Routes } = require('discord.js');
const fs = require('fs');

console.log('TOKEN NO DEPLOY:', process.env.TOKEN); // debug

const commands = [];
const commandFiles = fs.readdirSync('./commands').filter(file => file.endsWith('.js'));

for (const file of commandFiles) {
  const command = require(`./commands/${file}`);
  commands.push(command.data.toJSON());
}

const rest = new REST({ version: '10' }).setToken(process.env.TOKEN);

(async () => {
  try {
    console.log('Registrando comandos...');

    await rest.put(
      Routes.applicationGuildCommands(config.clientId, config.guildId),
      { body: commands },
    );

    console.log('✅ Comandos registrados!');
  } catch (error) {
    console.error('ERRO REAL:', error);
  }
})();
