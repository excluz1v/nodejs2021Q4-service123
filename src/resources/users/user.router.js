const User = require('./user.model');
const usersService = require('./user.service');
const schemas = require('./users.schema');

async function userRoutes(fastify, options, done) {
  fastify.get('/users', schemas.getUserOpts, async (req, res) => {
    const users = await usersService.getAll();
    res.send(users.map(User.toResponse));
  });

  fastify.get('/users/:userId', schemas.getUserByIdOpts, async (req, res) => {
    const { userId } = req.params;
    const result = await usersService.getUserById(userId);
    res.send(result);
  });

  fastify.post('/users', schemas.postUserOpts, async (req, res) => {
    const { body } = req;
    const userInfo = await usersService.postUser(body);
    res.send(userInfo);
  });

  done();
}

module.exports = userRoutes;
