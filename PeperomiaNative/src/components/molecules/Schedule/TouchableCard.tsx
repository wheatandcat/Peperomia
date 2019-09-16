import React, { Fragment } from "react";
import { TouchableOpacity, View, Text, StyleSheet } from "react-native";
import Card from "./Card";
import { ItemDetail } from "../../../lib/db/itemDetail";
import theme from "../../../config/theme";

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
        testID={`ScheduleDetailID_${props.id}`}
      >
        <Card {...props} />
      </TouchableOpacity>
      {(() => {
        if (props.end) {
          return null;
        }

        return (
          <View style={{ padding: 15 }}>
            <Text style={styles.timeText}>
              {props.moveMinutes ? `${props.moveMinutes}分` : "-"}
            </Text>
          </View>
        );
      })()}
    </Fragment>
  );
};

const styles = StyleSheet.create({
  timeText: {
    fontWeight: "600",
    fontSize: 15,
    color: theme.mode.text
  }
});
