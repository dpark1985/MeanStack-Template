
var aitch3AdminFramework = angular.module('aitch3AdminFramework')


.factory('$sectoTime', function(){
	return function(sec){
    var date = new Date(sec * 1000);
    var hh = date.getUTCHours();
    var mm = date.getUTCMinutes();
    var ss = date.getSeconds();
    if (hh < 10) {hh = "0"+hh;}
    if (mm < 10) {mm = "0"+mm;}
    if (ss < 10) {ss = "0"+ss;}
    var t = hh+":"+mm+":"+ss;
    return t;
  }
});
