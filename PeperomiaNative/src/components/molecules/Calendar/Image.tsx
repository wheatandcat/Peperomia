import React, { FC } from 'react';
import { View, Image, ImageSourcePropType } from 'react-native';
import EStyleSheet from 'react-native-extended-stylesheet';
import '@expo/match-media';
import { useMediaQuery } from 'react-responsive';

type Props = {
  source: ImageSourcePropType;
};

const CalendarImage: FC<Props> = props => {
  const isTablet = useMediaQuery({ minWidth: 768, maxWidth: 991 });

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
  },
  imageForWide: {
    height: 175,
    width: 375,
  },
});
