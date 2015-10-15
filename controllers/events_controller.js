
var routing = require('resource-routing');
var db = require('./../db').db;
var Event = db.bind('events');


routing.index = function(req, res){
    Event.find().toArray(function(err,events){
        if (err) return next(err);
        res.send(events);
    })
}

routing.create = function(req, res) {
    var new_event = {
        name: req.body.name,
        start_date: req.body.start_date,
        start_time: req.body.start_time,
        end_date: req.body.end_date,
        end_time: req.body.end_time,
        description: req.body.description,
        repeat: req.body.repeat
    }
    Event.insert(new_event, function(error, event) {
        if (error) return next(error);
        console.log(event);
        res.send(event);
    });
}

routing.show = function(req, res) {
    Event.findById(req.params.id, function(err,event){
        if (err) return next(err);
        res.send(event);
    })
}

routing.update = function(req, res) {
    var new_event = {
        name: req.body.name,
        start_date: req.body.start_date,
        start_time: req.body.start_time,
        end_date: req.body.end_date,
        end_time: req.body.end_time,
        description: req.body.description,
        repeat: req.body.repeat
    }
    Event.updateById(req.params.id, {$set: new_event}, function(err, event){
        if (err) return next(err);
        res.send(event);
    })
}

routing.destroy = function(req, res) {
    console.log(req.params);
    Event.removeById(req.params.id, function(err, count){
        if (err) return next(err);
        res.send({affectedCount: count});
    })
}

routing.search = function(req, res){
    var req_params = req.body;
    var query_options = {};
    if("name" in req_params) query_options["name"] = {'$regex': req_params.name};
    if("description" in req_params) query_options["description"] = {'$regex': req_params.description};

    console.log(query_options);
    Event.find(query_options).toArray(function(err,events){
        if (err) return next(err);
        res.send(events);
    })

}


module.exports = routing;