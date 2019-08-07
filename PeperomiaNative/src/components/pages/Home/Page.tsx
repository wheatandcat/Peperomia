import React from "react";
import { View, Text } from "react-native";
import Cards, { Props as CardsProps } from "../../organisms/Home/Cards";

export interface Props extends CardsProps {
  onCreate: () => void;
}

interface ItemProps extends Props {
  onDelete: (id: string) => void;
}

export default (props: ItemProps) => (
  <View
    style={{
      backgroundColor: "#fff"
    }}
  >
    <View style={{ height: "100%", paddingTop: 3 }}>
      {props.data.length > 0 ? (
        <Cards
          data={props.data}
          loading={false}
          onSchedule={props.onSchedule}
          onDelete={props.onDelete}
        />
      ) : (
        <View
          style={{
            flex: 1,
            justifyContent: "center",
            alignItems: "center"
          }}
        >
          {!props.loading && <Text>プランの登録はありません</Text>}
        </View>
      )}
    </View>
  </View>
);
