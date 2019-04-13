import React, { Fragment } from "react";
import { TouchableOpacity } from "react-native";
import { View, Text as TextPlan } from "react-native-ui-lib";
import styled from "styled-components/native";
import {
  Ionicons,
  MaterialCommunityIcons,
  MaterialIcons
} from "@expo/vector-icons";
import Header from "../ScheduleHeader/Header";
import getKind from "../../../lib/getKind";
import { ItemDetail } from "../../../lib/db/itemDetail";

export interface ItemProps extends ItemDetail {
  onDismiss: () => void;
}

export interface Props extends ItemProps {
  onOpenActionSheet: () => void;
}

export default (props: Props) => {
  return (
    <Fragment>
      <Header
        kind={props.kind}
        right={
          <TouchableOpacity onPress={props.onOpenActionSheet}>
            <MaterialCommunityIcons
              name="dots-vertical"
              size={26}
              color="#555"
              style={{ marginRight: 0, marginLeft: "auto" }}
            />
          </TouchableOpacity>
        }
        onClose={props.onDismiss}
      >
        <Title numberOfLines={1}>{props.title}</Title>
      </Header>

      {(() => {
        if (props.moveMinutes === 0) {
          return null;
        }

        return (
          <View style={{ padding: 20 }}>
            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
                width: 80,
                height: 30
              }}
            >
              <Ionicons
                name="md-time"
                color="#5A6978"
                size={24}
                style={{ paddingTop: 3 }}
              />
              <TextPlan
                style={{
                  fontSize: 16,
                  fontWeight: "500",
                  color: "#00A6FF",
                  paddingHorizontal: 15
                }}
              >
                {`${props.moveMinutes}分`}
              </TextPlan>
            </View>
          </View>
        );
      })()}

      {(() => {
        if (props.memo === "") {
          return null;
        }

        return (
          <View style={{ padding: 20, paddingTop: 8 }}>
            <MaterialIcons name="edit" color="#00A6FF" size={25} />
            <View style={{ paddingTop: 10 }}>
              <TextPlan
                style={{ fontSize: 16, lineHeight: 24, fontWeight: "400" }}
              >
                {props.memo}
              </TextPlan>
            </View>
          </View>
        );
      })()}
    </Fragment>
  );
};

const Title = styled.Text`
  color: #555;
  font-weight: 600;
  font-size: 20;
`;
