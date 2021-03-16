var sqlite = require('sqlite3').verbose();
var md5 = require('md5');

const DB_PATH = "db.sqlite";

let db = new sqlite.Database(
    DB_PATH,
    (err) => {
        if (err) {
            console.log(err.message);
            throw err;
        }
        else {
            console.log('Connected to the DB.');
            db.run(
                'CREATE TABLE IF NOT EXISTS users (id INTEGER PRIMARY KEY AUTOINCREMENT, name TEXT, email TEXT UNIQUE, password TEXT, CONSTRAINT email_unique UNIQUE(email));',
                (err) => {
                    if (err) {
                        console.log(err);
                    }
                    else {
                        console.log('the `users` table is created.');
                    }
                }
            )
        }
    }
);

module.exports = db;