import express, { Request, Response } from "express";
import { users } from "../data/users";
import { User } from "../types/user"

const router = express.Router();

// GET all
router.get("/", (req: Request, res: Response) => {
    res.json({
        transactionId: '0f06b466-99dd-4f59-a5df-1ad9f2a84d0a',
        code: '',
        message: 'OK',
        eTag: 'pfmKgK6RpIkgkAAYukTfo21KRTyCwpiA',
        data: users
    });
});

// GET by ID
router.get("/:id", (req: Request, res: Response) => {
    const user = users.find(u => u.id === parseInt(req.params.id));
    user ? res.json({
        transactionId: '0f06b466-99dd-4f59-a5df-1ad9f2a84d0a',
        code: '',
        message: 'OK',
        eTag: 'pfmKgK6RpIkgkAAYukTfo21KRTyCwpiA',
        data: [user]
    }) : res.status(404).json({ message: "User not found" });
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
