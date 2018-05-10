var express = require('express');
var router = express.Router();

var conf = require('../config/conf');
var func = require('../config/func');

router.get('/', function(req, res, next) {
    res.render('test/page');
});

module.exports = router;