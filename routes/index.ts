// routes/index.ts
import { Router } from "npm:express@4.18.2"; // Import Router from Express
import {
  createUser,
  getAllUsers,
  getUserById,
} from "../controllers/UserController.ts"; // Import controller functions

const router = Router();

// Create a new user
router.post("/create-tree", createUser);

// Get all users
router.get("/", getAllUsers);

// Get a user by ID
router.get("/:id", getUserById);

export default router;
