import express from 'express';
import cors from 'cors';
import { errors } from 'celebrate';
import router from './routes';
import path from 'path';

const app = express();

app.use(cors());
app.use(express.json()); // Enable the server to understand requests with json 

app.use(router);

app.use('/uploads', express.static(path.resolve(__dirname, '..', 'uploads')));

app.use(errors());

app.listen(3333);