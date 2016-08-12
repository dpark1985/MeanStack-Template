
var aitch3AdminFramework = angular.module('aitch3AdminFramework')

.controller('dashboardCtrl', ['$http', '$calcMemSize', '$sectoTime', function ($http, $calcMemSize, $sectoTime) {
  var $dashboard = this;


  $http.get('/adminCtrl/visitData').then(function (res){
    $dashboard.visitors = {
      today: res.data.todayVisits,
      total: res.data.totalVisits
    };
  }, function(err){
    console.log(err);
  });
}])
