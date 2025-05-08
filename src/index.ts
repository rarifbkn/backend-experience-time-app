import express, { Express, Request, Response, NextFunction } from "express";
import { connectDB } from "./config/db";
import cors from "cors";
import helmet from "helmet";
import morgan from "morgan";

const PORT: number = parseInt(process.env.PORT || "4000");

const app = express();

//use
app.use(cors());
app.use(helmet());
app.use(morgan("dev"));
app.use(express.json());

//Try connection with Atlas MongoDB
connectDB();

// Basic health check route
app.get("/health", (req: Request, res: Response) => {
  res.status(200).json({ status: "ok", message: "Server is running" });
});

app.use((req: Request, res: Response) => {
  res.status(404).json({
    status: "error",
    message: `Route ${req.originalUrl} not found`,
  });
});

const server = app.listen(PORT, () =>
  console.log(`🚀 Server ready at: http://localhost:${PORT}`)
);
