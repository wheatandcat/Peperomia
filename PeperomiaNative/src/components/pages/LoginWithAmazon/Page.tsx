import React from "react";
import { View, Text } from "react-native";
import { Button } from "react-native-elements";
import EStyleSheet from "react-native-extended-stylesheet";

type Props = {
  loading: boolean;
  linked: boolean;
  onAmazonLogin: () => void;
};

export default (props: Props) => (
  <View style={styles.root}>
    {props.linked ? (
      <View>
        <Text>連携済みです</Text>
      </View>
    ) : (
      <Button
        title="Alexaスキルとアカウントをリンクする"
        onPress={props.onAmazonLogin}
        loading={props.loading}
        disabled={props.loading}
      />
    )}
  </View>
);

const styles = EStyleSheet.create({
  root: {
    backgroundColor: "$background",
    height: "100%",
    width: "100%",
    alignItems: "center",
    justifyContent: "center"
  }
});
