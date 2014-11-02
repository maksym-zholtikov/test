'use strict';

angular.module('testApp').filter('selectItem', ['$sce', function ($sce) {
  return function (input, search) {
    if (typeof input === 'function') return '';
    return $sce.trustAsHtml(input);
  };
}]);
