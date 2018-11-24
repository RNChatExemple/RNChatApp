import {Platform} from 'react-native';
import { AsyncStorage} from 'react-native';
import SocketIOClient from 'socket.io-client';

export default class WebSocketUtils {
    clientserverUserId; 
    lasreceived; 
    joined;
    serverUserId;

    constructor() {
      this.clientserverUserId =  Platform.OS === 'ios' ? 'IS' : 'AN';
      this.lasreceived = null;
    }

    static generatesUserId() {
        //return (Math.random() *100000).toString();
        return Platform.OS === 'ios' ? 'IS' : 'AN';
    }

    init(onJoined, onReceivedMessage){
        this.socket = SocketIOClient('http://192.168.0.8:3000');
        this.socket.on('message', (message) => {this.lasreceived = message});
        console.warn("INIT",onJoined)
        this.determineUser(onJoined);
    }

      /**
   * When a user joins the chatroom, check if they are an existing user.
   * If they aren't, then ask the server for a serverUserId.
   * Set the serverUserId to the component's state.
   */
  determineUser(onJoined) {
    console.warn("DETERMINE")
    AsyncStorage.getItem(this.clientserverUserId)
      .then((serverUserId) => {
        // If there isn't a stored serverUserId, then fetch one from the server.
        if (!serverUserId) {
          this.socket.emit('userJoined', null);
          this.socket.on('userJoined', (serverUserId) => {
            AsyncStorage.setItem(this.clientserverUserId, serverUserId);
            this.joined = true;
            this.serverUserId = serverUserId
            console.warn("DETERMINE",onJoined)

            onJoined();
          });
        } else {
          this.socket.emit('userJoined', serverUserId);
          console.warn("DETERMINE",onJoined)
          onJoined();
        }
      })
      .catch((e) => alert(e));
  }

  /**
   * When a message is sent, send the message to the server
   * and store it in this component's state.
   */
  send(messages=[]) {
    this.socket.emit('message', messages[0]);
  }
  }