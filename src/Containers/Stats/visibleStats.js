import React, { Component } from 'react';
import { View, ActivityIndicator , Text } from 'react-native';
import { connect } from 'react-redux';
import styles from './visibleStats.style';


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
          <Text style={styles.statText}>Nb messages</Text>       
        </View>
        <View style={styles.statTextContainer}>
          <Text style={styles.statTextTitle}>Sended</Text>       
          <Text style={styles.statText}>Nb messages en</Text>       
        </View>
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