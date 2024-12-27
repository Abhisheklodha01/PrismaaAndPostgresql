import { config } from "dotenv";
import app from "./app.js";

config()

const PORT = process.env.PORT
app.listen(prompt, () => {
    console.log(`Server is running on port: ${PORT}`);
    
})