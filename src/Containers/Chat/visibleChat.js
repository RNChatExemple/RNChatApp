import React, { Component } from 'react';
import { View, ActivityIndicator } from 'react-native';
import { GiftedChat } from 'react-native-gifted-chat';
import { connect } from 'react-redux';
import { joinChat, sendMessage, setUserId} from '../../Configs/reducer'

class VisibleChat extends Component {
  constructor(props) {
    super(props);
    //Ce bind permet de garder d'utiliser 'this' dans le callback
    this.onSend = this.onSend.bind(this);
  }

  //Méthode du cycle de vie
  componentWillMount() {
    this.props.joinChat();
  }

  onSend(messages = []) {
    this.props.sendMessage(messages);
  }

  render() {
    let user = { _id: this.props.userId || -1 };
    return this.props.joined ? this.renderChatView(user) : this.renderActivityIndicator();
  }

  renderChatView(user) {
    return (
      <GiftedChat
        style={{flex : 1}}
        messages={this.props.messages}
        onSend={this.onSend}
        user={user}
      />)
  }

  renderActivityIndicator(){
    return (
      <View style={{flex:1, justifyContent: 'center'}}>
        <ActivityIndicator size="large" color="#0000ff" />
      </View>
      )
  }

}


const mapStateToProps = state => {
  const storedMessages = state.messages;
  const storedUserId = state.userId;
  const storeSrvJoined = state.joined;  

  return {
    messages: storedMessages,
    userId: storedUserId,
    joined: storeSrvJoined
  };
};

const mapDispatchToProps = {
  joinChat,
  sendMessage,
  setUserId
};


export default connect(mapStateToProps, mapDispatchToProps)(VisibleChat);