import React from 'react';
import { TouchableOpacity } from 'react-native';
import { Entypo } from '@expo/vector-icons';
import theme from 'config/theme';
import { RightText } from 'components/atoms/Header';

type Props = {
  mode?: string;
  onSave?: () => void;
  onShare?: () => void;
};

const HeaderRight: React.FC<Props> = (props) => {
  if (!props.onSave || !props.onShare || !props.mode) {
    return null;
  }

  if (props.mode === 'edit') {
    return null;
  }

  if (props.mode === 'sort') {
    return <RightText label="✓" onPress={props.onSave} />;
  }

  return (
    <TouchableOpacity onPress={props.onShare}>
      <Entypo
        name="share-alternative"
        size={25}
        color={theme().mode.header.text}
      />
    </TouchableOpacity>
  );
};

export default HeaderRight;
