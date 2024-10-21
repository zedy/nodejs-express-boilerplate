// libs
import { Router } from 'express';

// import { findOrCreateUser } from '../controllers/UserController';

// utils
// import createRouteHandler from '../utils/routeHandler';
import { loginMiddleware, jwtMiddleware } from '../middleware/auth';

const authRoute = Router();

// auth based on user credentials
authRoute.post('/login', loginMiddleware, async (req, res) => {
  const { token, user } = res.locals;

  res.status(200).json({ message: 'Login successfull', user, token });
});

// auth based on JWT token
authRoute.get('/user', jwtMiddleware, async (req, res) => {
  const { user } = req;

  res.status(200).json({ message: 'Auth successfull', user });
});

// Registration/Signup
// authRoute.post('/register', createRouteHandler(findOrCreateUser));

export default authRoute;
