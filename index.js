import express from "express";
import userRoutes from "./routes/users.js"
import commentRoutes from "./routes/comment.js"
import likeRoutes from "./routes/likes.js"
import postRoutes from "./routes/post.js"
import authRoutes from "./routes/auth.js"
import cookieParser from "cookie-parser";
import cors from "cors"

const app = express()

const port = 8080

//midelwares
app.use(express.json())
app.use(cors())
app.use(cookieParser())



app.use("/api/users", userRoutes)
app.use("/api/post", postRoutes)
app.use("/api/comments", commentRoutes)
app.use("/api/likes", likeRoutes)
app.use("/api/auth", authRoutes)

app.listen(port, () => {
    console.log("¡api working")
})