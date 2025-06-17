const express = require("express")
const path = require("node:path")
//Name can change if needed
const index = require("./routes/router")
const cors = require('cors')

const app = express()
const PORT = process.eventNames.PORT || 3000

app.use(express.urlencoded({ exntended: true }))
app.use(cors({
    origin: 'http://localhost:5173',
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization'],
    credentials: true
}))
app.use(express.json())
// app.use(cors())


app.use("/", index)


app.listen(PORT, () => {
    console.log(`Server Running at port: ${PORT}`)
})