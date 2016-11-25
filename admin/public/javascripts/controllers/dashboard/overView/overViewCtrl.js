var h3Framework = angular.module('h3Framework')

.controller('overViewCtrl', ['$location', '$wr_overView', '$wr_s', function ($location, $wr_overView, $wr_s) {
	var $over = this;



	$over.init = function() {
		$over.overViewStatusCount = null;
		$wr_s.showLoading();

		$wr_overView.getOverViewStatusCount().then(function (res) {
			$wr_s.hideLoading();
			if(res.data.overViewStatusCount){
				$over.overViewStatusCount = res.data.values;
			} else {
				$wr_s.showServerError();
			}
		});
	};

	$over.init();

}]);
