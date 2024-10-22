// libs
import { Router } from 'express';

// utils
import createRouteHandler from '../utils/routeHandler';

const testRoute = Router();

const testFn = async () => ({
  data: ['1234', 'abc'],
});

// Use this route for any non-auth logic
testRoute.get('/non-auth', createRouteHandler(testFn));

// Use this route for any auth-based logic
testRoute.get('/auth', createRouteHandler(testFn));

export default testRoute;
