import React, { Component } from 'react';
import { View, ActivityIndicator , Text } from 'react-native';
import { connect } from 'react-redux';

class VisibleStats extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return this.renderStatsView()
  }

  renderStatsView() {
    return (
      <View>
          <Text>Hello stats</Text>       
      </View>)
  }
}

const mapStateToProps = state => {
  return {
  };
};

const mapDispatchToProps = {
};


export default connect(mapStateToProps, mapDispatchToProps)(VisibleStats);