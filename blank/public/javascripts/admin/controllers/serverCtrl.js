
var aitch3AdminFramework = angular.module('aitch3AdminFramework')

.controller('serverCtrl', ['$http', '$calcMemSize', '$sectoTime', function ($http, $calcMemSize, $sectoTime) {
  var $server = this;


  $http.get('/adminCtrl/serverData').then(function (res) {
    var serverData = res.data;
  	$server.serverData = {
  		heap: {
  			rss : $calcMemSize(Number(serverData.heap.match(/\s[0-9]*/g)[1])),
  			heapTotal: $calcMemSize(Number(serverData.heap.match(/\s[0-9]*/g)[3])),
  			heapUsed: $calcMemSize(Number(serverData.heap.match(/\s[0-9]*/g)[5]))
  		},
  		path: serverData.path,
  		pid: serverData.pid,
  		version: serverData.version,
  		uptime: $sectoTime(serverData.uptime)
  	};
    console.log($server.serverData);
  }, function (err) {
    console.log(err);
  });

  $http.get('/adminCtrl/osData').then(function (res) {
    var osData = res.data;
  	$server.osData = {
  		cpus: {
  			model: osData.cpus[0].model,
  			speed: osData.cpus[0].speed,
  			counts: osData.cpus.length
  		},
  		memoryies: {
  			freemem: $calcMemSize(osData.freemem),
  			totalmem: $calcMemSize(osData.totalmem),
  			usedmem: $calcMemSize(osData.totalmem - osData.freemem)
  		},
  		platform: osData.platform,
  		type: osData.type,
  		uptime: $sectoTime(osData.uptime)
  	};
  }, function (err) {
    console.log(err);
  });
}]);
