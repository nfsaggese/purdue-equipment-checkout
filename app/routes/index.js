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

/* Update log with:
 * LOG_USERID
 * LOG_EQUIPMENTID
 * LOG_ISCHECKINGOUT
 * LOG_EQUIPMENTCONDITION
 */
router.get('/updateLog', function(req, res, next) {
  global.postPool.connect(function(err, client, done) {
    if(err) {
      return console.error('error fetching client from pool', err);
    }
    var userId = req.query.LOG_USERID;
    var equipmentId = req.query.LOG_EQUIPMENTID;
    var isCheckingOut = req.query.LOG_ISCHECKINGOUT;
    var equipmentCond = req.query.LOG_EQUIPMENTCONDITION;
    var query = 'insert into log (LOG_USERID, LOG_EQUIPMENTID, LOG_ISCHECKINGOUT, LOG_EQUIPMENTCONDITION) '
	+ 'values (' + userId  + ',' + equipmentId + ',' + isCheckingOut + ',' + equipmentCond +');';

    console.log('userId: ' + userId + '\nequipmentId: ' + equipmentId + '\nisCheckingOut: ' +
        isCheckingOut + '\nequipmentCond: ' + equipmentCond);
    console.log('query: ' + query);

    client.query(query, function(err, result) {
      res.send(JSON.stringify(result, null, 2));
      done();  
      if(err) {
        return console.error('error running query: updateLog', err);
      }
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
