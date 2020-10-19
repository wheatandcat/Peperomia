import React, { memo, useCallback } from 'react';
import { View, FlatList, ListRenderItemInfo, StyleSheet } from 'react-native';
import Header from 'components/organisms/Header/Header.tsx';
import { getKindData } from 'lib/kind';
import Card from 'components/organisms/Calendar/Card.tsx';
import Add from 'components/organisms/Calendar/Add.tsx';
import { SelectItem } from 'domain/item';

type Props = {
  date: string;
  title: string;
  kind: string;
  data: SelectItem[];
};

type SelectItem2 = SelectItem & {
  add?: boolean;
};

type Item = {
  item1: SelectItem2;
  item2: SelectItem2;
};

const CalendarPage: React.FC<Props> = (props) => {
  const config = getKindData(props.kind);

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

          if (item.item1) {
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
    ...props.data,
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
  }));

  console.log(data);

  return (
    <View>
      <FlatList
        keyExtractor={(_, index) => `card_${index}`}
        data={data}
        renderItem={renderItem}
        ListHeaderComponent={
          <View style={styles.header}>
            <Header
              color={config.backgroundColor}
              date={props.date}
              title={props.title}
              kind={props.kind}
              onClose={() => {}}
            />
          </View>
        }
        showsVerticalScrollIndicator={false}
        showsHorizontalScrollIndicator={false}
      />
    </View>
  );
};

export default memo(CalendarPage);

const styles = StyleSheet.create({
  header: {
    paddingBottom: 10,
  },
  cards: {
    width: '100%',
    flexDirection: 'row',
  },
  card1: {
    width: '50%',
    padding: 15,
    paddingRight: 10,
  },
  card2: {
    width: '50%',
    padding: 15,
    paddingLeft: 10,
  },
});
