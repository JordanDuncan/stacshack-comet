/**
 * RulesController
 *
 * @description :: Server-side logic for managing rules
 * @help        :: See http://links.sailsjs.org/docs/controllers
 */

function httpReq(type, url, callback){
	var xmlhttp = new XMLHttpRequest();
    xmlhttp.onreadystatechange = function() {
        if (xmlhttp.readyState == 4 ) {
           callback();
        }
    }

    xmlhttp.open(type, url, true);
    xmlhttp.send();
}
 
var checkAndMod = {
	'time': function(terms,ops){
		var condMet = false;
		
		Sensor.findOne({name:'time'}).exec(funtion(err,ret){
			if(ret.time > terms.min && ret.time < terms.max) condMet = true; 
			
			if(condMet){
				httpReq("GET", "../../rooms/update?ops="+JSON.stringify(ops), function(){
					return true;
				})
			} else {
				return false;
			}
		});		
	},
	'temp': function(terms,ops){
		Sensor.findOne({name:terms.room}).exec(function(err,ret){
			var condMet = false;
			if(ret.temp > terms.min && ret.temp < terms.max) condMet = true; 
		
			if(condMet){
				httpReq("GET", "../../rooms/update?ops="+JSON.stringify(ops), function(){
			    	return true;
			    })
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
			    httpReq("GET", "../../rooms/update?ops="+JSON.stringify(ops), function(){
			    	return true;
			    })
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

