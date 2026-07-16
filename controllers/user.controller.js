import { users } from "../users.js";

export const getAllUsers = (req, res, next) => {
    try {
        res.json(users);
    } catch (err) {
        next(err);
    }
};

export const signUp = (req, res, next) => {
    try {
        const { username, email, password } = req.body;

        if (!username || !email || !password) {
            const err = new Error('Username, email, and password are required');
            err.statusCode = 400;
            return next(err);
        }

        const userExists = users.some(u => u.username === username || u.email === email);
        if (userExists) {
            const err = new Error('Username or email already exists');
            err.statusCode = 409;
            return next(err);
        }

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
    } catch (err) {
        next(err);
    }
};

export const signIn = (req, res, next) => {
    try {
        const { username, password } = req.body;

        if (!username || !password) {
            const err = new Error('Username and password are required');
            err.statusCode = 400;
            return next(err);
        }

        const user = users.find(u => u.username === username && u.password === password);

        if (!user) {
            const err = new Error('Invalid username or password');
            err.statusCode = 401;
            return next(err);
        }

        res.json({ message: 'Login successful', user });
    } catch (err) {
        next(err);
    }
};