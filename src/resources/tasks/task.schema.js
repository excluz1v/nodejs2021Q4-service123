const taskSchema = {
  id: { type: 'string' },
  title: { type: 'string' },
  order: { type: ['string', 'number'] },
  description: { type: 'string' },
  userId: { type: ['string', 'null'] },
};

const createTaskSchema = {
  title: { type: 'string' },
  order: { type: 'number' },
  description: { type: 'string' },
  userId: { type: ['string', 'null'] },
  boardId: { type: ['string', 'null'] },
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
        'order',
        'description',
        'userId',
        'boardId',
        'columnId',
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
        'order',
        'description',
        'userId',
        'boardId',
        'columnId',
      ],
      properties: createTaskSchema,
    },
    response: {
      200: {
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
