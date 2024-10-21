/* eslint-disable no-console */
import { connect } from 'mongoose';

const uri = process.env.ENV === 'DEV' ? process.env.LOCAL_MONGO_URI : process.env.DOCKER_MONGO_URI;

const dbConnection = async () => {
  console.log(`MongoDB connections string: ${uri}`);

  connect(uri, {
    directConnection: true,
  })
    .then(() => {
      console.log('Connected to MongoDB');
    })
    .catch((err) => {
      console.error('Failed to connect to MongoDB:', err);
    });
};

export default dbConnection;
