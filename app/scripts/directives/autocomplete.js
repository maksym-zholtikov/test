'use strict';

angular.module('testApp').directive('autocomplete', function() {
  var index = -1;

  return {
    restrict: 'E',
    scope: {
      search: '=ngModel',
      suggestions: '=data',
      onType: '=onType',
      onSelect: '=onSelect'
    },
    controller: ['$scope', function($scope){
      // the index of the suggestions that's currently selected
      $scope.selectedIndex = -1;

      // set new index
      $scope.setIndex = function(i){
        $scope.selectedIndex = parseInt(i);
      };

      this.setIndex = function(i){
        $scope.setIndex(i);
        $scope.$apply();
      };

      $scope.getIndex = function(i){
        return $scope.selectedIndex;
      };

      // watches if the parameter filter should be changed
      var watching = true;

      // autocompleting drop down on/off
      $scope.completing = false;

      // starts autocompleting on typing in something
      $scope.$watch('search', function(newValue, oldValue){

        if (oldValue === newValue || !oldValue) {
          return;
        }
        if(watching && typeof $scope.search !== 'undefined' && $scope.search !== null) {
          $scope.completing = true;
          $scope.searchFilter = $scope.search;
          $scope.selectedIndex = -1;
        }

        // function thats passed to on-type attribute gets executed
        if($scope.onType)
          $scope.onType($scope.search);
      });

      $scope.select = function(suggestion){
        if(suggestion){
          $scope.search = suggestion.name;
          $scope.searchFilter = suggestion.name;
          if($scope.onSelect)
            $scope.onSelect(suggestion);
        }
        watching = false;
        $scope.completing = false;
        $scope.setIndex(-1);
      };


    }],
    template: '\
        <div class="autocomplete {{ attrs.class }}" id="{{ attrs.id }}">\
          <input\
            type="text"\
            ng-model="search"\
            placeholder="{{ attrs.placeholder }}"\
            class="{{ attrs.inputclass }}"\
            id="{{ attrs.inputid }}"/>\
          <ul ng-show="completing && suggestions.length>0">\
            <li\
              items\
              ng-repeat="suggestion in suggestions | filter:searchFilter | orderBy:\'toString()\' track by $index"\
              index="{{ $index }}"\
              val="{{ suggestion.id }}"\
              ng-class="{ active: ($index === selectedIndex) }"\
              ng-click="select(suggestion)"\
              ng-bind-html="suggestion.name | selectItem:search"></li>\
          </ul>\
        </div>'
  };
});