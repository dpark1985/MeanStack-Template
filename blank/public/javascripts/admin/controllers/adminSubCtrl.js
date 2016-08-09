
var aitch3AdminFramework = angular.module('aitch3AdminFramework')

.controller('adminSubCtrl', ['$http', '$location', '$window', '$sce', '$route', '$timeout', '$routeParams', '$SPAaccount', '$adminFactory', function ($http, $location, $window, $sce, $route, $timeout, $routeParams, $SPAaccount, $adminFactory) {
	var adminSub = this;


//** Helper functions
	adminSub.doRefresh = function(){
		$window.location = '/admin/'+adminSub.params.category;
	};

	adminSub.toSubMenu = function(linkTo){
		$location.path('/admin/'+linkTo);
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
			for(var v = 0; v < visits.length; v++){
				totalV += visits[v].count;
			}

			// adminSub.visitCharts(visits);
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

	// Brand Mouse Event
	$('div.brand').mouseenter(function(){
		$(this).children().removeClass("fa fa-arrow-circle-o-left");
		$(this).children().addClass("fa fa-arrow-circle-left");
		$(this).css("cursor", "pointer");
		$(this).css("background-color", "#4C6788");
	});

	// Brand Mouse Event
	$('div.brand').mouseleave(function(){
		$(this).children().removeClass("fa fa-arrow-circle-left");
		$(this).children().addClass("fa fa-arrow-circle-o-left");
		$(this).css("background-color", "#23282e");
	});

	function singleMenuActive (linkTitle) {
		$('li[data-toggle="collapse"]').siblings().removeClass("active");
		$('ul.sub-menu li').siblings().removeClass("active");
		$('li.singleLink').siblings().removeClass("active");
		$('li[data-target="#'+linkTitle+'"]').addClass("active");
	}

	function collapseMenuActive (linkTitle) {
		$('a[href="admin/'+linkTitle+'"]').parent().siblings().removeClass("active");
		$('li[data-toggle="collapse"]').siblings().removeClass("active");
		$('ul.sub-menu').children().removeClass("active");

		var elId = $('a[href="admin/'+linkTitle+'"]').parent().parent().attr("id");
		$('a[href="admin/'+linkTitle+'"]').parent().addClass("active");
		$('a[href="admin/'+linkTitle+'"]').parent().parent().addClass("in");
		$('li[data-target="#'+ elId +'"]').addClass("active");
	}

	function activateLink (linkTitle){
		if(linkTitle === 'dashboard'){
			singleMenuActive(linkTitle);
		} else {
			collapseMenuActive(linkTitle);
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


	// side menu active state (collapse)
	// DELETE same as collapseMenuActive (linkTitle);
	$('ul.sub-menu li').click(function(){
		var elId = $(this).parent().attr("id");
		$('li[data-target="#'+ elId +'"]').siblings().removeClass("active");
		$('ul.sub-menu').children().removeClass("active");
		$('li[data-target="#'+ elId +'"]').addClass("active");
		$(this).siblings().removeClass("active");
		$(this).addClass("active");
	});// DELETE same as collapseMenuActive (linkTitle);

	// side menu active state (non collapse)
	// DELETE same as singleMenuActive (linkTitle);
	$('li.singleLink').click(function(){
		$('li[data-toggle="collapse"]').siblings().removeClass("active");
		$('ul.sub-menu li').siblings().removeClass("active");
		$(this).siblings().removeClass("active");
		$(this).addClass("active");
	});// DELETE same as singleMenuActive (linkTitle);

// Initialization


}]);
