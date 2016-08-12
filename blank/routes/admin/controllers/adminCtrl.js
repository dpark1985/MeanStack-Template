
var os = require('os');
var util = require('util');

module.exports = {
  getAdminStatus: function(req, res){
    if(req.loggedIn){
  		if(req.user.isAdmin){
  			res.json({userID: req.user.login});
  		}
  	} else {
      res.json({ userID: null });
  	}
  },

  getOSData: function(req, res){
    var osData = {};

    if(req.loggedIn){
  		if(req.user.isAdmin){
        osData = {
          freemem : os.freemem(),
          totalmem : os.totalmem(),
          platform: os.platform(),
          type : os.type(),
          cpus : os.cpus(),
          totalmem : os.totalmem(),
          uptime : os.uptime()
        };
        return res.json(osData);
  		}
  	} else {
      res.status(404).sendFile(process.cwd()+'/public/templates/common/404.html');
  	}
  },

  getServerData: function(req, res){
    var serverData = {};

    if(req.loggedIn){
  		if(req.user.isAdmin){
        serverData = {
          heap: {
            rss : process.memoryUsage().rss,
            heapTotal: process.memoryUsage().heapTotal,
            heapUsed: process.memoryUsage().heapUsed
          },
          heap: util.inspect(process.memoryUsage()),
          path: process.cwd(),
          pid: process.pid,
          uptime: process.uptime(),
          version: process.version
        };
        return res.json(serverData);
  		}
  	} else {
      res.status(404).sendFile(process.cwd()+'/public/templates/common/404.html');
  	}
  },

  getVisitData: function(db, req, res){
    var visits = {};

    if(req.loggedIn){
      if(req.user.isAdmin){
        visits.todayVisits = 0;
        visits.totalVisits = 0;
        db.admin.find({}, function(err, data) {
          for(var i=0; i<data.length; i++){ visits.totalVisits += data[i].count; }
          visits.todayVisits = data[data.length-1].count;
          return res.json(visits);
        });
      }
    } else {
      res.status(404).sendFile(process.cwd()+'/public/templates/common/404.html');
    }
  },

  getUsersData: function(db, req, res){
    if(req.loggedIn){
      if(req.user.isAdmin){
        db.users.find({}, function (err, data){
          return res.json(data);
        });
      }
    } else {
      res.status(404).sendFile(process.cwd()+'/public/templates/common/404.html');
    }
  }




}
