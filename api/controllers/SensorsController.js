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
				return res.send(ret);
			});
		});
	},
	changeLight: function(req, res) {
		Sensors.findOne({name: req.query.name}).exec(function(err,ret){
			if(err) return res.send(err);
			Sensors.update({name: req.query.name}, {light:parseFloat(req.query.light)}).exec(function(err,ret){
				if(err) return res.send(err);
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
				return res.send(ret);
			});
		});
	}
};

