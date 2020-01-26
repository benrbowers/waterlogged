import requests
import uuid

user = "Ben"
appliance = "Shower"



def http(elapsedTime, URL):
    DATA = {
    'user': user,
    'appliance': appliance,
    'elapsedTime': elapsedTime
}
    r = requests.post(url = URL, data = DATA)
    print (r.text)
 
