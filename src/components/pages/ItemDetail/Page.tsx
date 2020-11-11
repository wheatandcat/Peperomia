import React, { FC, memo } from 'react';
import {
  View,
  Text,
  Linking,
  TouchableOpacity,
  Dimensions,
  StyleSheet,
  useWindowDimensions,
} from 'react-native';
import Toast from 'react-native-root-toast';
import EStyleSheet from 'react-native-extended-stylesheet';
import { ItemDetailQuery } from 'queries/api/index';
import Header from 'components/molecules/ScheduleHeader/Header';
import Label from 'components/molecules/ScheduleDetail/Label';
import ItemDetailWrap from 'components/organisms/ItemWrap/ItemDetailWrap';
import theme from 'config/theme';

type Props = {
  date: string;
  itemDetail: ItemDetailQuery['itemDetail'];
  onDismiss: () => void;
};

export type ScheduleDetailType = {
  onOpenActionSheet: () => void;
};

const handleClick = (url: string) => {
  Linking.canOpenURL(url).then((supported) => {
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

      setTimeout(function () {
        Toast.hide(toast);
      }, 3000);
    }
  });
};

const Page: FC<Props> = (props) => {
  const windowHeight = useWindowDimensions().height;

  return (
    <ItemDetailWrap
      date={props.date}
      title={props.itemDetail?.title || ''}
      kind={props.itemDetail?.kind || ''}
      rightIcon="more-horiz"
      onCloseKeyBoard={() => null}
      onRightPress={() => null}
      onDismiss={props.onDismiss}
    >
      <View style={[estyles.root, { minHeight: windowHeight }]}>
        <Header kind={props.itemDetail?.kind || ''}>
          <Text numberOfLines={1} style={styles.title}>
            {props.itemDetail?.title}
          </Text>
        </Header>

        <View>
          {Boolean(props.itemDetail?.place) && (
            <View style={styles.container}>
              <Label text="集合場所" icon="map-marker-outline" width={95} />

              <View style={styles.memoContainer}>
                <Text style={estyles.memoText}>{props.itemDetail?.place}</Text>
              </View>
            </View>
          )}

          {Boolean(props.itemDetail?.url) && (
            <View style={styles.container}>
              <Label text="URL" icon="link" width={70} />

              <View style={styles.memoContainer}>
                <TouchableOpacity
                  onPress={() => handleClick(props.itemDetail?.url || '')}
                >
                  <Text
                    style={[estyles.memoText, { color: theme().color.sky }]}
                    numberOfLines={1}
                  >
                    {props.itemDetail?.url}
                  </Text>
                </TouchableOpacity>
              </View>
            </View>
          )}

          {Boolean(props.itemDetail?.memo) && (
            <View style={styles.container}>
              <Label text="メモ" icon="file-document-box-outline" width={70} />

              <View style={styles.memoContainer}>
                <Text style={estyles.memoText}>{props.itemDetail?.memo}</Text>
              </View>
            </View>
          )}
        </View>
      </View>
      <View style={estyles.footer} />
    </ItemDetailWrap>
  );
};

export default memo(Page);

const estyles = EStyleSheet.create({
  root: {
    backgroundColor: '$background',
    flex: 1,
    width: '100%',
    height: '100%',
  },
  timeText: {
    fontSize: 18,
    color: '$text',
    paddingHorizontal: theme().space(3),
  },
  memoText: {
    fontSize: 16,
    lineHeight: 24,
    color: '$text',
  },
  footer: {
    width: '100%',
    height: '150%',
    backgroundColor: '$background',
  },
});

const styles = StyleSheet.create({
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    color: theme().color.darkGray,
  },
  memoContainer: {
    paddingTop: theme().space(2),
    paddingBottom: theme().space(3),
    paddingHorizontal: theme().space(1),
  },
  container: {
    paddingHorizontal: theme().space(3),
    paddingTop: theme().space(2),
  },
});
