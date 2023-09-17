import { db } from "../connect.js"
import bcrypt from "bcrypt"
import jwt from "jsonwebtoken"


export const register = (req, res) => {
    //CHEQUEAR SI YA EXISTE EL USUARIO
    const q = "SELECT * FROM users WHERE username = ?"
    db.query(q, [req.body.username], (err, data) => {
        //controlar el erro
        if (err) return res.status(500).json(err)
        //Chechear si el usuario ya existe
        if (data.length) return res.status(409).json("User already exists !!.")
        // si no existe crear el usuario 
        // HASEAER LA CONTRASEÑA 
        const salt = bcrypt.genSaltSync(10);
        const hashedPassword = bcrypt.hashSync(req.body.password, salt)

        const q2 = "INSERT INTO users (`username`,`password`,`name`,email) VALUE(?,?,?,?) "
        db.query(q2, [req.body.username, hashedPassword, req.body.name, req.body.email], (err, data) => {

            if (err) return req.status(500).json(err)

            return res.status(200).json("User has been created succesfully.")
        })
    })

}


export const login = (req, res) => {


    const q = "SELECT * FROM users WHERE username = ? "
    db.query(q, [req.body.username], (err, data) => {
        if (err) return res.status(500).json(err)
        if (data.length === 0) return res.status(404).json("User not found.")
        const checkPassword = bcrypt.compareSync(req.body.password, data[0].password);
        if (!checkPassword) return res.status(400).json("Wrong password or username!")
        //crea un nuevo objeto llamado others  excluyendo la password
        const { password, ...others } = data[0]

        const token = jwt.sign({ id: data[0].id }, "secretKey")
        res.cookie("accesToken", token, {
            httpOnly: true,
        }).status(200).json(others)
    })
}



export const logout = (req, res) => {
    res.clearCookie("accesToken", {
        secure: true,
        sameSite: "none", // Corrección aquí

    }).status(200).json("User has been logged out.");
};


