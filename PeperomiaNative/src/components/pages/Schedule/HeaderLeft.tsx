import React from 'react';
import EStyleSheet from 'react-native-extended-stylesheet';
import { TouchableOpacity } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import theme from 'config/theme';
import { LeftText } from 'components/atoms/Header';

type Props = {
  mode?: string;
  onShow?: () => void;
};

const HeaderLeft: React.FC<Props> = (props) => {
  const navigation = useNavigation();
  if (!props.onShow || !props.mode) {
    return null;
  }

  if (props.mode === 'edit') {
    return <LeftText label="キャンセル" cancel onPress={props.onShow} />;
  }

  if (props.mode === 'sort') {
    return null;
  }

  return (
    <TouchableOpacity onPress={() => navigation.goBack()} style={styles.root}>
      <MaterialCommunityIcons
        name="chevron-left"
        size={30}
        color={theme().mode.header.text}
      />
    </TouchableOpacity>
  );
};

export default HeaderLeft;

const styles = EStyleSheet.create({
  root: { flex: 1, flexDirection: 'row', marginTop: 10 },
});
