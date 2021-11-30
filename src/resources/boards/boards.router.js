// const Board = require('./board.model');
const boardsService = require('./board.service');
const schemas = require('./boards.schema');

async function boardRoutes(fastify, options, done) {
  fastify.get('/boards', schemas.getBoardsOpts, async (req, res) => {
    const boards = await boardsService.getAll();
    res.send(boards);
  });
  done();
}

module.exports = boardRoutes;
