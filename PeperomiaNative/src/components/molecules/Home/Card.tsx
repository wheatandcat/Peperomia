import React from 'react';
import { StyleSheet, View, Text, TouchableHighlight } from 'react-native';
import { Col, Row, Grid } from 'react-native-easy-grid';
import Color from 'color';
import { IconImage } from 'components/atoms';
import s from 'config/style';
import theme from 'config/theme';
import { KINDS } from 'peperomia-util';
import { ItemProps } from 'components/pages/Home/Connected';

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
      style={styles.root}
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
        <View style={styles.icon}>
          <IconImage
            src={config.src}
            name={config.name}
            opacity={1.0}
            size={60}
          />
        </View>
        <View style={styles.contents}>
          <Grid>
            <Row size={75}>
              <Col size={75} style={styles.titleContainer}>
                <Text numberOfLines={1} style={styles.title}>
                  {props.title}
                </Text>
              </Col>
            </Row>
            <Row size={25} style={styles.aboutContainer}>
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
  root: {
    margin: 3,
  },
  icon: {
    padding: 10,
  },
  contents: {
    flex: 1,
    padding: 10,
  },
  titleContainer: {
    paddingTop: 5,
  },
  aboutContainer: {
    paddingLeft: 2,
  },
});
