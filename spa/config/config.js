
module.exports = function(){

	// Credentials
	var username = "";
	var password = "";
	var credentials = ""
	if(username.trim() != "" && password.trim() != ""){ credentials = username + ":" + password + "@"; }
	
	// Databse server
	var uri = "localhost";

	// Database name
	var dbName = "spa";
	
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
	var connection = credentials + uri + "/" + dbName + authMechanism + authSource;
	
	// Collections
	var dbCollections = ['users', 'blog'];

	// return function
	// config = require(./config/config');
	// config().connection();
	// config().dbCollections();
	return {
		connection: function(){
			return connection;
		},
		dbCollections : function(){
			return dbCollections;
		}
	};
}