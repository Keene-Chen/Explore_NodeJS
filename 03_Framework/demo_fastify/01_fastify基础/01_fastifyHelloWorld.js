const process = require('node:process');
const fastify = require('fastify')({
  logger: true,
});

fastify.get('/', async (request, reply) => {
  return { hello: '你好 世界world' };
});

/**
 * Run the server!
 */
async function start() {
  try {
    await fastify.listen({ port: 3000 });
  }
  catch (err) {
    fastify.log.error(err);
    process.exit(1);
  }
}
start();
