import express from 'express';
import { getMenu, getMenuByCategory } from '../controllers/menuController.js';

const router = express.Router();

router.get('/', getMenu); // GET /menu
router.get('/category/:category', getMenuByCategory); // GET /menu/category/beverage

export default router;
