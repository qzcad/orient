var express = require('express');
const jsonParser = express.json();
var router = express.Router();
var usersDb = require('../models/users')
var md5 = require('md5');
// var db = require('../database_mongo');

/* GET users listing. */
router.get('/', async (req, res) => {
  const users = await usersDb.find();
  res.send(users)
});

router.post('/', jsonParser, function (req, res){
  if (!req.body) {
    res.status(400).json({
      "error": "no request body"
    });
    return;
  }
  var name = req.body.name;
  var email = req.body.email;
  var password = req.body.password;
  var selector = {
    name: name,
    password: md5(password),
    email: email
  };
  console.log(selector);
  usersDb.insertOne(selector, function(err, result){
    if(err){
      res.status(400).json({
        "error": err.message
      });
      return;
    }
    res.json({
      "message": "success",
      "data": 1
    });
  });
});

  module.exports = router;