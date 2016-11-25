var h3Framework = angular.module('h3Framework')

.factory('$wr_push', ['$http', function ($http) {

  return {

    doPushNotification : function(data) {
      return $http({method: 'POST', url: '/wr/api/v1/pushNotification/doPush', data: data});
    },

  }


}]);
