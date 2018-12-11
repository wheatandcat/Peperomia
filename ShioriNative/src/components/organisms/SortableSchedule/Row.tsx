import React, { Component } from "react";
import { Animated, Easing, Platform, View } from "react-native";

export interface RowProps {
  active: boolean;
  children: any;
}

export default class extends Component<RowProps> {
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

  componentDidUpdate(prevProps: RowProps) {
    if (this.props.active !== prevProps.active) {
      Animated.timing(this._active, {
        duration: 300,
        easing: Easing.bounce,
        toValue: Number(this.props.active)
      }).start();
    }
  }

  render() {
    return (
      <Animated.View style={[this._style]}>
        <View style={{ paddingBottom: 50 }}>{this.props.children}</View>
      </Animated.View>
    );
  }
}
