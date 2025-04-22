import orderModel from "../models/Order.js";
import Joi from "joi";
import { getOrder } from "../models/Order.js";
// const validCategories = ["beverage", "pastry"];
// const validTitles = [
//     "Bryggkaffe",
//     "Caffè Doppio",
//     "Cappuccino",
//     "Latte Macchiato",
//     "Kaffe Latte",
//     "Cortado",
//     "Kanelbulle",
//     "Chokladboll",
//     "Morotskaka",
//     "Mazarin",
//     "Prinsesstårta",
//     "Dammsugare",
//     "Hallongrotta",
//     "Sockerkaka"
// ];

// const orderSchema = Joi.object({
//     _id: Joi.number().integer().required(),
//     id: Joi.required(),
//     title: Joi.string().valid(...validTitles).min(1).required(),
//     description: Joi.string(),
//     price: Joi.number().integer().required(),
//     category: Joi.string().valid(...validCategories)
// });

const itemSchema = Joi.object({
	_id: Joi.number().integer().required(),
	title: Joi.string().required(),
	price: Joi.number().integer().required(),
	category: Joi.string().required(),
});

const orderSchema = Joi.object({
	userId: Joi.string().guid({ version: "uuidv4" }).required(),
	items: Joi.array().items(itemSchema).min(1).required(),
});

export const createOrder = (req, res) => {
	const orderData = req.body;

	const { error, value } = orderSchema.validate(orderData, { abortEarly: false });

	if (error) {
		return res.status(400).json({
			error: "Ogiltig orderdata",
			details: error.details.map((detail) => detail.message),
		});
	}

	const newOrder = {
		...value,
		date: new Date().toISOString(),
	};

	orderModel.createOrder(newOrder, (err, savedOrder) => {
		if (err) {
			return res.status(500).json({ error: "Fel vid orderskapandet" });
		}
		res.status(201).json(savedOrder);
	});
};

export const getAllOrders = (req, res) => {
	orderModel.getAllOrders((err, orders) => {
		if (err) {
			return res.status(500).json({ error: "Fel vid hämtning av ordrar" });
		}
		res.status(200).json(orders);
	});
};

export const deleteOrder = (req, res) => {
	const { id } = req.params;
	orderModel.deleteOrder(id, (err, numRemoved) => {
		if (err) {
			return res.status(500).json({ error: "Gick inte att radera order" });
		}
		if (numRemoved === 0) {
			return res.status(404).json({ error: "Order inte hittad" });
		}
		res.status(200).json({ message: "Order raderad", removed: numRemoved });
	});
};

export const getSpecificOrder = (req, res) => {
	const { userId } = req.body;

	if (!userId) {
		return res.status(400).json({ error: "Ingen userId angiven" });
	}

	getOrder(userId, (err, order) => {
		if (err) {
			return res.status(500).json({ error: "Fel vid hämtning av ordrar" });
		}

		if (!order || order.length === 0) {
			return res.status(404).json({ error: "Ingen order hittad" });
		}
		res.status(200).json(order);
	});
};
