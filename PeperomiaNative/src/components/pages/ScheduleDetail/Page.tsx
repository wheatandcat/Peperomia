import React, { Component } from "react";
import { SafeAreaView, Alert, StatusBar } from "react-native";
import {
  ActionSheetProps,
  connectActionSheet
} from "@expo/react-native-action-sheet";
import Color from "color";
import GlobalStyles from "../../../GlobalStyles";
import { ItemDetail } from "../../../lib/db/itemDetail";
import { KINDS, KIND_DEFAULT } from "../../../lib/getKind";
import s from "../../../config/style";
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
    const kind = this.props.kind || KIND_DEFAULT;
    const config = KINDS[kind];
    const ss = s.schedule;
    const bc = Color(config.backgroundColor)
      .alpha(ss.backgroundColorAlpha)
      .toString();

    return (
      <>
        <StatusBar backgroundColor="#fff" barStyle="dark-content" />
        <SafeAreaView
          style={[GlobalStyles.droidSafeArea, { flex: 0, backgroundColor: bc }]}
        />
        <SafeAreaView style={{ flex: 1 }}>
          <Card {...this.props} onOpenActionSheet={this.onOpenActionSheet} />
        </SafeAreaView>
      </>
    );
  }
}

export default connectActionSheet(Page);
