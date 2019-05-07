import React, { Fragment } from "react";
import { TouchableOpacity } from "react-native";
import { View, Text } from "react-native-ui-lib";
import Card from "./Card";
import { ItemDetail } from "../../../lib/db/itemDetail";

export interface ItemProps extends ItemDetail {
  end: boolean;
}

export interface Props extends ItemProps {
  onPress: () => void;
}

export default (props: Props) => {
  return (
    <Fragment>
      <TouchableOpacity
        onPress={props.onPress}
        testID={`scheduleItemDetailId_${props.id}`}
      >
        <Card {...props} />
      </TouchableOpacity>
      {(() => {
        if (props.end) {
          return null;
        }

        return (
          <View style={{ padding: 15 }}>
            <Text text25 style={{ fontWeight: "600" }}>
              {props.moveMinutes ? `${props.moveMinutes}分` : "-"}
            </Text>
          </View>
        );
      })()}
    </Fragment>
  );
};
