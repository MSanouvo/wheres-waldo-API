const express = require("express")
const path = require("node:path")
//Name can change if needed
const index = require("./routes/router")
const cors = require('cors')

const app = express()
const PORT = process.env.PORT || 3000

app.use(express.urlencoded({ exntended: true }))
// app.use(cors({
//     origin: 'http://localhost:5173',
//     methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
//     allowedHeaders: ['Content-Type', 'Authorization'],
//     credentials: true
// }))
app.use(cors({
    origin: 'https://wimmel.netlify.app',
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization'],
    credentials: true
}))
app.use(express.json())
app.use('/static', express.static(path.join(__dirname, 'public')))


app.use("/", index)


app.listen(PORT, () => {
    console.log(`Server Running at port: ${PORT}`)
})