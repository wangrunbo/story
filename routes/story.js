var express = require('express');
var router = express.Router();

var Story = require('../model/story');

router.get('/', function(req, res, next) {
    Story.getStory(req.query._id, function (story) {
        console.log(story);

        res.send(story);
    });
});

router.post('/', function (req, res, next) {
    var data = req.body;

    var _id = data._id;
    delete data._id;

    if (_id) {
        Story.updateStory(_id, data);
    } else {
        Story.createNewStory(data);
    }

    res.end();
});

router.post('/delete', function (req, res, next) {
    Story.deleteStory(req.body._id, function (result) {
        console.log(result);
    });

    res.end();
});

module.exports = router;