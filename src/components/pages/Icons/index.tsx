import React, { memo } from 'react';
import { RouteProp } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from 'lib/navigation';
import EStyleSheet from 'react-native-extended-stylesheet';
import { TouchableOpacity, View } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import theme from 'config/theme';
import Connected from './Connected';

type ScreenNavigationProp = StackNavigationProp<RootStackParamList, 'Icons'>;
type ScreenRouteProp = RouteProp<RootStackParamList, 'Icons'>;

type Props = {
  navigation: ScreenNavigationProp;
  route: ScreenRouteProp;
};

const Icons: React.FC<Props> = (props) => {
  const onSelectIcon = props.route?.params?.onSelectIcon;
  const kind = props.route?.params?.kind || '';

  return <Connected kind={kind} onSelectIcon={onSelectIcon} />;
};

export default memo(Icons);

export const IconsNavigationOptions = ({ navigation }: Props) => {
  return {
    title: 'アイコン設定',
    headerStyle: {
      borderBottomWidth: 0,
      backgroundColor: theme().mode.header.backgroundColor,
    },
    headerTintColor: theme().mode.header.text,
    headerTitleStyle: {
      color: theme().mode.header.text,
    },
    headerLeft: () => (
      <View style={styles.headerLeft}>
        <TouchableOpacity onPress={() => navigation.pop()}>
          <MaterialCommunityIcons
            name="close"
            size={25}
            color={theme().mode.text}
          />
        </TouchableOpacity>
      </View>
    ),
  };
};

const styles = EStyleSheet.create({
  headerLeft: {
    left: theme().space(2),
  },
});
