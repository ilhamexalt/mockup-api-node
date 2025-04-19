import express, { Request, Response } from "express";
import { users } from "../src/data/users";
import { User } from "../src/types/user";

const router = express.Router();

// GET all
router.get("/", (req: Request, res: Response) => {
    res.json(users);
});

// GET by ID
router.get("/:id", (req: Request, res: Response) => {
    const user = users.find(u => u.id === parseInt(req.params.id));
    user ? res.json(user) : res.status(404).json({ message: "User not found" });
});

// POST
router.post("/", (req: Request, res: Response) => {
    const newUser: User = { id: Date.now(), ...req.body };
    users.push(newUser);
    res.status(201).json(newUser);
});

// PUT
router.put("/:id", (req: Request, res: Response) => {
    const index = users.findIndex(u => u.id === parseInt(req.params.id));
    if (index !== -1) {
        users[index] = { ...users[index], ...req.body };
        res.json(users[index]);
    } else {
        res.status(404).json({ message: "User not found" });
    }
});

// DELETE
router.delete("/:id", (req: Request, res: Response) => {
    const index = users.findIndex(u => u.id === parseInt(req.params.id));
    if (index !== -1) {
        const deleted = users.splice(index, 1);
        res.json(deleted[0]);
    } else {
        res.status(404).json({ message: "User not found" });
    }
});

export default router;
