import React, { Component } from "react";
import { SafeAreaView, Alert } from "react-native";
import {
  ActionSheetProps,
  connectActionSheet
} from "@expo/react-native-action-sheet";
import GlobalStyles from "../../../GlobalStyles";
import { ItemDetail } from "../../../lib/db/itemDetail";
import Card from "../../molecules/ScheduleDetail/Card";

export interface Props extends ItemDetail {
  onDismiss: () => void;
  onDelete: () => void;
  onCreateScheduleDetail: () => void;
}

class Page extends Component<Props & ActionSheetProps> {
  onOpenActionSheet = () => {
    this.props.showActionSheetWithOptions(
      {
        options: ["編集", "削除", "キャンセル"],
        destructiveButtonIndex: 1,
        cancelButtonIndex: 2
      },
      buttonIndex => {
        if (buttonIndex === 0) {
          this.props.onCreateScheduleDetail();
        }
        if (buttonIndex === 1) {
          Alert.alert(
            "削除しますか？",
            "",
            [
              {
                text: "キャンセル",
                onPress: () => {},
                style: "cancel"
              },
              {
                text: "削除する",
                onPress: () => {
                  this.props.onDelete();
                }
              }
            ],
            { cancelable: false }
          );
        }
      }
    );
  };

  render() {
    return (
      <SafeAreaView style={GlobalStyles.droidSafeArea}>
        <Card {...this.props} onOpenActionSheet={this.onOpenActionSheet} />
      </SafeAreaView>
    );
  }
}

export default connectActionSheet(Page);
