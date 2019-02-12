import React, { Component } from "react";
import { View, TouchableOpacity, Image } from "react-native";
import { Input, Button } from "react-native-elements";
import { ImagePicker, Permissions } from "expo";
import {
  ActionSheetProps,
  connectActionSheet
} from "@expo/react-native-action-sheet";
import { Entypo } from "@expo/vector-icons";
import Color from "color";
import getKind, { KINDS } from "../../../lib/getKind";
import { IconImage } from "../../atoms";

export interface Props {
  onInput: (name: string, value: any) => void;
  onSave: () => void;
  onIcons: () => void;
  title: string;
}

class Page extends Component<Props & ActionSheetProps> {
  state = { image: null };

  onOpenActionSheet = () => {
    this.props.showActionSheetWithOptions(
      {
        options: [
          "アイコンを変更する",
          "写真を撮影する",
          "フォトライブラリー",
          "キャンセル"
        ],
        cancelButtonIndex: 3
      },
      buttonIndex => {
        if (buttonIndex === 0) {
          this.props.onIcons();
        }
        if (buttonIndex === 2) {
          this._pickImage();
        }
      }
    );
  };

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
            label={this.props.title === "" ? "タイトル" : ""}
          />

          <View style={{ paddingTop: 70 }}>
            <View
              style={{
                padding: image ? 0 : 10,
                width: 180,
                height: 180,
                borderWidth: 1,
                justifyContent: "center",
                alignItems: "center",
                backgroundColor: "#ffffff"
              }}
            >
              {image ? (
                <Image
                  style={{ width: 180, height: 180 }}
                  source={{ uri: image }}
                />
              ) : (
                <IconImage kind={kind} size={100} opacity={1.0} defaultIcon />
              )}

              <TouchableOpacity
                style={{
                  position: "absolute",
                  left: 4,
                  top: 2
                }}
                onPress={this.onOpenActionSheet}
              >
                <Entypo
                  name="image"
                  size={25}
                  style={{
                    color: "#555555"
                  }}
                />
              </TouchableOpacity>
            </View>
          </View>
          <View style={{ paddingTop: 70 }}>
            <Button
              title="作成する"
              testID="completion"
              onPress={this.props.onSave}
              buttonStyle={{
                width: 300,
                height: 50,
                backgroundColor: "#77D353",
                borderRadius: 15
              }}
            />
          </View>
        </View>
      </View>
    );
  }
}

export default connectActionSheet(Page);
