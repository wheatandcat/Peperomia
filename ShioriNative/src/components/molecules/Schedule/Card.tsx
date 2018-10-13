import React from "react";
import { View, Card, Text } from "react-native-ui-lib";
import { Col, Row, Grid } from "react-native-easy-grid";
import Ionicons from "react-native-vector-icons/MaterialCommunityIcons";

export interface Props {
  id: string;
  title: string;
  afterMoveTime: string;
}

export default (props: Props) => (
  <View
    style={{
      margin: 5,
      padding: 20,
      borderWidth: 0.5,
      borderColor: "#777777",
      borderRadius: 0,
      height: 120
    }}
    centerV
    centerH
  >
    <Grid>
      <Col
        size={10}
        style={{
          justifyContent: "center",
          alignItems: "center"
        }}
      >
        <Text text40 dark10 numberOfLines={1}>
          池袋駅
        </Text>
      </Col>
      <Col
        size={1}
        style={{
          justifyContent: "center",
          alignItems: "center"
        }}
      >
        <Row
          style={{
            justifyContent: "center",
            alignItems: "center"
          }}
        >
          <Ionicons name="note-outline" size={25} color="#000000" />
        </Row>
        <Row
          style={{
            justifyContent: "center",
            alignItems: "center"
          }}
        >
          <Ionicons name="map-marker" size={25} color="#000000" />
        </Row>
      </Col>
    </Grid>
  </View>
);
