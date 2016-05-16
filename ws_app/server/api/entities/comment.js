var express = require('express');
var router = express.Router();

/* entities */
var Project = require(__dirname+'/../../../models/project'); // get the mongoose model
var User = require(__dirname+'/../../../models/user'); // get the mongoose model
var Comment = require(__dirname+'/../../../models/comment'); // get the mongoose model

/*API for entity A*/
router
  .get('/:id', function(req, res, next) {

       Project.find(
              { _id: req.params.id },
              function (err, doc) {
                if (err) {
                  res.send({success:false, msg:'U bazi sjeb'});
                  return;
                }
                res.json({success:true, msg:"DATA RESPONSE IS HERE :D ", data:doc});
              });

  })
  .post('/task', function(req, res) {

     Comment.find(
             { task: req.body.id },
             function (err, doc) {
               if (err) {
                 res.send({success:false, msg:'U bazi sjeb'});
                 return;
               }
               res.json({success:true, msg:"COMMENT DATA ", data:doc, body:req.body});
             });

  })
  .post('/', function(req, res, next) {

    if (!req.body) {
        res.json({success: false, msg: 'You need to enter data!'});
      } else {

            //add user to project
            var body=req.body;
            body.creator=req.session.user._id;

            var newCom = new Comment(body);
            /* http://stackoverflow.com/questions/14481521/get-the-id-of-inserted-document-in-mongo-database-in-nodejs */
            newCom.save(function(err, comment) {
              if (err) {
                return res.json({success: false, msg: 'Error', err:err});
              }
              res.json({success: true, msg: 'Successful created'});
            });
      }

  })
  .put('/:id', function(req, res, next) {

    //update existing




  })
  .delete('/:id', function(req, res, next) {

    //TODO

  });


  module.exports = router;