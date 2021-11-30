const bordsRepo = require('./boards.memory.repository');
const Board = require('./board.model');

const getAll = async () => bordsRepo.getAll();

const postBoard = async (newBoardData) => {
  const newBoard = await bordsRepo.postBoards(newBoardData);
  return newBoard;
};

const getBoardById = async (id) => {
  const result = await bordsRepo.getBoardById(id);
  if (result === undefined) return false;
  return result;
};

const putBoard = async (id, newBoardInfo) => {
  const updatedBoard = await bordsRepo.updateBoardById(id, newBoardInfo);
  if (updatedBoard === false) return false;
  return Board.toResponse(updatedBoard);
};

const deleteBoardById = async (id) => {
  const result = await bordsRepo.deleteBoardById(id);
  return result;
};

module.exports = {
  getAll,
  postBoard,
  getBoardById,
  putBoard,
  deleteBoardById,
};
