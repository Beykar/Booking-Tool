var factoryApp = angular.module('factoryApp', ['ngAnimate', 'ui.router', 'ngSanitize', 'ui.bootstrap', 'ngAnimate', 'angularFileUpload']);

var appCacheVersion = '01-10-20-1633';

//this is to allow the $location.search().q to work when entering a search term
factoryApp.config(['$locationProvider', function($locationProvider){
    $locationProvider.html5Mode(
      {
        enabled: true,
        requireBase: false
      });    
  }]);
  
  factoryApp.filter('trusted', ['$sce', function($sce){
      var div = document.createElement('div');
      return function(text) {
          div.innerHTML = text;
          return $sce.trustAsHtml(div.textContent);
      }
  }]);
  
  factoryApp.filter('removeHTMLTags', function() {
    return function(text) {
      return  text ? String(text).replace(/<[^>]+>/gm, '') : '';
    };
  });
  
  factoryApp.filter('limitHtml', function() {
    return function(text, limit) {
  
        var changedString = String(text).replace(/<[^>]+>/gm, '');
        var length = changedString.length;
  
        return length > limit ? changedString.substr(0, limit - 1)+ '....' : changedString;
    }
  });

  
  factoryApp.config(function($locationProvider, $stateProvider, $urlRouterProvider){
    $locationProvider.hashPrefix('');
    $stateProvider

    .state('/',{
        url: "/SitePages/Index.aspx",
        templateUrl: "https://eygb.sharepoint.com/sites/CSG-Test-V2/Factory-JST/SiteAssets/web-assets/assets/js/partials/homePartial.html?c=" + appCacheVersion
    })
    .state('home', {
        url: "/SitePages/Index.aspx/home",
        templateUrl: "https://eygb.sharepoint.com/sites/CSG-Test-V2/Factory-JST/SiteAssets/web-assets/assets/js/partials/homePartial.html?c=" + appCacheVersion
    })
  
 
    //$urlRouterProvider.otherwise("/SitePages/Index.aspx/home");
  
  });