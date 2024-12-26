const express = require("express")
const app = express()
const connectdb = require('./database/database.js')
const dotenv = require('dotenv')
const router = require("./Routes/routes.js")
const cors = require('cors')

app.use(cors())
dotenv.config()
app.use(express.json())

connectdb()

app.use('/bookdata',router)

const PORT = process.env.PORT

app.listen(PORT,(error)=>{
    if(error) throw error
    console.log(`server is running`)
})