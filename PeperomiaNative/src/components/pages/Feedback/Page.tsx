import React, { Component } from "react";
import {
  View,
  Text,
  TextInput,
  KeyboardAvoidingView,
  Image,
  Platform,
  InputAccessoryView,
  Keyboard
} from "react-native";
import { Button, Overlay } from "react-native-elements";
import theme from "../../../config/theme";

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
    const inputAccessoryViewID = "feedbackID";

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
                  backgroundColor: theme.color.blue
                }}
                containerStyle={{
                  width: 120
                }}
                onPress={this.props.onClose}
              />
            </View>
          </View>
        </Overlay>
        <View
          style={{ height: "100%", backgroundColor: theme.color.highLightGray }}
        >
          <KeyboardAvoidingView behavior="padding">
            <View>
              <View style={{ backgroundColor: theme.color.highLightGray }}>
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
                  backgroundColor: theme.color.white
                }}
              >
                <TextInput
                  placeholder="フィードバックを書く"
                  multiline
                  style={{
                    fontSize: 16,
                    lineHeight: 24,
                    fontWeight: "400"
                  }}
                  onChangeText={message => {
                    this.setState({
                      message
                    });
                  }}
                  testID="inputTextFeedbackMemo"
                  inputAccessoryViewID={inputAccessoryViewID}
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
      </>
    );
  }
}
