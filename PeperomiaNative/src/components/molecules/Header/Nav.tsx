import React from "react";
import { View, Text, TouchableOpacity } from "react-native";
import { Col, Grid } from "react-native-easy-grid";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import theme from "../../../config/theme";

export interface Props {
  title: string;
  rightTitle: string;
  onPress: () => void;
}

export default (props: Props) => (
  <View
    style={{
      height: 50,
      borderBottomWidth: 1,
      borderColor: theme.color.lightGray
    }}
  >
    <Grid>
      <Col
        size={10}
        style={{ left: 20, justifyContent: "center", paddingTop: 5 }}
      >
        <MaterialCommunityIcons name="close" size={25} />
      </Col>
      <Col
        size={80}
        style={{
          justifyContent: "center",
          alignItems: "center"
        }}
      >
        <Text style={{ fontWeight: "600", fontSize: 20 }}>{props.title}</Text>
      </Col>
      <Col size={10} style={{ justifyContent: "center", right: 20 }}>
        <TouchableOpacity onPress={props.onPress}>
          <Text style={{ fontWeight: "600", fontSize: 18 }}>
            {props.rightTitle}
          </Text>
        </TouchableOpacity>
      </Col>
    </Grid>
  </View>
);
