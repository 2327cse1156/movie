import express from "express";
import cors from "cors";
import "dotenv/config";
import connectDB from "./config/db.js";
import {clerkMiddleware} from "@clerk/express"
const app = express();

const PORT = process.env.PORT || 5000;
await connectDB();
// middleware
app.use(express.json());
app.use(cors());
app.use(clerkMiddleware())

// api routes
app.get("/", (req,res)=>{
    res.send("Server is live");
})

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});