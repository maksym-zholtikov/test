'use strict';

angular.module('testApp')
  .service('GitHubService', function(Restangular){

  return {
    getList: function (query) {
      var promise = Restangular.one('search').one('repositories').customGET("", {q: query});
      return promise;
    },
  };
});