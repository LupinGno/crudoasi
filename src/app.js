import express from 'express';
import path from 'path';
import dotenv from 'dotenv';
import cookieParser from 'cookie-parser';

import router from './routes/router.js'; 

import { fileURLToPath } from 'url';
import { dirname } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const app = express();

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cookieParser());

dotenv.config({ path: './src/env/.env' });
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', router); 

app.listen(4000, () => {
  console.log('Servidor escuchando en el puerto 4000');
});