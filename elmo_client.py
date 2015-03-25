import time
import BaseHTTPServer
import httplib, urllib

ELMO_IP 	= '192.168.2.11'
ELMO_PORT 	= 3333
ELMO_ROUTES = []

class ELMO_HANDLER(BaseHTTPServer.BaseHTTPRequestHandler):
    def _set_headers(self):
        self.send_response(200)
        self.send_header('Content-type', 'text/html')
        self.end_headers()
 
    def do_GET(self):
		self._set_headers()		
		response = ""
		for ELMO_ROUTE in ELMO_ROUTES:
			if('/' + ELMO_ROUTE["route"] == self.path):
				response += ELMO_ROUTE["get"]()
		self.wfile.write(response)
 
    def do_HEAD(self):
        self._set_headers()
        
    def do_POST(self):
		self._set_headers()
		response = ""
		for ELMO_ROUTE in ELMO_ROUTES:
			if('/' + ELMO_ROUTE["route"] == self.path):
				response += ELMO_ROUTE["post"]()		
		self.wfile.write(response)
		
def add(route,get,post):
	ELMO_ROUTES.append({"route" : route, "get" : get, "post" : post})

def register(ELMO_HOSTNAME,ELMO_HOSTPORT):
	routes = 'ip%s&port%s' % (ELMO_IP, ELMO_PORT)
	for ELMO_ROUTE in ELMO_ROUTES:
		routes += '&routes=' + urllib.quote(ELMO_ROUTE["route"])
	headers = {"Content-type": "application/x-www-form-urlencoded","Accept": "text/plain"}
	conn = httplib.HTTPConnection("%s:%s" % (ELMO_HOSTNAME, ELMO_HOSTPORT))
	conn.request("POST", "", routes, headers)
	response = conn.getresponse()
	print response.status, response.reason
	conn.close()

def start():
    server_class = BaseHTTPServer.HTTPServer
    httpd = server_class((ELMO_IP, ELMO_PORT), ELMO_HANDLER)
    print time.asctime(), "Server Starts - %s:%s" % (ELMO_IP, ELMO_PORT)
    try:
        httpd.serve_forever()
    except KeyboardInterrupt:
        pass
    httpd.server_close()
    print time.asctime(), "Server Stops - %s:%s" % (ELMO_IP, ELMO_PORT)