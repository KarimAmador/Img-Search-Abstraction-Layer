const mongoose = require('mongoose');
const clientOptions = { serverApi: { version: '1', strict: true, deprecationErrors: true } };
require('dotenv').config();

const connectDB = async () => {
    try {
        console.log('connecting to database...');
        await mongoose.connect(process.env.MONGO_URI, clientOptions);
        await mongoose.connection.db.admin().command({ ping: 1 });
        console.log('connected to database');
    } catch (err) {
        console.dir(err);
    }
}

module.exports = connectDB;
