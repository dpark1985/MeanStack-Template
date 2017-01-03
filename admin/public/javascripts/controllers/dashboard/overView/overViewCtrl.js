var h3Framework = angular.module('h3Framework')

.controller('overViewCtrl', ['$location', '$wr_overView', '$wr_s', function ($location, $wr_overView, $wr_s) {
	var $over = this;

	$over.viewLog = function(log) {
		$over.logData = log;
		$('#logModal').modal('show');
	};

	$over.init = function() {
		$over.overViewStatusCount = null;
		$wr_s.showLoading();

		var overViewVisitsPromise = new Promise(function (resolve, reject) {
			$wr_overView.getOverViewVisits().then(function (res) {
				if(res.data.overViewVisits){
					resolve({"overViewVisits" : true, data: res.data.list});
				}
				else {
					reject({"overViewVisits" : false});
				}
			});
		});

		var overViewStatusCountPromise = new Promise(function (resolve, reject) {
			$wr_overView.getOverViewStatusCount().then(function (res) {
				if(res.data.overViewStatusCount){
					resolve({"overViewStatusCount": true, data: res.data.values});
				} else {
					reject({"overViewStatusCount" : false});
				}
			});
		});

		Promise.all([overViewVisitsPromise, overViewStatusCountPromise]).then(function (values){
			if(!values[1].overViewStatusCount || !values[0].overViewVisits) {
				$wr_s.showServerError();
			} else {
				$over.overViewStatusCount = values[1].data;
				$over.overViewVisits = values[0].data;


				for(var i=0; i<$over.overViewVisits.length; i++){
					$over.overViewVisits[i].android = 0;
					$over.overViewVisits[i].ios = 0;
					for(var j=0; j<$over.overViewVisits[i].log.length; j++){
						if($over.overViewVisits[i].log[j].platform){
							if($over.overViewVisits[i].log[j].platform[2] == 'android'){
								$over.overViewVisits[i].android ++;
							} else if ($over.overViewVisits[i].log[j].platform[2] == 'ios'){
								$over.overViewVisits[i].ios ++;
							}
						}

					}
				}

				$wr_s.hideLoading();
			}
		});

	};

	$over.init();

}]);
