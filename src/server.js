const fastify = require('fastify')({ logger: true });
const swaggerUi = require('fastify-serve-swagger-ui');
const userRoutes = require('./resources/users/user.router');
const { PORT } = require('./common/config');

fastify.register(userRoutes);

fastify.register(swaggerUi, {
  // swagger specification which should be exposed
  specification: {
    type: 'file',
    path: './doc/api.yaml',
  },
  path: 'doc',
});

const start = async () => {
  try {
    await fastify.listen(PORT);
    console.log(`App is running on http://localhost:${PORT}`);
  } catch (err) {
    fastify.log.error(err);
    process.exit(1);
  }
};

start();
