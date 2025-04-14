import { v4 as uuidv4 } from "uuid";
import { createUser, getAllUsers } from "../models/User.js";



export const registerUser = (req, res) => {
	const newUser = {
		id: uuidv4(),
		created: new Date(),
	};

	createUser(newUser, (err, insertedUser) => {
		if (err) return res.status(500).json({ message: "Could not create user." });
		res.status(201).json({ userId: insertedUser.id });
	});
};

export const fetchAllUsers = (req, res) => {
	getAllUsers((err, users) => {
		if (err) return res.status(500).json({ message: "Could not fetch users." });
		res.json({ users });
	});
};
