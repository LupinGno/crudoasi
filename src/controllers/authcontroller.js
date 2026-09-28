import conexion from '../database/db.js';
import bcryptjs from 'bcryptjs';
import jwt from 'jsonwebtoken'; 

export const registrar = async (req, res) => {
    try {
        const name = req.body.name;
        const email = req.body.email;
        const password = req.body.password;
        let passHash = await bcryptjs.hash(password, 8);
        await conexion.query('INSERT INTO usuarios SET ?', { nombre: name, email: email, password: passHash });
        res.redirect('/');
    } catch (error) {
        console.log(error);
        res.status(500).send('Error al registrar el usuario');
    }
};

export const login = async (req, res) => {
    try {
        const email = req.body.email;
        const password = req.body.password;

        if (!email || !password) {
            return res.send('Por favor, ingresa tu correo y contraseña');
        }

        const [usuarios] = await conexion.query('SELECT * FROM usuarios WHERE email = ?', [email]);

        if (usuarios.length === 0 || !(await bcryptjs.compare(password, usuarios[0].password))) {
            res.send('Correo o contraseña incorrectos');
        } else {
            const id = usuarios[0].id;
            const token = jwt.sign({ id: id }, 'secreto_super_seguro', {
                expiresIn: '1h' 
            });

            res.cookie('jwt', token, {
                httpOnly: true,
                maxAge: 3600000 
            });

            console.log('¡Inicio de sesión exitoso!');
            res.redirect('/');
        }
    } catch (error) {
        console.log(error);
        res.status(500).send('Error en el servidor');
    }
};


export const isAuthenticated = async (req, res, next) => {

    if (req.cookies.jwt) {
        try {

            const decodificada = jwt.verify(req.cookies.jwt, 'secreto_super_seguro');
            
            return next();
        } catch (error) {
            return res.redirect('/login');
        }
    } else {
        return res.redirect('/login');
    }
};

export const logout = (req, res) => {
    res.clearCookie('jwt'); 
    return res.redirect('/login'); 
};