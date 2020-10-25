import React, { memo, useCallback } from 'react';
import { View, FlatList, ListRenderItemInfo, StyleSheet } from 'react-native';
import dayjs from 'dayjs';
import advancedFormat from 'dayjs/plugin/advancedFormat';
import 'dayjs/locale/ja';
import Header from 'components/organisms/Header/Header.tsx';
import { getKindData } from 'lib/kind';
import Card from 'components/organisms/Calendar/Card.tsx';
import Add from 'components/organisms/Calendar/Add.tsx';
import theme from 'config/theme';
import ItemWrap from 'components/organisms/ItemWrap/ItemWrap';
import { ConnectedType, CalendarType, ItemDetailType } from './Connected';

dayjs.extend(advancedFormat);

type Props = ConnectedType & {
  calendar: CalendarType;
};

type ItemDetailType2 = ItemDetailType & {
  add?: boolean;
};

type Item = {
  item1: ItemDetailType2;
  item2: ItemDetailType2;
};

const CalendarPage: React.FC<Props> = (props) => {
  const calendar = props.calendar;
  const itemDetails = calendar.item.itemDetails || [];

  const config = getKindData(calendar.item.kind || '');

  const renderItem = useCallback(({ item }: ListRenderItemInfo<Item>) => {
    return (
      <View style={styles.cards}>
        {(() => {
          if (item?.item1?.add) {
            return (
              <View style={styles.card1}>
                <Add onPress={() => null} />
              </View>
            );
          }

          if (item.item1) {
            return (
              <View style={styles.card1}>
                <Card {...item.item1} />
              </View>
            );
          }

          return null;
        })()}
        {(() => {
          if (item?.item2?.add) {
            return (
              <View style={styles.card2}>
                <Add onPress={() => null} />
              </View>
            );
          }

          if (item.item2) {
            return (
              <View style={styles.card2}>
                <Card {...item.item2} />
              </View>
            );
          }

          return null;
        })()}
      </View>
    );
  }, []);

  const listItem = [
    ...itemDetails,
    {
      add: true,
      id: 'add-item',
      title: '',
      kind: '',
    },
  ];

  const list1 = listItem.filter((_, index) => {
    return index % 2 === 0;
  });
  const list2 = listItem.filter((_, index) => {
    return index % 2 === 1;
  });

  const data = list1.map((_, index) => ({
    item1: list1[index] || null,
    item2: list2[index] || null,
  })) as Item[];

  return (
    <ItemWrap kind={calendar.item.kind || ''}>
      <FlatList<Item>
        keyExtractor={(_, index) => `card_${index}`}
        data={data}
        renderItem={renderItem}
        ListHeaderComponent={
          <View style={styles.header}>
            <Header
              color={config.backgroundColor}
              date={dayjs(calendar.date).format('YYYY年MM月DD日')}
              title={calendar.item.title || ''}
              kind={calendar.item.kind || ''}
              onClose={props.onDismiss}
            />
          </View>
        }
        ListFooterComponent={<View style={styles.footer} />}
        showsVerticalScrollIndicator={false}
        showsHorizontalScrollIndicator={false}
      />
    </ItemWrap>
  );
};

export default memo(CalendarPage);

const styles = StyleSheet.create({
  header: {
    paddingBottom: theme().space(2),
  },
  footer: {
    width: '100%',
    height: '100%',
    backgroundColor: theme().color.white,
  },
  cards: {
    width: '100%',
    flexDirection: 'row',
    backgroundColor: theme().color.white,
  },
  card1: {
    width: '50%',
    padding: theme().space(2),
    paddingRight: theme().space(2),
  },
  card2: {
    width: '50%',
    padding: theme().space(2),
    paddingRight: theme().space(2),
  },
});
