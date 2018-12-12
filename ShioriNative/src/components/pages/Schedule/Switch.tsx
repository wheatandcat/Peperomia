import React, { Component } from "react";
import { NavigationScreenProp, NavigationRoute } from "react-navigation";
import { Text, TouchableOpacity, View } from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { ItemProps } from "../../organisms/Schedule/Cards";
import EditSchedule from "../EditSchedule/Connected";
import SortableSchedule from "../SortableSchedule/Connected";
import Schedule from "./Connected";

interface State {
  scheduleId: number;
  title: string;
  items: ItemProps[];
  saveItems: ItemProps[];
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
      headerLeft: (
        <View style={{ left: 5 }}>
          {(() => {
            if (params.mode === "edit") {
              return (
                <TouchableOpacity
                  onPress={() => params.onShow()}
                  style={{ left: 5 }}
                >
                  <Text
                    style={{ fontSize: 16, fontWeight: "600", color: "red" }}
                  >
                    キャンセル
                  </Text>
                </TouchableOpacity>
              );
            }

            if (params.mode === "sort") {
              return (
                <TouchableOpacity
                  onPress={() => params.onEdit(params.items)}
                  style={{ left: 5 }}
                >
                  >
                  <Text
                    style={{
                      fontSize: 16,
                      fontWeight: "600",
                      color: "red"
                    }}
                  >
                    キャンセル
                  </Text>
                </TouchableOpacity>
              );
            }

            return (
              <TouchableOpacity
                onPress={() => navigation.goBack()}
                style={{ flex: 1, flexDirection: "row", marginTop: 10 }}
              >
                <MaterialCommunityIcons
                  name="chevron-left"
                  size={22}
                  color="#00bfff"
                />
                <Text
                  style={{
                    fontSize: 16,
                    fontWeight: "600",
                    color: "#00bfff",
                    marginTop: 3
                  }}
                >
                  マイプラン
                </Text>
              </TouchableOpacity>
            );
          })()}
        </View>
      ),
      headerRight: (
        <View style={{ right: 10 }}>
          {(() => {
            if (params.mode === "edit") {
              return (
                <TouchableOpacity onPress={() => params.onSort()}>
                  <Text
                    style={{
                      fontSize: 16,
                      fontWeight: "600",
                      color: "#00bfff"
                    }}
                  >
                    並び替え
                  </Text>
                </TouchableOpacity>
              );
            }

            if (params.mode === "sort") {
              return (
                <TouchableOpacity onPress={() => params.onSave()}>
                  >
                  <Text
                    style={{
                      fontSize: 16,
                      fontWeight: "600",
                      color: "#00bfff"
                    }}
                  >
                    保存
                  </Text>
                </TouchableOpacity>
              );
            }

            return (
              <TouchableOpacity onPress={() => params.onEdit(params.items)}>
                <Text style={{ fontSize: 16, fontWeight: "600" }}>編集</Text>
              </TouchableOpacity>
            );
          })()}
        </View>
      )
    };
  };

  state = { scheduleId: 0, title: "", items: [], saveItems: [], mode: "show" };

  componentDidMount() {
    this.props.navigation.setParams({
      onEdit: this.onEdit,
      onShow: this.onShow,
      onSort: this.onSort,
      onSave: this.onSave,
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

    this.props.navigation.setParams({
      mode: "edit"
    });
  };

  onShow = (): void => {
    this.setState({ mode: "show" });

    this.props.navigation.setParams({
      mode: "show"
    });
  };

  onSort = (): void => {
    this.setState({ mode: "sort" });

    this.props.navigation.setParams({
      mode: "sort"
    });
  };

  onSave = () => {
    this.setState({ items: this.state.saveItems });
    this.onEdit(this.state.saveItems);
  };

  onChangeItems = (data: ItemProps[]): void => {
    console.log(data);
    this.setState({ saveItems: data });
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

    if (this.state.mode === "sort") {
      return (
        <SortableSchedule
          items={this.state.items}
          onChangeItems={this.onChangeItems}
        />
      );
    }

    return <Schedule navigation={this.props.navigation} />;
  }
}
