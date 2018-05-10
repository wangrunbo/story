var express = require('express');
var router = express.Router();

var conf = require('../config/conf');
var func = require('../config/func');
var Story = require('../model/story');
var Validator = require('../model/__init__').Validator;

router.get('/', function(req, res, next) {
    var data1 = 1.5;
    var data2 = null;
    var data3 = undefined;
    var data4 = {};
    var data5 = [];
    var data6 = 'ab cd';
    var data7 = 1;
    var data8 = 0;
    var data9 = '  ';
    var data10 = '';
    var data11 = [1];
    var data12 = {'key': 123};

    console.log(Validator.rules.notEmpty(data1));
    console.log(Validator.rules.notEmpty(data2));
    console.log(Validator.rules.notEmpty(data3));
    console.log(Validator.rules.notEmpty(data4));
    console.log(Validator.rules.notEmpty(data5));
    console.log(Validator.rules.notEmpty(data6));
    console.log(Validator.rules.notEmpty(data7));
    console.log(Validator.rules.notEmpty(data8));
    console.log(Validator.rules.notEmpty(data9));
    console.log(Validator.rules.notEmpty(data10));
    console.log(Validator.rules.notEmpty(data11));
    console.log(Validator.rules.notEmpty(data12));

    res.send('test');
});

router.get('/1', function(req, res, next) {
    func.read_host();
    func.test_v = 'a';
    func.read_host();
    res.send(func.test_v);
});

module.exports = router;