import React, { Component } from 'react';
import { View, ActivityIndicator , TouchableOpacity , Text , Button } from 'react-native';
import { GiftedChat } from 'react-native-gifted-chat';
import { connect } from 'react-redux';
import { joinChat, sendMessage, setUserId} from '../../Configs/reducer'

class VisibleChat extends Component {

  //Ajout du bouton dans la barre de navigation
  static navigationOptions = ({ navigation }) => {
    return {
      headerRight: (
        <TouchableOpacity onPress={() => navigation.navigate('Stats')} >
          <Text> Stats </Text>
       </TouchableOpacity>
      ),
    };
  };

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

  onPress() {
    this.props.navigation.navigate('Stats');
  }

  renderChatView(user) {
    return (
      <View style={{flex : 1}}>
        <GiftedChat
          messages={this.props.messages}
          onSend={this.onSend}
          user={user}
          renderAvatar={null}
          maxInputLength={500}
        />
      </View>)
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
  const storedMessages = state.chat.messages;
  const storedUserId = state.chat.userId;
  const storeSrvJoined = state.chat.joined;

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