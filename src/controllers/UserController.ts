// models
import User from '../models/sequalize/user';
import fetchUsers from '../services/user.service';

// utils
import controllerHandler from '../utils/controllerHandler';
import { getToken } from '../utils/jwt';

const importUsers = controllerHandler(async (req) => {
  const { limit, pagination } = req.query;

  const users = await fetchUsers(limit, pagination);
  const result = await User.bulkCreate(users);

  return {
    result,
    count: result.length,
  };
});

const createUser = controllerHandler(async (req) => {
  const [user, created] = await User.findOrCreate({
    where: { email: req.body.email },
    defaults: {
      salt: '',
      ...req.body,
    },
  });

  return {
    user, created,
  };
});

const updateUser = controllerHandler(async (req) => {
  const { id } = req.params;

  const result = await User.update(id, req.body);
  return result;
});

const getUserById = controllerHandler(async (req) => {
  const { id } = req.params;

  const result = await User.findByPk(id);

  return result ? {
    user: result.dataValues,
  } : {
    message: 'User not found.',
  };
});

const findOrCreateUser = controllerHandler(async (req, res) => {
  // step 1: create a new user if it doesn't exist
  const { user, created } = await createUser(req, res);

  if (!created) {
    return { message: 'Email already registered.', created };
  }

  // step 2: create JWT token
  const token = getToken({
    id: user.getDataValue('id'),
    email: user.getDataValue('email'),
    role: user.getDataValue('role'),
  });

  return {
    user,
    token,
    created,
    message: 'User succesfully created.',
  };
});

const deleteUser = controllerHandler(async (req) => {
  const { id } = req.params;

  const result = await User.destroy(id);
  return result;
});

export {
  importUsers,
  getUserById,
  findOrCreateUser,
  createUser,
  updateUser,
  deleteUser,
};
