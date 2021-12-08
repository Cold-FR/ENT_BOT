const { AkairoClient, CommandHandler, ListenerHandler } = require('discord-akairo');

module.exports = class Client extends AkairoClient {
  constructor(config = {}) {
    super(
      { ownerID: '254638264076468234' },
      {
        allowedMentions: {
          parse: ['roles', 'everyone', 'users'],
          repliedUser: true
        },
        partials: ['CHANNEL', 'GUILD_MEMBER', 'MESSAGE', 'REACTION', 'USER'],
        presence: {
          status: 'online',
          activities: [
            {
              name: 'Mon Bureau Numérique',
              type: 'PLAYING',
            }
          ]
        },
        intents: 32767
      }
    );

    this.commandHandler = new CommandHandler(this, {
      allowMention: true,
      prefix: config.prefix,
      defaultCooldown: 2000,
      directory: './src/commands/'
    });

    this.listenerHandler = new ListenerHandler(this, {
      directory: './src/listeners/'
    });

    this.commandHandler.loadAll();
    this.commandHandler.useListenerHandler(this.listenerHandler);
    this.listenerHandler.loadAll();
  }
}