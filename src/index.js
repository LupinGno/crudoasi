import express from 'express';
import { createPool } from 'mysql2/promise';

const app = express();

const pool = createPool({
    host: 'mysql',  // 
    user: 'root',
    password: 'clave',
    port: 3306,     
    database: 'ug'
});

app.get('/', (req, res) => {
    res.send('Hola mundo');
});

app.get('/usuarios', async (req, res) => {
    try {

        const [filas] = await pool.query('SELECT nombre, edad FROM personas');

        res.json(filas);
    } catch (error) {
        console.error(error);
        res.status(500).send('Error conectando a la base de datos');
    }
});

app.listen(4000);
console.log('Servidor activo en el puerto 4000');