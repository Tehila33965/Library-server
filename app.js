import express from 'express';

import { books } from './db.js';

const app = express();

app.use(express.json());

app.get('/', (req, res) => {
    res.send('Welcome to the Library Server API!');
});

app.get('/books', (req, res) => {
    res.send(books);
});

app.get('/books/:id', (req, res) => {
    const book = books.find(b => b.id == req.params.id);
    if (!book) {
        return res.status(404).send('Book not found');
    }
    res.send(book);
});

app.post('/books', (req, res) => {
    const maxId = books.length > 0 ? Math.max(...books.map(b => b.id)) : 0;

    const newBook = {
        id: maxId + 1, 
        name: req.body.name,
        category: req.body.category,
        price: Number(req.body.price),
        isLoaned: false,
        loans: []
    };
    
    books.push(newBook);
    res.send('success');
});

app.delete('/books/:id', (req, res) => {
    const index = books.findIndex(b => b.id == req.params.id);
    if (index !== -1) {
        books.splice(index, 1);
        res.send('success');
    } else {
        res.status(404).send('Book not found');
    }
});


app.listen(5000, () => {
    console.log('Server is running on http://localhost:5000');
});