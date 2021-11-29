const fastify = require('fastify')({ logger: true });
const swagger = require('fastify-swagger');
const path = require('path');
const userRoutes = require('./resources/users/user.router');
const { PORT } = require('./common/config');

fastify.register(swagger, {
  mode: 'static',
  routePrefix: '/doc',
  specification: {
    path: path.resolve(__dirname, '../doc/api.yaml'),
    postProcessor(swaggerObject) {
      return swaggerObject;
    },
  },
  exposeRoute: true,
});

fastify.register(userRoutes);

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
