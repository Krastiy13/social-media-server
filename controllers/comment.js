import { db } from "../connect.js"
import getCurrentDateTime from "../assets/cuurentTime.js"
import jwt from "jsonwebtoken"



export const writeComments = (req, res) => {

    console.log(req.body)

    const token = req.cookies.accesToken
    if (!token) return res.status(401).json("Not logged in !")

    jwt.verify(token, "secretKey", (err, userInfo) => {
        if (err) return res.status(403).json("Token is not valid")


        const q = "INSERT INTO comments (`desc`,`createdAt`,`userid`,`postid`) VALUE (?,?,?,?)"

        db.query(q, [req.body.desc, getCurrentDateTime(), userInfo.id, req.body.postId], (err, data) => {
            if (err) return res.status(500).json(err)
            return res.status(200).json("Comments has been created !!")
        })
    })

}


export const getComments = (req, res) => {
    console.log(req.query.postId)
    const q = `SELECT comments.* , users.coverPic , users.username , users.id AS userId
FROM comments 
JOIN users ON comments.userid = users.id
WHERE postid = ? `;

    db.query(q, [req.query.postId], (err, data) => {
        if (err) return res.status(500).json("error error error")
        return res.status(200).json(data)


    })

}

