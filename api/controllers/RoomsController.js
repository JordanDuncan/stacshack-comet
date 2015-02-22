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
            sails.log(JSON.stringify(ops[i]));
            Rooms.findOne({name: ops[i][0]}).exec(function(err,ret){
                if(err) return res.send(err);

                sails.log(JSON.stringify(ret));
                
                var newRet = JSON.parse(JSON.stringify(ret));
                newRet.appl[ops[i][1]].state = ops[i][2];

                sails.log(JSON.stringify(newRet));
                
                Rooms.update({name: ops[i][0]}, newRet).exec(function(err,ret){
                    if(err) return res.send(err);
                    return ret;
                });
            });
        }
    }
};

