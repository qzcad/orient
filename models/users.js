const db = require("mongoose");

const schema = db.Schema({
    name: String,
    password: String,
    email: String
})

module.exports = db.model("Users", schema);