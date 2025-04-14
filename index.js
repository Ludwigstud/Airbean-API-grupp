import express from "express";
import "dotenv/config"


const app = express();
const PORT = process.env.PORT



// Använd egen env
app.listen(PORT, () => {
	console.log("Server is running on port 3000");
});
