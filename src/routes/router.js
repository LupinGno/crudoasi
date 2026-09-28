import express from 'express';
import conexion from '../database/db.js';
import { registrar, login, isAuthenticated, logout } from '../controllers/authcontroller.js';

const router = express.Router();
//rutas publicas
router.get('/login', (req, res) => res.render('login'));
router.get('/register', (req, res) => res.render('register'));
router.post('/register', registrar);
router.post('/login', login);
router.get('/logout', logout);


// rutas privadas

router.get('/', isAuthenticated, async (req, res) => {
    try {
        const [usuarios] = await conexion.query('SELECT * FROM usuarios');
        res.render('index', { users: usuarios });
    } catch (error) {
        res.status(500).send('Error al cargar la base de datos');
    }
});

router.get('/delete/:id', isAuthenticated, async (req, res) => {
    const id = req.params.id; 
    try {
        await conexion.query('DELETE FROM usuarios WHERE id = ?', [id]);
        res.redirect('/'); 
    } catch (error) {
        res.status(500).send('Error al eliminar usuario');
    }
});

router.get('/edit/:id', isAuthenticated, async (req, res) => {
    const id = req.params.id;
    try {
        const [usuario] = await conexion.query('SELECT * FROM usuarios WHERE id = ?', [id]);
        res.render('edit', { user: usuario[0] });
    } catch (error) {
        res.status(500).send('Error al buscar usuario');
    }
});

router.post('/update', isAuthenticated, async (req, res) => {
    const id = req.body.id;
    const name = req.body.name;
    const email = req.body.email;
    try {
        await conexion.query('UPDATE usuarios SET nombre = ?, email = ? WHERE id = ?', [name, email, id]);
        res.redirect('/');
    } catch (error) {
        res.status(500).send('Error al actualizar usuario');
    }
});

export default router;