import React, { Component } from "react";
import {
  View,
  Alert,
  TextInput,
  ScrollView,
  Dimensions,
  StyleSheet
} from "react-native";
import { Divider } from "react-native-elements";
import * as Permissions from "expo-permissions";
import * as ImagePicker from "expo-image-picker";
import {
  ActionSheetProps,
  connectActionSheet
} from "@expo/react-native-action-sheet";
import Color from "color";
import getKind, { KINDS } from "../../../lib/getKind";
import { whenIPhoneSE } from "../../../lib/responsive";
import theme from "../../../config/theme";
import s from "../../../config/style";
import Suggest, { Item as SuggestItem } from "../../organisms/Suggest/List";
import IconImage from "../../organisms/CreatePlan/IconImage";
import Body from "../../organisms/CreatePlan/Body";

const deviceHeight = Dimensions.get("window").height;

export interface Props {
  mode: string;
  title: string;
  image: string;
  kind: string;
  suggestList: SuggestItem[];
  onInput: (name: string, value: any) => void;
  onImage: (image: string) => void;
  onSave: () => void;
  onIcons: () => void;
  onCamera: () => void;
}

export interface State {
  image: string;
  titleFocusCount: number;
  suggest: boolean;
}

class Page extends Component<Props & ActionSheetProps> {
  state = { image: this.props.image, titleFocusCount: 0, suggest: false };

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
        if (buttonIndex === 1) {
          this.props.onCamera();
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
      this.props.onImage(result.uri);
    }
  };

  onSave = () => {
    if (this.props.title == "") {
      Alert.alert("タイトルが入力されていません");
    } else {
      this.props.onSave();
    }
  };

  onSuggestTitle = () => {
    const titleFocusCount = this.state.titleFocusCount + 1;
    this.setState({
      titleFocusCount
    });

    if (titleFocusCount > 1) {
      this.setState({
        suggest: true
      });
    }
  };

  onSuggest = (_: string, name: string) => {
    this.props.onInput("title", name);

    this.setState({
      suggest: false
    });
  };

  render() {
    let { image } = this.props;
    const kind = this.props.kind || getKind(this.props.title);
    const config = KINDS[kind];
    const ss = s.schedule;

    const imageSize = whenIPhoneSE(120, 180);

    return (
      <ScrollView
        style={{
          paddingBottom: 50
        }}
      >
        <View
          style={{
            backgroundColor: "#F2F2F",
            height: deviceHeight
          }}
        >
          <View
            style={{
              paddingTop: whenIPhoneSE(20, 30),
              backgroundColor: Color(config.backgroundColor)
                .lighten(ss.backgroundColorAlpha)
                .toString(),
              width: "100%"
            }}
          >
            <TextInput
              placeholder={this.props.title === "" ? "タイトル" : ""}
              placeholderTextColor={theme.color.gray}
              style={styles.titleInput}
              onChangeText={text => this.props.onInput("title", text)}
              testID="inputTextTitle"
              defaultValue={this.props.title}
              returnKeyType="done"
              autoFocus
              onFocus={this.onSuggestTitle}
              selectionColor={theme.color.lightGreen}
            />
            <Divider style={{ marginTop: 20, height: 1 }} />

            {this.state.suggest ? (
              <Suggest
                items={this.props.suggestList}
                onPress={this.onSuggest}
              />
            ) : (
              <>
                <IconImage
                  image={image}
                  imageSrc={config.src}
                  imageSize={imageSize}
                  backgroundColor="#F2F2F2"
                  onSave={this.onSave}
                  onOpenActionSheet={this.onOpenActionSheet}
                />
                <Body
                  mode={this.props.mode}
                  onSave={this.onSave}
                  onOpenActionSheet={this.onOpenActionSheet}
                />
              </>
            )}
          </View>
        </View>
      </ScrollView>
    );
  }
}

export default connectActionSheet(Page);

const styles = StyleSheet.create({
  titleInput: {
    width: "100%",
    color: theme.color.darkGray,
    fontSize: 22,
    fontWeight: "600",
    paddingLeft: 15
  }
});
