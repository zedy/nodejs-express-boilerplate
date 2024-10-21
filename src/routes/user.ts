// libs
import { Router } from 'express';

// utils
import createRouteHandler from '../utils/routeHandler';
import { jwtMiddleware } from '../middleware/auth';

// controllers
import {
  importUsers,
  createUser,
  deleteUser,
  updateUser,
  getUserById,
} from '../controllers/UserController';

const userRoute = Router();

// boilerplate routes for users
userRoute.post('/', jwtMiddleware, createRouteHandler(createUser));
userRoute.post('/import', jwtMiddleware, createRouteHandler(importUsers));
userRoute.put('/:id', jwtMiddleware, createRouteHandler(updateUser));
userRoute.get('/:id', jwtMiddleware, createRouteHandler(getUserById));
userRoute.delete('/:id', jwtMiddleware, createRouteHandler(deleteUser));

export default userRoute;
