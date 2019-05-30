import React, { Component } from "react";
import { View, Text, StyleSheet, Image } from "react-native";
import { Button } from "react-native-elements";

export interface Props {
  onGoogleLogin: () => void;
}

export default class extends Component<Props> {
  render() {
    return (
      <View style={styles.container}>
        <View style={styles.titleContainer}>
          <Text>ユーザー登録 / ログインする</Text>
        </View>
        <View style={styles.buttonContainer}>
          <Button
            title="Googleアカウントでログイン"
            titleStyle={styles.buttonTitleStyle}
            buttonStyle={styles.buttonStyle}
            onPress={this.props.onGoogleLogin}
          />
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    backgroundColor: "#efefef",
    height: "100%"
  },
  titleContainer: {
    paddingTop: 30,
    paddingBottom: 10
  },
  buttonContainer: {
    marginVertical: 30
  },
  buttonTitleStyle: {
    padding: 15
  },
  buttonStyle: {
    backgroundColor: "#cd5c5c",
    borderColor: "transparent"
  }
});
