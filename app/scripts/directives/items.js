'use strict';

angular.module('testApp').directive('items', function(){
  return {
    restrict: 'A',
    require: '^autocomplete', // ^look for controller on parents element
    link: function(scope, element, attrs, autoCtrl){
      element.bind('mouseenter', function() {
        autoCtrl.setIndex(attrs.index);
      });
    }
  };
});