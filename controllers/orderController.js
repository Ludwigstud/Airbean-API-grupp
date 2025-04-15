import orderModel from '../models/Order.js';

export const createOrder = (req, res) => {
    const orderData = req.body;

    orderModel.createOrder(orderData, (err, newOrder) => {
        if (err) {
            return res.status(500).json({ error: 'Fel vid orderskapandet' });
        }
        res.status(201).json(newOrder);
    });
};

export const getAllOrders = (req, res) => {
    orderModel.getAllOrders((err, orders) => {
        if (err) {
            return res.status(500).json({ error: 'Fel vid hämtning av ordrar' });
        };
        res.status(200).json(orders)
    });
};

export const deleteOrder = (req, res) => {
    const { id } = req.params;
    orderModel.deleteOrder(id, (err, numRemoved) => {
        if (err) {
            return res.status(500).json({ error: 'Gick inte att radera order' });
        };
        if (numRemoved === 0) {
            return res.status(404).json({ error: 'Order inte hittad' });
        }
        res.status(200).json({ message: 'Order raderad', removed: numRemoved });
    });
};