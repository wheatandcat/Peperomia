import React, { FC } from 'react';
import { View } from 'react-native';
import Color from 'color';
import EStyleSheet from 'react-native-extended-stylesheet';
import { IconImage } from 'primitive';
import { KINDS, KIND_DEFAULT } from '../../../lib/getKind';
import s from '../../../config/style';

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

const styles = EStyleSheet.create({
  root: {
    paddingTop: 100,
  },
  contents: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    padding: 0,
    borderRadius: 0,
    height: 80,
    justifyContent: 'flex-end',
  },
  children: {
    flex: 1,
    paddingLeft: 15,
    paddingBottom: 25,
  },
  icon: {
    position: 'absolute',
    right: 30,
  },
});

export default Header;
