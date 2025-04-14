import express from "express";
import "dotenv/config";
import menuRoutes from "./routes/menuRoutes.js";

const app = express();
const PORT = process.env.PORT || 8000;

app.use(express.json());

app.use('/menu', menuRoutes);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
})