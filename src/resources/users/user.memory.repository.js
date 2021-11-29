const User = require('./user.model');

let users = [];

const getAll = async () => users;

const postUser = async (user) => {
  const newUser = new User(user);
  users = [...users, newUser];
  return newUser;
};

const getUserById = async (id) => {
  const result = await users.find((user) => user.id === id);
  return result;
};

const updateUserById = async (id, userCredentials) => {
  const result = await users.find((user) => user.id === id);
  if (result === undefined) return false;
  const userIndex = users.findIndex((user) => user.id === id);
  const updatedUser = { ...users[userIndex], ...userCredentials };
  const usersCopy = [...users];
  usersCopy[userIndex] = updatedUser;
  users = usersCopy;
  return updatedUser;
};

const deleteUserById = async (id) => {
  const isExist = await getUserById(id);
  if (isExist === undefined) return false;
  users = await users.filter((user) => user.id !== id);
  return true;
};

module.exports = {
  getAll,
  postUser,
  getUserById,
  updateUserById,
  deleteUserById,
};
