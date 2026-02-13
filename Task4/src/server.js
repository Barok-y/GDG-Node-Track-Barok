import dotenv from "dotenv";
import path from "path";
import { fileURLToPath } from "url";


const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

dotenv.config({ path: path.resolve(__dirname, "../.env") });

console.log("Checking MONGO_URI:", process.env.MONGO_URI ? "Found!" : "NOT FOUND!");

import { app } from "./app.js";
import connectDB  from "./config/database.js";

connectDB();
const port = process.env.PORT || 3000;

app.listen(port, () => {
    console.log(` Archon Server running on port ${port}`);
});