import React, { ReactElement } from 'react';
import {
  TouchableOpacity,
  View,
  Text,
  Platform,
  StatusBar,
  StyleSheet,
} from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { getStatusBarHeight } from 'react-native-status-bar-height';
import dayjs from 'dayjs';
import advancedFormat from 'dayjs/plugin/advancedFormat';
import 'dayjs/locale/ja';
import theme from 'config/theme';

dayjs.extend(advancedFormat);

const top =
  Platform.OS === 'android' ? StatusBar.currentHeight : getStatusBarHeight();

type Props = {
  date?: string;
  title: string;
  right: ReactElement;
  color: string;
  position?: string;
  onClose: () => void;
};

const Header: React.FC<Props> = (props) => {
  let style: Object = {
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
      <StatusBar backgroundColor={props.color} barStyle="dark-content" />
      <View style={[styles.contents, { paddingTop: top }]}>
        <TouchableOpacity onPress={props.onClose}>
          <MaterialCommunityIcons
            name="close"
            size={30}
            color={theme().color.main}
          />
        </TouchableOpacity>
        {(() => {
          if (props.title) {
            return (
              <Text style={styles.title}>
                {props.title}
                <Text style={styles.date}>
                  ({dayjs(props.date).format('YYYY年MM月DD日')})
                </Text>
              </Text>
            );
          }

          if (props.date) {
            return (
              <View style={styles.dateContainer}>
                <Text style={styles.date}>
                  {dayjs(props.date).format('YYYY年MM月DD日')}
                </Text>
              </View>
            );
          }

          return null;
        })()}
        <View style={styles.right}>{props.right}</View>
      </View>
    </View>
  );
};

export default Header;

const styles = StyleSheet.create({
  contents: {
    paddingLeft: theme().space(3),
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  dateContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    width: 320,
  },
  date: {
    fontSize: 12,
    fontWeight: '600',
    color: theme().color.darkGray,
  },
  title: {
    fontSize: 20,
    fontWeight: '600',
    color: theme().color.darkGray,
    textAlign: 'center',
  },

  right: {
    marginRight: theme().space(3),
    marginLeft: 'auto',
  },
});
