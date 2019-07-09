import React from "react";
import { StyleSheet, View, Text } from "react-native";
import styled from "styled-components/native";
import { Ionicons } from "@expo/vector-icons";
import { Divider } from "react-native-elements";
import Header from "../ScheduleHeader/Header";
import { ItemDetail } from "../../../lib/db/itemDetail";
import theme from "../../../config/theme";
import Label from "./Label";

export interface ItemProps extends ItemDetail {
  onDismiss: () => void;
}

export interface Props extends ItemProps {
  onOpenActionSheet: () => void;
}

export default (props: Props) => {
  return (
    <View>
      <Header kind={props.kind}>
        <Title numberOfLines={1}>{props.title}</Title>
      </Header>

      <View style={{ backgroundColor: "#fff" }}>
        {(() => {
          if (props.moveMinutes === 0) {
            return null;
          }

          return (
            <>
              <View style={{ paddingHorizontal: 20, paddingVertical: 15 }}>
                <View style={styles.timeContainer}>
                  <Ionicons
                    name="md-time"
                    color={theme.color.lightGreen}
                    size={24}
                    style={{ paddingTop: 3 }}
                  />
                  <Text
                    style={styles.timeText}
                  >{`${props.moveMinutes}分`}</Text>
                </View>
              </View>
              <Divider style={{ marginBottom: 8 }} />
            </>
          );
        })()}

        {Boolean(props.place) && (
          <View style={{ paddingHorizontal: 18, paddingTop: 8 }}>
            <Label text="集合場所" icon="map-marker-outline" width={95} />

            <View style={styles.memoContainer}>
              <Text style={styles.memoText}>{props.place}</Text>
            </View>
          </View>
        )}

        {Boolean(props.url) && (
          <View style={{ paddingHorizontal: 18, paddingTop: 8 }}>
            <Label text="URL" icon="link" width={70} />

            <View style={styles.memoContainer}>
              <Text style={styles.memoText}>{props.url}</Text>
            </View>
          </View>
        )}

        {Boolean(props.memo) && (
          <View style={{ paddingHorizontal: 18, paddingTop: 8 }}>
            <Label text="メモ" icon="file-document-box-outline" width={70} />

            <View style={styles.memoContainer}>
              <Text style={styles.memoText}>{props.memo}</Text>
            </View>
          </View>
        )}
      </View>
    </View>
  );
};

const Title = styled.Text`
  color: #555;
  font-weight: 600;
  font-size: 20;
`;

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
  memoText: {
    fontSize: 16,
    lineHeight: 24,
    color: theme.color.darkGray
  },
  memoContainer: {
    paddingTop: 5,
    paddingBottom: 10,
    paddingHorizontal: 2
  }
});
