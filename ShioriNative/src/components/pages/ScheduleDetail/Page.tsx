import React, { Component } from "react";
import { SafeAreaView } from "react-native";
import {
  ActionSheetProps,
  connectActionSheet
} from "@expo/react-native-action-sheet";
import Card from "../../molecules/ScheduleDetail/Card";

export interface Props {
  id: string;
  title: string;
  memo: string;
  moveMinutes: number;
  onDismiss: () => void;
  onCreateScheduleDetail: () => void;
}

class Page extends Component<Props & ActionSheetProps> {
  onOpenActionSheet = () => {
    this.props.showActionSheetWithOptions(
      {
        options: ["編集", "キャンセル"],
        cancelButtonIndex: 1
      },
      buttonIndex => {
        if (buttonIndex === 0) {
          this.props.onCreateScheduleDetail();
        }
      }
    );
  };
  render() {
    return (
      <SafeAreaView style={{ flex: 1 }}>
        <Card {...this.props} onOpenActionSheet={this.onOpenActionSheet} />
      </SafeAreaView>
    );
  }
}

export default connectActionSheet(Page);
