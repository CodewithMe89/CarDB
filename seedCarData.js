const connectDB = require('./db/databaseConnection')
const Car = require('./models/Car')
const fs = require('fs')

connectDB()

const readableStream = fs.readFileSync('carData.json','utf-8');
const jsonData = JSON.parse(readableStream);

const seedCarData = async () => {
    try{
        for ( const car of jsonData){
            const newCar = new Car({
                model: car.model,
                name: car.name,
                color: car.color,
                price: car.price
            })
            newCar.save()
        }
    }
    catch(err){
        console.log("Data seeding failed", err)
    }
}

seedCarData()