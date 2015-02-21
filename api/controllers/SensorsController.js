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
			Sensors.update({name: req.query.name}, {temp:parseFloat(req.query.light)}).exec(function(err,ret){
				if(err) return res.send(err);
				return res.send(ret);
			});
		});
	},
	changeTime: function(req,res) {
		Sensors.findOne({name: "global"}).exec(function(err,ret){
			if(err) return res.send(err);
			Sensors.update({name: "global"}, {time:parseFloat(req.query.time)}).exec(function(err,ret){
				if(err) return res.send(err);
				return res.send(ret);
			});
		});
	}
};
