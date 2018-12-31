import React, { Component } from "react";
import { View } from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import { Button } from "react-native-elements";
import Cards, { Props as CardsProps } from "../../organisms/Home/Cards";
import { Text } from "../../atoms";

export interface Props extends CardsProps {
  onCreate: () => void;
}

export default class extends Component<Props> {
  render() {
    return (
      <View>
        <View style={{ height: "100%" }}>
          {this.props.data.length > 0 ? (
            <Cards
              data={this.props.data}
              loading={this.props.loading}
              onSchedule={this.props.onSchedule}
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
          <Button
            title=""
            icon={<MaterialIcons name="edit" size={45} color="#FFFFFF" />}
            buttonStyle={{
              backgroundColor: "#4DB6AC",
              width: 80,
              height: 80,
              borderColor: "transparent",
              borderWidth: 0,
              borderRadius: 45
            }}
            onPress={this.props.onCreate}
            testID="addSchedule"
          />
        </View>
      </View>
    );
  }
}
