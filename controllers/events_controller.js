
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
        date: req.body.date,
        time: req.body.time,
        description: req.body.description,
        recurrence: req.body.recurrence
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
    console.log(req.body);
    var new_event = {
        name: req.body.name,
        date: req.body.date,
        time: req.body.time,
        description: req.body.description,
        recurrence: req.body.recurrence
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
    console.log(req.params);
    Event.find().toArray(function(err,events){
        if (err) return next(err);
        res.send(events);
    })
}


module.exports = routing;