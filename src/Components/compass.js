import React, {Component} from 'react';
import {Text, View, Image, Dimensions} from 'react-native';
import {Grid, Col, Row} from 'react-native-easy-grid';
import MagnetometerUtils from '../Utils/Magnetometer';

const {height, width} = Dimensions.get('window');

export default class Compass extends Component {
   compassUtils = new MagnetometerUtils();

  constructor() {
    super();
    this.state = {
      sensorData: '0',
    };
  }

  componentDidMount() {
    this.compassUtils.startSubscription(sensorData => {
      this.setState({sensorData: sensorData});
    });
  };

  componentWillUnmount() {
    this.compassUtils.stopSubscription();
  };

  render() {
    const {renderFullScreen} = this.props
    if(!renderFullScreen){
      return this.renderText();
    }else{
      return this.renderFullScreenView();
    }
  }

  renderText() {
    const {textStyle , textContainerStyle , textTitleStyle}  = this.props
    return (
      <View style={textContainerStyle}>
        <Text style={textTitleStyle}>Orientation</Text>       
        <Text style={textStyle}>{this.compassUtils.getDirectionFromMagnometerData(this.state.sensorData)}</Text>
      </View>
    )
  }

  renderFullScreenView() {
    return (
      <Grid style={{backgroundColor: 'black'}}>
        <Row style={{alignItems: 'center'}} size={.9}>
          <Col style={{alignItems: 'center'}}>
            <Text
              style={{
                color: '#fff',
                fontSize: height / 26,
                fontWeight: 'bold'
              }}>{this.compassUtils.getDirectionFromMagnometerData(this.state.sensorData)}
            </Text>
          </Col>
        </Row>

        <Row style={{alignItems: 'center'}} size={.1}>
          <Col style={{alignItems: 'center'}}>
            <View style={{width: width, alignItems: 'center', bottom: 0}}>
              <Image source={require('../assets/compass_pointer.png')} style={{
                height: height / 26,
                resizeMode: 'contain'
              }}/>
            </View>
          </Col>
        </Row>

        <Row style={{alignItems: 'center'}} size={2}>
          <Text style={{
            color: '#fff',
            fontSize: height / 27,
            width: width,
            position: 'absolute',
            textAlign: 'center'
          }}>
            {this.compassUtils.getDegreeFromMagnometerData(this.state.sensorData)}°
          </Text>

          <Col style={{alignItems: 'center'}}>
            <Image source={require("../assets/compass_bg.png")} style={{
              height: width - 80,
              justifyContent: 'center',
              alignItems: 'center',
              resizeMode: 'contain',
              transform: [{rotate: 360 - this.compassUtils.getAngleFromMagnometerData(this.state.sensorData) + 'deg'}]
            }}/>
          </Col>
        </Row>
      </Grid>
    );
  }
}