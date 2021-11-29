const User = require('./user.model');
const usersService = require('./user.service');

// Options for GET user
const getUserOpts = {
  schema: {
    response: {
      200: {
        type: 'array',
        items: {
          type: 'object',
          properties: {
            id: { type: 'string' },
            name: { type: 'string' },
            login: { type: 'string' },
          },
        },
      },
    },
  },
};

// Options for POST user
const postUserOpts = {
  schema: {
    body: {
      type: 'object',
      required: ['name', 'login', 'password'],
      properties: {
        name: { type: 'string' },
        login: { type: 'string' },
        password: { type: 'string' },
      },
    },
    response: {
      201: {
        type: 'object',
        properties: {
          id: { type: 'string' },
          name: { type: 'string' },
          login: { type: 'string' },
        },
      },
    },
  },
};

async function userRoutes(fastify, options, done) {
  fastify.get('/users', getUserOpts, async (req, res) => {
    const users = await usersService.getAll();
    res.send(users.map(User.toResponse));
  });

  fastify.get('/users/:userId', (req, res) => {
    const { userId } = req.params;
    res.send(userId);
  });

  fastify.post('/users', postUserOpts, async (req, res) => {
    const { body } = req;
    const userInfo = await usersService.postUser(body);
    res.send(userInfo);
  });

  done();
}

module.exports = userRoutes;
