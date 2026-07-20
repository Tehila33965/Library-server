import { users } from "../users.js";
import { Book } from "../models/book.model.js";
import { isValidObjectId } from "mongoose";

export const getAllBooks = async (req, res, next) => {
    try {
        const books = await Book.find();
        res.json(books);
    } catch (err) {
        next({ status: 500, error: err, type: 'server error' });
    }
};

export const getBookById = async (req, res, next) => {
    try {
        const book = await Book.findById(req.params.id);
        if (!book) {
            const err = new Error('Book not found');
            return next({ status: 404, error: err, type: 'not found' });
        }
        res.json(book);
    } catch (err) {
        next({ status: 500, error: err, type: 'server error' });
    }
};

export const addBook = async (req, res, next) => {
    try {
        // const { name, category, price } = req.body;

        // if (!name || !category || price === undefined || isNaN(Number(price)) || Number(price) <= 0) {
        //     const err = new Error('Missing or invalid fields. Name, category, and a positive price are required.');
        //     err.statusCode = 400;
        //     return next(err);
        // }

        // const maxId = books.length > 0 ? Math.max(...books.map(b => b.id)) : 0;

        // const newBook = {
        //     id: maxId + 1,
        //     name,
        //     category,
        //     price: Number(price),
        //     isLoaned: false,
        //     loans: []
        // };

        const newBook = new Book(req.body);
        await newBook.save();
        res.status(201).json(newBook);
    } catch (err) {
        //res.status(500).json({ message: err.message, error: err });
        next({ status: 500, error: err, type: 'server error' });
    }
};

export const deleteBook = async (req, res, next) => {
    try {
        const index = req.params.id;

        if (!isValidObjectId(index)) {
            return next({ status: 404, error: new Error('Book not found'), type: 'resource not found error' });
        }
        const book = await Book.findByIdAndDelete(index);

        if (book) {
            return res.status(204).send();
        }

        return next({
            error: new Error('Book not found'),
            type: 'resource not found error',
            status: 404
        });

    } catch (err) {
        next({ status: 500, error: err, type: 'server error' });
    }
};

export const updateBook = async (req, res, next) => {
    try {
        const { id } = req.params;

        if (!isValidObjectId(id)) {
            return next({
                error: new Error('Book not found'),
                type: 'resource not found error',
                status: 404
            });
        }

        const book = await Book.findByIdAndUpdate(id, req.body, { new: true });

        if (!book) {
            return next({
                error: new Error('Book not found'),
                type: 'resource not found error',
                status: 404
            });
        }

        res.json(book);
    } catch (err) {
        next({ status: 500, error: err, type: 'server error' });
    }
};

// export const loanBook = (req, res, next) => {
//     try {
//         const { id } = req.params;
//         const { userId } = req.body;

//         const book = books.find(b => b.id == id);
//         const user = users.find(u => u.id == userId);

//         if (!book) {
//             const err = new Error('Book not found');
//             err.statusCode = 404;
//             return next(err);
//         }

//         if (book.isLoaned) {
//             const err = new Error('Book is already loaned out');
//             err.statusCode = 400;
//             return next(err);
//         }

//         if (!user) {
//             const err = new Error('User not found');
//             err.statusCode = 404;
//             return next(err);
//         }

//         book.isLoaned = true;
//         book.loans.push({
//             userId: user.id,
//             loanDate: new Date().toLocaleDateString()
//         });

//         user.loanedBookIds.push(book.id);

//         res.json({
//             message: 'Book loaned successfully',
//             book,
//             user: { id: user.id, username: user.username, loanedBookIds: user.loanedBookIds }
//         });
//     } catch (err) {
//         next(err);
//     }
// };

// export const returnBook = (req, res, next) => {
//     try {
//         const { id } = req.params;

//         const book = books.find(b => b.id == id);

//         if (!book) {
//             const err = new Error('Book not found');
//             err.statusCode = 404;
//             return next(err);
//         }

//         if (!book.isLoaned) {
//             const err = new Error('Book is not currently loaned');
//             err.statusCode = 400;
//             return next(err);
//         }

//         const lastLoan = book.loans[book.loans.length - 1];
//         const user = users.find(u => u.id == lastLoan.userId);

//         book.isLoaned = false;

//         if (user) {
//             user.loanedBookIds = user.loanedBookIds.filter(bookId => bookId != book.id);
//         }

//         res.json({
//             message: 'Book returned successfully',
//             book,
//             user: user ? { id: user.id, username: user.username, loanedBookIds: user.loanedBookIds } : null
//         });
//     } catch (err) {
//         next(err);
//     }
// };