var http = require('http');

var clients = [];

http.createServer(function (req, res) {
	
	if(req.method == 'POST') {
		
		console.log('Connection from: ' + req.connection.remoteAddress + ':' + req.connection.remotePort);
		
		var qs = require('querystring');
		var body = "";
		req.on('data', function (data) {
			body += data;
			if(body.length > 1e6) {
				req.connection.destroy();
			}
		});
		req.on('end', function() {
			var post = qs.parse(body);
			var nReg = 0;
			if (typeof post['routes'] == 'string') post['routes'] = [post['routes']];
			for(var r=0;r<post['routes'].length;r++) {
				var unique = true;
				for(var n=0;n<clients.length;n++) {
					if(post['ip'] == clients[n].ip && post['port'] == clients[n].port && post['routes'][r] == clients[n].route) {
						unique = false;
					}
				}
				if(unique) {
					clients.push({ip : post['ip'], port : post['port'],route : post['routes'][r]});
					nReg++;
				}
			}			
			
		});
		
		res.writeHead(200, {'Content-Type': 'text/plain'});
		res.end('Routes received');
		
	} else {
		
		res.writeHead(200, {'Content-Type': 'application/json'});
		res.end(JSON.stringify(clients));
		
	}
	
}).listen(3000);