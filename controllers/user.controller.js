import { users } from "../users.js";

export const getAllUsers = (req, res) => {
    res.json(users);
}

export const signUp = (req, res) => {
    const { username, email, password } = req.body;

    if (!username || !email || !password) {
        res.status(400).json({ error: 'Username, email, and password are required' });
    } else {
        const userExists = users.some(u => u.username === username || u.email === email);
        if (userExists) {
            res.status(409).json({ error: 'Username or email already exists' });
        } else {
            const maxId = users.length > 0 ? Math.max(...users.map(u => u.id)) : 0;

            const newUser = {
                id: maxId + 1,
                username,
                email,
                password,
                loanedBookIds: [] 
            };

            users.push(newUser);
            res.status(201).json({ message: 'User registered successfully', user: newUser });
        }
    }
}

export const signIn = (req, res) => {
    const { username, password } = req.body;

    if (!username || !password) {
        res.status(400).json({ error: 'Username and password are required' });
    } else {
        const user = users.find(u => u.username === username && u.password === password);

        if (!user) {
            res.status(401).json({ error: 'Invalid username or password' });
        } else {
            res.json({ message: 'Login successful', user });
        }
    }
}