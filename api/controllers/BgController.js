/**
 * BgController
 *
 * @description :: Server-side logic for managing bgs
 * @help        :: See http://links.sailsjs.org/docs/controllers
 */

module.exports = {
	running: function(req,res){
        return House.externalLight(req,res);
        return res.send(sails.controllers.house);
    }
};

