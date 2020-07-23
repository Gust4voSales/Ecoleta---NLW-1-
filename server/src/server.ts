import express from 'express';

const app = express();

app.get('/users', (req, res) => {
    console.log('USERS');

    res.json({ message: 'OK!@' });
});

app.listen(3333);