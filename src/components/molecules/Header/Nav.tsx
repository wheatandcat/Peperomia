import React, { FC } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { Col, Grid } from 'react-native-easy-grid';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import EStyleSheet from 'react-native-extended-stylesheet';
import theme from 'config/theme';

type Props = {
  title: string;
  rightTitle: string;
  onPress: () => void;
};

const Nav: FC<Props> = (props) => (
  <View style={styles.root}>
    <Grid>
      <Col size={10} style={styles.close}>
        <MaterialCommunityIcons name="close" size={25} />
      </Col>
      <Col size={80} style={styles.titleContainer}>
        <Text style={styles.title}>{props.title}</Text>
      </Col>
      <Col size={10} style={styles.rightContainer}>
        <TouchableOpacity onPress={props.onPress}>
          <Text style={styles.rightTitle}>{props.rightTitle}</Text>
        </TouchableOpacity>
      </Col>
    </Grid>
  </View>
);

const styles = EStyleSheet.create({
  root: {
    height: 50,
    borderBottomWidth: 1,
    borderColor: theme().color.base.pale,
  },
  close: {
    left: 20,
    justifyContent: 'center',
    paddingTop: 5,
  },
  titleContainer: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontWeight: '600',
    fontSize: 20,
  },
  rightContainer: {
    justifyContent: 'center',
    right: 20,
  },
  rightTitle: {
    fontWeight: '600',
    fontSize: 18,
  },
});

export default Nav;
