import React, { Component } from "react";
import {
  View,
  Alert,
  TextInput,
  Dimensions,
  StyleSheet,
  Keyboard,
  TouchableOpacity
} from "react-native";
import { Divider } from "react-native-elements";
import * as Permissions from "expo-permissions";
import * as ImagePicker from "expo-image-picker";
import {
  ActionSheetOptions,
  connectActionSheet
} from "@expo/react-native-action-sheet";
import { MaterialIcons, MaterialCommunityIcons } from "@expo/vector-icons";
import Color from "color";
import getKind, { KINDS } from "../../../lib/getKind";
import { whenIPhoneSE } from "../../../lib/responsive";
import { SuggestItem } from "../../../lib/suggest";
import theme from "../../../config/theme";
import s from "../../../config/style";
import Suggest from "../../organisms/Suggest/List";
import IconImage from "../../organisms/CreatePlan/IconImage";
import Header from "../../molecules/Header";

const deviceHeight = Dimensions.get("window").height;

type PropsBase = {
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
  onHome: () => void;
};

export type Props = PropsBase & {
  showActionSheetWithOptions: (
    optons: ActionSheetOptions,
    callback: (buttonIndex: number) => void
  ) => void;
};

export interface State {
  image: string;
  titleFocusCount: number;
  suggest: boolean;
  keyboard: boolean;
}

class Page extends Component<Props> {
  state = {
    image: this.props.image,
    titleFocusCount: 0,
    suggest: false,
    keyboard: false
  };

  componentDidMount() {
    this.keyboardDidShowListener = Keyboard.addListener(
      "keyboardDidShow",
      this._keyboardDidShow.bind(this)
    );
    this.keyboardDidHideListener = Keyboard.addListener(
      "keyboardDidHide",
      this._keyboardDidHide.bind(this)
    );
  }
  componentWillUnmount() {
    this.keyboardDidShowListener.remove();
    this.keyboardDidHideListener.remove();
  }

  keyboardDidShowListener: any;
  keyboardDidHideListener: any;

  _keyboardDidShow() {
    this.setState({
      keyboard: true
    });
  }

  _keyboardDidHide() {
    this.setState({
      keyboard: false
    });
  }

  onOpenActionSheet = () => {
    Keyboard.dismiss();

    this.props.showActionSheetWithOptions(
      {
        options: ["アイコンを変更する", "キャンセル"],
        cancelButtonIndex: 1
      },
      buttonIndex => {
        if (buttonIndex === 0) {
          this.props.onIcons();
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

  onCloseKeyBoard = () => {
    Keyboard.dismiss();
    this.setState({
      suggest: false
    });
  };

  render() {
    let { image } = this.props;
    const kind = this.props.kind || getKind(this.props.title);
    const config = KINDS[kind];
    const ss = s.schedule;
    const bc = Color(config.backgroundColor)
      .lighten(ss.backgroundColorAlpha)
      .toString();

    const imageSize = whenIPhoneSE(120, 180);

    return (
      <>
        <Header
          title=""
          color={bc}
          position="relative"
          right={
            this.state.keyboard ? (
              <TouchableOpacity
                onPress={this.onCloseKeyBoard}
                testID="KeyBoardCloseInCreateSchedule"
              >
                <MaterialCommunityIcons
                  name="keyboard-close"
                  color={theme.color.main}
                  size={25}
                  style={{ paddingRight: 5 }}
                />
              </TouchableOpacity>
            ) : (
              <TouchableOpacity onPress={this.onSave} testID="ScheduleCreated">
                <MaterialIcons
                  name="check"
                  color={theme.color.main}
                  size={25}
                  style={{ paddingRight: 5 }}
                />
              </TouchableOpacity>
            )
          }
          onClose={this.props.onHome}
        />

        <View
          style={{
            backgroundColor: theme.color.white,
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
              testID="ScheduleTitleInput"
              defaultValue={this.props.title}
              returnKeyType="done"
              autoFocus
              onFocus={this.onSuggestTitle}
              selectionColor={theme.color.lightGreen}
            />
            <Divider style={{ marginTop: 20, height: 1 }} />

            {this.state.suggest ? (
              <Suggest
                title={this.props.title}
                items={this.props.suggestList}
                onPress={this.onSuggest}
              />
            ) : (
              <>
                <IconImage
                  image={image}
                  imageSrc={config.src}
                  imageSize={imageSize}
                  backgroundColor={theme.color.white}
                  onSave={this.onSave}
                  onOpenActionSheet={this.onOpenActionSheet}
                />
              </>
            )}
          </View>
        </View>
      </>
    );
  }
}

export default connectActionSheet<PropsBase>(Page);

const styles = StyleSheet.create({
  titleInput: {
    width: "100%",
    color: theme.color.darkGray,
    fontSize: 22,
    fontWeight: "600",
    paddingLeft: 15
  }
});
