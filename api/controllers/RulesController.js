/**
 * RulesController
 *
 * @description :: Server-side logic for managing rules
 * @help        :: See http://links.sailsjs.org/docs/controllers
 */

function roomMod(ops, callback){
    for(var i in ops){
        sails.log(JSON.stringify(ops[i]));
        Rooms.findOne({name: ops[i][0]}).exec(function(err,ret){
            if(err) return res.send(err);

            sails.log(JSON.stringify(ret));
            
            var newRet = JSON.parse(JSON.stringify(ret));
            newRet.appl[ops[i][1]].state = ops[i][2];

            sails.log(JSON.stringify(newRet));
            
            Rooms.update({name: ops[i][0]}, newRet).exec(function(err,ret){
                if(err) return res.send(err);
                return callback(ret);
            });
        });
    }
}
 
var checkAndMod = {
	'time': function(room,terms,ops,callback){
		var condMet = false;
		
		Sensors.findOne({name:'time'}).exec(function(err,ret){
			if(ret.time > terms.min && ret.time < terms.max) condMet = true; 
			
			if(condMet){
				roomMod(ops,callback);
				/*
				httpReq("GET", "../../rooms/update?ops="+JSON.stringify(ops), function(d){
					callback(d);
				})
				sails.log("../../rooms/update?ops="+JSON.stringify(ops));
				request("../../rooms/update?ops="+JSON.stringify(ops), function (error, response, body) {
				    if (!error) {
				  		sails.log(JSON.stringify(body));
				    	callback(body);
				    }
				});*/
			} else {
				callback({name: room, change: false});
			}
		});		
	},
	'temp': function(room,terms,ops,callback){
		Sensors.findOne({name:room}).exec(function(err,ret){
			var condMet = false;
			if(ret.temp > terms.min && ret.temp < terms.max) condMet = true; 
		
			if(condMet){
				roomMod(ops,callback);
				/*
				httpReq("GET", "../../rooms/update?ops="+JSON.stringify(ops), function(d){
					callback(d);
				})
				sails.log("../../rooms/update?ops="+JSON.stringify(ops));
				request("../../rooms/update?ops="+JSON.stringify(ops), function (error, response, body) {
				    if (!error) {
				  		sails.log(JSON.stringify(body));
				    	callback(body);
				    }
				});*/
			} else {
				callback({name: room, change: false});
			}
		});
	},
	'light': function(room,terms,ops,callback){
		sails.log('sensor terms: '+JSON.stringify(terms));
		Sensors.findOne({name:room}).exec(function(err,ret){
			var condMet = false;
			sails.log('sensor ret: '+JSON.stringify(ret));
			if(ret.light > terms.min && ret.light < terms.max) condMet = true; 
		
			if(condMet){
			    roomMod(ops,callback);
				/*
				httpReq("GET", "../../rooms/update?ops="+JSON.stringify(ops), function(d){
					callback(d);
				})
				sails.log("../../rooms/update?ops="+JSON.stringify(ops));
				request("../../rooms/update?ops="+JSON.stringify(ops), function (error, response, body) {
				    if (!error) {
				  		sails.log(JSON.stringify(body));
				    	callback(body);
				    }
				});*/
			} else {
				callback({name: room, change: false});
			}
		});
	}
};
 
module.exports = {
	create: function(req,res){
		var thisObj = {
			room: req.query.room,
			perms: [req.query.checks],
			terms: [{
				check: req.query.checks,
				min: parseFloat(req.query.min),
				max: parseFloat(req.query.max)
			}],
			ops: [JSON.parse(req.query.cmd)]
		}

		Rules.create(thisObj, function(err,ret){
			if(err) return res.send(err);
			return res.send(ret);
		});
	},
	update: function(req,res){
		Rules.find({}).exec(function(err,ret){
			if(err) return res.send(err);

			var retArr = [];
			
			var type = req.query.type;
			
			for(var i in ret){
				sails.log(JSON.stringify(ret));
				var isIn = (ret[i].perms.indexOf(type)>-1);
				if(isIn){
					for(var j in ret[i].terms){
						checkAndMod[ret[i].terms[j].check](ret[i].room, ret[i].terms[j], ret[i].ops, function(newRet){
							sails.log(JSON.stringify(newRet));
							return res.send(newRet);
						});
					}
				}
			}
			
		});
	}
};

