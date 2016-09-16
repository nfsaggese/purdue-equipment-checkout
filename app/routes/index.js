var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/getDevices', function(req, res, next) {
  res.render('index', { title: 'Express' });
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
