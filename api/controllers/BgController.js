/**
 * BgController
 *
 * @description :: Server-side logic for managing bgs
 * @help        :: See http://links.sailsjs.org/docs/controllers
 */

module.exports = {
	running: function(req,res){
        setInterval(function(){
            sails.controllers.rules.update(req,res);
        },3000)
    }
};

