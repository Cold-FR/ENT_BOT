const config = require('./util/config.json');
const Client = require('./structures/Client');

let bot = new Client({
  prefix: config.prefix
});

try {
  bot.login(config.token);
} catch (e) {
  console.error(e);
}