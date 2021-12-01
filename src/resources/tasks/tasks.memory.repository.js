const Task = require('./task.model');

let tasks = [];

const getAllTasksByBoardId = async (boardId) => {
  const res = await tasks.filter((task) => task.boardId === boardId);
  return res;
};

const postTasks = async (boardId, taskData) => {
  const res = await getAllTasksByBoardId(boardId);
  if (!res) return false;
  // console.log(taskData);
  const newTask = new Task({ ...taskData, boardId });
  tasks = [...tasks, newTask];
  return Task.toResponse(newTask);
};

const updateTask = async (boardId, taskId, newTaskInfo) => {
  const res = await getAllTasksByBoardId(boardId);
  console.log(res);
  if (res === undefined) return false;
  let taskIndex;
  tasks = tasks.map((task, index) => {
    console.log(task.taskId, taskId);
    if (task.taskId === taskId) {
      taskIndex = index;
      return { ...task, ...newTaskInfo };
    }
    return task;
  });
  return tasks[taskIndex];
};

const deleteTaskById = async (boardId, taskId) => {
  const res = await getAllTasksByBoardId(boardId, taskId);
  if (res) tasks = tasks.filter((task) => task.id !== taskId);
  return res;
};

const deleteAssignedUsers = async (userId) => {
  tasks = tasks.map((task) => {
    // console.log(task, userId);
    if (task.userId === userId) {
      const nullUser = { userId: null };
      const updatedTask = { ...task, ...nullUser };
      console.log(updatedTask);
      return updatedTask;
    }
    return task;
  });
  return tasks;
};

const deleteTaskByBoardId = async (boardId) => {
  tasks = tasks.filter((task) => task.boardId !== boardId);
};

module.exports = {
  getAllTasksByBoardId,
  postTasks,
  updateTask,
  deleteTaskById,
  deleteAssignedUsers,
  tasks,
  deleteTaskByBoardId,
};
