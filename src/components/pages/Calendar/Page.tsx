import React, { memo, useCallback } from 'react';
import { View, Text, FlatList, ListRenderItemInfo } from 'react-native';
import Header from 'components/organisms/Header/Header.tsx';
import { getKindData } from 'lib/kind';

type Props = {
  date: string;
  title: string;
  kind: string;
};
type Data = any;

const CalendarPage: React.FC<Props> = (props) => {
  const config = getKindData(props.kind);

  const renderItem = useCallback(({ item }: ListRenderItemInfo<Data>) => {
    console.log(item);

    return (
      <View>
        <Text>{item.id}</Text>
      </View>
    );
  }, []);

  return (
    <View>
      <FlatList
        keyExtractor={(_, index) => `search_${index}`}
        data={[{ id: 1 }]}
        renderItem={renderItem}
        ListHeaderComponent={
          <Header
            color={config.backgroundColor}
            date={props.date}
            title={props.title}
            kind={props.kind}
            onClose={() => {}}
          />
        }
        ListFooterComponent={
          <View>
            <Text>最後</Text>
          </View>
        }
      />
    </View>
  );
};

export default memo(CalendarPage);
