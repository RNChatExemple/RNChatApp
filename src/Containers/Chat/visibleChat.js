import React, {
  Component
} from 'react';
import {
  View,
  Text,
  ActivityIndicator,
} from 'react-native';
import {
  GiftedChat
} from 'react-native-gifted-chat';
import WebSocketUtils from '../../Utils/WebSocketUtils';
import {
  connect
} from 'react-redux';
import {
  joinChat,
  sendMessage,
  setUserId
} from '../../Configs/reducer'


class VisibleChat extends Component {
  constructor(props) {
    super(props);
    this.state = {
      userId: null
    };
    this.onSend = this.onSend.bind(this);
  }

  componentWillMount() {
    this.props.joinChat();
    //this.socketHandler = new WebSocketUtils();
    //this.socketHandler.init(this.onJoined.bind(this), this.onReceivedMessage.bind(this))
  }

  componentDidUpdate(prevProps, prevState) {
    //MONTRER COMMENT LE CODE CHANGE
    //console.warn(prevProps,prevState)
  }

  onJoined(userId) {
    this.props.setUserId(userId);
  }

  // Event listeners
  /**
   * When the server sends a message to this.
   */
  onReceivedMessage(messages) {
    this.props.sendMessage(GiftedChat.append(this.props.messages, messages));
  }

  /**
   * When a message is sent, send the message to the server
   * and store it in this component's state.
   */
  onSend(messages = []) {
    const {
      sendMessage
    } = this.props
    //this.socketHandler.send(messages);
    sendMessage(GiftedChat.append(this.props.messages, messages));
  }

  render() {
    if(this.props.userId !== null){
      var user = { _id: this.props.userId || -1 };
      return (
        <GiftedChat
          style={{flex : 1}}
          messages={this.props.messages}
          onSend={this.onSend}
          user={user}
        />
      );
    }else{
      return (
        <View style={{flex:1, justifyContent: 'center'}}>
          <ActivityIndicator size="large" color="#0000ff" />
        </View>)
    }

  }
}

const mapStateToProps = state => {
  let storedMessages = state.messages;
  let storedUserId = state.userId;

  return {
    messages: storedMessages,
    userId: storedUserId
  };
};

const mapDispatchToProps = {
  joinChat,
  sendMessage,
  setUserId
};


export default connect(mapStateToProps, mapDispatchToProps)(VisibleChat);