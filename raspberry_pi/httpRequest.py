import requests
import uuid
import time


def httpPOST(elapsedTime):
    f = open("userdata.txt", "r")
    token = f.readline()
    uid = f.readline()
    appliance = f.readline()
    f.close()

    MAC = hex(uuid.getnode())
    MAC = ':'.join(h[i:i+2] for i in range(2,14,2))
    
    timeStamp = time.time()

    URL = "http://waterlogged.appspot.com"
    URL += '/api/updateData/{}/{}/{}/{}'.format(uid, MAC, elapsedTime, timeStamp)

    headers = {
        'Authorization': token
    }

    requests.post(url = URL, data = {}, headers = headers)
    
def httpGetToken():
    MAC = hex(uuid.getnode())
    MAC = ':'.join(h[i:i+2] for i in range(2,14,2))

    r = requests.get(url = 'waterlogged.appspot.com/pub/token/{}'.format(MAC))

    response = r.json()

    token = response['token']
    uid = response['uid']
    appliance = response['appliance']

    open("userdata.txt", "w").close()
    f = open("userdata.txt", "w")
    f.write(token)
    f.write(uid)
    f.write(appliance)
    f.close()
