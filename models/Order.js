import Datastore from 'nedb';
import path from 'path';
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const orderDB = new Datastore({ filename: path.join(__dirname, "../db/orders.db"), autoload: true });

const createOrder = (orderData, callback) => {
   
    orderDB.insert(orderData, (err, newDoc) => {
        if(err) return callback(err);
        callback(null, newDoc);
    });
};

const getAllOrders = (callback) => {
    orderDB.find({}, (err, docs) => {
        if (err) return callback(err);
        callback(null, docs);
    });
};

const deleteOrder = (id, callback) => {
    orderDB.remove({ _id: id }, {}, (err, numRemoved) => {
        if(err) return callback(err);
        callback(null, numRemoved);
    });
};

export const getOrder = (userId, cb) => {
  orderDB.find({userId: userId}, (err, docs) => {
    if (err) return cb(err);
    cb(null, docs);
  })
}

export default { createOrder, getAllOrders, deleteOrder,  }