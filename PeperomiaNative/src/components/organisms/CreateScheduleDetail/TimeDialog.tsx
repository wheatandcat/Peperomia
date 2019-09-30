import React from "react";
import { View, TextInput, Text, Platform } from "react-native";
import { Button, Overlay } from "react-native-elements";
import EStyleSheet from "react-native-extended-stylesheet";
import theme, { darkMode } from "../../../config/theme";

interface Props {
  open: boolean;
  onChange: (value: number) => void;
  onSetManualTime: () => void;
  onCloseManualTime: () => void;
}

export default (props: Props) => (
  <Overlay
    isVisible={props.open}
    height={Platform.OS === "ios" ? 220 : 245}
    width="90%"
    overlayStyle={{ paddingHorizontal: 0, paddingTop: 30 }}
    overlayBackgroundColor={
      darkMode() ? theme().color.black : theme().color.white
    }
  >
    <View style={styles.root}>
      <View>
        <Text style={styles.title}>時間を入力して下さい</Text>
      </View>

      <View
        style={{
          paddingTop: 30
        }}
      >
        <View style={{ flexDirection: "row", justifyContent: "center" }}>
          <TextInput
            keyboardType="numeric"
            style={styles.timeInput}
            defaultValue=""
            onChangeText={value => props.onChange(Number(value))}
            returnKeyType="done"
            maxLength={4}
            autoFocus
          />

          <View style={{ paddingTop: 5 }}>
            <Text style={styles.timeInputSuffix}>分</Text>
          </View>
        </View>
      </View>
      <View style={styles.fotter}>
        <Button
          title="キャンセル"
          type="clear"
          onPress={props.onCloseManualTime}
          containerStyle={{ paddingLeft: 30 }}
          titleStyle={styles.cancel}
        />
        <View>
          <Text
            style={{
              fontSize: 22,
              color: theme().color.lightGray
            }}
          >
            |
          </Text>
        </View>
        <Button
          title="設定"
          type="clear"
          onPress={props.onSetManualTime}
          containerStyle={{
            paddingRight: 50,
            width: 120
          }}
          titleStyle={styles.buttonText}
        />
      </View>
    </View>
  </Overlay>
);

const styles = EStyleSheet.create({
  root: {
    height: "100%",
    width: "100%",
    backgroundColor: "$background"
  },
  title: {
    fontSize: 20,
    fontWeight: "600",
    textAlign: "center",
    color: "$text"
  },
  timeInput: {
    width: 90,
    paddingRight: 10,
    textAlign: "right",
    fontSize: 24,
    borderBottomWidth: 1,
    color: "$text",
    borderColor: "$text"
  },
  timeInputSuffix: {
    paddingTop: 9,
    paddingLeft: 5,
    fontSize: 18,
    color: "$text"
  },
  fotter: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    width: "auto",
    marginTop: 50,
    paddingTop: 10,
    borderTopWidth: 0.5,
    borderColor: theme().color.lightGray
  },
  buttonText: {
    color: "$secondaryButton",
    fontWeight: "600"
  },
  cancel: {
    color: theme().color.gray,
    fontWeight: "600"
  }
});
