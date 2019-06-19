import React, { Component } from "react";
import { View, ScrollView, Text } from "react-native";
import { ListItem } from "react-native-elements";
import Spinner from "react-native-loading-spinner-overlay";

export interface Props {
  loading: boolean;
  LoadingText: string;
  email: string;
  onBackup: () => void;
  onRestore: () => void;
}

export default class extends Component<Props> {
  render() {
    return (
      <View style={{ backgroundColor: "#efefef", height: "100%" }}>
        <Spinner
          visible={this.props.loading}
          textContent={this.props.LoadingText}
          textStyle={{ color: "#fff" }}
        />
        <ScrollView>
          <View
            style={{
              height: 80,
              marginTop: 20,
              marginHorizontal: 10
            }}
          >
            <View
              style={{
                padding: 10,
                width: "100%",
                justifyContent: "center",
                backgroundColor: "#fff"
              }}
            >
              <Text>メールアドレス:</Text>
              <Text
                style={{
                  fontSize: 20,
                  fontWeight: "600"
                }}
              >
                {this.props.email}
              </Text>
            </View>
          </View>
          <ListItem
            title="バックアップを作成する"
            titleStyle={{ color: "#4169e1" }}
            onPress={this.props.onBackup}
            bottomDivider
          />
          <ListItem
            title="バックアップから復元する"
            titleStyle={{ color: "#4169e1" }}
            onPress={this.props.onRestore}
          />
        </ScrollView>
      </View>
    );
  }
}
