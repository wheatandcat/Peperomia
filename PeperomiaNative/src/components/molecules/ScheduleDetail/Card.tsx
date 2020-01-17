import React from 'react';
import {
  View,
  Text,
  Linking,
  TouchableOpacity,
  Dimensions,
} from 'react-native';
import EStyleSheet from 'react-native-extended-stylesheet';
import styled from 'styled-components/native';
import Toast from 'react-native-root-toast';
import { Ionicons } from '@expo/vector-icons';
import { Divider } from 'react-native-elements';
import Header from '../ScheduleHeader/Header';
import { SelectItemDetail } from '../../../domain/itemDetail';
import theme from '../../../config/theme';
import Label from './Label';

type Props = SelectItemDetail & {
  onDismiss: () => void;
  onOpenActionSheet: () => void;
};

const handleClick = (url: string) => {
  Linking.canOpenURL(url).then(supported => {
    if (supported) {
      Linking.openURL(url);
    } else {
      const { height } = Dimensions.get('window');

      const toast = Toast.show('無効なリンクです', {
        duration: Toast.durations.LONG,
        position: height - 150,
        shadow: true,
        animation: true,
        hideOnPress: true,
        textColor: theme().color.red,
        delay: 0,
      });

      setTimeout(function() {
        Toast.hide(toast);
      }, 3000);
    }
  });
};

export default (props: Props) => {
  return (
    <View style={styles.root}>
      <Header kind={props.kind}>
        <Title numberOfLines={1}>{props.title}</Title>
      </Header>

      <View>
        {(() => {
          if (props.moveMinutes === 0) {
            return null;
          }

          return (
            <>
              <View style={styles.timeContainer}>
                <Ionicons
                  name="md-time"
                  color={theme().color.lightGreen}
                  size={24}
                  style={styles.icon}
                />
                <Text style={styles.timeText}>{`${props.moveMinutes}分`}</Text>
              </View>
              <Divider style={styles.divider} />
            </>
          );
        })()}

        {Boolean(props.place) && (
          <View style={styles.container}>
            <Label text="集合場所" icon="map-marker-outline" width={95} />

            <View style={styles.memoContainer}>
              <Text style={styles.memoText}>{props.place}</Text>
            </View>
          </View>
        )}

        {Boolean(props.url) && (
          <View style={styles.container}>
            <Label text="URL" icon="link" width={70} />

            <View style={styles.memoContainer}>
              <TouchableOpacity onPress={() => handleClick(props.url)}>
                <Text
                  style={[styles.memoText, { color: theme().color.sky }]}
                  numberOfLines={1}
                >
                  {props.url}
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        )}

        {Boolean(props.memo) && (
          <View style={styles.container}>
            <Label text="メモ" icon="file-document-box-outline" width={70} />

            <View style={styles.memoContainer}>
              <Text style={styles.memoText}>{props.memo}</Text>
            </View>
          </View>
        )}
      </View>
    </View>
  );
};

const Title = styled.Text`
  color: ${theme().color.darkGray};
  font-weight: 600;
  font-size: 20;
`;

const styles = EStyleSheet.create({
  root: {
    height: '100%',
  },
  timeContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    width: 80,
    height: 30,
    paddingHorizontal: 20,
    paddingVertical: 15,
  },
  timeText: {
    fontSize: 18,
    color: '$text',
    paddingHorizontal: 15,
  },
  memoText: {
    fontSize: 16,
    lineHeight: 24,
    color: '$text',
  },
  memoContainer: {
    paddingTop: 5,
    paddingBottom: 10,
    paddingHorizontal: 2,
  },
  icon: {
    paddingTop: 3,
  },
  divider: {
    marginBottom: 8,
  },
  container: {
    paddingHorizontal: 18,
    paddingTop: 8,
  },
});
