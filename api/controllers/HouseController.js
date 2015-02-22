/**
 * HouseController
 *
 * @description :: Server-side logic for managing houses
 * @help        :: See http://links.sailsjs.org/docs/controllers
 */

module.exports = {
	externalLight: function(req,res){
        House.findOne({}).exec(function(err,ret){
            if(req.query.set){
                var dUpdate = {
                    externalLight: parseFloat(req.query.set)
                };
                House.update({},dUpdate).exec(function(err,ret){
                    if(err) return res.send(err);
                    return res.send(ret);
                });
            } else {
                return res.send({'value':ret});
            }
        });
    },
};

