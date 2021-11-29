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
// const postUserOpts = {
//   schema: {
//     body: {
//       type: 'object',
//     },
//   },
// };

async function userRoutes(fastify, options, done) {
  fastify.get('/users', getUserOpts, async (req, res) => {
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
