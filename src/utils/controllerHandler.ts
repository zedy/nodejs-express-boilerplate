// utils
import logger from '../utils/helpers/errorLogger';

const controllerHandler = (callback) => async (req, res) => {
  try {
    const data = await callback(req, res);

    return {
      success: true,
      ...data,
    };
  } catch (e) {
    // eslint-disable-next-line no-console
    console.debug(e);

    logger.log({
      level: 'error',
      message: e,
    });
    return {
      success: false,
      message: e.message,
      tits: 'yes',
    };
  }
};

export default controllerHandler;
