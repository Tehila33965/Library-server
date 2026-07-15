import express from 'express';

import mainRouter from './routes/index.route.js';

const app = express();

app.use(express.json());

app.use('/api', mainRouter);

app.get('/', (req, res) => {
    res.json('Welcome to the Library Server API!');
});

app.listen(5000, () => {
    console.log('Server is running on http://localhost:5000');
});