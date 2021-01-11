import React, { FC } from 'react';
import { View, StyleSheet, Platform } from 'react-native';
import Color from 'color';
import { IconImage } from 'components/atoms';
import { KINDS, KIND_DEFAULT } from 'peperomia-util';
import s from 'config/style';
import theme from 'config/theme';

type Props = {
  kind: string;
};

const Header: FC<Props> = (props) => {
  const kind = props.kind || KIND_DEFAULT;
  const config = KINDS[kind];
  const ss = s.schedule;
  const bc = Color(config.backgroundColor)
    .lighten(ss.borderColorAlpha)
    .toString();

  return (
    <View
      style={[
        styles.root,
        {
          borderBottomWidth: ss.borderWidth,
          borderColor: bc,
          backgroundColor: Color(config.backgroundColor)
            .lighten(ss.backgroundColorAlpha)
            .toString(),
        },
      ]}
    >
      <View style={styles.contents}>
        <View style={styles.children}>{props.children}</View>

        <View style={styles.icon}>
          <IconImage
            src={config.src}
            name={config.name}
            size={110}
            opacity={1.0}
          />
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  root: {
    paddingTop: theme().space(Platform.OS === 'ios' ? 6 : 5),
  },
  contents: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    padding: 0,
    borderRadius: 0,
    height: Platform.OS === 'ios' ? 80 : 80,
    justifyContent: 'flex-end',
  },
  children: {
    flex: 1,
    paddingLeft: theme().space(3),
    paddingBottom: theme().space(4),
  },
  icon: {
    position: 'absolute',
    right: theme().space(4),
  },
});

export default Header;
