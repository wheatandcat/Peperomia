import React, { Fragment } from "react";
import { View } from "react-native-ui-lib";
import styled from "styled-components/native";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import { Text } from "../../atoms";
import Header from "../ScheduleHeader/Header";

export interface ItemProps {
  id: string;
  kind: string;
  title: string;
  memo: string;
  onDismiss: () => void;
}

export interface Props {
  id: string;
  kind: string;
  title: string;
  memo: string;
  onDismiss: () => void;
  onOpenActionSheet: () => void;
}

export default (props: Props) => {
  return (
    <Fragment>
      <Header
        kind={props.kind}
        right={
          <MaterialCommunityIcons
            name="dots-horizontal"
            size={30}
            color="#ffffff"
            style={{ marginRight: 0, marginLeft: "auto" }}
          />
        }
        onClose={props.onDismiss}
      >
        <Title numberOfLines={1}>{props.title}</Title>
      </Header>

      <View style={{ padding: 15 }}>
        <Text style={{ fontSize: 15, lineHeight: 18 }}>{props.memo}</Text>
      </View>
    </Fragment>
  );
};

const Title = styled.Text`
  color: #ffffff;
  font-weight: 600;
  font-size: 20;
`;
