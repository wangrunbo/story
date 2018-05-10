var mongoose = require('mongoose');
var conf = require('../config/conf');

mongoose.connect(conf.database);

var db = mongoose.connection;

db.on('error', function (err) {
    console.error('Fail to connect to database: ' + err);
});

db.on('open', function () {
    console.log('Connect to database!')
});

class Validator {
    constructor(rule, data) {
        this.errors = null;

        var errors;
        if (data === undefined) {
            errors = rule();
        } else {
            errors = rule(data);
        }

        if (Object.keys(errors).length > 0) {
            this.errors = errors;
        }
    }

    static get rules() {
        return {
            existed: function (data) {
                return data !== undefined;
            },
            notEmpty: function (data) {
                switch (typeof data) {
                    case 'string':
                        return data.replace(/\s/g, '') !== '';
                    case 'object':
                        return data !== null && Object.keys(data).length > 0;
                    default:
                        return data !== undefined;
                }
            },
            maxLength: function (length) {
                return function (data) {
                    return data.length <= length;
                }
            }
        }
    }
}

exports.db = db;
exports.Validator = Validator;