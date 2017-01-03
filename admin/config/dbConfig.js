
module.exports = function(){

	// Credentials
	var username = "";
	var password = "";
	var credentials = ""
	if(username.trim() != "" && password.trim() != ""){ credentials = username + ":" + password + "@"; }

	// Databse server
	var url = "localhost";

	// Database name
	var dbName = "wonjuRomance";

	// SCRAM-SHA-1 mechanism
	// ?authMechanism=SCRAM-SHA-1
	var mechanism = "";
	var authMechanism = "";
	if(mechanism.trim() != ""){ authMechanism = "?authMechanism=" + mechanism; }

	// Different auth source
	// ?authSource=authdb
	var source = "";
	var authSource = "";
	if(source.trim() != ""){ authSource = "?authSource=" + source; }

	// Database connection
	var connection = credentials + url + "/" + dbName + authMechanism + authSource;

	// Collections
	var dbCollections = [
		'admin',
		'events',
		'categories',
		'ads',
		'notis',
		'reportInquiry',
		'reportEvents',
		'wrEvents',
		'devices',
		'pushNotification',
		'appInfo',
		'titleImg'
	];

	return {
		connection: function(){
			return connection;
		},
		dbCollections : function(){
			return dbCollections;
		}
	};
}
