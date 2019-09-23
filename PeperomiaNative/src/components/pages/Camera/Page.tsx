import React, { Component } from "react";
import { Text, View, TouchableOpacity } from "react-native";
import Svg, { Circle } from "react-native-svg";
import * as Permissions from "expo-permissions";
import { Camera } from "expo-camera";
import theme from "../../../config/theme";

export interface Props {
  onPicture: (image: string) => void;
}

export interface State {
  hasCameraPermission: boolean | null;
}

export default class extends Component<Props, State> {
  state = {
    hasCameraPermission: null // カメラ機能の許可
  };
  camera: any;

  // 初期起動時、カメラの使用の権限を取得する。
  async componentDidMount() {
    const { status } = await Permissions.askAsync(Permissions.CAMERA);
    this.setState({
      hasCameraPermission: status === "granted"
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
      <View
        style={{
          height: "100%"
        }}
      >
        <View
          style={{
            height: "80%"
          }}
        >
          <Camera
            style={{
              flex: 1,
              height: "100%"
            }}
            type={Camera.Constants.Type.back}
            ref={(ref: any) => {
              this.camera = ref;
            }}
          />
        </View>
        <View
          style={{
            alignItems: "center",
            padding: 30
          }}
        >
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
