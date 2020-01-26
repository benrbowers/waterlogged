import requests
import uuid
import time
from getmac import get_mac_address

def httpPOST(elapsedTime):
    f = open("userdata.txt", "r")
    token = f.readline()
    uid = f.readline()
    appliance = f.readline()
    f.close()

    MAC = get_mac_address(interface = "eth0")
    
    timeStamp = time.time()

    URL = "https://waterlogged.appspot.com"
    URL += '/api/updateData/{}/{}/{}/{}'.format(uid, MAC, elapsedTime, timeStamp)

    headers = {
        'Authorization': token
    }

    r = requests.post(url = URL, data = {}, headers = headers)
    print(r.text)
    
def httpGetToken():
    MAC = get_mac_address(interface = "eth0")

    url = 'https://waterlogged.appspot.com/pub/token/{}'.format(MAC)
    r = requests.get(url = 'https://waterlogged.appspot.com/pub/token/{}'.format(MAC))

    response = r.json()
    print(url)
    print(MAC)
    print(response)
    token = response['token']
    uid = response['uid']
    appliance = response['appliance']

    open("userdata.txt", "w").close()
    f = open("userdata.txt", "w")
    f.write(token)
    f.write(uid)
    f.write(appliance)
    f.close()
