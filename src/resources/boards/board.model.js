const uuid = require('uuid');
const Column = require('../column/Column.model');

class Board {
  constructor({ id = uuid.v4(), title } = {}) {
    this.id = id;
    this.title = title;
    this.columns = [];
  }

  createColumn(title) {
    const column = new Column({ title, order: this.columns.length });
    this.columns.push(column);
    return this;
  }
}

module.exports = Board;
