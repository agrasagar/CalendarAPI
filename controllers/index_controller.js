
var routing = require('resource-routing');


routing.home = function(req, res){
    res.send('home index ');
    //res.render('index/index', { title: 'Express' });
}

module.exports = routing;