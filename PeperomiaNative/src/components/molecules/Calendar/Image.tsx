import React, { FC } from 'react';
import { View, Image, ImageSourcePropType } from 'react-native';
import EStyleSheet from 'react-native-extended-stylesheet';
import { isTablet } from 'lib/responsive';

type Props = {
  source: ImageSourcePropType;
};

console.log(isTablet);

const CalendarImage: FC<Props> = (props) => {
  return (
    <View style={styles.imageContainer}>
      <Image
        source={props.source}
        style={isTablet ? styles.imageForWide : styles.image}
        resizeMode="contain"
      />
    </View>
  );
};

export default CalendarImage;

const styles = EStyleSheet.create({
  imageContainer: {
    paddingTop: 15,
    paddingBottom: 15,
    alignItems: 'center',
    justifyContent: 'center',
  },

  image: {
    width: '95%',
    height: 200,
  },
  imageForWide: {
    width: '95%',
    height: 200,
  },
});
