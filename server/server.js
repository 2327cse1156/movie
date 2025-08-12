import express from "express";
import cors from "cors";
import "dotenv/config";
import connectDB from "./config/db.js";
import { clerkMiddleware } from "@clerk/express";
import { serve } from "inngest/express";
import { functions, inngest } from "./inngest/index.js";
import showRouter from "./routes/showRoutes.js"
const app = express();

const PORT = process.env.PORT || 5000;
await connectDB();
// middleware
app.use(express.json());
app.use(cors());
app.use(clerkMiddleware());
app.use(
  "/api/inngest",
  serve({
    client: inngest,
    functions,
  })
);
app.use("/api/show",showRouter)

// api routes
app.get("/", (req, res) => {
  res.send("Server is live");
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
