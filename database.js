const mongoose = require('mongoose');
function DbConnect() {
    const DB_URL = "mongodb+srv://amit1308:Amit123@cluster0.eadb6bm.mongodb.net/";
    // const DB_URL = process.env.DB_URL;
    mongoose.connect(DB_URL, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    });
    const db = mongoose.connection;
    db.on('error', console.error.bind(console, 'connection error:'));
    db.once('open', () => {
        console.log('DB connected...');
    }); 
}  

module.exports = DbConnect;