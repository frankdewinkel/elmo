/*
 * ELMO CLIENT MODULE  
 */
var http = require('http');
var querystring = require('querystring');

var ELMO_IP 	= '192.168.2.11';
var ELMO_PORT 	= 3333;
var ELMO_ROUTES = [];

/*
 * Add an ELMO task
 */
exports.add = function(route,get,post) {

	ELMO_ROUTES.push({
			
		route : route,
		get : get,
		post : post
		
	});

}

/* 
 * Register ELMO tasks on ELMO server
 */
exports.register = function(ELMO_HOSTNAME, ELMO_HOSTIP) {
	
	var routes = [];
	for(i=0;i<ELMO_ROUTES.length;i++) {
		routes.push(ELMO_ROUTES[i].route);
	}
	
	var data = querystring.stringify({ip : ELMO_IP, port : ELMO_PORT, routes : routes});
	var options = {
		host: 	ELMO_HOSTNAME,
		port: 	ELMO_HOSTIP,
		path: 	'/',
		method: 'POST',
		headers: {'Content-Type': 'application/x-www-form-urlencoded','Content-Length': Buffer.byteLength(data)}
	};
	var req = http.request(options, function(res) {
		console.log('Server responded');		
	});
	req.write(data);
	req.end();
	
}

/*
 * Start the ELMO client
 */
exports.start = function() {

	http.createServer(function (req, res) {
		
		var url = req.url; 
		
		if(req.method == 'POST') {
			
			var response = [];
			for(var i = 0; i < ELMO_ROUTES.length; i++ ) {				
				if('/' + ELMO_ROUTES[i].route == url) {
					response.push(ELMO_ROUTES[i].post(req));					
				}			
			}
			
			res.writeHead(200, {'Content-Type': 'text/html'});
			res.end(response.join());	
			
		} else {
			
			var response = [];
			for(var i = 0; i < ELMO_ROUTES.length; i++ ) {				
				if('/' + ELMO_ROUTES[i].route == url) {
					response.push(ELMO_ROUTES[i].get(req));					
				}			
			}
			
			res.writeHead(200, {'Content-Type': 'text/html'});
			res.end(response.join());
			
		}
		
	}).listen(ELMO_PORT);
	
}
