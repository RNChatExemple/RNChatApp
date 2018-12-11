import {
  Platform
} from 'react-native';
import {
  AsyncStorage
} from 'react-native';
import SocketIOClient from 'socket.io-client';
import {
  store
} from '../../App'
import {
  receiveMessage,
  joinedChat
} from '../Configs/reducer'

export default class WebSocketUtils {
  clientserverUserId;
  lasreceived;
  joined;
  serverUserId;
  onJoined;

  constructor() {
    this.clientserverUserId = Platform.OS === 'ios' ? 'IS' : 'AN';
    this.lasreceived = null;
  }

  static generatesUserId() {
    //return (Math.random() *100000).toString();
    return Platform.OS === 'ios' ? 'IS' : 'AN';
  }

  connect() {
    //192.168.1.19
    //192.168.2.14
    //192.168.1.123
    this.socket = SocketIOClient('http://192.168.2.14:3000');
    
    this.socket.on('message', (message) => {
      store.dispatch(receiveMessage(message))
    });

    this.socket.on('userJoined', (serverUserId) => {
      this.serverUserId = serverUserId;
      AsyncStorage.setItem(this.clientserverUserId, serverUserId);
      store.dispatch(joinedChat());
    });


    return new Promise((resolve) => {
      AsyncStorage.getItem(this.clientserverUserId)
        .then((serverUserId) => {
            this.socket.emit('tryJoin', serverUserId ? serverUserId : null);
            resolve();
        }).catch((e) => alert(e));
    })
  }


  send(messages = []) {
    this.socket.emit('message', messages[0]);
  }
}