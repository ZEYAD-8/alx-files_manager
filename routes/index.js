// eslint-disable-next-line no-unused-vars
import express from 'express';
import { getStatus, getStats } from '../controllers/AppController';

// const router = express.Router();
// router.get('/status', getStatus);
// router.get('/stats', getStats);

// export default router;

/**
 * Injects routes with their handlers to the given Express application.
 * @param {Express} api
 */
const injectRoutes = (api) => {
  api.get('/status', getStatus);
  api.get('/stats', getStats);
};

export default injectRoutes;
