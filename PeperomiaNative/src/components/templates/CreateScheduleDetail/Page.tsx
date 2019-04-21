import React, { Component } from "react";
import {
  View,
  TextInput,
  TouchableOpacity,
  Text as TextPlan,
  SafeAreaView,
  Alert,
  Platform,
  Keyboard,
  ScrollView,
  InputAccessoryView
} from "react-native";
import {
  ActionSheetProps,
  connectActionSheet
} from "@expo/react-native-action-sheet";
import { Button, Overlay } from "react-native-elements";
import { Ionicons, MaterialIcons } from "@expo/vector-icons";
import Header from "../../molecules/ScheduleHeader/Header";
import getKind from "../../../lib/getKind";

export interface Props {
  title: string;
  kind: string;
  memo: string;
  time: number;
  iconSelected: boolean;
  onDismiss: () => void;
  onIcons: (title: string) => void;
  onSave: (title: string, kind: string, memo: string, time: number) => void;
}

export interface State {
  title: string;
  kind: string;
  memo: string;
  time: number;
  manualTime: boolean;
  manualTimeValue: number;
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
    time: this.props.time,
    manualTimeValue: 0,
    manualTime: false
  };

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

  onSave = (title: string, kind: string, memo: string, time: number) => {
    if (title == "") {
      Alert.alert("タイトルが入力されていません");
    } else {
      this.props.onSave(title, kind, memo, time);
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

  render() {
    const inputAccessoryViewID = "uniqueID";

    return (
      <SafeAreaView style={{ flex: 1 }}>
        <Overlay
          isVisible={this.state.manualTime}
          height={Platform.OS === "ios" ? 200 : 225}
          overlayStyle={{ padding: 5 }}
        >
          <View
            style={{
              height: "100%",
              width: "100%",
              backgroundColor: "#fff"
            }}
          >
            <View
              style={{
                alignItems: "center",
                paddingVertical: 10
              }}
            >
              <TextPlan>時間を指定して下さい</TextPlan>
            </View>
            <View
              style={{
                alignItems: "center",
                paddingTop: 30
              }}
            >
              <View style={{ flexDirection: "row" }}>
                <TextInput
                  keyboardType="numeric"
                  style={{
                    width: 50,
                    paddingRight: 10,
                    textAlign: "right",
                    fontSize: 24,
                    borderBottomWidth: 1
                  }}
                  defaultValue=""
                  onChangeText={value =>
                    this.setState({ manualTimeValue: Number(value) })
                  }
                  returnKeyType="done"
                  maxLength={3}
                />
                <View>
                  <TextPlan
                    style={{ paddingTop: 6, paddingLeft: 5, fontSize: 18 }}
                  >
                    分
                  </TextPlan>
                </View>
              </View>
            </View>
            <View
              style={{
                flexDirection: "row",
                justifyContent: "center",
                width: "auto",
                paddingTop: 50
              }}
            >
              <Button
                title="設定する"
                onPress={this.onSetManualTime}
                containerStyle={{ width: 130, paddingRight: 8 }}
              />
              <Button
                title="キャンセル"
                type="outline"
                onPress={this.onCloseManualTime}
                containerStyle={{ width: 130, paddingLeft: 8 }}
                buttonStyle={{ borderColor: "red" }}
                titleStyle={{ color: "red" }}
              />
            </View>
          </View>
        </Overlay>
        <View
          style={{
            backgroundColor: "#ffffff",
            height: "100%",
            width: "100%"
          }}
        >
          <Header
            kind={this.props.iconSelected ? this.props.kind : this.state.kind}
            right={
              <TouchableOpacity
                onPress={() =>
                  this.onSave(
                    this.state.title,
                    this.props.iconSelected ? this.props.kind : this.state.kind,
                    this.state.memo,
                    this.state.time
                  )
                }
                testID="saveScheduleDetail"
              >
                <TextPlan
                  style={{ fontSize: 20, fontWeight: "500", color: "#555" }}
                >
                  保存
                </TextPlan>
              </TouchableOpacity>
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
              style={{
                fontSize: 20,
                fontWeight: "600",
                color: "#555",
                paddingLeft: 1
              }}
              onChangeText={title =>
                this.setState({ title, kind: getKind(title) })
              }
              defaultValue={this.props.title}
              testID="inputTextScheduleDetailTitle"
              returnKeyType="done"
            />
          </Header>

          <ScrollView>
            <View style={{ padding: 20 }}>
              <TouchableOpacity onPress={this.onOpenActionSheet}>
                <View
                  style={{
                    flexDirection: "row",
                    alignItems: "center",
                    borderBottomWidth: 0.5,
                    borderColor: "#5A6978",
                    width: 80,
                    height: 30
                  }}
                >
                  <Ionicons
                    name="md-time"
                    color="#5A6978"
                    size={24}
                    style={{ paddingTop: 3 }}
                  />
                  <TextPlan
                    style={{
                      fontSize: 16,
                      fontWeight: "500",
                      color: "#00A6FF",
                      paddingHorizontal: 15
                    }}
                  >
                    {this.state.time}分
                  </TextPlan>
                </View>
              </TouchableOpacity>
              <View style={{ paddingTop: 30 }}>
                <MaterialIcons name="edit" color="#00A6FF" size={25} />
                <View style={{ paddingTop: 5 }}>
                  <TextInput
                    placeholder="メモを書く"
                    multiline
                    style={{
                      fontSize: 16,
                      lineHeight: 24,
                      fontWeight: "400",
                      borderBottomWidth: 0.5,
                      borderColor: "#5A6978"
                    }}
                    onChangeText={memo => {
                      this.setState({ memo });
                    }}
                    testID="inputTextScheduleDetailMemo"
                    inputAccessoryViewID={inputAccessoryViewID}
                  >
                    <TextPlan
                      style={{
                        fontSize: 16,
                        lineHeight: 24,
                        fontWeight: "400"
                      }}
                    >
                      {this.state.memo}
                    </TextPlan>
                  </TextInput>
                </View>
                <View style={{ paddingTop: 80, width: 112 }}>
                  <Button
                    title="アイコンを変更する"
                    type="clear"
                    titleStyle={{
                      color: "#a888",
                      fontSize: 12,
                      fontWeight: "600",
                      padding: 0
                    }}
                    buttonStyle={{
                      borderBottomWidth: 1,
                      borderBottomColor: "#888",
                      padding: 0
                    }}
                    containerStyle={{
                      padding: 0
                    }}
                    onPress={() => this.props.onIcons(this.state.title)}
                  />
                </View>
              </View>
            </View>
          </ScrollView>

          {Platform.OS === "ios" && (
            <InputAccessoryView nativeID={inputAccessoryViewID}>
              <View style={{ alignItems: "flex-end" }}>
                <Button
                  buttonStyle={{ width: 80, right: 0, borderRadius: 0 }}
                  onPress={() => Keyboard.dismiss()}
                  title="閉じる"
                />
              </View>
            </InputAccessoryView>
          )}
        </View>
      </SafeAreaView>
    );
  }
}

export default connectActionSheet(App);
