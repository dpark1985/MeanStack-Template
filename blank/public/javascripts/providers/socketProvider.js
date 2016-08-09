
var aitch3Framework = angular.module('aitch3Framework')

.factory('$SPAsocket', function(){
	var socket;

	return {
		setSocket: function(io){
			socket = io;
		},
		getSocket: function(){
			return socket;
		}
	};
});
