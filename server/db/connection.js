const mongoose = require('mongoose');

mongoose.Promise = global.Promise;
const db = mongoose.connect(
    process.env.MONGODB_URL || 'mongodb+srv://Vlad-Work:02022001dkfl@aqi.cuoi8.mongodb.net/AQI?retryWrites=true&w=majority',
    { useNewUrlParser: true },
    err => {
        if (err) throw err;
        console.log(`Successfully connected to database.`);
    })/* .catch(err => {
        console.log('database err', err);
    }); */

module.exports = db;
