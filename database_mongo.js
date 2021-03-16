const MongoClient  = require('mongodb').MongoClient;
var mongo_user = process.env.MONGO_USER;
var mongo_password = process.env.MONGO_PWD;
var mongo_host = process.env.MONGO_HOST;
var uri = `mongodb+srv://${mongo_user}:${mongo_password}@${mongo_host}`;
const client = new MongoClient(
    uri, 
    { 
        useNewUrlParser: true, 
        useUnifiedTopology: true 
    }
);
db = client.connect(err => {
    if (err) {
        console.log(err.message);
        throw err;
    }
});

module.exports = db;
