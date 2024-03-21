import express from 'express';
import tokenRoutes from './tokens';

const router = express.Router();

// Define tokens routes
router.use('/tokens', tokenRoutes);

export default router;
