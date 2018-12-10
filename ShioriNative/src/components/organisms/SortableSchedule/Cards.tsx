import React, { Component } from "react";
import {
  Animated,
  Easing,
  StyleSheet,
  Dimensions,
  Platform,
  View
} from "react-native";
import SortableList from "react-native-sortable-list";
import getKind from "../../../lib/getKind";
import Card from "../../molecules/Schedule/Card";

const window = Dimensions.get("window");

export interface ItemProps {
  id: string;
  title: string;
  moveMinutes: number | null;
}

export interface Props {
  data: ItemProps[];
}

export interface RowProps {
  data: ItemProps;
  active: boolean;
}

class Row extends Component<RowProps> {
  _active: any;
  _style: any;

  constructor(props: RowProps) {
    super(props);

    this._active = new Animated.Value(0);

    this._style = {
      ...Platform.select({
        ios: {
          transform: [
            {
              scale: this._active.interpolate({
                inputRange: [0, 1],
                outputRange: [1, 1.1]
              })
            }
          ],
          shadowRadius: this._active.interpolate({
            inputRange: [0, 1],
            outputRange: [2, 10]
          })
        },

        android: {
          transform: [
            {
              scale: this._active.interpolate({
                inputRange: [0, 1],
                outputRange: [1, 1.07]
              })
            }
          ],
          elevation: this._active.interpolate({
            inputRange: [0, 1],
            outputRange: [2, 6]
          })
        }
      })
    };
  }

  componentWillReceiveProps(nextProps: RowProps) {
    if (this.props.active !== nextProps.active) {
      Animated.timing(this._active, {
        duration: 300,
        easing: Easing.bounce,
        toValue: Number(nextProps.active)
      }).start();
    }
  }

  render() {
    const { data } = this.props;

    return (
      <Animated.View style={[this._style]}>
        <View style={{ paddingBottom: 50 }}>
          <Card id={data.id} title={data.title} kind={getKind(data.title)} />
        </View>
      </Animated.View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#eee",

    ...Platform.select({
      ios: {
        paddingTop: 20
      }
    })
  },

  title: {
    fontSize: 20,
    paddingVertical: 20,
    color: "#999999"
  },

  list: {
    flex: 1
  },

  contentContainer: {
    width: window.width,

    ...Platform.select({
      ios: {
        paddingHorizontal: 30
      },

      android: {
        paddingHorizontal: 0
      }
    })
  },

  text: {
    fontSize: 24,
    color: "#222222"
  }
});

export default class extends Component<Props> {
  renderItem({ data, active }: { data: ItemProps; active: boolean }) {
    return <Row data={data} active={active} />;
  }

  render() {
    const obj = this.props.data.reduce((o, c) => ({ ...o, [c.id]: c }), {});

    return (
      <SortableList
        data={obj}
        renderRow={this.renderItem.bind(this)}
        style={styles.list}
      />
    );
  }
}
