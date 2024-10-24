// app.ts
import express from "npm:express@4.18.2"; // Импортируем Express
import router from "./routes/index.ts"; // Импортируем маршрутизатор
import bodyParser from "npm:body-parser"; // Import body-parser

import { MongoClient } from "npm:mongodb@6.1.0"; // Убедитесь, что используете актуальную версию

const uri =
  "mongodb+srv://islam:7BeimRbPGZe9mUKg@family-tree.vs4jz.mongodb.net/?retryWrites=true&w=majority&appName=family-tree";

const client = new MongoClient(uri);

const app = express();
const PORT = 8000;

// Use your router for handling routes
app.use(bodyParser.json());

// Middleware для передачи клиента в запросы
app.use((req: { dbClient: MongoClient }, res: any, next: () => void) => {
  req.dbClient = client; // Сохраняем клиент в запросе
  next();
});

// Используем маршрутизатор
app.use(router);

async function main() {
  try {
    await client.connect();
    console.log("Connected to MongoDB Atlas");

    // Передаем объект client в маршрутизатор (можно использовать middleware)
    app.use((req: { dbClient: MongoClient }, res: any, next: () => void) => {
      req.dbClient = client; // Сохраняем клиент в запросе
      next();
    });

    app.listen(PORT, () => {
      console.log(`Server is running on http://localhost:${PORT}`);
    });
  } catch (error) {
    console.error("Error connecting to MongoDB:", error);
  }
}

main();
