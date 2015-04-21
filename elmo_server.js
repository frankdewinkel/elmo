var http = require('http');

var clients = [];

http.createServer(function (req, res) {
	
	if(req.method == 'POST') {
		
		console.log('Connection from: ' + req.connection.remoteAddress + ':' + req.connection.remotePort);
		
		var qs = require('querystring');
		var body = '';
		req.on('data', function (data) {
			body += data;
			if(body.length > 1e6) {
				req.connection.destroy();
			}
		});
		req.on('end', function() {
			var post = qs.parse(body);
			var data = JSON.parse(body);
			var nReg = 0;
			for(var r=0;r<data.length;r++) {
				var unique = true;
				for(var n=0;n<clients.length;n++) {
					if(data[r]['route'] == clients[n].route) unique = false;
				}
				if(unique) {
					clients.push({type : data[r]['type'], route : data[r]['route']});
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