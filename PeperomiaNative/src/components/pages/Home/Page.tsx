import React, { Component } from "react";
import { View, Dialog, Button, Image } from "react-native-ui-lib";
import { Rating } from "react-native-elements";
import Cards, { Props as CardsProps } from "../../organisms/Home/Cards";
import EditButton from "../../atoms/EditButton";
import { Text } from "../../atoms";

export interface Props extends CardsProps {
  onCreate: () => void;
}

export default class extends Component<Props> {
  render() {
    return (
      <View>
        <Dialog visible width="80%" height="50%" centerH centerV>
          <View>
            <View
              style={{
                borderTopLeftRadius: 10,
                borderTopRightRadius: 10,
                padding: 25,
                height: "70%",
                backgroundColor: "#5BC062"
              }}
            >
              <View height={100} centerH>
                <Text style={{ color: "#ffffff", fontSize: 20 }}>
                  ペペロミア へ ようこそ！
                </Text>
              </View>
            </View>
            <View
              style={{
                backgroundColor: "#ffffff",
                height: "30%",
                borderBottomLeftRadius: 10,
                borderBottomRightRadius: 10,
                padding: 25
              }}
            >
              <Text>●</Text>
              <Rating
                type="star"
                startingValue={1}
                ratingCount={2}
                imageSize={15}
                ratingColor="#3498db"
                ratingBackgroundColor="#c8c7c8"
                readonly
                style={{ paddingVertical: 10 }}
              />
              <Button text60 label="次へ" backgroundColor="#5BC062" />
            </View>
          </View>
        </Dialog>

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
          <EditButton onPress={this.props.onCreate} testID="addSchedule" />
        </View>
      </View>
    );
  }
}
