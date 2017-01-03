var h3Framework = angular.module('h3Framework')

.factory('$wr_overView', ['$http', function ($http) {

  return {

    getOverViewStatusCount : function() {
      return $http({method: 'GET', url: '/wr/api/v1/overView/overViewStatusCount'});
    },

    getOverViewVisits: function() {
      return $http({method: 'GET', url: '/wr/api/v1/overView/overViewVisits'});
    }


  }


}]);
