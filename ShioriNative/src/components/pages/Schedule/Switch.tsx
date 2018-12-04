import React, { Component } from "react";
import { NavigationScreenProp, NavigationRoute } from "react-navigation";
import { Text, TouchableOpacity, View } from "react-native";
import { ItemProps } from "../../organisms/Schedule/Cards";
import EditSchedule from "../EditSchedule/Connected";
import Schedule from "./Connected";

interface State {
  scheduleId: number;
  title: string;
  items: ItemProps[];
  mode: string;
}

interface Props {
  navigation: NavigationScreenProp<NavigationRoute>;
}

export default class extends Component<Props, State> {
  static navigationOptions = ({ navigation }: { navigation: any }) => {
    const { params = {} } = navigation.state;
    return {
      title: params.title,
      headerRight: (
        <View style={{ right: 10 }}>
          {params.mode === "edit" ? (
            <TouchableOpacity onPress={() => params.onShow()}>
              <Text style={{ fontSize: 16, fontWeight: "600" }}>戻る</Text>
            </TouchableOpacity>
          ) : (
            <TouchableOpacity onPress={() => params.onEdit(params.items)}>
              <Text style={{ fontSize: 16, fontWeight: "600" }}>編集</Text>
            </TouchableOpacity>
          )}
        </View>
      )
    };
  };

  state = {
    scheduleId: 0,
    title: "",
    items: [],
    mode: "show"
  };

  componentDidMount() {
    this.props.navigation.setParams({
      onEdit: this.onEdit,
      onShow: this.onShow,
      mode: "show"
    });
  }

  onEdit = (items: ItemProps[]): void => {
    const scheduleId = this.props.navigation.getParam("scheduleId", "1");

    this.setState({
      scheduleId,
      items,
      mode: "edit"
    });

    this.props.navigation.setParams({ mode: "edit" });
  };

  onShow = (): void => {
    this.setState({
      mode: "show"
    });

    this.props.navigation.setParams({ mode: "show" });
  };

  render() {
    if (this.state.mode === "edit") {
      return (
        <EditSchedule
          title={this.state.title}
          items={this.state.items}
          navigation={this.props.navigation}
          onShow={this.onShow}
        />
      );
    }

    return <Schedule navigation={this.props.navigation} />;
  }
}
