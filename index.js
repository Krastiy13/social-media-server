import Express from "express";
import userRoutes from "./routes/users.js"
const app = Express()

const port = 8080

app.use("/api/users", userRoutes)

app.listen(port, () => {
    console.log("¡api working")
})