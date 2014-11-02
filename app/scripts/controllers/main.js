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
                	results = _.map(res.items, function(item) {
                		var newItem = {};
                		newItem.id = item.id;
                		newItem.name = item.name;
                		return newItem;
                	});
                    $scope.repositories = results;
                });    
            }
        }
       
        function redirect(link) {
        	console.info(link);
        	$window.location.href = link;
        }

        $scope.redirect = redirect;
  });
