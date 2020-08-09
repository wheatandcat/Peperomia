import React, { Fragment } from 'react';
import { TouchableOpacity, View, Text } from 'react-native';
import EStyleSheet from 'react-native-extended-stylesheet';
import { SelectItemDetail } from 'domain/itemDetail';
import Card from './Card';

type Props = SelectItemDetail & {
  end: boolean;
  onPress: () => void;
};

export default (props: Props) => {
  return (
    <Fragment>
      <TouchableOpacity
        onPress={props.onPress}
        testID={`itemDetailId_${props.id}`}
      >
        <Card {...props} />
      </TouchableOpacity>
      {(() => {
        if (props.end) {
          return null;
        }

        return (
          <View style={styles.container}>
            <Text style={styles.timeText}>
              {props.moveMinutes ? `${props.moveMinutes}分` : '-'}
            </Text>
          </View>
        );
      })()}
    </Fragment>
  );
};

const styles = EStyleSheet.create({
  timeText: {
    fontWeight: '600',
    fontSize: 15,
    color: '$text',
  },
  container: {
    padding: 15,
  },
});
