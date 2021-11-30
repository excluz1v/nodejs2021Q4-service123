const uuid = require('uuid');

class Board {
  constructor({ id = uuid.v4(), title } = {}) {
    this.id = id;
    this.title = title;
    this.columns = [];
  }

  createColumn(title, order) {
    const column = { id: uuid.v4(), title, order };
    this.columns.push(column);
    return this;
  }
}

module.exports = Board;
