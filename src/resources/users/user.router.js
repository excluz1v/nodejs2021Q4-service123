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
    if (result === false) res.status(400).send('User not found');
    res.send(result);
  });

  fastify.post('/users', schemas.postUserOpts, async (req, res) => {
    const { body } = req;

    const userInfo = await usersService.postUser(body);
    res.send(userInfo);
  });

  fastify.put('/users/:userId', schemas.putUserOpts, async (req, res) => {
    const { body } = req;
    const { userId } = req.params;
    const userInfo = await usersService.putUser(userId, body);
    if (userInfo === false) res.status(400).send('User not found');
    res.send(userInfo);
  });

  done();
}

module.exports = userRoutes;
