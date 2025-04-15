import Datastore from "nedb";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const userDb = new Datastore({ filename: path.join(__dirname, "../db/users.db"), autoload: true });

export const createUser = (userData, cb) => {
	userDb.insert(userData, cb);
};

export const getAllUsers = (callback) => {
	userDb.find({}, callback); 
};

export const findUserById = (id, callback) => {
	userDb.findOne({ id: id }, callback);
};

const userModel = { createUser, getAllUsers, findUserById };
export default userModel;