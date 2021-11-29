const usersRepo = require('./user.memory.repository');
const User = require('./user.model');

const getAll = async () => usersRepo.getAll();

const postUser = async (userCredentials) => {
  const newUser = await usersRepo.postUser(userCredentials);
  return User.toResponse(newUser);
};

const getUserById = async (id) => {
  const result = await usersRepo.getUserById(id);
  return User.toResponse(result);
};

module.exports = { getAll, postUser, getUserById };
