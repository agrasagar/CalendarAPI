var db = require('mongoskin').db('mongodb://localhost:27017/myapp');
//db name: myapp

module.exports.db = db;