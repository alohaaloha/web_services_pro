var express = require('express');
var router = express.Router();

/* entities */
//var User = require(__dirname+'/../../../models/user'); // get the mongoose model


router
  .post('/', function(req, res) {

      if(req.session.user){
      //TODO neki normalan reset sesije
      	//req.session.user=null;

        req.session.destroy(function(err) {
            // cannot access session here
            console.log('nema sessijee');
        });

        res.send({success: true, msg:"Logged out"});
      }else{
      	res.send({success: true, msg:"Nikog nema svakako"});
      }

  });


  module.exports = router;
