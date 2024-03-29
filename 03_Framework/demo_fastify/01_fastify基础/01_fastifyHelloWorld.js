// ESM
const fastify = require('fastify')({
  logger: true,
});

fastify.get('/', async (request, reply) => {
  return { hello: '你好 世界world' };
});

/**
 * Run the server!
 */
const start = async () => {
  try {
    await fastify.listen({ port: 3000 });
  } catch (err) {
    fastify.log.error(err);
    process.exit(1);
  }
};
start();
