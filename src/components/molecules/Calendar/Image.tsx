import React, { FC } from 'react';
import { View, Image, ImageSourcePropType, StyleSheet } from 'react-native';
import { isTablet } from 'lib/responsive';

type Props = {
  source: ImageSourcePropType;
};

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

const styles = StyleSheet.create({
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
