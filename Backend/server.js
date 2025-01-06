const express = require("express")
const app = express()
const connectdb = require('./database/database.js')
const dotenv = require('dotenv')
const router = require("./Routes/routes.js")
const cors = require('cors')

const corsOptions = {
    origin: "https://online-library-1-7ilo.onrender.com",
    credentials: true
}

app.use(cors(corsOptions))

app.use(express.urlencoded({extended: true}))
dotenv.config()
app.use(express.json())

connectdb()

app.use('/bookdata',router)

const PORT = process.env.PORT

app.listen(PORT,(error)=>{
    if(error) throw error
    console.log(`server is running`)
})
