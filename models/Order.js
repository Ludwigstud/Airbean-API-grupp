import Datastore from 'nedb';
import path from 'path';

const orderDB = new Datastore({ filename: path.join(__dirname, 'db', 'orders.db'), autoload: true });

createOrder: (orderData, callback) => {
    orderDB.insert(orderData, (err, newDoc) => {
        if(err) return callback(err);
        callback(null, newDoc);
    });
};

getAllOrders: (callback) => {
    orderDB.find({}, (err, docs) => {
        if (err) return callback(err);
        callback(null, docs);
    });
};

deleteOrder: (id, callback) => {
    orderDB.remove({ _id: id }, {}, (err, numRemoved) => {
        if(err) return callback(err);
        callback(null, numRemoved);
    });
};

export default { createOrder, getAllOrders, updateOrder, deleteOrder }