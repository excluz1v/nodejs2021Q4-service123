const taskSchema = {
  id: { type: 'string' },
  title: { type: 'string' },
  order: { type: 'number' },
  description: { type: 'string' },
  userId: { type: 'string' },
};

const createTaskSchema = {
  title: { type: 'string' },
  order: { type: 'number' },
  description: { type: 'string' },
  userId: { type: 'string' },
  boardId: { type: 'string' },
  columnId: { type: 'string' },
};

// Options for GET ALL BOARDS
const getTaskOpts = {
  schema: {
    response: {
      200: {
        type: 'array',
        items: {
          type: 'object',
          properties: taskSchema,
        },
      },
    },
  },
};

// Options for POST CREATE BOARDS
const postTasksOpts = {
  schema: {
    body: {
      type: 'object',
      required: [
        'title',
        'columnId',
        'order',
        'description',
        'userId',
        'boardId',
      ],
      properties: createTaskSchema,
    },
    response: {
      201: {
        type: 'object',
        properties: taskSchema,
      },
    },
  },
};

// Options for GET boards/:boardId
const getTaskByIdOpts = {
  schema: {
    response: {
      200: {
        type: 'object',
        properties: taskSchema,
      },
    },
  },
};

// Options for PUT BOARD(Updates a Board by ID)
const putTaskOpts = {
  schema: {
    body: {
      type: 'object',
      required: [
        'title',
        'columnId',
        'order',
        'description',
        'userId',
        'boardId',
      ],
      properties: createTaskSchema,
    },
    response: {
      201: {
        type: 'object',
        properties: taskSchema,
      },
    },
  },
};

module.exports = {
  getTaskOpts,
  postTasksOpts,
  getTaskByIdOpts,
  putTaskOpts,
};
