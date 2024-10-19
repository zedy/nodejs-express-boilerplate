// libs
import { Router } from 'express';

// utils
import createRouteHandler from '../utils/routeHandler';
import { jwtMiddleware } from '../middleware/auth';

// controllers
import {
  updateUser,
  findOrCreateUser,
  deleteUser,
  getUserById,
  importUsers,
} from '../controllers/UserController';

const userRoute = Router();

// boilerplate routes for users
userRoute.get('/import', jwtMiddleware, createRouteHandler(importUsers));
userRoute.post('/', jwtMiddleware, createRouteHandler(findOrCreateUser));
userRoute.put('/:id', jwtMiddleware, createRouteHandler(updateUser));
userRoute.patch('/:id', jwtMiddleware, createRouteHandler(updateUser));
userRoute.get('/:id', createRouteHandler(getUserById));
userRoute.delete('/:id', jwtMiddleware, createRouteHandler(deleteUser));

export default userRoute;
