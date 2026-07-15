import { Router } from "express";
import { users } from "../users.js";
import { books } from "../db.js";

const router = Router();

router.get('/', (req, res) => {
    res.json(books);
});

router.get('/:id', (req, res) => {
    const book = books.find(b => b.id == req.params.id);
    if (!book) {
        return res.status(404).json({error: 'Book not found'});
    }
    res.json(book);
});

router.post('/', (req, res) => {
    const { name, category, price } = req.body;

    if (!name || !category || price === undefined || isNaN(Number(price)) || Number(price) <= 0) {
        res.status(400).json({ error: 'Missing or invalid fields. Name, category, and a positive price are required.' });
    } else {
        const maxId = books.length > 0 ? Math.max(...books.map(b => b.id)) : 0;

        const newBook = {
            id: maxId + 1, 
            name: name,
            category: category,
            price: Number(price),
            isLoaned: false,
            loans: []
        };
        
        books.push(newBook);

        res.status(201).json(newBook);
    }
});

router.delete('/:id', (req, res) => {
    const index = books.findIndex(b => b.id == req.params.id);
    if (index !== -1) {
        books.splice(index, 1);
        res.status(204).json();
    } else {
        res.status(404).json({error: 'Book not found'});
    }
});

router.put('/:id', (req, res) => {
    const { id } = req.params;
    const bookI = books.findIndex(p => p.id == id); 
    
    if(bookI === -1) {
        res.status(404).json({ error: 'book not found' });
    } else{
        books[bookI] = {
            ...books[bookI],
            name: req.body.name, 
            category: req.body.category,
            price: Number(req.body.price)
        };
        res.json(books[bookI]);
    }
});

router.put('/:id/loan', (req, res) => {
    const { id } = req.params;
    const { userId } = req.body;

    const book = books.find(b => b.id == id);
    const user = users.find(u => u.id == userId);

    if (!book) {
        res.status(404).json({ error: 'Book not found' });
    } else if (book.isLoaned) {
        res.status(400).json({ error: 'Book is already loaned out' });
    } else if (!user) {
        res.status(404).json({ error: 'User not found' });
    } else {
        book.isLoaned = true;
        book.loans.push({
            userId: user.id,
            loanDate: new Date().toLocaleDateString()
        });

        user.loanedBookIds.push(book.id);

        res.json({ 
            message: 'Book loaned successfully', 
            book: book, 
            user: { id: user.id, username: user.username, loanedBookIds: user.loanedBookIds } 
        });
    }
});

router.put('/:id/return', (req, res) => {
    const { id } = req.params;

    const book = books.find(b => b.id == id);

    if (!book) {
        res.status(404).json({ error: 'Book not found' });
    } else if (!book.isLoaned) {
        res.status(400).json({ error: 'Book is not currently loaned' });
    } else {
        const lastLoan = book.loans[book.loans.length - 1];
        const user = users.find(u => u.id == lastLoan.userId);

        book.isLoaned = false;

        if (user) {
            user.loanedBookIds = user.loanedBookIds.filter(bookId => bookId != book.id);
        }

        res.json({ 
            message: 'Book returned successfully', 
            book: book,
            user: user ? { id: user.id, username: user.username, loanedBookIds: user.loanedBookIds } : null
        });  
    }  
});

export default router;