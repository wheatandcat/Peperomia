import React, { FC } from 'react';
import { View, Dimensions } from 'react-native';
import SvgAnimatedLinearGradient from 'react-native-svg-animated-linear-gradient';
import EStyleSheet from 'react-native-extended-stylesheet';
import { Rect } from 'react-native-svg';
import theme from '../../../config/theme';

const deviceWidth = Dimensions.get('window').width;

type Props = {};

const Header: FC<Props> = () => {
  return (
    <View style={styles.root}>
      <SvgAnimatedLinearGradient
        height={116}
        width={deviceWidth}
        primaryColor={theme().mode.loading.primaryColor}
        secondaryColor={theme().mode.loading.secondaryColor}
      >
        <Rect x="0" y="0" rx="0" ry="0" width={deviceWidth} height="68" />
        <Rect x="15" y="86" rx="10" ry="10" width={10} height="5" />
      </SvgAnimatedLinearGradient>
      <SvgAnimatedLinearGradient
        height={116}
        width={deviceWidth}
        primaryColor={theme().mode.loading.primaryColor}
        secondaryColor={theme().mode.loading.secondaryColor}
      >
        <Rect x="0" y="0" rx="0" ry="0" width={deviceWidth} height="68" />
        <Rect x="15" y="86" rx="10" ry="10" width={10} height="5" />
      </SvgAnimatedLinearGradient>
      <SvgAnimatedLinearGradient
        height={116}
        width={deviceWidth}
        primaryColor={theme().mode.loading.primaryColor}
        secondaryColor={theme().mode.loading.secondaryColor}
      >
        <Rect x="0" y="0" rx="0" ry="0" width={deviceWidth} height="68" />
        <Rect x="15" y="86" rx="10" ry="10" width={10} height="5" />
      </SvgAnimatedLinearGradient>
      <SvgAnimatedLinearGradient
        height={116}
        width={deviceWidth}
        primaryColor={theme().mode.loading.primaryColor}
        secondaryColor={theme().mode.loading.secondaryColor}
      >
        <Rect x="0" y="0" rx="0" ry="0" width={deviceWidth} height="68" />
        <Rect x="15" y="86" rx="10" ry="10" width={10} height="5" />
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
