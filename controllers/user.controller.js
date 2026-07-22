import { User } from "../models/user.model.js";

export const getAllUsers = async (req, res, next) => {
    try {
        const users = await User.find();
        res.json(users);
    } catch (err) {
        next({ status: 500, error: err, type: 'server error' });
    }
};

export const signUp = async (req, res, next) => {
    try {
        const { name, email, phone, password } = req.body;

        if (!name || !email || !phone || !password) {
            return next({ status: 400, error: new Error('Name, email, phone, and password are required'), type: 'validation error' });
        }

        const userExists = await User.findOne({ email });
        if (userExists) {
            return next({ status: 409, error: new Error('Email already exists'), type: 'conflict error' });
        }

        const newUser = await User.create({
            name,
            email,
            phone,
            password
        });

        res.status(201).json({ message: 'User registered successfully', user: newUser });
    } catch (err) {
        next({ status: 500, error: err, type: 'server error' });
    }
};

export const signIn = async (req, res, next) => {
    try {
        const { email, password } = req.body;

        if (!email || !password) {
            return next({ status: 400, error: new Error('Email and password are required'), type: 'validation error' });
        }

        const user = await User.findOne({ email, password });

        if (!user) {
            return next({ status: 401, error: new Error('Invalid email or password'), type: 'authentication error' });
        }

        res.json({ message: 'Login successful', user });
    } catch (err) {
        next({ status: 500, error: err, type: 'server error' });
    }
};