import React, { Component } from "react";
import {
  View,
  Text,
  RefreshControl,
  StyleSheet,
  TouchableOpacity,
  Alert
} from "react-native";
import { SwipeListView } from "react-native-swipe-list-view";
import theme from "../../../config/theme";
import Card, { ItemProps as CardProps } from "../../molecules/Home/Card";

export interface Props {
  data: CardProps[];
  loading: boolean;
  onSchedule: (id: string, title: string) => void;
  onDelete: (id: string) => void;
}

export default class extends Component<Props> {
  onDelete = (item: CardProps) => {
    Alert.alert(
      "削除しますか？",
      "",
      [
        {
          text: "キャンセル",
          style: "cancel"
        },
        {
          text: "削除する",
          onPress: () => {
            this.props.onDelete(item.id);
          }
        }
      ],
      { cancelable: false }
    );
  };

  render() {
    return (
      <View>
        <SwipeListView
          useFlatList
          refreshControl={<RefreshControl refreshing={this.props.loading} />}
          refreshing={this.props.loading}
          contentContainerStyle={{ paddingBottom: 300 }}
          data={this.props.data}
          keyExtractor={(item: any) => String(item.id)}
          renderHiddenItem={({ item }: { item: CardProps }) => (
            <View style={styles.deleteContainer}>
              <View />
              <DeleteButton onPress={() => this.onDelete(item)} />
            </View>
          )}
          renderItem={({ item }: { item: CardProps }) => (
            <Card
              {...item}
              onPress={this.props.onSchedule}
              testID={`ScheduleID_${item.id}`}
            />
          )}
          rightOpenValue={-85}
          stopRightSwipe={-105}
          disableRightSwipe
          closeOnRowBeginSwipe={false}
          closeOnScroll={false}
        />
      </View>
    );
  }
}

interface DeleteButtonProps {
  onPress: () => void;
}

const DeleteButton = (props: DeleteButtonProps) => (
  <TouchableOpacity onPress={props.onPress}>
    <View style={styles.deleteButton}>
      <Text style={styles.deleteText}>削除</Text>
    </View>
  </TouchableOpacity>
);

const styles = StyleSheet.create({
  deleteButton: {
    margin: 3,
    borderRadius: 5,
    borderWidth: 0.5,
    borderColor: theme.color.red,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: theme.color.red,
    height: 80,
    width: 80
  },
  deleteText: {
    color: theme.color.white,
    fontWeight: "bold"
  },
  deleteContainer: {
    justifyContent: "space-between",
    flexDirection: "row",
    flex: 1
  }
});
