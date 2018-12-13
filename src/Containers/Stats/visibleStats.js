import React, { Component } from 'react';
import { View, TouchableHighlight , Text } from 'react-native';
import { connect } from 'react-redux';
import styles from './visibleStats.style';
import { Button } from 'react-native-elements'
import Compass from '../../Components/compass';

class VisibleStats extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return this.renderStatsView()
  }

  renderStatsView() {
    return (
      <View styles={styles.containter}>
        <View style={styles.statTextContainer}>
          <Text style={styles.statTextTitle}>Total</Text>       
          <Text style={styles.statText}>{this.props.nbMessages}</Text>       
        </View>
        <View style={styles.statTextContainer}>
          <Text style={styles.statTextTitle}>Sended</Text>       
          <Text style={styles.statText}>{this.props.nbMessagesSended}</Text>       
        </View>
        <View style={styles.statTextContainer}>
        <Compass textStyle={styles.statText}  textTitleStyle={styles.statTextTitle} textContainerStyle={styles.statTextContainer}></Compass>
        </View>
      </View>
      )
  }
}

const mapStateToProps = state => {
  const storedNbMessages = state.chat.nbMessages;
  const storedNbMessagesSended = state.chat.nbSendedMessages
  return {
    nbMessages : storedNbMessages,
    nbMessagesSended : storedNbMessagesSended
  };
};

const mapDispatchToProps = {
};


export default connect(mapStateToProps, mapDispatchToProps)(VisibleStats);