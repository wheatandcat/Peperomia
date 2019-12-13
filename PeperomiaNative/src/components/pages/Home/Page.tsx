import React from "react";
import { View, Text } from "react-native";
import EStyleSheet from "react-native-extended-stylesheet";
import Cards, { Props as CardsProps } from "../../organisms/Home/Cards";

export type Props = CardsProps & {
  onCreate: () => void;
};

type ItemProps = Props & {
  onDelete: (id: string) => void;
};

export default (props: ItemProps) => (
  <View style={styles.root}>
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
          {!props.loading && (
            <Text style={styles.notItems}>予定がありません</Text>
          )}
        </View>
      )}
    </View>
  </View>
);

const styles = EStyleSheet.create({
  root: {
    backgroundColor: "$background"
  },
  notItems: {
    color: "$text"
  }
});
