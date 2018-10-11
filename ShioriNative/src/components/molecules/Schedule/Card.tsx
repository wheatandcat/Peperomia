import React from "react";
import { View, Card, Text } from "react-native-ui-lib";
import { Col, Row, Grid } from "react-native-easy-grid";
import Ionicons from "react-native-vector-icons/FontAwesome";

export interface Props {
  id: string;
  title: string;
  afterMoveTime: string;
}

export default (props: Props) => (
  <View style={{ padding: 5 }}>
    <View
      style={{
        borderWidth: 0.5,
        borderColor: "#777777",
        borderRadius: 0,
        height: 100
      }}
      centerV
      centerH
    >
      <Grid>
        <Col size={10}>
          <Text text40 dark10 numberOfLines={1}>
            ①
          </Text>
        </Col>
        <Col size={75}>
          <View centerV centerH>
            <Text text40 dark10 numberOfLines={1}>
              {props.title}
            </Text>
          </View>
        </Col>
        <Col size={10}>
          <Grid>
            <Row>
              <Ionicons name="map-marker" size={30} />
            </Row>
            <Row>
              <Ionicons name="map-marker" size={30} />
            </Row>
          </Grid>
        </Col>
      </Grid>
    </View>
  </View>
);
