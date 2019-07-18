import React from "react";
import { View, TouchableOpacity, Text, StyleSheet } from "react-native";
import { Button, Divider } from "react-native-elements";
import { Ionicons } from "@expo/vector-icons";
import theme from "../../../config/theme";
import Memo from "./Memo";

export interface Props {
  title: string;
  place: string;
  url: string;
  memo: string;
  time: number;
  scrollView: any;
  onIcons: (title: string) => void;
  onChangeMemoInput: (name: string, value: string) => void;
  onOpenActionSheet: () => void;
}

export default (props: Props) => (
  <>
    <View
      style={{
        paddingHorizontal: 15,
        paddingTop: 15,
        paddingBottom: 5
      }}
    >
      <TouchableOpacity onPress={props.onOpenActionSheet}>
        <View style={styles.timeContainer}>
          <Ionicons
            name="md-time"
            color={theme.color.lightGreen}
            size={25}
            style={{ paddingTop: 3 }}
          />
          <Text style={styles.timeText}>{props.time}分</Text>
        </View>
      </TouchableOpacity>
    </View>
    <Divider />
    <View style={{ paddingTop: 10, paddingLeft: 10 }}>
      <Memo
        place={props.place}
        url={props.url}
        memo={props.memo}
        scrollViewRef={props.scrollView}
        onChangeInputText={props.onChangeMemoInput}
      />
    </View>
    <View style={{ paddingLeft: 12 }}>
      <View style={{ paddingTop: 40, width: 105 }}>
        <Button
          title="アイコンを変更する"
          type="clear"
          titleStyle={styles.linkTitle}
          buttonStyle={styles.linkButton}
          containerStyle={{
            padding: 0
          }}
          onPress={() => props.onIcons(props.title)}
        />
      </View>
    </View>
  </>
);

const styles = StyleSheet.create({
  timeContainer: {
    flexDirection: "row",
    alignItems: "center",
    width: 80,
    height: 30
  },
  timeText: {
    fontSize: 18,
    color: theme.color.darkGray,
    paddingHorizontal: 15
  },
  memoInput: {
    fontSize: 16,
    lineHeight: 24,
    fontWeight: "400",
    borderBottomWidth: 0.5,
    borderColor: "#5A6978"
  },
  memoText: {
    fontSize: 16,
    lineHeight: 24,
    fontWeight: "400"
  },
  linkTitle: {
    color: "#a888",
    fontSize: 12,
    fontWeight: "600",
    padding: 0
  },
  linkButton: {
    borderBottomWidth: 1,
    borderBottomColor: "#888",
    padding: 0
  }
});
