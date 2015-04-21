import elmo_client
from subprocess import call

lampOn1 = False

def getLamp1():
	global lampOn1
	return 'Staat: %s<form method="post"><input type="submit" value="Schakelen" /></form>' % (lampOn1)
	
def setLamp1():
	global lampOn1
	if(lampOn1==True):
		call("send 11111 2 0", shell=True)	
	else:
		call("send 11111 2 1", shell=True)
	lampOn1 = not lampOn1
	return 'Staat: %s<form method="post"><input type="submit" value="Schakelen" /></form>' % (lampOn1)

elmo_client.add('woonkamer/lamp1','lamp',getLamp1,setLamp1)
elmo_client.register('localhost',3000)
elmo_client.start()