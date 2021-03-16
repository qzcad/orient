var md5 = require('md5');
var express = require('express');
const jsonParser = express.json();
var db = require('../database');
var router = express.Router();

/* GET users listing. */
router.get('/', function(req, res, next) {
  var email = req.query.email;
  var sql = `SELECT id, name, email FROM users WHERE email = "${email}";`;
  var parameters = [];
  db.all(
    sql, 
    parameters, 
    (err, rows) => {
      if (err) {
        console.log(err.message);
        res.status(400).json({
          "error": err.message
        });
        return;
      }
      res.json({
        "message": "success",
        "data": rows
      });
    });
});

router.post('/', jsonParser, function(req, res){
  if (!req.body) {
    res.status(400).json({
      "error": "no request body"
    });
    return;
  }
  var name = req.body.name;
  var email = req.body.email;
  var password = req.body.password;
  var sql = `INSERT INTO users(name, email, password) VALUES("${name}", "${email}", "${md5(password)}");`;
  console.log(sql);
  db.exec(
    sql,
    (err) => {
      if (err) {
        console.log(err.message);
        res.status(500).json({
          "error": err.message
        });
        return;
      }
      res.json({
        "message": "success",
        "data": 1
      });
    }
  );
});

module.exports = router;
