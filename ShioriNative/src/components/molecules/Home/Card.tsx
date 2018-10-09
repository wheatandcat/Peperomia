import React from "react";
import { View, Card, Text } from "react-native-ui-lib";
import { Col, Row, Grid } from "react-native-easy-grid";
import Ionicons from "react-native-vector-icons/Ionicons";

export interface Props {
  id: string;
  title: string;
  about: string;
}

export default (props: Props) => (
  <View style={{ padding: 5 }}>
    <Card
      row
      height={80}
      style={{
        borderWidth: 0.5,
        borderColor: "#777777",
        justifyContent: "center",
        alignItems: "center"
      }}
      containerStyle={{
        borderRadius: 0
      }}
      onPress={() => {}}
    >
      <Card.Image
        width={80}
        height={80}
        imageSource={require("../../../img/world.png")}
        style={{ padding: 5 }}
      />
      <Card.Section body style={{ padding: 10 }}>
        <Grid>
          <Row size={90}>
            <Col size={75}>
              <Text text40 dark10 numberOfLines={1}>
                {props.title}
              </Text>
            </Col>
            <Col size={10}>
              <Ionicons name="ios-arrow-forward" size={30} color="#c2c2c2" />
            </Col>
          </Row>
          <Row size={25}>
            <Text text80 dark50 numberOfLines={1}>
              {props.about}
            </Text>
          </Row>
        </Grid>
      </Card.Section>
    </Card>
  </View>
);
