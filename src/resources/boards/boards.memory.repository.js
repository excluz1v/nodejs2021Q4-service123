const Board = require('./board.model');
const taskRepo = require('../tasks/tasks.memory.repository');

let boards = [];

const getAll = async () => boards;

const postBoards = async (boardData) => {
  const newBoard = new Board(boardData);
  boards = [...boards, newBoard];
  return newBoard;
};

const getBoardById = async (id) => {
  const result = await boards.find((board) => board.id === id);
  return result;
};

const updateBoardById = async (id, newBoardInfo) => {
  const result = await boards.find((board) => board.id === id);
  if (result === undefined) return false;

  let boardIndex;
  boards = boards.map((board, index) => {
    if (board.id === id) {
      boardIndex = index;
      return { ...board, ...newBoardInfo };
    }
    return board;
  });
  return boards[boardIndex];
};

const deleteBoardById = async (id) => {
  const isExist = await getBoardById(id);
  if (isExist === undefined) return false;
  boards = await boards.filter((board) => board.id !== id);
  // todo delete tasks
  await taskRepo.deleteTaskByBoardId(id);
  return true;
};

module.exports = {
  getAll,
  postBoards,
  getBoardById,
  updateBoardById,
  deleteBoardById,
};
