'use strict';

/**
 * @ngdoc function
 * @name testApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the testApp
 */
angular.module('testApp')
  .controller('MainCtrl', function ($scope, $window, GitHubService) {

  	    $scope.results = [];
  	    $scope.repository = [];

        $scope.selectRepository = function(selectRepository){
        	$scope.repository = _.findWhere($scope.results, {id: selectRepository.id});
        };
        
        $scope.searchText = function(string){
 			var results = [];
            if(typeof string != 'object'){
                GitHubService.getList(string).then(function (res) {
                	$scope.results = res.items;
                	for(var i = 0; i < res.items.length; i++) {
                		var newItem = {};
                		newItem.id = res.items[i].id;
                		newItem.name = res.items[i].name;
                		results.push(newItem);
                	}
                    $scope.repositories = results;
                });    
            }
        }
       
        function redirect(link) {
        	$window.location.href = link;
        }

        $scope.redirect = redirect;
  });
