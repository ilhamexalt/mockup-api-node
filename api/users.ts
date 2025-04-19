import { VercelRequest, VercelResponse } from '@vercel/node';
import { users } from '../data/users';
import { User } from '../types/user';

export default function handler(req: VercelRequest, res: VercelResponse) {
    const { method, query, body } = req;

    if (method === 'GET') {
        const { id } = query;
        if (id) {
            const user = users.find(u => u.id === parseInt(id as string));
            user ? res.json(user) : res.status(404).json({ message: 'User not found' });
        } else {
            res.json(users);
        }
    } else if (method === 'POST') {
        const newUser: User = { id: Date.now(), ...body };
        users.push(newUser);
        res.status(201).json(newUser);
    } else if (method === 'PUT') {
        const { id } = query;
        const index = users.findIndex(u => u.id === parseInt(id as string));
        if (index !== -1) {
            users[index] = { ...users[index], ...body };
            res.json(users[index]);
        } else {
            res.status(404).json({ message: 'User not found' });
        }
    } else if (method === 'DELETE') {
        const { id } = query;
        const index = users.findIndex(u => u.id === parseInt(id as string));
        if (index !== -1) {
            const deleted = users.splice(index, 1);
            res.json(deleted[0]);
        } else {
            res.status(404).json({ message: 'User not found' });
        }
    } else {
        res.status(405).end();
    }
}
