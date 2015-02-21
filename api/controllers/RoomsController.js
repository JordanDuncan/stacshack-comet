/**
 * RoomsController
 *
 * @description :: Server-side logic for managing rooms
 * @help        :: See http://links.sailsjs.org/docs/controllers
 */

module.exports = {
	update: function(req,res){
        var ops = JSON.parse(req.query.ops);

        for(var i in ops){
            Rooms.findOne({name: ops[i][0]}).exec(function(err,ret){
                if(err) return res.send(err);
                
                var newRet = JSON.parse(JSON.stringify(ret));
                newRet.appl[ops[i][1]].state = ops[i][2];
                
                Rooms.update({name: ops[i][0]}, newRet).exec(function(err,ret){
                    if(err) return res.send(err);
                    return true;
                });
            });
        }
    }
};

