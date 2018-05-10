var mongoose = require('mongoose');
var db = require('./__init__').db;
var Validator = require('./__init__').Validator;

var storySchema = new mongoose.Schema({
    title: String,
    cover: String,
    publisher: String,
    // 章节可增可删，情节不可修改
    chapters: [
        {
            name: String,
            image: String,
            storyline: [
                {
                    image: String,
                    content: String,
                    selection: [
                        {
                            content: String,
                            target: Number,
                            ending: {type: Boolean, default: false}
                        }
                    ]
                }
            ],
            created: {type: Date, default: Date.now},
            deleted: {type: Date, default: null}
        }
    ],
    // 结局可增可删，不可修改
    ending: [
        {
            name: String,
            image: String,
            storyline: [
                {
                    image: String,
                    content: String
                }
            ],
            created: {type: Date, default: Date.now},
            deleted: {type: Date, default: null}
        }
    ],
    authors: {
        type: [
            {
                name: String,
                role: String
            }
        ],
        default: null
    },
    anonymous: {type: Boolean, default: false},
    published: {type: Date, default: null},

    created: {type: Date, default: Date.now},
    deleted: {type: Date, default: null}
});

var Story = db.model('story', storySchema);

class storyValidator extends Validator {
    constructor(rule, data) {
        super(rule, data);
    }
    
    static get rules() {
        return {
            newStory: function (data) {
                var errors = {};

                // title
                var titleRules = [
                    Validator.rules.existed,
                    Validator.rules.notEmpty,
                    Validator.rules.maxLength(100),
                ];

                titleRules.some(function (rule) {
                    if (!rule(data.title)) {
                        errors.push({'title': false});
                        return true;
                    }
                })
            }
        }
    }
}

module.exports = {
    /**
     *
     * @param _id
     * @param callback
     */
    getStory: function (_id, callback) {
        return Story.findById(_id, function (err, story) {
            if (err) throw err;

            callback(story);
        });
    },

    /**
     *
     * @param data
     * @param callback
     */
    createNewStory: function (data, callback) {
        Story.create(data, function (err, story) {
            if (err) throw err;

            if (callback) {
                callback(story);
            }
        })
    },

    /**
     *
     * @param _id
     * @param data
     * @param callback
     */
    updateStory: function (_id, data, callback) {
        Story.findById(_id, function (err, story) {
            if (err) throw err;

            if (story.published === null) {
                story.update({$set: data}, function (err, result) {
                    if (err) throw err;

                    if (callback) {
                        callback(result);
                    }
                })
            }
        });
    },

    /**
     *
     * @param _id
     * @param callback
     */
    deleteStory: function (_id, callback) {
        Story.findById(_id, function (err, story) {
            if (err) throw err;

            if (story.published === null) {
                story.remove(function (err, story) {
                    if (err) throw err;

                    if (callback) {
                        callback(story);
                    }
                });
            } else {
                story.update({$set: {deleted: Date.now()}}, function (err, result) {
                    if (err) throw err;

                    if (callback) {
                        callback(result);
                    }
                });
            }
        });
    }
};