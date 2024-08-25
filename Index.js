const mongoose = require('mongoose');

const connectDB = async () => {
    try {
        await mongoose.connect(process.env.MONGODB_URI);
        console.log('Mongodb connected.');
    }catch (err) {
        console.error('Mongodb connetion error:', err);
        throw err;
    }
}
module.exports = connectDB; 
