"use strict";angular.module("testApp",["ngAnimate","ngCookies","ngResource","ngRoute","ngSanitize","ngTouch","restangular"]).config(["$routeProvider","RestangularProvider",function(a,b){a.when("/",{templateUrl:"views/main.html",controller:"MainCtrl"}).otherwise({redirectTo:"/"}),b.setBaseUrl("https://api.github.com/")}]),angular.module("testApp").controller("MainCtrl",["$scope","$window","GitHubService",function(a,b,c){function d(a){console.info(a),b.location.href=a}a.results=[],a.repository=[],a.selectRepository=function(b){a.repository=_.findWhere(a.results,{id:b.id})},a.searchText=function(b){var d=[];"object"!=typeof b&&c.getList(b).then(function(b){a.results=b.items;for(var c=0;c<b.items.length;c++){var e={};e.id=b.items[c].id,e.name=b.items[c].name,d.push(e)}a.repositories=d})},a.redirect=d}]),angular.module("testApp").directive("autocomplete",function(){return{restrict:"E",scope:{search:"=ngModel",suggestions:"=data",onType:"=onType",onSelect:"=onSelect"},controller:["$scope",function(a){a.selectedIndex=-1,a.setIndex=function(b){a.selectedIndex=parseInt(b)},this.setIndex=function(b){a.setIndex(b),a.$apply()},a.getIndex=function(){return a.selectedIndex};var b=!0;a.completing=!1,a.$watch("search",function(c,d){d!==c&&d&&(b&&"undefined"!=typeof a.search&&null!==a.search&&(a.completing=!0,a.searchFilter=a.search,a.selectedIndex=-1),a.onType&&a.onType(a.search))}),a.select=function(c){c&&(a.search=c.name,a.searchFilter=c.name,a.onSelect&&a.onSelect(c)),b=!1,a.completing=!1,a.setIndex(-1)}}],template:'        <div class="autocomplete {{ attrs.class }}" id="{{ attrs.id }}">          <input            type="text"            ng-model="search"            placeholder="{{ attrs.placeholder }}"            class="{{ attrs.inputclass }}"            id="{{ attrs.inputid }}"/>          <ul ng-show="completing && suggestions.length>0">            <li              items              ng-repeat="suggestion in suggestions | filter:searchFilter | orderBy:\'toString()\' track by $index"              index="{{ $index }}"              val="{{ suggestion.id }}"              ng-class="{ active: ($index === selectedIndex) }"              ng-click="select(suggestion)"              ng-bind-html="suggestion.name | selectItem:search"></li>          </ul>        </div>'}}),angular.module("testApp").directive("items",function(){return{restrict:"A",require:"^autocomplete",link:function(a,b,c,d){b.bind("mouseenter",function(){d.setIndex(c.index)})}}}),angular.module("testApp").service("GitHubService",["Restangular",function(a){return{getList:function(b){var c=a.one("search").one("repositories").customGET("",{q:b});return c}}}]),angular.module("testApp").filter("selectItem",["$sce",function(a){return function(b){return"function"==typeof b?"":a.trustAsHtml(b)}}]);