const User = require('./user.model');
const usersService = require('./user.service');

async function userRoutes(fastify, options, done) {
  fastify.get('/users', async (req, res) => {
    const users = await usersService.getAll();
    res.send(users.map(User.toResponse));
  });

  fastify.get('/users/:userId', (req, res) => {
    const { userId } = req.params;

    res.send(userId);
  });

  fastify.post('/users/:userId', (req, res) => {
    const { userId } = req.params;

    res.send(userId);
  });

  done();
}

module.exports = userRoutes;
