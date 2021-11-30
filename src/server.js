const fastify = require('fastify')({ logger: true });
const swagger = require('fastify-swagger');
const path = require('path');
const userRoutes = require('./resources/users/user.router');
const fastifyPlugin = require('./resources/login/auth');
const { AuthRouter } = require('./resources/login/auth.route');
const { PORT, AUTH_MODE } = require('./common/config');

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

if (AUTH_MODE) {
  fastify.register(fastifyPlugin);
  fastify.register(AuthRouter);
}

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
