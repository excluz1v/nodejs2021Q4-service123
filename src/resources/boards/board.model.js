const uuid = require('uuid');
const Column = require('../column/column.model');

class Board {
  constructor({ id = uuid.v4(), title, columns } = {}) {
    this.id = id;
    this.title = title;
    this.columns = Board.createColumn(columns);
  }

  static createColumn(ArrOfColumns) {
    return [...ArrOfColumns].map((col) => new Column(col));
  }

  updateColumn(columnId, taskId, taskData) {
    this.columns = this.columns.map((col) => {
      if (col.id === columnId) {
        return col.map((task) => {
          if (task.id === taskId) return taskData;
          return task;
        });
      }
      return col;
    });
    return this.columns;
  }
}

module.exports = Board;
