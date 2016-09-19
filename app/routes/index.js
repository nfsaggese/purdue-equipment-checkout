var express = require('express');
var router = express.Router();
var global = require('../global.js');

/* GET home page. */
router.get('/getDevices', function(req, res, next) {
  //res.render('index', { title: 'Express' });
  global.postPool.connect(function(err, client, done) {
    if(err) {
      return console.error('error fetching client from pool', err);
    }
    client.query('SELECT * FROM users;', function(err, result) {
      //call `done()` to release the client back to the pool
      res.send(JSON.stringify(result, null, 2));
      done();  
      if(err) {
        return console.error('error running query', err);
      }
    //output: 1
    });
  });
});

router.get('/getStatistics', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.post('/postNewDevice', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.post('/postUpdateCheckout', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.post('/postUpdateDeviceUser', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

module.exports = router;
