import express from "express";
import { createOrder, getAllOrders, deleteOrder } from "../controllers/orderController.js";
import { validateUser } from "../middleware/validateOrder.js";
import { validateMenuItems } from "../middleware/validateOrder.js";

const router = express.Router();

router.get("/", getAllOrders);
router.post("/", validateUser, validateMenuItems, createOrder);

export default router;