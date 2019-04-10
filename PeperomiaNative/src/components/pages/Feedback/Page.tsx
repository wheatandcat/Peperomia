import React, { Component } from "react";
import {
  View,
  Text,
  TextInput,
  KeyboardAvoidingView,
  Image
} from "react-native";
import { Button, Overlay } from "react-native-elements";

interface Props {
  isOpen: boolean;
  loading: boolean;
  onFeedback: (message: string) => void;
  onClose: () => void;
}

interface State {
  message: string;
}

export default class extends Component<Props, State> {
  state = {
    message: ""
  };

  render() {
    return (
      <>
        <Overlay isVisible={this.props.isOpen} height={280}>
          <View style={{ alignItems: "center", justifyContent: "center" }}>
            <View style={{ padding: 15 }}>
              <Image
                source={require("../../../img/check.png")}
                style={{ height: 125, width: 125 }}
              />
            </View>
            <Text
              style={{
                fontSize: 15,
                fontWeight: "600",
                paddingVertical: 10,
                paddingHorizontal: 5
              }}
            >
              フィードバックありがとうございます！
            </Text>
            <View style={{ padding: 15 }}>
              <Button
                titleStyle={{ fontWeight: "500" }}
                title="閉じる"
                buttonStyle={{
                  borderRadius: 25,
                  paddingVertical: 8,
                  backgroundColor: "#77D353"
                }}
                containerStyle={{
                  width: 120
                }}
                onPress={this.props.onClose}
              />
            </View>
          </View>
        </Overlay>
        <View style={{ height: "100%", backgroundColor: "#eee" }}>
          <KeyboardAvoidingView behavior="padding">
            <View>
              <View style={{ backgroundColor: "#eee" }}>
                <Text
                  style={{
                    paddingHorizontal: 20,
                    paddingVertical: 10,
                    fontSize: 16,
                    lineHeight: 20
                  }}
                >
                  気になる点や不具合等があれば、こちらからフィードバックお願いします。
                </Text>
              </View>
              <View
                style={{
                  paddingTop: 5,
                  paddingHorizontal: 20,
                  height: 250,
                  backgroundColor: "#fff"
                }}
              >
                <TextInput
                  placeholder="フィードバックを書く"
                  multiline
                  style={{
                    fontSize: 16,
                    lineHeight: 24,
                    fontWeight: "400",

                    borderColor: "#5A6978"
                  }}
                  onChangeText={message => {
                    this.setState({
                      message
                    });
                  }}
                  testID="inputTextFeedbackMemo"
                  autoFocus
                >
                  <Text
                    style={{
                      fontSize: 16,
                      lineHeight: 24,
                      fontWeight: "400"
                    }}
                  >
                    {this.state.message}
                  </Text>
                </TextInput>
              </View>
              <Button
                title="フィードバックを送信する"
                titleStyle={{ fontWeight: "600" }}
                buttonStyle={{
                  borderRadius: 0,
                  paddingVertical: 15
                }}
                disabled={this.state.message === "" || this.props.loading}
                onPress={() => this.props.onFeedback(this.state.message)}
                loading={this.props.loading}
              />
            </View>
          </KeyboardAvoidingView>
        </View>
      </>
    );
  }
}
