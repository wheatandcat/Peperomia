import React from "react";
import { View, Text, Image, Linking } from "react-native";
import { Button, Divider } from "react-native-elements";
import EStyleSheet from "react-native-extended-stylesheet";

type Props = {
  loading: boolean;
  linked: boolean;
  onAmazonLogin: () => void;
};

export default (props: Props) => {
  return (
    <View style={styles.root}>
      {props.linked ? (
        <View style={styles.textContainer}>
          <Divider />
          <Text style={styles.text}>連携済みです</Text>
          <Divider />
          <View style={styles.alexaSkillContainer}>
            <View style={styles.log}>
              <Image
                source={require("../../../img/alexa_skill.png")}
                style={{ height: 80, width: 80 }}
              />
            </View>
            <View style={styles.log}>
              <Button
                title="Alexa Skillを確認する"
                type="clear"
                onPress={() => Linking.openURL("https://peperomia.app/")}
              />
            </View>
          </View>
          <Divider />
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
};

const styles = EStyleSheet.create({
  root: {
    backgroundColor: "$background",
    height: "100%",
    width: "100%",
    alignItems: "center",
    justifyContent: "center"
  },
  textContainer: {
    width: "100%"
  },
  text: {
    color: "$text",
    fontSize: 18,
    fontWeight: "600",
    textAlign: "center",
    paddingVertical: 8
  },
  alexaSkillContainer: {
    flexDirection: "row",
    alignItems: "center"
  },
  log: {
    padding: 15
  }
});
