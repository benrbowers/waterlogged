from Flask import Flask, request #import main Flask class and request object

app = Flask(__name__) #create the Flask app

@app.route('/query-example')
def query_example():
    applinance = request.args.get('appliance') #if key doesn't exist, returns None
    return '''<h1>The appliance is: {}</h1>'''.format(appliance)

    elapsedTime = request.args.get('elapsedTime') #if key doesn't exist, returns None
    return '''<h1>The time is: {}</h1>'''.format(elapsedTime)
    
