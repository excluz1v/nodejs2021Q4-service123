const tasksRepo = require('./tasks.memory.repository');

const getAll = async (boardId) => tasksRepo.getAllTasksByBoardId(boardId);

const postTask = async (boardId, newTaskData) => {
  const newTask = await tasksRepo.postTasks(boardId, newTaskData);
  // console.log(newTask);
  return newTask;
};

const getTaskById = async (boardId, taskId) => {
  const result = await tasksRepo.getTaskByBoardIdAndId(boardId, taskId);
  if (result === undefined) return false;
  return result;
};

const updateTask = async (boardId, taskId, newTaskInfo) => {
  const updatedTask = await tasksRepo.updateTask(boardId, taskId, newTaskInfo);
  if (updatedTask === false) return false;
  return updatedTask;
};

const deleteTaskById = async (boardId, taskId) => {
  const result = await tasksRepo.deleteTaskById(boardId, taskId);
  return result;
};

module.exports = {
  getAll,
  postTask,
  getTaskById,
  updateTask,
  deleteTaskById,
};
