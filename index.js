//Database connection
const connectDB = require("./db/databaseConnection")
const dotenv = require('dotenv')


dotenv.config()
connectDB()

//express
const express = require('express');
const app = express();
const port = 3000;
const Car = require('./models/Car')
//middlewares
app.use(express.json());

//routes

//save car data
const createCar = async (data) => {
    try{
        const car = await new Car(data)

        const savedCar = await car.save()

        return savedCar
    }
    catch(err){
        res.status(500).json({message: "Data is not saved", err})
    }
}

app.post('/cars', async(req,res) => {
    try{
        const car = await createCar(req.body)
        res.status(200).json({message: "Data is saved Successfully", car})
    }
    catch(err){
        res.status(500).json({message: "Data is not saved", err})
    }
})

//fetch car data 
app.get('/cars',async(req,res) => {
    try{
        const cars = await Car.find()
        res.status(200).json({message:"Data is fetch Successfully", cars})
    }
    catch(err){
        res.status(500).json({message: "Data is not fetch Successfully", err})
    }
})

//delete car data by delete method
app.delete('/cars/:id', async(req,res) => {
    try{
        const id= req.params.id;
        const deletedCar = await Car.findByIdAndDelete(id)
        if(!deletedCar){
            return res.status(404).json({message: "Car not found"});
        }
        res.status(200).json({
            message: "Car deleted Successfully !",
             deletedCar
            });
    }
    catch(err){
        res.status(500).json({message: err.message})
    }
})

//Update car data by post method
app.post('/cars/:id', async(req,res) => 
{
    try{
        const id = req.params.id;
        const updatedCar = await Car.findByIdAndUpdate(id,req.body,{new:true});
        if(!updatedCar){
            return res.status(500).json({message: "Car not found"});
        }
        res.status(200).json({
            message: "Car updated Successfully !",
            updatedCar
        })
    }
    catch(err){
        res.status(500).json({message: err.message})
    }
})

app.get('/cart/:id',async(req,res)=> {
const id = req.params.id;
const cartItem = await Cart.findById(id);
if(!cartItem){
    return res.status(404).json({message:"Cart item not found"})
}
res.status(200).json({message:"Cart item fetched Successfully !", cartItem})
})
app.listen(port,()=> {
    console.log('Server is running on port ',port)
})