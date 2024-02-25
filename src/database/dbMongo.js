import * as _ from '../config/env';
const mongoose = require('mongoose');
// abrimos una conexion a una db en mongo con mongoose
const connectToDatabase = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI);
        console.log('Connected to MongoDB');
    } catch (e) {
        console.error('Error connection to MongoDB: ', e);
        throw new Error('Unable to Connect to MongoDB');
    }
};

module.exports = { connectToDatabase };