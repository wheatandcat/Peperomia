import React, { Fragment } from 'react';
import { TouchableOpacity } from 'react-native';
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
    </Fragment>
  );
};
