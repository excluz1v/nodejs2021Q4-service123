const taskService = require('./task.service');
const schemas = require('./task.schema');

async function boardRoutes(fastify, options, done) {
  fastify.get(
    '/boards/:boardId/tasks',
    schemas.getTaskOpts,
    async (req, res) => {
      const { boardId } = req.params;
      const tasks = await taskService.getAll(boardId);
      res.send(tasks);
    }
  );

  fastify.get(
    '/boards/:boardId/tasks/:taskId',
    schemas.getTaskByIdOpts,
    async (req, res) => {
      const { boardId, taskId } = req.params;
      const result = await taskService.getTaskById(boardId, taskId);
      if (result === false) res.status(400).send('Task not found');
      res.send(result);
    }
  );

  fastify.post(
    '/boards/:boardId/tasks',
    schemas.postTasksOpts,
    async (req, res) => {
      const { body } = req;
      const { boardId } = req.params;
      const taskInfo = await taskService.postTask(boardId, body);
      res.status(201).send(taskInfo);
    }
  );

  fastify.put(
    '/boards/:boardId/tasks/:taskId',
    schemas.putTaskOpts,
    async (req, res) => {
      const { body } = req;
      const { boardId, taskId } = req.params;
      const taskInfo = await taskService.updateTask(boardId, taskId, body);
      if (taskInfo === false) res.status(404).send('Task not found');
      res.send(taskInfo);
    }
  );

  fastify.delete('/boards/:boardId/tasks/:taskId', async (req, res) => {
    const { boardId, taskId } = req.params;
    const result = await taskService.deleteTaskById(boardId, taskId);
    if (result === false) res.status(404).send('Task not found');
    res.status(204);
  });

  done();
}

module.exports = boardRoutes;
