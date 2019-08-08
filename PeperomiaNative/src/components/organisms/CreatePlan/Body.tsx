import React from "react";
import { View, StyleSheet } from "react-native";
import { Button } from "react-native-elements";
import theme from "../../../config/theme";

interface Props {
  onOpenActionSheet: () => void;
}

export default (props: Props) => {
  return (
    <>
      <View style={{ backgroundColor: theme.color.white, height: "100%" }}>
        <View style={{ paddingTop: 60, paddingLeft: 25 }}>
          <Button
            title="アイコンを変更する"
            type="clear"
            containerStyle={{
              width: 128
            }}
            titleStyle={{
              color: theme.color.darkGray,
              fontSize: 14,
              fontWeight: "600"
            }}
            buttonStyle={styles.linkButton}
            onPress={props.onOpenActionSheet}
          />
        </View>
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  createButton: {
    width: 330,
    height: 60,
    backgroundColor: theme.color.lightGreen,
    borderRadius: 15
  },
  linkButton: {
    borderBottomWidth: 1,
    borderBottomColor: theme.color.darkGray,
    padding: 0,
    paddingHorizontal: 5
  }
});
