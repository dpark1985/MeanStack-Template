
var aitch3FrameworkProviders = angular.module('aitch3FrameworkProviders')

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
