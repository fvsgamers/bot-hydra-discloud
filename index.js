const { Client, GatewayIntentBits, Collection } = require('discord.js');
const fs = require('fs');
const config = require('./config.json');

// ===== CLIENT =====
const client = new Client({
  intents: [GatewayIntentBits.Guilds, GatewayIntentBits.GuildMembers]
});

client.commands = new Collection();

// ===== CARREGAR COMANDOS =====
const commandFiles = fs.readdirSync('./commands').filter(f => f.endsWith('.js'));
for (const file of commandFiles) {
  const command = require(`./commands/${file}`);
  client.commands.set(command.data.name, command);
}

// ===== CARREGAR EVENTOS =====
const eventFiles = fs.readdirSync('./events').filter(f => f.endsWith('.js'));
for (const file of eventFiles) {
  require(`./events/${file}`)(client);
}

// ===== ERROS =====
process.on('unhandledRejection', (err) => console.error('❌ Erro:', err));
client.on('error', (err) => console.error('❌ Client error:', err));

// ===== TOKEN =====
const token = process.env.TOKEN;

if (!token) {
  console.error('❌ TOKEN não definido!');
  process.exit(1);
}

// ===== LOGIN =====
console.log('🔑 Iniciando bot...');
client.login(token);
