# This is a sample Python script.
from autobahn.twisted.component import Component, run
from autobahn.twisted.util import sleep
from twisted.internet.defer import inlineCallbacks
import os
url = os.environ.get('CBURL', u'ws://18.234.60.88:8080/ws')
realmv = os.environ.get('CBREALM', u'realm1')
print(url, realmv)
component = Component(transports=url, realm=realmv)
@component.on_join
@inlineCallbacks
def joined(session, details):
    print("session ready")
    def add2(obj):
        return obj.get("x") + obj.get("y")
    try:
        yield session.register(add2, u'com.myapp.add2')
        print("procedure registered")
    except Exception as e:
        print("could not register procedure: {0}".format(e))




if __name__ == "__main__":
    run([component])