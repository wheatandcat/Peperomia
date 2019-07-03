import React, { Component } from "react";
import {
  View,
  TextInput,
  TouchableOpacity,
  Text,
  SafeAreaView,
  Alert,
  Keyboard,
  ScrollView,
  StyleSheet
} from "react-native";
import {
  ActionSheetProps,
  connectActionSheet
} from "@expo/react-native-action-sheet";
import { Button, Divider } from "react-native-elements";
import Color from "color";
import {
  Ionicons,
  MaterialIcons,
  MaterialCommunityIcons
} from "@expo/vector-icons";
import GlobalStyles from "../../../GlobalStyles";
import getKind, { KINDS, KIND_DEFAULT } from "../../../lib/getKind";
import s from "../../../config/style";
import Header from "../../molecules/ScheduleHeader/Header";
import TimeDialog from "../../organisms/CreateScheduleDetail/TimeDialog";
import Memo from "../../organisms/CreateScheduleDetail/Memo";
import theme from "../../../config/theme";

export interface Props {
  title: string;
  kind: string;
  place: string;
  url: string;
  memo: string;
  time: number;
  iconSelected: boolean;
  onDismiss: () => void;
  onIcons: (title: string) => void;
  onSave: (
    title: string,
    kind: string,
    place: string,
    url: string,
    memo: string,
    time: number
  ) => void;
}

export interface State {
  title: string;
  kind: string;
  place: string;
  url: string;
  memo: string;
  time: number;
  manualTime: boolean;
  manualTimeValue: number;
  keyboard: boolean;
}

interface Item {
  value: number | null;
  label: string;
}

const times: Item[] = [
  {
    value: 0,
    label: "0分"
  },
  {
    value: 10,
    label: " 10分"
  },
  {
    value: 30,
    label: " 30分"
  },
  {
    value: 60,
    label: " 60分"
  },
  {
    value: null,
    label: "手動で更新"
  },
  {
    value: null,
    label: "キャンセル"
  }
];

const cancelButtonIndex = times.length - 1;
const manualButtonIndex = times.length - 2;

class App extends Component<Props & ActionSheetProps, State> {
  state = {
    title: this.props.title,
    kind: this.props.kind,
    memo: this.props.memo,
    place: this.props.place,
    url: this.props.url,
    time: this.props.time,
    manualTimeValue: 0,
    manualTime: false,
    keyboard: false
  };

  scrollView: any;

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
    const options = times.map(val => val.label);

    let destructiveButtonIndex = times.findIndex(
      val => this.state.time === val.value
    );
    if (destructiveButtonIndex === null) {
      destructiveButtonIndex = manualButtonIndex;
    }

    this.props.showActionSheetWithOptions(
      {
        options,
        cancelButtonIndex,
        destructiveButtonIndex
      },
      buttonIndex => {
        // Do something here depending on the button index selected
        if (buttonIndex == cancelButtonIndex) {
          return;
        }

        if (buttonIndex == manualButtonIndex) {
          this.setState({ manualTime: true });
          return;
        }

        const value = times[buttonIndex].value || 0;

        this.setState({ time: value });
      }
    );
  };

  onChangeTitle = (title: string) => {
    if (this.props.iconSelected) {
      this.setState({ title });
    } else {
      this.setState({ title, kind: getKind(title) });
    }
  };

  onDismiss = (title: string, kind: string, memo: string, time: number) => {
    if (
      this.props.title !== title ||
      this.props.kind !== kind ||
      this.props.memo !== memo ||
      this.props.time !== time
    ) {
      Alert.alert(
        "保存されていない変更があります",
        "戻りますか？",
        [
          {
            text: "キャンセル",
            style: "cancel"
          },
          {
            text: "戻る",
            onPress: () => {
              this.props.onDismiss();
            }
          }
        ],
        { cancelable: false }
      );
    } else {
      this.props.onDismiss();
    }
  };

  onSave = () => {
    if (this.state.title == "") {
      Alert.alert("タイトルが入力されていません");
    } else {
      const kind = this.props.iconSelected ? this.props.kind : this.state.kind;
      const { title, url, place, memo, time } = this.state;

      this.props.onSave(title, kind, place, url, memo, time);
    }
  };

  onSetManualTime = () => {
    this.setState({
      time: this.state.manualTimeValue,
      manualTime: false
    });
  };

  onCloseManualTime = () => {
    this.setState({
      manualTime: false
    });
  };

  onChangeMemoInput = (name: string, value: string) => {
    if (name === "memo") {
      this.setState({
        memo: value
      });
    } else if (name === "place") {
      this.setState({
        place: value
      });
    } else if (name === "url") {
      this.setState({
        url: value
      });
    }
  };

  render() {
    const kind = this.state.kind || KIND_DEFAULT;
    const config = KINDS[kind];
    const ss = s.schedule;
    const bc = Color(config.backgroundColor)
      .lighten(ss.borderColorAlpha)
      .toString();

    return (
      <ScrollView
        ref={ref => {
          this.scrollView = ref;
        }}
      >
        <SafeAreaView
          style={[GlobalStyles.droidSafeArea, { flex: 0, backgroundColor: bc }]}
        />
        <SafeAreaView style={{ flex: 1 }}>
          <TimeDialog
            open={this.state.manualTime}
            onChange={value => this.setState({ manualTimeValue: value })}
            onSetManualTime={this.onSetManualTime}
            onCloseManualTime={this.onCloseManualTime}
          />
          <View style={styles.root}>
            <Header
              kind={this.props.iconSelected ? this.props.kind : this.state.kind}
              right={
                this.state.keyboard ? (
                  <TouchableOpacity
                    onPress={() => Keyboard.dismiss()}
                    testID="closeKeyBoard"
                  >
                    <MaterialCommunityIcons
                      name="keyboard-close"
                      color={theme.color.main}
                      size={25}
                      style={{ paddingRight: 5 }}
                    />
                  </TouchableOpacity>
                ) : (
                  <TouchableOpacity
                    onPress={this.onSave}
                    testID="saveScheduleDetail"
                  >
                    <MaterialIcons
                      name="check"
                      color={theme.color.main}
                      size={25}
                      style={{ paddingRight: 5 }}
                    />
                  </TouchableOpacity>
                )
              }
              onClose={() =>
                this.onDismiss(
                  this.state.title,
                  this.state.kind,
                  this.state.memo,
                  this.state.time
                )
              }
            >
              <TextInput
                placeholder="タイトルを入力"
                placeholderTextColor="#555"
                style={styles.inputTitle}
                onChangeText={title =>
                  this.setState({ title, kind: getKind(title) })
                }
                defaultValue={this.props.title}
                testID="inputTextScheduleDetailTitle"
                returnKeyType="done"
                autoFocus
              />
            </Header>

            <>
              <View
                style={{
                  paddingHorizontal: 15,
                  paddingTop: 15,
                  paddingBottom: 5
                }}
              >
                <TouchableOpacity onPress={this.onOpenActionSheet}>
                  <View style={styles.timeContainer}>
                    <Ionicons
                      name="md-time"
                      color={theme.color.lightGreen}
                      size={25}
                      style={{ paddingTop: 3 }}
                    />
                    <Text style={styles.timeText}>{this.state.time}分</Text>
                  </View>
                </TouchableOpacity>
              </View>
              <Divider />
              <View style={{ paddingTop: 10, paddingLeft: 10 }}>
                <Memo
                  place={this.state.place}
                  url={this.state.url}
                  memo={this.state.memo}
                  onChangeInputText={this.onChangeMemoInput}
                  scrollViewRef={this.scrollView}
                />
              </View>
              <View style={{ paddingLeft: 12 }}>
                <View style={{ paddingTop: 80, width: 105 }}>
                  <Button
                    title="アイコンを変更する"
                    type="clear"
                    titleStyle={styles.linkTitle}
                    buttonStyle={styles.linkButton}
                    containerStyle={{
                      padding: 0
                    }}
                    onPress={() => this.props.onIcons(this.state.title)}
                  />
                </View>
              </View>
            </>
          </View>
        </SafeAreaView>
        <View style={{ height: 500 }} />
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  root: {
    backgroundColor: "#ffffff",
    height: "100%",
    width: "100%"
  },
  inputTitle: {
    fontSize: 20,
    fontWeight: "600",
    color: "#555",
    paddingLeft: 1
  },
  timeContainer: {
    flexDirection: "row",
    alignItems: "center",
    width: 80,
    height: 30
  },
  timeText: {
    fontSize: 18,
    color: theme.color.darkGray,
    paddingHorizontal: 15
  },
  memoInput: {
    fontSize: 16,
    lineHeight: 24,
    fontWeight: "400",
    borderBottomWidth: 0.5,
    borderColor: "#5A6978"
  },
  memoText: {
    fontSize: 16,
    lineHeight: 24,
    fontWeight: "400"
  },
  linkTitle: {
    color: "#a888",
    fontSize: 12,
    fontWeight: "600",
    padding: 0
  },
  linkButton: {
    borderBottomWidth: 1,
    borderBottomColor: "#888",
    padding: 0
  }
});

export default connectActionSheet(App);
