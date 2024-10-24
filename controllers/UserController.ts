// controllers/UserController.ts
import { Request, Response } from "npm:express@4.18.2";
import mongoose from "npm:mongoose@6.1.0"; // Импортируем mongoose

// Функция для создания пользователя
export const createUser = async (req: Request, res: Response) => {
  const { name, birthday, father, mother } = req.body;

  const newUser = {
    name,
    birthday,
    father,
    mother,
  };

  const dbClient = req.dbClient; // Получаем клиент из запроса

  // Вставка пользователя в базу данных
  const database = dbClient.db("family-three"); // Укажите имя вашей базы данных
  const collection = database.collection("three"); // Укажите имя вашей коллекции

  await collection.insertOne(newUser); // Вставка нового пользователя в коллекцию

  res.status(201).json(newUser);
};

// Функция для получения всех пользователей
export const getAllUsers = async (req: Request, res: Response) => {
  const dbClient = req.dbClient; // Получаем клиент из запроса

  const database = dbClient.db("family-three");
  const collection = database.collection("three");

  const allUsers = await collection.find({}).toArray();

  res.json(allUsers);
};

// Функция для получения пользователя по ID
export const getUserById = async (req: Request, res: Response) => {
  const userId = parseInt(req.params.id);

  const dbClient = req.dbClient; // Получаем клиент из запроса

  const database = dbClient.db("family-three");
  const collection = database.collection("three");

  const user = await collection.findOne({ id: userId });

  if (!user) {
    return res.status(404).json({ message: "User not found" });
  }

  res.json(user);
};
