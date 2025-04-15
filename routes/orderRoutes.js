import express from "express";
import { createOrder, getAllOrders, deleteOrder } from "../controllers/orderController.js";


const router = express.Router();


router.get("/", getAllOrders);
router.post("/", createOrder)

export default router