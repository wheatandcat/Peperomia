import React, { Component } from "react";
import {
  View,
  TextInput,
  TouchableOpacity,
  Text as TextPlan,
  SafeAreaView,
  Alert
} from "react-native";
import {
  ActionSheetProps,
  connectActionSheet
} from "@expo/react-native-action-sheet";
import { Button } from "react-native-elements";
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
    time: this.props.time
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

  render() {
    return (
      <SafeAreaView style={{ flex: 1 }}>
        <View
          style={{ backgroundColor: "#ffffff", height: "100%", width: "100%" }}
        >
          <Header
            kind={this.props.iconSelected ? this.props.kind : this.state.kind}
            right={
              <TouchableOpacity
                onPress={() =>
                  this.props.onSave(
                    this.state.title,
                    this.props.iconSelected ? this.props.kind : this.state.kind,
                    this.state.memo,
                    this.state.time
                  )
                }
                testID="saveScheduleDetail"
              >
                <TextPlan
                  style={{ fontSize: 18, fontWeight: "500", color: "#555" }}
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
            />
          </Header>
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
                >
                  <TextPlan
                    style={{ fontSize: 16, lineHeight: 24, fontWeight: "400" }}
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
        </View>
      </SafeAreaView>
    );
  }
}

export default connectActionSheet(App);
