import React from "react";
import { View, Dialog, Text } from "react-native-ui-lib";
import Cards, { Props as CardsProps } from "../../organisms/Home/Cards";
import EditButton from "../../atoms/EditButton";
import Guide from "../../organisms/Guide/Connected";

export interface Props extends CardsProps {
  guide: boolean;
  onCreate: () => void;
  onGuideFinish: () => void;
}

export default (props: Props) => (
  <View
    style={{
      backgroundColor: "#fff"
    }}
  >
    <Dialog visible={props.guide} width="80%" height="50%" centerH centerV>
      <Guide onFinish={props.onGuideFinish} />
    </Dialog>

    <View style={{ height: "100%", paddingTop: 3 }}>
      {props.data.length > 0 ? (
        <Cards
          data={props.data}
          loading={props.loading}
          onSchedule={props.onSchedule}
        />
      ) : (
        <View
          style={{
            flex: 1,
            justifyContent: "center",
            alignItems: "center"
          }}
        >
          <Text>プランの登録はありません</Text>
        </View>
      )}
    </View>
    <View
      style={{
        flex: 1,
        right: 0,
        position: "absolute",
        alignItems: "flex-end",
        paddingRight: 15,
        bottom: 20
      }}
    >
      <EditButton onPress={props.onCreate} testID="addSchedule" />
    </View>
  </View>
);
