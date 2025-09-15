import express from "express"
import path from "path"
import cors from "cors"
import inferenceRoutes from "./router/inference.router"
import reportRoutes from "./router/report.router"
import { config } from "./config/server.config"

const app = express()
const port = config.port || 8000;

app.use(cors({ origin: "*" }));

//middleware
app.use(express.json())

//routes
app.use("/api/model", inferenceRoutes)
app.use("/api/report", reportRoutes)

//health check
app.get("/", (req, res) => {
    res.send("API is up")
})

app.listen(port, () => {
    console.log(`Server is running on port:${port}`)
})