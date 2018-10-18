import React, { Component } from "react";
import Card, { Props as CardProps } from "./Card";
// @ts-ignore
import ActionSheet from "react-native-actionsheet";

export interface Props extends CardProps {
  showActionSheetWithOptions: any;
}

@ActionSheet.connectActionSheet
class Sheet extends Component<Props> {
  render() {
    return <Card {...this.props} onOpenActionSheet={this.onOpenActionSheet} />;
  }

  onOpenActionSheet = () => {
    let options = ["削除", "キャンセル"];
    let destructiveButtonIndex = 0;
    let cancelButtonIndex = 1;
    this.props.showActionSheetWithOptions(
      {
        options,
        cancelButtonIndex,
        destructiveButtonIndex
      },
      (buttonIndex: any) => {
        console.log(buttonIndex);
      }
    );
  };
}

export default Sheet;
