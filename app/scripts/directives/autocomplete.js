'use strict';

angular.module('testApp').directive('autogit', function() {
  var index = -1;

  return {
    restrict: 'E',
    scope: {
      query: '=ngModel',
      variants: '=data',
      typeCallback: '=onType',
      selectCallback: '=onSelect'
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
      $scope.$watch('query', function(newValue, oldValue){

        if (oldValue === newValue || !oldValue) {
          return;
        }
        if(watching && typeof $scope.query !== 'undefined' && $scope.query !== null) {
          $scope.completing = true;
          $scope.searchFilter = $scope.query;
          $scope.selectedIndex = -1;
        }

        // function thats passed to on-type attribute gets executed
        if($scope.typeCallback)
          $scope.typeCallback($scope.query);
      });

      $scope.select = function(variants){
        if(variants){
          $scope.query = variants.name;
          $scope.searchFilter = variants.name;
          if($scope.selectCallback)
            $scope.selectCallback(variants);
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
            ng-model="query"\
            placeholder="{{ attrs.placeholder }}"\
            class="{{ attrs.inputclass }}"\
            id="{{ attrs.inputid }}"/>\
          <ul ng-show="completing && variants.length>0">\
            <li\
              items\
              ng-repeat="variant in variants | filter:searchFilter | orderBy:\'toString()\' track by $index"\
              index="{{ $index }}"\
              val="{{ variant.id }}"\
              ng-class="{ active: ($index === selectedIndex) }"\
              ng-click="select(variant)"\
              ng-bind-html="variant.name | selectItem:query"></li>\
          </ul>\
        </div>'
  };
});