const User = require('./user.model');

let users = [];

const getAll = async () => users;

const postUser = async (user) => {
  const newUser = new User(user);
  users = [...users, newUser];
  return newUser;
};

module.exports = { getAll, postUser };
