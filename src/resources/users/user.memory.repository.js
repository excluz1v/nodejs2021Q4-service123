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

module.exports = { getAll, postUser, getUserById };
