import express from "express";
import "dotenv/config";
import userRoutes from "./routes/userRoutes.js";

const app = express();
const PORT = process.env.PORT;
app.use(express.json());

app.use("/api/users", userRoutes);

// Använd egen env
app.listen(8000, () => {
	console.log("Server is running on port 8000");
});
