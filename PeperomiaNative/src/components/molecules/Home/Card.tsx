import React from "react";
import { View, Card, Text } from "react-native-ui-lib";
import { Col, Row, Grid } from "react-native-easy-grid";
import Color from "color";
import { KINDS } from "../../../lib/getKind";
import { IconImage } from "../../atoms";

export interface ItemProps {
  id: string;
  title: string;
  kind: string;
  image: string;
  about: string;
}

export interface Props extends ItemProps {
  onPress: (id: string, title: string) => void;
  testID: string;
}

export default (props: Props) => {
  const config = KINDS[props.kind];

  return (
    <View
      style={{
        padding: 3
      }}
    >
      <Card
        row
        height={80}
        borderRadius={5}
        enableShadow={false}
        containerStyle={{
          borderWidth: 0.5,
          borderColor: Color(config.backgroundColor)
            .alpha(0.5)
            .toString(),
          justifyContent: "center",
          alignItems: "center",
          backgroundColor: Color(config.backgroundColor)
            .alpha(0.2)
            .toString()
        }}
        onPress={() => props.onPress(props.id, props.title)}
        testID={props.testID}
      >
        <View style={{ padding: 10 }}>
          <IconImage {...config} opacity={0.9} size={60} />
        </View>
        <View padding-10 flex>
          <Grid>
            <Row size={75}>
              <Col size={75} style={{ paddingTop: 5 }}>
                <Text
                  numberOfLines={1}
                  style={{ fontWeight: "500", fontSize: 24, color: "#555" }}
                >
                  {props.title}
                </Text>
              </Col>
            </Row>
            <Row size={25} style={{ paddingLeft: 2 }}>
              <Text numberOfLines={1} style={{ fontSize: 10, color: "#555" }}>
                {props.about}
              </Text>
            </Row>
          </Grid>
        </View>
      </Card>
    </View>
  );
};
