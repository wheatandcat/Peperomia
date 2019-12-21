import React, { Component } from 'react';
import { TouchableOpacity, AsyncStorage } from 'react-native';
import EStyleSheet from 'react-native-extended-stylesheet';
import BottomRight from './BottomRight';

interface Props {
  onPress: () => void;
  testID: string;
}

interface State {
  visible: boolean;
}

export default class extends Component<Props, State> {
  state = {
    visible: false,
  };

  async componentDidMount() {
    const visible = await AsyncStorage.getItem('FIRST_CRAEATE_ITEM');
    console.log(visible);

    this.setState({
      visible: !visible,
    });
  }

  onPress = () => {
    this.setState({
      visible: false,
    });

    AsyncStorage.setItem('FIRST_CRAEATE_ITEM', 'true');
  };

  onPushPress = () => {
    this.setState({
      visible: false,
    });

    AsyncStorage.setItem('FIRST_CRAEATE_ITEM', 'true');
    this.props.onPress();
  };

  render() {
    if (!this.state.visible) {
      return (
        <TouchableOpacity
          onPress={this.props.onPress}
          testID={this.props.testID}
        >
          {this.props.children}
        </TouchableOpacity>
      );
    }

    return (
      <>
        <BottomRight />
        <TouchableOpacity
          onPress={this.onPushPress}
          testID={this.props.testID}
          style={styles.tap}
        >
          {this.props.children}
        </TouchableOpacity>
      </>
    );
  }
}

const styles = EStyleSheet.create({
  tap: { padding: 5 },
});
