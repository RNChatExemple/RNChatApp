import React, { Component } from 'react';
import { View, ActivityIndicator , Text } from 'react-native';
import { connect } from 'react-redux';

class VisibleStats extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return this.renderChatView()
  }

  renderChatView() {
    return (
      <View>
          <Text>Hello stats</Text>       
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
  return {
  };
};

const mapDispatchToProps = {
};


export default connect(mapStateToProps, mapDispatchToProps)(VisibleStats);