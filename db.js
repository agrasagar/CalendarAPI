var db = require('mongoskin').db('mongodb://localhost:27017/myapp');

module.exports.db = db;