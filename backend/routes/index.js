import express from 'express';
const router = express.Router();

import userRoutes from './userRoutes.js';
import productRoutes from './productRoutes.js';
import orderRoutes from './orderRoutes.js';
import uploadRoutes from './uploadRoutes.js';

router.use('/api/users', userRoutes);
router.use('/api/products', productRoutes);
router.use('/api/orders', orderRoutes);
router.use('/api/upload', uploadRoutes);

export default router;
