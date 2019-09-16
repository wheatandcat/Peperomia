import React, { Component } from "react";
import { View, ScrollView, Platform, StyleSheet } from "react-native";
import { Input, ListItem, Divider } from "react-native-elements";
import { MaterialIcons } from "@expo/vector-icons";
import {
  ActionSheetOptions,
  connectActionSheet
} from "@expo/react-native-action-sheet";
import { IconImage } from "primitive";
import { KINDS } from "../../../lib/getKind";
import { whenIPhoneSE } from "../../../lib/responsive";
import theme, { darkMode } from "../../../config/theme";

type PropsBase = {
  kind: string;
  defaultIcon: boolean;
  photo: boolean;
  onSelectIcon: (kind: string) => void;
  onPhoto: () => void;
  onCamera: () => void;
};

export type Props = PropsBase & {
  showActionSheetWithOptions: (
    optons: ActionSheetOptions,
    callback: (buttonIndex: number) => void
  ) => void;
};

export interface State {
  search: string;
}

class Page extends Component<Props, State> {
  state = {
    search: ""
  };

  onOpenActionSheet = () => {
    this.props.showActionSheetWithOptions(
      {
        options: ["写真を撮影する", "フォトライブラリー", "キャンセル"],
        cancelButtonIndex: 2
      },
      buttonIndex => {
        if (buttonIndex === 0) {
          this.props.onCamera();
        }
        if (buttonIndex === 1) {
          this.props.onPhoto();
        }
      }
    );
  };

  render() {
    const items = Object.entries(KINDS)
      .map(([key, value]) => ({
        kind: key,
        ...value
      }))
      .filter((item: any) => {
        if (this.state.search === "") {
          return true;
        }

        return (
          item.name.includes(this.state.search) ||
          item.kind.includes(this.state.search)
        );
      });

    return (
      <View style={styles.root}>
        <Divider />
        <View style={styles.searchContainer}>
          <Input
            placeholder="検索"
            placeholderTextColor={theme.mode.secondaryText}
            leftIcon={{
              type: "MaterialIcons",
              name: "search",
              color: theme.mode.icon
            }}
            inputContainerStyle={styles.searchInputContainer}
            leftIconContainerStyle={{
              marginRight: 20
            }}
            containerStyle={{
              paddingTop: Platform.OS === "ios" ? 0 : 5
            }}
            onChangeText={text => this.setState({ search: text })}
          />
        </View>

        <ScrollView
          style={{
            width: "100%",
            height: "100%",
            paddingLeft: 15
          }}
        >
          <View style={{ paddingBottom: 150 }}>
            {items.map((item: any, i: number) => (
              <ListItem
                containerStyle={{
                  backgroundColor: theme.mode.background
                }}
                key={i}
                title={
                  !this.props.defaultIcon && item.name === "地球"
                    ? "アイコンなし"
                    : item.name
                }
                titleStyle={{
                  color: theme.mode.text
                }}
                onPress={() => this.props.onSelectIcon(item.kind)}
                leftIcon={
                  <IconImage
                    src={darkMode() ? item.reversal.src : item.src}
                    name={item.name}
                    size={20}
                    opacity={1.0}
                    defaultIcon={this.props.defaultIcon}
                  />
                }
                rightIcon={
                  <View>
                    {this.props.kind === item.kind ? (
                      <MaterialIcons
                        name="check"
                        color={
                          darkMode()
                            ? theme.color.highLightGray
                            : theme.color.main
                        }
                        size={20}
                        style={{ paddingRight: 5 }}
                      />
                    ) : null}
                  </View>
                }
                bottomDivider
              />
            ))}
          </View>
        </ScrollView>
      </View>
    );
  }
}

export default connectActionSheet<PropsBase>(Page);

const styles = StyleSheet.create({
  root: {
    backgroundColor: theme.mode.background
  },
  searchContainer: {
    paddingTop: 5,
    paddingHorizontal: 10,
    height: Platform.OS === "ios" ? whenIPhoneSE(40, 55) : 40,
    backgroundColor: theme.mode.background,
    alignItems: "center"
  },
  searchInputContainer: {
    backgroundColor: darkMode()
      ? theme.color.darkGray
      : theme.color.highLightGray,
    borderBottomWidth: 0,
    borderRadius: 10,
    height: Platform.OS === "ios" ? whenIPhoneSE(30, 45) : 30
  }
});
