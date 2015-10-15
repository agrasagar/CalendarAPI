
var routing = require('resource-routing');
var db = require('./../db').db;
var Event = db.bind('events');

var DATE_SEPARATOR  = '-';
var TIME_SEPARATOR  = ':';

routing.index = function(req, res){
    Event.find().toArray(function(err,events){
        if (err) return next(err);
        res.send(events);
    })
}

routing.create = function(req, res) {
    var new_event = get_event_params(req.body)
    console.log(new_event);
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
    var new_event = get_event_params(req.body);
    console.log(new_event);
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
};

routing.search = function(req, res){
    var req_params = req.body;
    var query_options = {};
    if("name" in req_params) query_options["name"] = {'$regex': req_params.name};
    if("description" in req_params) query_options["description"] = {'$regex': req_params.description};
    if("description" in req_params) query_options["description"] = {'$regex': req_params.description};
    //if("start_date" in req_params) query_options["start_date"] = {'$regex': req_params.description};
    if("repeat" in req_params) query_options["repeat"] = req.params.repeat;

    console.log(query_options);
    Event.find(query_options).toArray(function(err,events){
        if (err) return next(err);
        console.log(events);
        res.send(events);
    })

};

var get_event_params = function(body){
    var start_date = stringToDate(body.start_date, body.start_time);
    var end_date = stringToDate(body.end_date, body.end_time);
    var new_event = {
        name: body.name,
        start_date: start_date,
        end_date: end_date,
        description: body.description,
        repeat: body.repeat
    };
    return new_event;
};

var stringToDate = function(date_string, time_string){
    var date_array = date_string.split(DATE_SEPARATOR);
    var time_array = time_string.split(TIME_SEPARATOR);
    //Date(year, month (0 = January), day, hour, minute)
    var date = new Date(date_array[0], date_array[1] - 1,date_array[2], time_array[0], time_array[1]);
    return date;
};


module.exports = routing;