import React, { Component } from "react";
import { View, TouchableOpacity } from "react-native";
import { Input, Button } from "react-native-elements";
import { ImagePicker, Permissions } from "expo";
import Color from "color";
import getKind, { KINDS } from "../../../lib/getKind";
import { IconImage } from "../../atoms";

export interface Props {
  onInput: (name: string, value: any) => void;
  title: string;
}

export default class extends Component<Props> {
  state = { image: null };

  async componentDidMount() {}

  _pickImage = async () => {
    const { status } = await Permissions.askAsync(Permissions.CAMERA);
    this.setState({
      hasCameraPermission: status === "granted"
    });

    await Promise.all([
      Permissions.askAsync(Permissions.CAMERA),
      Permissions.askAsync(Permissions.CAMERA_ROLL)
    ]);

    let result = await ImagePicker.launchImageLibraryAsync({
      allowsEditing: true,
      aspect: [4, 3]
    });

    if (!result.cancelled) {
      this.setState({ image: result.uri });
    }
  };

  render() {
    let { image } = this.state;
    const kind = getKind(this.props.title);
    const config = KINDS[kind];

    return (
      <View
        style={{
          backgroundColor: Color(config.backgroundColor)
            .alpha(0.2)
            .toString()
        }}
      >
        <View
          style={{
            paddingTop: 100,
            alignItems: "center",
            height: "100%",
            width: "100%"
          }}
        >
          <Input
            placeholder="タイトル"
            containerStyle={{ width: "85%" }}
            onChangeText={text => this.props.onInput("title", text)}
            testID="inputTextTitle"
          />

          <View style={{ paddingTop: 70 }}>
            <TouchableOpacity>
              <View
                style={{
                  padding: 10,
                  width: 180,
                  height: 180,
                  borderWidth: 1,
                  justifyContent: "center",
                  alignItems: "center",
                  backgroundColor: "#ffffff"
                }}
              >
                <IconImage kind={kind} size={100} opacity={1.0} defaultIcon />
              </View>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    );
  }
}
