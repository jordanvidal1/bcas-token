import express from 'express';
import tokenRoutes from './tokens';

const router = express.Router();

router.use('/tokens', tokenRoutes);

export default router;
