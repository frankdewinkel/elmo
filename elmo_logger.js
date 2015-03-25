var http = require('http');
var ELMO_HOSTIP 	= 'localhost';
var ELMO_HOSTPORT 	= 3000;
var ELMO_ROUTES 	= [];

var intervalID;

exports.add = function(route) {
	ELMO_ROUTES.push(route);	
}

exports.start = function(freq) {
	intervalId = setInterval(function() {
		for(var i=0;i<ELMO_ROUTES.length;i++) {
			//Create webrequest
			var options = {
				host: ELMO_ROUTES[i].host,
				path: ELMO_ROUTES[i].route
			};
			http.request(options, function(response) {
				//Write response to db
				//elmo_db.write(ELMO_ROUTES[i].route)		
			}).end();					
		}
	},freq);
}

exports.stop = function() {
	clearInterval(intervalId);
}