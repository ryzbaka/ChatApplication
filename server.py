from flask import Flask, render_template,request
'''
socket us a oath through which one computer can interact with another.
SocketIO is a cross platform javascript library that abstracts the client application from the transport protocol.
'''
from flask_socketio import SocketIO

app=Flask(__name__)
app.config['SECRET_KEY']='vnkdjnfjknfl1232#' # adding secret key to enable encryption, take a look at this later
socketio=SocketIO(app)

@app.route("/get_my_ip", methods=["GET"])
def get_my_ip():
    return jsonify({'ip': request.remote_addr}), 200

@app.route("/")
def sessions():
    return render_template('sessions.html')

def messageReceived(methods=['GET','POST']):
    print('message was received!')

@socketio.on('my event') #this event is triggered by client side socket
def handle_custom_event(json,methods=['GET','POST']): #triggered when 'my event' occurs.
    print('received my event: '+str(json)) # print received json object to terminal
    socketio.emit('my response',json, callback=messageReceived) # send the json object to "my response" event
    #callback is just a debugging technique that will trigger the messageReceived function that shows flow of data.


if __name__=='__main__':
    socketio.run(app,debug=True)

'''
===========================================
=== UNDERSTANDING SOCKET EVENT HANDLING ===
===========================================

socketio.on decorator is used for defining event handlers.
The 'send' and 'emit' functions are used to send messages to connected clients.

To send events, a Flask server can use the send() and emit() functions provided by Flask-SocketIO:

The send() function sends a standard message of string or JSON type to the client. 
The emit() function sends a message under a custom event name( in here it’s ‘my event’ ) along with the data.


'''
