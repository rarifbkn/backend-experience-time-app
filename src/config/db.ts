import mongoose from "mongoose";
import dotenv from "dotenv";

// Load environment variables from .env.local first, then fallback to .env
dotenv.config({ path: ".env.local" });

const uri = process.env.MONGODB_URI || "";

const options = {} as mongoose.ConnectOptions;

export async function connectDB(): Promise<void> {
  try {
    await mongoose.connect(uri, options);
    console.log(`🪄 ....... Conectao mi pana`);
  } catch (error) {
    console.error("Error al conectar a mongoDB:", error);
    process.exit(1);
  }
}

//close connection

mongoose.connection.on("disconnected", () => {
  console.log("MongoDB desconectado");
});

mongoose.connection.on("error", (err) => {
  console.error("Error en la conexión de MongoDB:", err);
});
