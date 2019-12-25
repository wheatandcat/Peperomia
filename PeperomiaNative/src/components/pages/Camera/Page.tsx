import React, { Component } from 'react';
import { Text, View, TouchableOpacity } from 'react-native';
import EStyleSheet from 'react-native-extended-stylesheet';
import Svg, { Circle } from 'react-native-svg';
import * as Permissions from 'expo-permissions';
import { Camera } from 'expo-camera';
import theme from '../../../config/theme';

export type Props = {
  onPicture: (image: string) => void;
};

export type State = {
  hasCameraPermission: boolean | null;
};

export default class extends Component<Props, State> {
  state = {
    hasCameraPermission: null, // カメラ機能の許可
  };
  camera: any;

  // 初期起動時、カメラの使用の権限を取得する。
  async componentDidMount() {
    const { status } = await Permissions.askAsync(Permissions.CAMERA);
    this.setState({
      hasCameraPermission: status === 'granted',
    });
  }

  async takePicture() {
    if (!this.camera) {
      return;
    }
    const pictureData = await this.camera.takePictureAsync();

    this.props.onPicture(pictureData.uri);
  }

  render() {
    const { hasCameraPermission } = this.state;

    if (hasCameraPermission === null || hasCameraPermission === false) {
      return (
        <View>
          <Text>カメラの使用が許可されていません。</Text>
        </View>
      );
    }

    return (
      <View style={styles.root}>
        <View style={styles.contents}>
          <Camera
            style={styles.camera}
            type={Camera.Constants.Type.back}
            ref={(ref: any) => {
              this.camera = ref;
            }}
          />
        </View>
        <View style={styles.container}>
          <TouchableOpacity onPress={this.takePicture.bind(this)}>
            <Svg height={60} width={60}>
              <Circle
                cx={30}
                cy={30}
                r={25}
                strokeWidth={6}
                stroke={theme().color.gray}
                fill={theme().color.white}
              />
            </Svg>
          </TouchableOpacity>
        </View>
      </View>
    );
  }
}

const styles = EStyleSheet.create({
  root: {
    height: '100%',
  },
  contents: {
    height: '80%',
  },
  camera: {
    flex: 1,
    height: '100%',
  },
  container: {
    alignItems: 'center',
    padding: 30,
  },
});
