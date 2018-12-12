import React from 'react';
import { Text, View, TouchableOpacity, Slider } from 'react-native';
import { RNCamera } from 'react-native-camera';
import styles from './visibleCamera.style';
import { connect } from 'react-redux';

const PendingView = () => (
    <View
      style={{
        flex: 1,
        backgroundColor: 'lightgreen',
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      <Text>Waiting</Text>
    </View>
  );

class VisibleCamera extends React.Component {
    constructor(props) {
        super(props);
      
        this.state = {
          cameraType : RNCamera.Constants.Type.front,
        }
      }

    render() {
        return (
          <View style={styles.container}>
            <RNCamera
              style={styles.preview}
              type={this.state.cameraType} 
                flashMode={RNCamera.Constants.FlashMode.on}
              permissionDialogTitle={'Permission to use camera'}
              permissionDialogMessage={'We need your permission to use your camera phone'}
            >
              {({ camera, status }) => {
                if (status !== 'READY') return <PendingView />;
                return (
                  <View style={{ flex: 0, flexDirection: 'row', justifyContent: 'center' }}>
                    <TouchableOpacity onPress={() => this.takePicture(camera)} style={styles.capture}>
                      <Text style={{ fontSize: 14 }}> SNAP </Text>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => this.reverseCamera(camera)} style={styles.capture}>
                      <Text style={{ fontSize: 14 }}> TAKE PHOTO </Text>
                    </TouchableOpacity>
                  </View>
                );
              }}
            </RNCamera>
          </View>
        );
      }
    

      reverseCamera = async function(camera) {
            if (this.state.cameraType === RNCamera.Constants.Type.front) {
              this.setState({
                cameraType: RNCamera.Constants.Type.back,
                mirror: true
              });
            } else {
              this.setState({
                cameraType: RNCamera.Constants.Type.front,
                mirror: false
              });
            }
          }
      
    
      takePicture = function(camera) {
        const options = { quality: 0.5, base64: true };
        const data = camera.takePicture(options);
        //  eslint-disable-next-line
        console.log(data.uri);
      }
    }


const mapStateToProps = state => {
  return {
  };
};

const mapDispatchToProps = {
};


export default connect(mapStateToProps, mapDispatchToProps)(VisibleCamera);