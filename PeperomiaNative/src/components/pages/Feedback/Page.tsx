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
import EStyleSheet from "react-native-extended-stylesheet";
import { Button, Overlay } from "react-native-elements";
import theme, { darkMode } from "../../../config/theme";

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
        <Overlay
          isVisible={this.props.isOpen}
          height={280}
          overlayBackgroundColor={
            darkMode() ? theme().color.black : theme().color.white
          }
        >
          <View style={styles.dialogContainer}>
            <View style={{ padding: 15 }}>
              <Image
                source={
                  darkMode()
                    ? require("../../../img/check_dark.png")
                    : require("../../../img/check.png")
                }
                style={{ height: 125, width: 125 }}
              />
            </View>
            <Text style={styles.dialogText}>
              フィードバックありがとうございます！
            </Text>
            <View style={{ padding: 15 }}>
              <Button
                titleStyle={styles.dialogButonText}
                title="閉じる"
                buttonStyle={styles.dialogButon}
                containerStyle={{
                  width: 120
                }}
                type={darkMode() ? "outline" : "solid"}
                onPress={this.props.onClose}
              />
            </View>
          </View>
        </Overlay>
        <View style={styles.root}>
          <KeyboardAvoidingView behavior="padding">
            <View>
              <View style={styles.description}>
                <Text style={styles.descriptionText}>
                  気になる点や不具合等があれば、こちらからフィードバックお願いします。
                </Text>
              </View>
              <View style={styles.textInputContainer}>
                <TextInput
                  placeholder="フィードバックを書く"
                  placeholderTextColor={theme().mode.secondaryText}
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
                  <Text style={styles.inputText}>{this.state.message}</Text>
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

const styles = EStyleSheet.create({
  root: {
    backgroundColor: "$background",
    height: "100%"
  },
  description: {
    backgroundColor: "$secondaryBackground"
  },
  descriptionText: {
    paddingHorizontal: 20,
    paddingVertical: 10,
    fontSize: 16,
    lineHeight: 20,
    color: "$text"
  },
  textInputContainer: {
    paddingTop: 5,
    paddingHorizontal: 20,
    height: 250,
    backgroundColor: "$background"
  },
  inputText: {
    fontSize: 16,
    lineHeight: 24,
    fontWeight: "400",
    color: "$text"
  },
  dialogContainer: {
    backgroundColor: "$background",
    height: "100%",
    alignItems: "center",
    justifyContent: "center"
  },
  dialogText: {
    fontSize: 15,
    fontWeight: "600",
    paddingVertical: 10,
    paddingHorizontal: 5,
    color: "$text"
  },
  dialogButon: {
    borderRadius: 25,
    paddingVertical: 8,
    backgroundColor: "$button",
    borderColor: "$buttonBorder"
  },
  dialogButonText: {
    fontWeight: "500",
    color: theme().color.white
  }
});
