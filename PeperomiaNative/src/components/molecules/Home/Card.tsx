import React from "react";
import { StyleSheet, View, Text, TouchableOpacity } from "react-native";
import { Col, Row, Grid } from "react-native-easy-grid";
import Color from "color";
import s from "../../../config/style";
import theme from "../../../config/theme";
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
  const ss = s.schedule;

  return (
    <View
      style={{
        padding: 3
      }}
    >
      <TouchableOpacity
        onPress={() => props.onPress(props.id, props.title)}
        testID={props.testID}
      >
        <View
          style={[
            styles.card,
            {
              borderColor: Color(config.backgroundColor)
                .darken(ss.borderColorAlpha)
                .toString(),
              backgroundColor: Color(config.backgroundColor)
                .lighten(ss.backgroundColorAlpha)
                .toString()
            }
          ]}
        >
          <View style={{ padding: 10 }}>
            <IconImage {...config} opacity={1.0} size={60} />
          </View>
          <View style={{ flex: 1, padding: 10 }}>
            <Grid>
              <Row size={75}>
                <Col size={75} style={{ paddingTop: 5 }}>
                  <Text numberOfLines={1} style={styles.title}>
                    {props.title}
                  </Text>
                </Col>
              </Row>
              <Row size={25} style={{ paddingLeft: 2 }}>
                <Text numberOfLines={1} style={styles.about}>
                  {props.about}
                </Text>
              </Row>
            </Grid>
          </View>
        </View>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    height: 80,
    paddingLeft: 10,
    borderWidth: 0.5,
    borderRadius: 5
  },
  title: {
    fontWeight: "500",
    fontSize: 24,
    color: theme.color.darkGray
  },
  about: {
    fontSize: 10,
    color: theme.color.darkGray
  }
});
