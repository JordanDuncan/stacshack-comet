/**
 * SensorsController
 *
 * @description :: Server-side logic for managing sensors
 * @help        :: See http://links.sailsjs.org/docs/controllers
 */


module.exports = {
	changeTemp: function(req,res) {
		Sensors.findOne({name: req.query.name}).exec(function(err,ret){
			if(err) return res.send(err);
			Sensors.update({name: req.query.name}, {temp:parseFloat(req.query.temp)}).exec(function(err,ret){
				if(err) return res.send(err);
				sails.sockets.blast(ret);
				return res.send(ret);
			});
		});
	},
	changeLight: function(req, res) {
		Sensors.findOne({name: req.query.name}).exec(function(err,ret){
			if(err) return res.send(err);
			Sensors.update({name: req.query.name}, {light:parseFloat(req.query.light)}).exec(function(err,ret){
				if(err) return res.send(err);
				sails.sockets.blast(ret);
				return res.send(ret);
			});
		});
	},
	changeTime: function(req,res) {
		Sensors.findOne({name: "time"}).exec(function(err,ret){
			if(err) return res.send(err);
			var newTime = parseInt(req.query.timeIn);
			Sensors.update({name: "time"}, {time:newTime}).exec(function(err,ret){
				if(err) return res.send(err);
				sails.sockets.blast(ret);
				return res.send(ret);
			});
		});
	},
	ihouse: function(req,res) {
		res.view('ihouse.ejs');
	},
	updates: function(req,res) {
		sails.log(req.socket);
		Sensors.find({}).exec(function(err,ret){
			Sensors.subscribe(req.socket, ret);
			return res.send('socket subscribed: ' + req.socket.id);
			Rooms.find({}).exec(function(err,ret){
				Rooms.subscribe(req.socket, ret);
				return res.send('socket subscribed: ' + req.socket.id);
			});
		});
	},
	incTemp: function(req,res){
		//setTimeout(function(){
			Rooms.find({'appl':{'heat':{'state':1}}}).exec(function(err,ret){
				return res.send(ret);
			});
		//},5000);
	}
};

