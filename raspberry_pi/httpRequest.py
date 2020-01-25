import requests
user = "Ben"
appliance = "Shower"



def http(elapsedTime, URL):
    DATA = {
    'user': user,
    'appliance': appliance,
    'elapsedTime': elapsedTime
}
    requests.post(url = URL, data = DATA)



