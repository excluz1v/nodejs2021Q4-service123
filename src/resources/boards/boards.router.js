// const Board = require('./board.model');
const boardsService = require('./board.service');
const schemas = require('./boards.schema');

async function boardRoutes(fastify, options, done) {
  fastify.get('/boards', schemas.getBoardsOpts, async (req, res) => {
    const boards = await boardsService.getAll();
    res.send(boards);
  });

  fastify.get(
    '/boards/:boardId',
    schemas.getBoardByIdOpts,
    async (req, res) => {
      const { boardId } = req.params;
      const result = await boardsService.getBoardById(boardId);
      if (result === false) res.status(400).send('Board not found');
      res.send(result);
    }
  );

  fastify.post('/boards', schemas.postBoardsOpts, async (req, res) => {
    const { body } = req;

    const boardInfo = await boardsService.postBoard(body);
    res.status(201).send(boardInfo);
  });

  fastify.put('/boards/:boardId', schemas.putBoardOpts, async (req, res) => {
    const { body } = req;
    const { boardId } = req.params;
    const boardInfo = await boardsService.putBoard(boardId, body);
    if (boardInfo === false) res.status(400).send('Board not found');
    res.send(boardInfo);
  });

  fastify.delete('/boards/:boardId', async (req, res) => {
    const { boardId } = req.params;
    const result = await boardsService.deleteBoardById(boardId);
    if (result === false) res.status(404).send('Board not found');
    res.status(204);
  });

  done();
}

module.exports = boardRoutes;
