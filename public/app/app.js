var app = angular.module('app',[]);

angular.module('app').config(function($locationProvider){

  $locationProvider.html5Mode(true);


});

app.controller('mainCtrl',function($scope){

  $scope.myVar = "Hello Angular";
});