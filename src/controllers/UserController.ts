// libs
import { isEmpty } from 'lodash';

// models
import User from '../models/user';

// services
import fetchUsers from '../services/user.service';

// utils
import controllerHandler from '../utils/controllerHandler';

const importUsers = controllerHandler(async (req) => {
  const { limit, pagination } = req.query;

  if (!pagination) {
    throw new Error('Pagination is missing from the query string');
  }

  if (!limit) {
    throw new Error('Limit is missing from the query string');
  }

  const users = await fetchUsers(limit, pagination);
  const result = await User.insertMany(users);

  return {
    result,
    count: result.length,
  };
});

const createUser = controllerHandler(async (req) => {
  const { body } = req;
  const user = await User.create(body);

  return {
    user,
    message: 'User created',
  };
});

const updateUser = controllerHandler(async (req) => {
  const { id } = req.params;
  const { body } = req;

  if (!id) {
    throw new Error('Id is missing');
  }

  if (!body || isEmpty(body)) {
    throw new Error('No fields provided');
  }

  const user = await User.findByIdAndUpdate(id, body);

  return {
    user,
  };
});

const getUserById = controllerHandler(async (req) => {
  const { id } = req.params;

  const user = await User.findById(id);

  return {
    user,
  };
});

const deleteUser = controllerHandler(async (req) => {
  const { id } = req.params;

  if (!id) {
    throw new Error('Id is missing');
  }

  const result = await User.deleteOne({ id });

  return {
    message: `User ${result.acknowledged ? 'deleted' : 'not found'}`,
  };
});

export {
  importUsers,
  deleteUser,
  updateUser,
  getUserById,
  createUser,
};
