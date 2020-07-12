import React from 'react';
import {
  TouchableOpacity,
  View,
  Text,
  Platform,
  StatusBar,
} from 'react-native';
import EStyleSheet from 'react-native-extended-stylesheet';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { getStatusBarHeight } from 'react-native-status-bar-height';
import theme from 'config/theme';

const top =
  Platform.OS === 'android' ? StatusBar.currentHeight : getStatusBarHeight();

type Props = {
  title: string;
  right: any;
  color: string;
  position?: string;
  onClose: () => void;
};

export default (props: Props) => {
  let style: any = {
    position: props.position || 'absolute',
    height: 60 + Number(top) / 2,
    width: '100%',
    zIndex: 10,
  };
  if (props.color !== 'none') {
    style = {
      ...style,
      backgroundColor: props.color,
    };
  }

  return (
    <View style={style}>
      <StatusBar
        backgroundColor={theme().color.white}
        barStyle="dark-content"
      />
      <View style={[styles.contents, { paddingTop: top }]}>
        <TouchableOpacity onPress={props.onClose}>
          <MaterialCommunityIcons
            name="close"
            size={30}
            color={theme().color.main}
          />
        </TouchableOpacity>
        <Text style={styles.title}>{props.title}</Text>
        <View style={styles.right}>{props.right}</View>
      </View>
    </View>
  );
};

const styles = EStyleSheet.create({
  contents: {
    paddingLeft: 15,
    flexDirection: 'row',
  },
  title: {
    fontSize: 20,
    paddingTop: 5,
    fontWeight: '600',
    color: theme().color.darkGray,
  },
  right: {
    marginRight: 15,
    marginLeft: 'auto',
  },
});
