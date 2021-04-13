var express = require('express');
const jsonParser = express.json();
var router = express.Router();
var usersDb = require('../models/users')
var md5 = require('md5');


function hash_pasword(body){
  var b = body;
  if ("password" in b){
    b.password = md5(body.password)
  }
  return b;
}

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
  var body = hash_pasword(req.body);
  console.log(body);
  usersDb.create(body, function(err, result){
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

router.put('/:id', jsonParser, function (req, res) {
  if (!req.body) {
    res.status(400).json({
      "error": "no request body"
    });
    return;
  }
  usersDb.findByIdAndUpdate(
    req.params.id,
    hash_pasword(req.body), 
    {upsert: true},
    function(err, doc) {
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
    }
  );
});

// router.get('/:id', jsonParser, function (req, res) {
//   usersDb.findById(
//     req.params.id,
//     function (err, doc) {
//       if(err){
//         res.status(400).json({
//           "error": err.message
//         });
//         return;
//       }
//       res.json(doc);
//     }
//   );
// });

// router.get('/:id', jsonParser, async function (req, res) {
//   try{
//     var doc = await usersDb.findById(req.params.id);
//     res.json(doc);
//   }
//   catch(err){
//     res.status(400).json({
//       "error": err.message
//     });
//   }
// });

router.get('/:id', jsonParser, function (req, res) {
  usersDb.findById(req.params.id).then((doc) => {
    res.json(doc);
  }).catch((err) => {
    res.status(400).json({
      "error": err.message
    });
  });
});

  module.exports = router;