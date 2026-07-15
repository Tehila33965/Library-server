import express from 'express';

import { books } from './db.js';

const app = express();

app.use(express.json());

app.get('/', (req, res) => {
    res.json('Welcome to the Library Server API!');
});

app.get('/books', (req, res) => {
    res.json(books);
});

app.get('/books/:id', (req, res) => {
    const book = books.find(b => b.id == req.params.id);
    if (!book) {
        return res.status(404).json({error: 'Book not found'});
    }
    res.json(book);
});

app.post('/books', (req, res) => {
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

app.delete('/books/:id', (req, res) => {
    const index = books.findIndex(b => b.id == req.params.id);
    if (index !== -1) {
        books.splice(index, 1);
        res.status(204).json();
    } else {
        res.status(404).json({error: 'Book not found'});
    }
});

app.put('/books/:id', (req, res) => {
    const { id } = req.params;
    const bookI = books.findIndex(p => p.id === +id); 
    
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

app.put('/books/:id/loan', (req, res) => {
    const { id } = req.params;
    const { clientName } = req.body;
    const book = books.find(b => b.id == id);

    if (!book) {
        res.status(404).json({ error: 'Book not found' });
    } 

    else if (book.isLoaned) {
        res.status(400).json({ error: 'Book is already loaned out' });
    }

    else if (!clientName || clientName.trim() === '') {
        res.status(400).json({ error: 'Client name is required to loan a book' });
    }

    else {
    book.isLoaned = true;
    book.loans.push({
        clientName: clientName,
        loanDate: new Date().toLocaleDateString() // תאריך נוכחי
    });
        res.json({ message: 'Book loaned successfully', book });
    }
});

app.put('/books/:id/return', (req, res) => {
    const { id } = req.params;

    const book = books.find(b => b.id == id);

    if (!book) {
        res.status(404).json({ error: 'Book not found' });
    } else if (!book.isLoaned) {
        res.status(400).json({ error: 'Book is not currently loaned' });
    } else {
        book.isLoaned = false;

        res.json({ message: 'Book returned successfully', book });
    }
    
});

app.listen(5000, () => {
    console.log('Server is running on http://localhost:5000');
});