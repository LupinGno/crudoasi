import { createPool } from 'mysql2/promise';


const conexion = createPool({
    host: 'localhost',  
    user: 'root',       
    password: 'clave', 
    port: 3307,        
    database: 'ug'      
});

export default conexion;