'use strict';

angular.module('wsapp')
    .controller('TaskDetailController', function ($scope, $state, authService, projectService, taskService, $stateParams, commentService) {

      authService.authenticate(
                              function(response){
                                if(!response.data.success){
                                  $state.go('home');
                                }
                                $scope.role=response.data.user.role;
                              },
                              function(response){
                                 $state.go('home');
                              });


    taskService.getById(
            $stateParams.id,
            function(response){
                    console.log(response.data.data);
                    $scope.task=response.data.data;
                    console.log("TASKKKKK:")
                    console.log($scope.task);
            },
            function(response){

            }
     );


    $scope.IsVisible = false;
    $scope.comment={};
    $scope.changedComment = {};
    //creator se popuni na serverskoj strani
    //text se popuni sa inputa
    //task popunim dole, da ne bi bilo undefined odma

    $scope.addComment=function(){

        //alert($scope.comment);
        $scope.comment.task=$scope.task._id; //treba mi na serveru da znam u koji task da dodam comment (brisem ga posle toga)

        commentService.save(
            $scope.comment,
            function(response){

            console.log(response.data);
            if(response.data.success){
                //dodato je u fulu sve
                console.log(response.data.data);
                //response.data.data.creator.username='You (Few moments ago)';
                //cannot create property on string //why?!
                delete response.data.data.creator;
                response.data.data.creator={};
                response.data.data.creator.username="You (Few moments ago)";
                $scope.task.comments.push(response.data.data);
            }
            },
            function(response){
            }
        );


    }

     $scope.deleteTaskFromProject =  function(taskObj){


               taskService.delete(taskObj,function(response){
                   //edittask({id:task._id})
                  if(response.data.success){
                   $state.go('projectdetail',{id:response.data.project});
                   console.log(response.data);
                  }
                    //
               },function(response){

               });

        }


     $scope.deleteComment= function(taskID,comment){
            commentService.delete(
              taskID,
              comment._id,
              function(response){
                 if(response.data.success){
                          console.log("Deleted comment!");
                          //console.log(response.data);
                          //$state.go('taskdetail',{id:taskID});
                          var index = $scope.task.comments.indexOf(comment);
                          if (index > -1) {
                               $scope.task.comments.splice(index, 1);
                          }
                          alertify.success(response.data.msg);

                  }else{
                    alertify.error(response.data.msg);
                  }
            },
            function(response){
                 $state.go('home');
            });
     }


     $scope.editComment = function(taskID,commentObject){
            $scope.IsVisible = true;
            $scope.changedComment=commentObject;
     }

     $scope.changeComment = function(commentObj){
         commentService.updateComment(commentObj, function(response) {
                //alertify
                if(response.data.success){
                     alertify.success("Successfully changed comment.");
                     $scope.IsVisible = false;
                }else {
                     alertify.error(response.data.msg);
                }
            }, function(response){
                 $state.go('home');
            })
     }


    });
