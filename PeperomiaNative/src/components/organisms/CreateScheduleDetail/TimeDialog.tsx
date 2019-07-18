import React from "react";
import { View, TextInput, Text, Platform, StyleSheet } from "react-native";
import { Button, Overlay } from "react-native-elements";
import theme from "../../../config/theme";

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
    overlayStyle={{ paddingHorizontal: 20, paddingTop: 30 }}
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
          title="設定する"
          type="outline"
          onPress={props.onSetManualTime}
          containerStyle={{
            paddingRight: 8,
            width: 120
          }}
          buttonStyle={styles.button}
          titleStyle={styles.buttonText}
        />
        <Button
          title="キャンセル"
          type="clear"
          onPress={props.onCloseManualTime}
          containerStyle={{ paddingLeft: 8 }}
          titleStyle={styles.cancel}
        />
      </View>
    </View>
  </Overlay>
);

const styles = StyleSheet.create({
  root: {
    height: "100%",
    width: "100%",
    backgroundColor: "#fff"
  },
  title: {
    fontSize: 20,
    fontWeight: "600",
    textAlign: "center"
  },
  timeInput: {
    width: 90,
    paddingRight: 10,
    textAlign: "right",
    fontSize: 24,
    borderBottomWidth: 1
  },
  timeInputSuffix: {
    paddingTop: 9,
    paddingLeft: 5,
    fontSize: 18
  },
  fotter: {
    flexDirection: "row",
    justifyContent: "center",
    width: "auto",
    paddingTop: 50
  },
  button: {
    borderWidth: 2,
    borderColor: theme.color.main
  },
  buttonText: {
    color: theme.color.main,
    fontWeight: "600"
  },
  cancel: {
    color: theme.color.main,
    fontWeight: "600"
  }
});
