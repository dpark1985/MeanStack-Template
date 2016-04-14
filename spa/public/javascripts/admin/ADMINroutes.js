
angular.module('SPAadmin', ['ngRoute', 'SPAfactories', 'ui.ace'])

.config(['$routeProvider', '$locationProvider',
	function($routeProvider, $locationProvider) {
		$routeProvider.when('/admin', { 
			templateUrl: 'templates/admin/admin.html', 
			controller: 'adminCtrl', 
			controllerAs: 'admin' 
		});


		$routeProvider.when('/admin/:category', { 
			templateUrl: 'templates/admin/adminSub.html', 
			controller: 'adminSubCtrl', 
			controllerAs: 'adminSub' 
		});

		$routeProvider.when('/admin/:category/preview', { 
			templateUrl: 'templates/admin/adminPreview.html',
			controller: 'adminSubCtrl', 
			controllerAs: 'adminSub'
		});



		$routeProvider.otherwise({ 
			templateUrl: 'templates/common/404.html' 
		});
    $locationProvider.html5Mode(true).hashPrefix('!');
}])



.factory('$adminFactory', function(){
	var userStatus = {
		loggedIn: false,
		userID: null
	};
	return {
		setUserData: function (data){
			if(data.userID === null){
				userStatus.loggedIn = false;
				userStatus.userID = data.userID;
			} else {
				userStatus.loggedIn = true;
				userStatus.userID = data.userID;
			}
		},
		getUserData: function(){
			return userStatus;
		}
	}
})

.controller('mainCtrl', ['$scope', '$http', '$window', '$SPAaccount', '$adminFactory', function ($scope, $http, $window, $SPAaccount, $adminFactory) {
	
	$scope.toMain = function(){
		$window.location = "/";
	}

	$scope.bodyStyle = {background: "rgb(247, 247, 247)"};

	$http.get('/models/get/adminStatus').then(function (res){
		$adminFactory.setUserData({userID : res.data.userID});
	}, function (err){
		console.log(err);
	});




}])

.controller('adminCtrl', ['$scope', '$http', '$window', '$adminFactory', '$SPAaccount', function ($scope, $http, $window, $adminFactory, $SPAaccount) {
	var admin = this;
	admin.userStatus = $adminFactory.getUserData();
	admin.doLogin = function(){
		var data = {
			login: admin.userInput.userID,
			password: admin.userInput.password
		};
		$SPAaccount.login(data).then(function (res){
			admin.errMsgs = $SPAaccount.validation(res.data);
			if(admin.errMsgs.length > 0){
				$('#modal-warning').modal('show');
			} else {
				$window.location = '/admin';
			}
		}, function (err){
			console.log(err);
		});
	};
}])



.controller('adminSubCtrl', ['$http', '$location', '$window', '$sce', '$route', '$timeout', '$routeParams', '$SPAaccount', '$adminFactory', function ($http, $location, $window, $sce, $route, $timeout, $routeParams, $SPAaccount, $adminFactory) {
	var adminSub = this;


//** Helper functions
	adminSub.doRefresh = function(){
		$window.location = '/admin/'+adminSub.params.category;
	};

	adminSub.toSubMenu = function(linkTo){
		if(adminSub.params.category != linkTo){
			$location.path('/admin/'+linkTo);
		}
	};

	adminSub.toMain = function(){
		$window.location = "/";
	};
// Helper functions


	function calcMemSize (memSize) {
		var count = 0;
		var divSize = 1024;
		var remain = memSize;
		var sign = null;
		var loop = true;
		while(loop){
			remain = remain / divSize;
			count++;
			if(remain < divSize){
				loop = false;
			}
		}
		if(count === 1){ sign = "KB"; } 
		else if (count === 2){ sign = "MB"; } 
		else if (count === 3){ sign = "GB"; } 
		else if (count === 4){ sign = "TB"; }
		return {mem: remain, unit: sign};
	};

	function convertSectoTime (sec){
		var date = new Date(sec * 1000);
		var hh = date.getUTCHours();
		var mm = date.getUTCMinutes();
		var ss = date.getSeconds();
		if (hh < 10) {hh = "0"+hh;}
		if (mm < 10) {mm = "0"+mm;}
		if (ss < 10) {ss = "0"+ss;}
		var t = hh+":"+mm+":"+ss;
		return t;
	};

	adminSub.dashboard = function(){
		$http.get('/ctrls/get/dashboard').then(function (res) {
			console.log(res);
			var osData = res.data.os;
			adminSub.osData = {
				cpus: {
					model: osData.cpus[0].model,
					speed: osData.cpus[0].speed,
					counts: osData.cpus.length
				},
				memoryies: {
					freemem: calcMemSize(osData.freemem),
					totalmem: calcMemSize(osData.totalmem),
					usedmem: calcMemSize(osData.totalmem - osData.freemem)
				},
				platform: osData.platform,
				type: osData.type,
				uptime: convertSectoTime(osData.uptime)
			};

			
			var visits = res.data.visits
			var totalV = 0;
			for(v = 0; v < visits.length; v++){
				totalV += visits[v].count;
			}

			adminSub.visitCharts(visits);
			adminSub.visitors = {
				today: visits[visits.length - 1].count,
				total: totalV
			};
		}, function (err){
			console.log(err);
		});
	};

	adminSub.server = function(){
		$http.get('/ctrls/get/server').then(function (res) {
			//console.log(res);
			var osData = res.data.os;
			var serverData = res.data.server;
			adminSub.osData = {
				cpus: {
					model: osData.cpus[0].model,
					speed: osData.cpus[0].speed,
					counts: osData.cpus.length
				},
				memoryies: {
					freemem: calcMemSize(osData.freemem),
					totalmem: calcMemSize(osData.totalmem),
					usedmem: calcMemSize(osData.totalmem - osData.freemem)
				},
				platform: osData.platform,
				type: osData.type,
				uptime: convertSectoTime(osData.uptime)
			};
			adminSub.serverData = {
				heap: {
					rss : calcMemSize(Number(serverData.heap.match(/\s[0-9]*/g)[1])),
					heapTotal: calcMemSize(Number(serverData.heap.match(/\s[0-9]*/g)[3])),
					heapUsed: calcMemSize(Number(serverData.heap.match(/\s[0-9]*/g)[5]))
				},
				path: serverData.path,
				pid: serverData.pid,
				version: serverData.version,
				uptime: convertSectoTime(serverData.uptime)
			}

			//console.log(adminSub.serverData);

		}, function (err){
			console.log(err);
		});
	};

	adminSub.visitCharts = function(data){

		var labels = [];
		var series = [];
		for(i = 0; i<data.length; i++){
			labels.push(data[i].vDate);
			series.push(data[i].count);
		}	
		var vcData = { labels: labels, series: [series] };
		var options = {
			distributeSeries: true,
			low: 0,
			axisX: {  
				onlyInteger: true, 
				position: 'start' 
			},
			plugins: [
				Chartist.plugins.ctAxisTitle({
					axisX: {
				        axisTitle: 'Date',
				        axisClass: 'ct-axis-title',
				        offset: { x: 0, y: 0 },
				        textAnchor: 'middle'
					},
					axisY: {
				        axisTitle: 'Visits',
				        axisClass: 'ct-axis-title',
				        offset: { x: 0, y: 0 },
				        textAnchor: 'middle',
				        flipTitle: false
					}
				}),
				Chartist.plugins.ctPointLabels({
      				textAnchor: 'middle'
    			})
			]
		};
		new Chartist.Line('.ct-chart', vcData, options);
	};




	
	adminSub.editTitle = function(){
		var data = {
			oldTitle: adminSub.titleText,
			newTitle: adminSub.inputData.title
		};

		$http.post('/ctrls/set/title', data).then(function (res) {
			if(res.data == 'OK. Redirecting to /'){
				$window.location = '/';
			}
		}, function (err) {
			console.log(err);
		});
	};





//*** Design Change Pages
	adminSub.dataRetrive = function(category){
		adminSub.codeData = null;
		$http.get('/ctrls/get/blockCode/'+category).then(function (res){
			adminSub.codeDataTrusted = $sce.trustAsHtml(res.data);
			adminSub.codeData = res.data;

		}, function (err){
			console.log(err);
		});
	};

	
	adminSub.aceLoaded = function(_editor) {
    	_editor.setHighlightActiveLine(true);
    	_editor.$blockScrolling = Infinity;

    	adminSub.editData = function(){
    		var data = {data: _editor.getValue()};
			$http.post('/ctrls/set/blockCode/'+adminSub.params.category, data).then(function (res){
				if(res.data === 'OK.'){
					$window.location = '/admin/'+adminSub.params.category;
				}
			}, function (err){
				console.log(err);
			});
    	};

    	adminSub.editPreviewData = function(){
    		var data = {data: _editor.getValue()};
			$http.post('/ctrls/set/blockCode/'+adminSub.params.category, data).then(function (res){
				if(res.data === 'OK.'){
					$window.close();
				}
			}, function (err){
				console.log(err);
			});
    	};
	};

	adminSub.aceChanged = function(e){
		$('#previewCode').removeClass('panel-default');
		$('#previewCode').addClass('panel-warning');

		$timeout(function(){
			$('#previewCode').removeClass('panel-warning');
			$('#previewCode').addClass('panel-default');
		}, 300);

		adminSub.codeDataTrusted = $sce.trustAsHtml(adminSub.codeData);
	};

	adminSub.aceBlured = function(e){


	};
// Design Change Pages



//*** Initialization

	// get user authority status
	adminSub.userStatus = $adminFactory.getUserData();
	//console.log(adminSub.userStatus.loggedIn);
	if(!adminSub.userStatus.loggedIn){
		$location.path('/admin');
	}

	adminSub.titleText = $('title').text();
	adminSub.params = $routeParams;

	$('div.brand').mouseenter(function(){
		$(this).children().removeClass("fa fa-arrow-circle-o-left");
		$(this).children().addClass("fa fa-arrow-circle-left");
		$(this).css("cursor", "pointer");
		$(this).css("background-color", "#4C6788");
	});

	$('div.brand').mouseleave(function(){
		$(this).children().removeClass("fa fa-arrow-circle-left");
		$(this).children().addClass("fa fa-arrow-circle-o-left");
		$(this).css("background-color", "#23282e");
	});

	// side menu active state (collapse)
	$('ul.sub-menu li').click(function(){
		var elId = $(this).parent().attr("id");
		$('li[data-target="#'+ elId +'"]').siblings().removeClass("active");
		$('ul.sub-menu').children().removeClass("active");
		$('li[data-target="#'+ elId +'"]').addClass("active");
		$(this).siblings().removeClass("active");
		$(this).addClass("active");
	});

	// side menu active state (non collapse)
	$('li.singleLink').click(function(){
		$('li[data-toggle="collapse"]').siblings().removeClass("active");
		$('ul.sub-menu li').siblings().removeClass("active");
		$(this).siblings().removeClass("active");
		$(this).addClass("active");
	});

	function activateLink (linkTitle){
		if(linkTitle === 'dashboard'){
			$('li[data-toggle="collapse"]').siblings().removeClass("active");
			$('ul.sub-menu li').siblings().removeClass("active");
			$('li.singleLink').siblings().removeClass("active");
			$('li[data-target="#'+linkTitle+'"]').addClass("active");
		}

		else {
			$('a[href="admin/'+linkTitle+'"]').parent().siblings().removeClass("active");
			$('li[data-toggle="collapse"]').siblings().removeClass("active");
			$('ul.sub-menu').children().removeClass("active");


			$('a[href="admin/'+linkTitle+'"]').parent().addClass("active");
			$('a[href="admin/'+linkTitle+'"]').parent().parent().addClass("in");
			var elId = $('a[href="admin/'+linkTitle+'"]').parent().parent().attr("id");
			$('li[data-target="#'+ elId +'"]').addClass("active");
		}
	}

	function resetActive (at) {
		$('#'+at).parent().siblings().removeClass('active');
		$('#'+at).parent().addClass('active');
	}

	if(adminSub.params.category === 'dashboard'){
		adminSub.dashboard();
		activateLink(adminSub.params.category);
		adminSub.contentView = "../../templates/admin/dashboard.html";
	}
	if(adminSub.params.category === 'server'){
		adminSub.server();
		activateLink(adminSub.params.category);
		adminSub.contentView = "../../templates/admin/server.html";
	}

	if(adminSub.params.category === 'title'){
		resetActive(adminSub.params.category);
		adminSub.contentView = "../../templates/admin/title.html";
	} 
	if (adminSub.params.category === 'header'){
		activateLink(adminSub.params.category);
		adminSub.dataRetrive(adminSub.params.category);
		adminSub.contentView = "../../templates/admin/header.html";
	} 
	if (adminSub.params.category === 'footer'){
		activateLink(adminSub.params.category);
		adminSub.dataRetrive(adminSub.params.category);
		adminSub.contentView = "../../templates/admin/footer.html";
	}

// Initialization


}]);



