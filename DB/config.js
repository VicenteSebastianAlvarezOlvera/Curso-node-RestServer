const mongoose = require('mongoose');

const dbConnection = async() => {
    try {
        await mongoose.connect(process.env.MONGODB_CNN, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            useCreateIndex: true,
            useFindAndModify: true
        });
        console.log('La base de datos sirve');
    } catch (error) {
        console.log(error);
        throw new error('error en la base de datos');
    }
}
module.exports = { dbConnection }