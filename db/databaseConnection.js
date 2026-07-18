const mongoose=require('mongoose')
const dotenv = require('dotenv')

dotenv.config()

const connectDB = async() => {
    try{
await mongoose.connect(process.env.CAR_URI)
console.log("Database connected Successfully!")
    }
    catch(err){
        console.log("Database connection failed!",err)
    }
}

module.exports = connectDB