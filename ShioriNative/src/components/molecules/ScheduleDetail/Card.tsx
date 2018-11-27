import React, { Fragment } from "react";
import { TouchableOpacity } from "react-native";
import { View } from "react-native-ui-lib";
import styled from "styled-components/native";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import { Text } from "../../atoms";
import Header from "../ScheduleHeader/Header";
import getKind from "../../../lib/getKind";

export interface ItemProps {
  id: string;
  title: string;
  memo: string;
  onDismiss: () => void;
}

export interface Props {
  id: string;
  title: string;
  memo: string;
  onDismiss: () => void;
  onOpenActionSheet: () => void;
}

export default (props: Props) => {
  return (
    <Fragment>
      <Header
        kind={getKind(props.title)}
        right={
          <TouchableOpacity onPress={props.onOpenActionSheet}>
            <MaterialCommunityIcons
              name="dots-horizontal"
              size={30}
              color="#ffffff"
              style={{ marginRight: 0, marginLeft: "auto" }}
            />
          </TouchableOpacity>
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
