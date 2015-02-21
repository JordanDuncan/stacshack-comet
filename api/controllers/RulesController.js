/**
 * RulesController
 *
 * @description :: Server-side logic for managing rules
 * @help        :: See http://links.sailsjs.org/docs/controllers
 */

 
var checkAndMod = {
	'time': function(terms,ops){
		//get system time, compare with conditions
		var condMet = false;
		
		if(condMet){
			for(var i in ops){
				Rooms.findOne({name: ops[i][0]}).exec(function(err,ret){
					if(err) return res.send(err);
					
					var newRet = JSON.parse(JSON.stringify(ret));
					newRet.appl[ops[i][1]].state = ops[i][2];
					
					Rooms.update({name: ops[i][0]}, newRet).exec(function(err,ret){
						if(err) return res.send(err);
						return true;
					}
				});

			}
		} else {
			return false;
		}
	},
	'temp': function(terms,ops){
		Sensor.findOne({name:terms.room}).exec(function(err,ret){
			var condMet = false;
			if(ret.temp > terms.min && ret.temp < terms.max) condMet = true; 
		
			if(condMet){
				for(var i in ops){
					Rooms.findOne({name: ops[i][0]}).exec(function(err,ret){
						if(err) return res.send(err);
						
						var newRet = JSON.parse(JSON.stringify(ret));
						newRet.appl[ops[i][1]].state = ops[i][2];
						
						Rooms.update({name: ops[i][0]}, newRet).exec(function(err,ret){
							if(err) return res.send(err);
							return true;
						}
					});

				}
			} else {
				return false;
			}
		});
	},
	'light': function(terms,ops){
		Sensor.findOne({name:terms.room}).exec(function(err,ret){
			var condMet = false;
			if(ret.light > terms.min && ret.light < terms.max) condMet = true; 
		
			if(condMet){
				for(var i in ops){
					Rooms.findOne({name: ops[i][0]}).exec(function(err,ret){
						if(err) return res.send(err);
						
						var newRet = JSON.parse(JSON.stringify(ret));
						newRet.appl[ops[i][1]].state = ops[i][2];
						
						Rooms.update({name: ops[i][0]}, newRet).exec(function(err,ret){
							if(err) return res.send(err);
							return true;
						}
					});

				}
			} else {
				return false;
			}
		});
	}
};
 
module.exports = {
	update: function(req,res){
		Rules.find({}).exec(function(err,ret){
			if(err) return res.send(err);
			
			var type = req.query.type;
			
			for(var i in ret){
				var isIn = (ret[i].perms.indexOf(type)>-1);
				if(isIn){
					for(var j in ret[i].terms){
						checkAndMod[ret[i].terms[j].check](ret[i].terms[j], ret[i].ops);
					}
				}
			}
		});
	}
};

