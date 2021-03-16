var express = require('express');
const jsonParser = express.json();
var router = express.Router();
var db = require('../database_mongo');

/* GET users listing. */
router.get('/', function(req, res, next) {
    // var email = req.query.email;
    // var sql = `SELECT id, name, email FROM users WHERE email = "${email}";`;
    // var parameters = [];
    // db.all(
    //   sql, 
    //   parameters, 
    //   (err, rows) => {
    //     if (err) {
    //       console.log(err.message);
    //       res.status(400).json({
    //         "error": err.message
    //       });
    //       return;
    //     }
    //     res.json({
    //       "message": "success",
    //       "data": rows
    //     });
    //   });
    res.json({"message": "success"});
  });

  module.exports = router;