import React, { Component } from 'react';
import { View } from 'react-native';
import EStyleSheet from 'react-native-extended-stylesheet';
import Cards, {
  Props as CardsProps,
} from '../../organisms/SortableSchedule/Cards';

export interface Props extends CardsProps {}

export default class extends Component<Props> {
  render() {
    return (
      <View style={styles.root}>
        <View style={styles.contens}>
          <Cards data={this.props.data} onChange={this.props.onChange} />
        </View>
      </View>
    );
  }
}

const styles = EStyleSheet.create({
  root: {
    backgroundColor: '$background',
  },
  contens: {
    height: '100%',
    width: '100%',
  },
});
