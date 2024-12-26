const mongoose = require('mongoose')
const dotenv = require('dotenv')

dotenv.config()

const URL = process.env.MONGO_URL

const connectdb = async()=>{
    await mongoose.connect(URL)
    console.log('database is connected ')
}

module.exports = connectdb;