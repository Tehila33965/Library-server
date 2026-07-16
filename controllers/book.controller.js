import { books } from "../db.js";
import { users } from "../users.js";

export const getAllBooks = (req, res, next) => {
    try {
        res.json(books);
    } catch (err) {
        next(err);
    }
};

export const getBookById = (req, res, next) => {
    try {
        const book = books.find(b => b.id == req.params.id);
        if (!book) {
            const err = new Error('Book not found');
            err.statusCode = 404;
            return next(err);
        }
        res.json(book);
    } catch (err) {
        next(err);
    }
};

export const addBook = (req, res, next) => {
    try {
        const { name, category, price } = req.body;

        if (!name || !category || price === undefined || isNaN(Number(price)) || Number(price) <= 0) {
            const err = new Error('Missing or invalid fields. Name, category, and a positive price are required.');
            err.statusCode = 400;
            return next(err);
        }

        const maxId = books.length > 0 ? Math.max(...books.map(b => b.id)) : 0;

        const newBook = {
            id: maxId + 1,
            name,
            category,
            price: Number(price),
            isLoaned: false,
            loans: []
        };

        books.push(newBook);
        res.status(201).json(newBook);
    } catch (err) {
        next(err);
    }
};

export const deleteBook = (req, res, next) => {
    try {
        const index = books.findIndex(b => b.id == req.params.id);
        if (index !== -1) {
            books.splice(index, 1);
            res.status(204).json();
        } else {
            const err = new Error('Book not found');
            err.statusCode = 404;
            next(err);
        }
    } catch (err) {
        next(err);
    }
};

export const updateBook = (req, res, next) => {
    try {
        const { id } = req.params;
        const bookIndex = books.findIndex(p => p.id == id);

        if (bookIndex === -1) {
            const err = new Error('Book not found');
            err.statusCode = 404;
            return next(err);
        }

        books[bookIndex] = {
            ...books[bookIndex],
            name: req.body.name,
            category: req.body.category,
            price: Number(req.body.price)
        };

        res.json(books[bookIndex]);
    } catch (err) {
        next(err);
    }
};

export const loanBook = (req, res, next) => {
    try {
        const { id } = req.params;
        const { userId } = req.body;

        const book = books.find(b => b.id == id);
        const user = users.find(u => u.id == userId);

        if (!book) {
            const err = new Error('Book not found');
            err.statusCode = 404;
            return next(err);
        }

        if (book.isLoaned) {
            const err = new Error('Book is already loaned out');
            err.statusCode = 400;
            return next(err);
        }

        if (!user) {
            const err = new Error('User not found');
            err.statusCode = 404;
            return next(err);
        }

        book.isLoaned = true;
        book.loans.push({
            userId: user.id,
            loanDate: new Date().toLocaleDateString()
        });

        user.loanedBookIds.push(book.id);

        res.json({
            message: 'Book loaned successfully',
            book,
            user: { id: user.id, username: user.username, loanedBookIds: user.loanedBookIds }
        });
    } catch (err) {
        next(err);
    }
};

export const returnBook = (req, res, next) => {
    try {
        const { id } = req.params;

        const book = books.find(b => b.id == id);

        if (!book) {
            const err = new Error('Book not found');
            err.statusCode = 404;
            return next(err);
        }

        if (!book.isLoaned) {
            const err = new Error('Book is not currently loaned');
            err.statusCode = 400;
            return next(err);
        }

        const lastLoan = book.loans[book.loans.length - 1];
        const user = users.find(u => u.id == lastLoan.userId);

        book.isLoaned = false;

        if (user) {
            user.loanedBookIds = user.loanedBookIds.filter(bookId => bookId != book.id);
        }

        res.json({
            message: 'Book returned successfully',
            book,
            user: user ? { id: user.id, username: user.username, loanedBookIds: user.loanedBookIds } : null
        });
    } catch (err) {
        next(err);
    }
};