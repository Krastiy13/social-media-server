import getCurrentDateTime from "../assets/cuurentTime.js"
import { db } from "../connect.js"
import jwt from "jsonwebtoken"

export const getPosts = (req, res) => {

    const token = req.cookies.accesToken


    if (!token) return res.status(401).json("Not logged in !")

    jwt.verify(token, "secretKey", (err, userInfo) => {
        if (err) return res.status(403).json("Token is not valid")

        const q = `SELECT p.*, u.id AS userId, name, img FROM posts AS p JOIN users AS u ON (u.id = p.userId) LEFT JOIN relationships AS r ON (p.userId = r.followedUserId ) WHERE r.followerUserId = ? OR p.userId = ? ORDER BY createdAt desc `;

        db.query(q, [userInfo.id, userInfo.id], (err, data) => {
            if (err) return res.status(500).json("error error error")
            return res.status(200).json(data)
        })
    })
}
export const addPost = (req, res) => {



    const token = req.cookies.accesToken


    if (!token) return res.status(401).json("Not logged in !")

    jwt.verify(token, "secretKey", (err, userInfo) => {
        if (err) return res.status(403).json("Token is not valid")



        const q = "INSERT INTO redsocial.posts (`desc`,`img`,`createdAt`,`userId`) VALUE (?,?,?,?) ";

        db.query(q, [req.body.desc, req.body.img, getCurrentDateTime(), userInfo.id], (err, data) => {
            if (err) return res.status(500).json(err)
            console.log(err)
            return res.status(200).json(" Post has been cerated !!")
        })
    })
}

