/**
 * SensorsController
 *
 * @description :: Server-side logic for managing sensors
 * @help        :: See http://links.sailsjs.org/docs/controllers
 */

module.exports = {
	changeT: function(req,res) {
		Sensors.findOne({name: req.query.name}).exec(function(err,ret){
			if(err) return res.send(err);
			Sensors.update({name: req.query.name}, {temp:parseInt(req.query.temp)}).exec(function(err,ret){
				if(err) return res.send(err);
				return res.send(ret);
			});
		});
		return res.send(name.terms.temp);
	}
};

