// libs
import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import responseTime from 'response-time';
import 'dotenv/config';

// routes
import authentication from './routes/authentication';
import userRoutes from './routes/user';
import testRoute from './routes/test';

// configs
import passport from './middleware/config/passport';

const whitelist = [
  process.env.CLIENT_APP_URL,
];

const corsMiddlewareOptions = {
  credentials: true,
  origin: (origin, callback) => {
    if (!origin) {
      callback(null, true);
      return;
    }

    callback(null, true);

    // if (whitelist.indexOf(origin) !== -1) {
    //   callback(null, true);
    // } else {
    //   const msg = `This site ${origin} does not have an access. Only specific domains are allowed to access it.`;
    //   callback(new Error(msg));
    // }
  },
};

function createServer() {
// Initialize Express
  const app = express();

  // Secure HTTP headers
  app.use(helmet());

  // Parse the body payload
  app.use(express.json());

  // For parsing application/x-www-form-urlencoded
  app.use(express.urlencoded({ extended: true }));

  // Create a middleware that adds a X-Response-Time header to responses.
  app.use(responseTime());
  app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    next();
  });

  app.use(cors(corsMiddlewareOptions));
  app.options('*', cors()); // include before other routes
  // or
  app.options('/api/any/url/example', cors(corsMiddlewareOptions));

  // Parse JSON request body
  app.use(express.json({ limit: '1mb' }));
  app.use(express.urlencoded({ extended: false, limit: '100000mb' }));

  // Initialize authentication middleware
  app.set('trust proxy', 1);
  app.use(passport.initialize());

  // List of all API routes
  // Authentication routes
  app.use('/api/auth', authentication);

  // User routes
  app.use('/api/user', userRoutes);

  // Test routes
  app.use('/api/test', testRoute);

  return app;
}

export default createServer;
