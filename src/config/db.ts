import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config({ path: ".env.local" });
dotenv.config(); 

const uri = process.env.MONGODB_URI || "";

const options: mongoose.ConnectOptions = {
};

export async function connectDB(): Promise<void> {
  try {
    await mongoose.connect(uri, options);
    console.log(`🪄 ....... Conectao mi pana`);
    
    setupConnectionHandlers();
  } catch (error) {
    console.error("Error al conectar a mongoDB:", error);
    process.exit(1);
  }
}

function setupConnectionHandlers(): void {
  mongoose.connection.on("disconnected", () => {
    console.log("MongoDB desconectado");
  });

  mongoose.connection.on("error", (err) => {
    console.error("Error en la conexión de MongoDB:", err);
  });
  
  process.on('SIGINT', async () => {
    await mongoose.connection.close();
    console.log('Conexión a MongoDB cerrada debido a la terminación de la aplicación');
    process.exit(0);
  });
  
  process.on('SIGTERM', async () => {
    await mongoose.connection.close();
    console.log('Conexión a MongoDB cerrada debido a la terminación de la aplicación');
    process.exit(0);
  });
}

export default mongoose;