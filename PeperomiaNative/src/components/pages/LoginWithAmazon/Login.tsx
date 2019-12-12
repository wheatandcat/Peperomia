import React from "react";
import { View, Image, Text } from "react-native";
import { Button, Divider } from "react-native-elements";
import EStyleSheet from "react-native-extended-stylesheet";

type Props = {
  loading: boolean;
  onAmazonLogin: () => void;
};

export default ({ loading, onAmazonLogin }: Props) => {
  return (
    <View style={styles.root}>
      <View style={styles.alexaSkillContainer}>
        <View style={styles.log}>
          <Image
            source={require("../../../img/alexa_skill.png")}
            style={{ height: 80, width: 80 }}
          />
        </View>
        <View>
          <Text style={styles.title}>ペペロミア with Alexaスキル</Text>
        </View>
      </View>
      <Divider />
      <View style={styles.description}>
        <Text style={styles.title}>
          ※こちらの機能はまだβ版です。{`\n`}
          {`\n`}
          ペペロミアの予定作成をAlexaスキルから行う事ができます。
        </Text>
      </View>
      <Divider />
      <View style={styles.buttonAction}>
        <Button
          title="Alexaスキルとアカウントをリンクする"
          onPress={onAmazonLogin}
          loading={loading}
          disabled={loading}
        />
      </View>
    </View>
  );
};

const styles = EStyleSheet.create({
  root: {
    backgroundColor: "$background",
    height: "100%",
    width: "100%"
  },
  alexaSkillContainer: {
    flexDirection: "row",
    alignItems: "center"
  },
  log: {
    padding: 15
  },
  title: {
    color: "$text",
    fontSize: 18
  },
  description: {
    padding: 15
  },
  text: {
    color: "$text"
  },
  buttonAction: {
    paddingHorizontal: 15,
    paddingVertical: 20
  }
});
