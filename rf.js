var client = require('./elmo_client.js');

var sys = require('util')
var exec = require('child_process').exec;
function puts(error, stdout, stderr) { sys.puts(stdout) }

var lamp1 = false;
var lamp2 = false;
var lamp3 = false;

client.add('woonkamer/lamp1',function() {	
	return 'Staat: ' + lamp1 + '<form method="post"><input type="submit" value="Schakelen" /></form>';	
},function() {	
	if(lamp1) {
		exec("send 11111 2 0", puts);	
	} else {
		exec("send 11111 2 1", puts);
	}
	lamp1 = !lamp1;	
	return 'Staat: ' +lamp1 + '<form method="post"><input type="submit" value="Schakelen" /></form>';	
});
client.add('woonkamer/lamp2',function() {	
	return 'Staat: ' + lamp2 + '<form method="post"><input type="submit" value="Schakelen" /></form>';	
},function() {	
	if(lamp2) {
		exec("send 11100 2 0", puts);	
	} else {
		exec("send 11100 2 1", puts);
	}
	lamp2 = !lamp2;	
	return 'Staat: ' +lamp2 + '<form method="post"><input type="submit" value="Schakelen" /></form>';	
});
client.add('woonkamer/lamp3',function() {	
	return 'Staat: ' + lamp3 + '<form method="post"><input type="submit" value="Schakelen" /></form>';	
},function() {	
	if(lamp3) {
		exec("send 11100 3 0", puts);	
	} else {
		exec("send 11100 3 1", puts);
	}
	lamp3 = !lamp3;	
	return 'Staat: ' +lamp3 + '<form method="post"><input type="submit" value="Schakelen" /></form>';	
});

client.register('localhost',3000);
client.start();
