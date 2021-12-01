const Task = require('./task.model');

let tasks = [];

const getAllTasksByBoardId = async (boardId) => {
  const res = tasks.filter((task) => task.boardId === boardId);
  return res;
};

const postTasks = async (taskData) => {
  const newTask = new Task(taskData);
  tasks = [...tasks, newTask];
  return Task.toResponse(newTask);
};

const getTaskByBoardIdAndId = async (boardId, taskId) => {
  let res = tasks.filter((task) => task.boardId === boardId);
  if (res) res = res.filter((task) => task.id === taskId);
  return res;
};

const updateTask = async (boardId, taskId, newTaskInfo) => {
  const res = await getTaskByBoardIdAndId(boardId, taskId);
  if (res) {
    tasks.map((task) => (task === res ? newTaskInfo : task));
  }
  return res;
};

const deleteBoardById = async (boardId, taskId) => {
  const res = await getTaskByBoardIdAndId(boardId, taskId);
  if (res) tasks = tasks.filter((task) => task.id !== taskId);
  return res;
};

module.exports = {
  getAllTasksByBoardId,
  postTasks,
  getTaskByBoardIdAndId,
  updateTask,
  deleteBoardById,
};
