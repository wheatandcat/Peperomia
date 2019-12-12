import React from "react";
import { View } from "react-native";
import EStyleSheet from "react-native-extended-stylesheet";
import Login from "./Login";
import Linked from "./Linked";

type Props = {
  loading: boolean;
  linked: boolean;
  onAmazonLogin: () => void;
};

export default (props: Props) => {
  return (
    <View style={styles.root}>
      {props.linked ? (
        <Linked />
      ) : (
        <Login loading={props.loading} onAmazonLogin={props.onAmazonLogin} />
      )}
    </View>
  );
};

const styles = EStyleSheet.create({
  root: {
    backgroundColor: "$background",
    height: "100%",
    width: "100%"
  }
});
