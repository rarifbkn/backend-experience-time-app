import express, { Express, Request, Response, NextFunction } from "express";
import { connectDB } from "./config/db";
import cors from "cors";
import helmet from "helmet";
import morgan from "morgan";
import formsRoutes from './Forms/forms.routes';
import fieldRoutes from './Field/field.routes';
import assignmentRoutes from './Assignment/assignment.routes';
import answerRoutes from './Answer/answer.routes';

const PORT: number = parseInt(process.env.PORT || "4000");

const app = express();

app.use(cors());
app.use(helmet());
app.use(morgan("dev"));
app.use(express.json());


connectDB();

app.use('/forms', formsRoutes);
app.use('/fields', fieldRoutes );
app.use('/assignments', assignmentRoutes);
app.use('/answers', answerRoutes);

app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
  console.error(err.stack);
  res.status(500).json({ error: "Something went wrong!" });
});

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
