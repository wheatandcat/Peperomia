import React, { Component } from "react";
import {
  View,
  TextInput,
  TouchableOpacity,
  Text as TextPlan
} from "react-native";
import {
  ActionSheetProps,
  connectActionSheet
} from "@expo/react-native-action-sheet";
import { Ionicons, MaterialIcons } from "@expo/vector-icons";
import Header from "../../molecules/ScheduleHeader/Header";
import { Text } from "../../atoms";

export interface Props {
  memo: string;
}

class App extends Component<Props & ActionSheetProps> {
  state = {
    text: ""
  };
  onOpenActionSheet = () => {
    let options = ["0分", "10分", "30分", "60分", "手動で設定", "キャンセル"];
    let cancelButtonIndex = options.length - 1;
    this.props.showActionSheetWithOptions(
      {
        options,
        cancelButtonIndex
      },
      buttonIndex => {
        // Do something here depending on the button index selected
      }
    );
  };
  render() {
    return (
      <View style={{ backgroundColor: "#ffffff" }}>
        <Header
          kind="train"
          right={
            <Text style={{ fontSize: 18, fontWeight: "500", color: "#ffffff" }}>
              保存
            </Text>
          }
          onClose={() => {}}
        >
          <TextInput
            placeholder="タイトルを入力"
            placeholderTextColor="#ffffff"
            style={{
              fontSize: 20,
              fontWeight: "600",
              color: "#ffffff",
              paddingLeft: 1
            }}
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
                width: 100,
                height: 30
              }}
            >
              <Ionicons name="md-time" color="#5A6978" size={24} />
              <Text
                style={{
                  fontSize: 16,
                  fontWeight: "500",
                  color: "#00A6FF",
                  paddingHorizontal: 15,
                  paddingTop: 3
                }}
              >
                未設定
              </Text>
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
                onChangeText={text => {
                  this.setState({ text });
                }}
              >
                <TextPlan
                  style={{
                    fontSize: 16,
                    lineHeight: 24,
                    fontWeight: "400"
                  }}
                >
                  {this.state.text}
                </TextPlan>
              </TextInput>
            </View>
          </View>
        </View>
      </View>
    );
  }
}

export default connectActionSheet(App);
