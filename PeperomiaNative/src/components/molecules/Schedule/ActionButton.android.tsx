import React, { Component } from "react";
import { TouchableOpacity, View } from "react-native";
import {
  connectActionSheet,
  ActionSheetProps
} from "@expo/react-native-action-sheet";
import { Icon } from "react-native-elements";
import theme from "../../../config/theme";

type Props = ActionSheetProps & {
  onAdd: () => void;
  onSort: () => void;
  onDelete: () => void;
};

class Page extends Component<Props> {
  state = {
    search: ""
  };

  onOpenActionSheet = () => {
    this.props.showActionSheetWithOptions(
      {
        options: ["予定を追加する", "予定の順番を変える", "予定を削除する"],
        cancelButtonIndex: 3
      },
      buttonIndex => {
        if (buttonIndex === 0) {
          this.props.onAdd();
        }
        if (buttonIndex === 1) {
          this.props.onSort();
        }
        if (buttonIndex === 2) {
          this.props.onDelete();
        }
      }
    );
  };

  render() {
    return (
      <View>
        <TouchableOpacity onPress={this.onOpenActionSheet}>
          <Icon
            name="add"
            size={30}
            color={theme.color.lightGreen}
            raised
            reverse
          />
        </TouchableOpacity>
      </View>
    );
  }
}

export default connectActionSheet(Page);
