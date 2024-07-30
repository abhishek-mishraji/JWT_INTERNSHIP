const express = require("express")
const app = express()
const cors = require("cors")
const bodyParser = require("body-parser")
const mongoose = require("mongoose")
const router = require("./routes/userr")
const cookieParser = require("cookie-parser")
const path = require('path')
const dotenv = require('dotenv');
dotenv.config();
const username = process.env.DB_USERNAME;
const password = process.env.DB_PASSWORD;

app.use(bodyParser.json())
app.use(cookieParser())
app.use(cors({
    origin: ["http://localhost:3001"],
    credentials: true
}))
// app.use(cors())
// mongoose.connect("mongodb://127.0.0.1:27017/internships").then(() => {
//     console.log("connected to database Internship")
// })

const Connection = async (username, password) => {
    const URL = `mongodb://${username}:${password}@ac-8ajmqqb-shard-00-00.kvyyywi.mongodb.net:27017,ac-8ajmqqb-shard-00-01.kvyyywi.mongodb.net:27017,ac-8ajmqqb-shard-00-02.kvyyywi.mongodb.net:27017/?tls=true&replicaSet=atlas-nh6hbi-shard-0&authSource=admin&retryWrites=true&w=majority&appName=blog-app`;
    try {
        await mongoose.connect(URL, { useNewUrlParser: true })
        console.log('Database connected successfully');
    } catch (error) {
        console.log('Error while connecting to the database ', error);
    }
};

Connection(username, password);
app.use("/auth", router)

app.use(express.static(path.join(__dirname, 'build')))
app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname, 'build', 'index.html'))
})

app.listen(3000, () => {
    console.log("server is running on port 3000")
})

