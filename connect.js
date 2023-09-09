import mysql from "mysql"
import dotenv from "dotenv"
dotenv.config()


export const db = mysql.createConnection({
    host: process.env.MYSQL_HOST,
    user: process.env.MYSQL_USER,
    password: process.env.MYSQL_PASSWORD,
    database: process.env.MYSQL_DATABASE,

})


db.connect(function (err) {
    if (err) {
        console.error("Error en la conexión a la base de datos:", err);
        // Puedes realizar otras acciones aquí, como cerrar la aplicación o registrar el error en algún lugar.
    } else {
        console.log("Conexión exitosa a la base de datos");
        // Continúa con otras operaciones después de una conexión exitosa.
    }
});