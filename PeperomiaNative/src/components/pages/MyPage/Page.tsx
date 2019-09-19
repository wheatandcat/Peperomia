import React, { Component } from "react";
import { View, ScrollView, Text } from "react-native";
import EStyleSheet from "react-native-extended-stylesheet";
import { ListItem } from "react-native-elements";
import Spinner from "react-native-loading-spinner-overlay";
import theme from "../../../config/theme";

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
      <View style={styles.root}>
        <Spinner
          visible={this.props.loading}
          textContent={this.props.LoadingText}
          textStyle={{ color: theme().color.white }}
        />
        <ScrollView>
          <View
            style={{
              height: 80,
              marginTop: 20,
              marginHorizontal: 10
            }}
          >
            <View style={styles.emailContainer}>
              <Text style={styles.emialTitle}>メールアドレス:</Text>
              <Text style={styles.emial}>{this.props.email}</Text>
            </View>
          </View>
          <ListItem
            title="バックアップを作成する"
            titleStyle={styles.menuText}
            containerStyle={styles.menuContainer}
            onPress={this.props.onBackup}
            bottomDivider
          />
          <ListItem
            title="バックアップから復元する"
            titleStyle={styles.menuText}
            containerStyle={styles.menuContainer}
            onPress={this.props.onRestore}
          />
        </ScrollView>
      </View>
    );
  }
}

const styles = EStyleSheet.create({
  root: {
    backgroundColor: "$settingRoot",
    height: "100%"
  },
  emailContainer: {
    padding: 10,
    width: "100%",
    justifyContent: "center",
    backgroundColor: "$settingMenu"
  },
  emialTitle: {
    color: "$text"
  },
  emial: {
    fontSize: 20,
    fontWeight: "600",
    color: "$text"
  },
  menuContainer: {
    backgroundColor: "$settingMenu"
  },
  menuText: {
    color: "$text"
  }
});
