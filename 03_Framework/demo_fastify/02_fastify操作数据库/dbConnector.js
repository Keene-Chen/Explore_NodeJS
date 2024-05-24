const fastifyPlugin = require('fastify-plugin');

async function dbConnector(fastify, options) {
  fastify.register(require('@fastify/mongodb'), {
    url: 'mongodb://192.168.8.9:27017/test',
  });
}

module.exports = fastifyPlugin(dbConnector);
