import React, { FC } from 'react';
import { View, Dimensions } from 'react-native';
import SvgAnimatedLinearGradient from 'react-native-svg-animated-linear-gradient';
import EStyleSheet from 'react-native-extended-stylesheet';
import { Circle, Rect } from 'react-native-svg';
import theme from '../../../config/theme';

const deviceWidth = Dimensions.get('window').width;

type Props = {};

const Header: FC<Props> = () => {
  return (
    <View style={styles.root}>
      <SvgAnimatedLinearGradient
        height={231}
        width={deviceWidth}
        primaryColor={theme().mode.loading.primaryColor}
        secondaryColor={theme().mode.loading.secondaryColor}
      >
        <Rect x="0" y="0" rx="0" ry="0" width={deviceWidth} height="231" />
      </SvgAnimatedLinearGradient>
      <SvgAnimatedLinearGradient
        height={60}
        width={deviceWidth}
        primaryColor={theme().mode.loading.primaryColor}
        secondaryColor={theme().mode.loading.secondaryColor}
      >
        <Circle cx="30" cy="30" r="10" />
        <Rect x="60" y="20" rx="0" ry="0" width="40" height="20" />
        <Rect x="0" y="58" rx="0" ry="0" width={deviceWidth} height="2" />
      </SvgAnimatedLinearGradient>
      <SvgAnimatedLinearGradient
        height={100}
        width={deviceWidth}
        primaryColor={theme().mode.loading.primaryColor}
        secondaryColor={theme().mode.loading.secondaryColor}
      >
        <Rect x="18" y="18" rx="10" ry="10" width="85" height="28" />
        <Rect x="20" y="55" rx="0" ry="0" width="210" height="18" />
      </SvgAnimatedLinearGradient>
    </View>
  );
};

const styles = EStyleSheet.create({
  root: {
    height: '100%',
    backgroundColor: '$background',
  },
});

export default Header;
