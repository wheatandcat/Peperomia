import React, { Component } from "react";
import {
  View,
  Alert,
  TextInput,
  Keyboard,
  TouchableOpacity
} from "react-native";
import EStyleSheet from "react-native-extended-stylesheet";
import { Divider, Button } from "react-native-elements";
import * as Permissions from "expo-permissions";
import * as ImagePicker from "expo-image-picker";
import dayjs from "dayjs";
import advancedFormat from "dayjs/plugin/advancedFormat";
import "dayjs/locale/ja";
import {
  ActionSheetProps,
  connectActionSheet
} from "@expo/react-native-action-sheet";
import { MaterialIcons, MaterialCommunityIcons } from "@expo/vector-icons";
import Color from "color";
import DatePicker from "react-native-datepicker";
import {
  Consumer as ThemeConsumer,
  ContextProps as ThemeContextProps
} from "../../../containers/Theme";
import getKind, { KINDS } from "../../../lib/getKind";
import { whenIPhoneSE } from "../../../lib/responsive";
import { SuggestItem } from "../../../lib/suggest";
import theme from "../../../config/theme";
import s from "../../../config/style";
import Suggest from "../../organisms/Suggest/List";
import IconImage from "../../organisms/CreatePlan/IconImage";
import Header from "../../molecules/Header";

dayjs.extend(advancedFormat);

type PropsBase = {
  mode: string;
  title: string;
  image: string;
  kind: string;
  date: string;
  suggestList: SuggestItem[];
  onInput: (name: string, value: any) => void;
  onImage: (image: string) => void;
  onSave: () => void;
  onIcons: () => void;
  onCamera: () => void;
  onHome: () => void;
};

export type Props = PropsBase & ActionSheetProps;

export type State = {
  image: string;
  titleFocusCount: number;
  suggest: boolean;
  keyboard: boolean;
};

class Page extends Component<Props> {
  state = {
    image: this.props.image,
    titleFocusCount: 0,
    suggest: false,
    keyboard: false
  };

  datePicker: any;

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

  onOpendDtePicker = () => {
    this.datePicker.onPressDate();
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
      <ThemeConsumer>
        {({ colorScheme }: ThemeContextProps) => (
          <>
            <DatePicker
              style={styles.datePicker}
              ref={picker => {
                this.datePicker = picker;
              }}
              mode="date"
              format="YYYY年MM月DD日"
              iconComponent={<View />}
              confirmBtnText="完了"
              cancelBtnText="キャンセル"
              customStyles={{
                dateText: {
                  color: theme().mode.text
                },
                datePicker: {
                  backgroundColor: colorScheme === "dark" ? "#222" : "white"
                },
                datePickerCon: {
                  backgroundColor: colorScheme === "dark" ? "#333" : "white"
                }
              }}
              locale="ja"
              onDateChange={date => this.props.onInput("date", date)}
            />
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
                      color={theme().color.main}
                      size={25}
                      style={{ paddingRight: 5 }}
                    />
                  </TouchableOpacity>
                ) : (
                  <TouchableOpacity
                    onPress={this.onSave}
                    testID="ScheduleCreated"
                  >
                    <MaterialIcons
                      name="check"
                      color={theme().color.main}
                      size={25}
                      style={{ paddingRight: 5 }}
                    />
                  </TouchableOpacity>
                )
              }
              onClose={this.props.onHome}
            />

            <View style={styles.body}>
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
                  placeholderTextColor={theme().color.gray}
                  style={styles.titleInput}
                  onChangeText={text => this.props.onInput("title", text)}
                  testID="ScheduleTitleInput"
                  defaultValue={this.props.title}
                  returnKeyType="done"
                  autoFocus
                  onFocus={this.onSuggestTitle}
                  selectionColor={theme().color.lightGreen}
                />
                <Divider style={{ marginTop: 20, height: 1 }} />
                {this.state.suggest ? (
                  <Suggest
                    title={this.props.title}
                    items={this.props.suggestList}
                    onPress={this.onSuggest}
                  />
                ) : (
                  <IconImage
                    image={image}
                    imageSrc={config.src}
                    imageSize={imageSize}
                    backgroundColor={theme().mode.background}
                    onSave={this.onSave}
                    onOpenActionSheet={this.onOpenActionSheet}
                  />
                )}
              </View>

              {(() => {
                if (this.state.suggest) {
                  return null;
                }

                if (this.props.date) {
                  return (
                    <View style={styles.datePickerContainer}>
                      <DatePicker
                        mode="date"
                        date={this.props.date}
                        confirmBtnText="完了"
                        cancelBtnText="キャンセル"
                        locale="ja"
                        format="YYYY年MM月DD日"
                        style={{ width: "100%" }}
                        customStyles={{
                          dateText: {
                            color: theme().mode.text
                          },
                          datePicker: {
                            backgroundColor:
                              colorScheme === "dark" ? "#222" : "white"
                          },
                          datePickerCon: {
                            backgroundColor:
                              colorScheme === "dark" ? "#333" : "white"
                          }
                        }}
                        placeholder="日付を設定する"
                        onDateChange={(_: string, date: Date) => {
                          return this.props.onInput(
                            "date",
                            dayjs(date).format("YYYY-MM-DD")
                          );
                        }}
                      />
                    </View>
                  );
                } else {
                  return (
                    <View style={styles.dateButtonContainer}>
                      <Button
                        icon={{
                          name: "date-range",
                          size: 20,
                          color: "white"
                        }}
                        buttonStyle={styles.dateButton}
                        titleStyle={styles.dateButtonText}
                        title="日付を設定する"
                        onPress={this.onOpendDtePicker}
                      />
                    </View>
                  );
                }
              })()}
            </View>
          </>
        )}
      </ThemeConsumer>
    );
  }
}

export default connectActionSheet<PropsBase>(Page);

const styles = EStyleSheet.create({
  titleInput: {
    width: "100%",
    color: theme().color.darkGray,
    fontSize: 22,
    fontWeight: "600",
    paddingLeft: 15
  },
  body: {
    backgroundColor: "$background",
    height: "100%"
  },
  dateButtonContainer: {
    padding: 30
  },
  dateButton: {
    backgroundColor: theme().color.lightGreen,
    borderRadius: 15,
    padding: 15
  },
  dateButtonText: {
    fontSize: 20,
    fontWeight: "600"
  },
  datePicker: {
    width: 0,
    height: 0,
    //  TDOD: androidで謎の線が残るので↓で対処,
    position: "absolute",
    top: -9999
  },
  datePickerContainer: {
    alignItems: "center",
    justifyContent: "center",
    width: "100%",
    paddingHorizontal: 30,
    paddingTop: 35
  }
});
