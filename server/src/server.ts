import express from 'express';
import router from './routes';

const app = express();

app.use(express.json()); // Enable the server to understand requests with json 

app.use(router);

app.listen(3333);