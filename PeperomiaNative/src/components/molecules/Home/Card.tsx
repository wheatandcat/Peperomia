import React from 'react';
import { StyleSheet, View, Text, TouchableHighlight } from 'react-native';
import { Col, Row, Grid } from 'react-native-easy-grid';
import Color from 'color';
import { IconImage } from 'primitive';
import s from '../../../config/style';
import theme from '../../../config/theme';
import { KINDS } from '../../../lib/getKind';
import { Item } from '../../../domain/item';

export type ItemProps = Item & {
  id: string;
  about: string;
};

type Props = ItemProps & {
  onPress: () => void;
  testID: string;
};

export default (props: Props) => {
  const config = KINDS[props.kind];
  const ss = s.schedule;

  return (
    <TouchableHighlight
      onPress={props.onPress}
      testID={props.testID}
      style={{
        margin: 3,
      }}
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
              .toString(),
          },
        ]}
      >
        <View style={{ padding: 10 }}>
          <IconImage
            src={config.src}
            name={config.name}
            opacity={1.0}
            size={60}
          />
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
    </TouchableHighlight>
  );
};

const styles = StyleSheet.create({
  card: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    height: 80,
    paddingLeft: 10,
    borderWidth: 0.5,
    borderRadius: 5,
  },
  title: {
    fontWeight: '500',
    fontSize: 24,
    color: theme().color.darkGray,
  },
  about: {
    fontSize: 10,
    color: theme().color.darkGray,
  },
});
