import React, { Component } from "react";
import { View } from "react-native";
import Cards, {
  Props as CardsProps
} from "../../organisms/SortableSchedule/Cards";

export interface Props extends CardsProps {
  onCreateScheduleDetail: () => void;
}

export default class extends Component<Props> {
  render() {
    return (
      <View style={{ backgroundColor: "#ffffff" }}>
        <View style={{ height: "100%", width: "100%" }}>
          <Cards data={this.props.data} />
        </View>

        <View
          style={{
            position: "absolute",
            bottom: 10,
            width: "100%",
            padding: 45
          }}
        />
      </View>
    );
  }
}
