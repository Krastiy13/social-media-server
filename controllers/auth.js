import { db } from "../connect.js"
import bcrypt from "bcrypt"


export const register = (req, res) => {
    //CHEQUEAR SI YA EXISTE EL USUARIO
    const q = "SELECT * FROM users WHERE username = ?"
    db.query(q, [req.body.username], (err, data) => {
        //controlar el erro

        console.log(req.body, 454545454)
        if (err) return res.status(500).json(err)
        //Chechear si el usuario ya existe
        if (data.length) return res.status(409).json("User already exists !!.")
        // si no existe crear el usuario 
        // HASEAER LA CONTRASEÑA 
        const salt = bcrypt.genSaltSync(10);
        const hashedPassword = bcrypt.hashSync(req.body.password, salt)

        const q2 = "INSERT INTO users (`username`,`password`,`name`,email) VALUE(?,?,?,?) "
        db.query(q2, [req.body.username, req.body.password, req.body.name, req.body.email], (err, data) => {

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


        const chechPassword = bcrypt.compareSync(req.body.password, data[0])
        if (!chechPassword) return res.status(400).json("Wrong password or username!")
    })
}



export const logout = (req, res) => {

}


