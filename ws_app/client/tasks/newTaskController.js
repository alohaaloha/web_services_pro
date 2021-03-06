'use strict';

angular.module('wsapp')
    .controller('NewTaskController', function ($scope, $location, taskService, $state, authService, $stateParams) {


	authService.authenticate(
                            function(response){
                                if(!response.data.success)
                                	$state.go('home');
                            },
                            function(response){
                               $state.go('home');
                            });



    //TASK OBJ
    $scope.task={};
        $scope.task.project=$stateParams.id; //id do projekta kome task pripada
        $scope.task.status="TO DO"; //inicijalan status taska
        //creator se popuni na serveru
        //title, desc, deadline - html


    $scope.create=function(){

    	//alert($scope.task.title);
    	taskService.save(
    		$scope.task,
    		function(response){
                if(response.data.success==true){
    			alertify.success("CREATED!");
    			console.log(response.data);
    			$location.path('/project/'+$stateParams.id);
    			//todo lepse ovaj redirect

            }else{
                alertify.success("FAIL!");
            }

    		},
    		function(response){
				alertify.success("FAIL!");

    		});

    };


    $scope.changeStatus=function(status){
        //alert(status);
        $scope.task.status=status;
    }

    $scope.changePriority=function(priority){
        //alert(status);
        $scope.task.priority=priority;
    }









    });
