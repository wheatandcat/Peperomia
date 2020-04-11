import React, { memo, useCallback } from 'react';
import { RouteProp } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from 'lib/navigation';
import EStyleSheet from 'react-native-extended-stylesheet';
import { TouchableOpacity, View } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import theme from 'config/theme';
import { useDidMount } from 'hooks/index';
import Page from './Page';

type ScreenNavigationProp = StackNavigationProp<RootStackParamList, 'Icons'>;
type ScreenRouteProp = RouteProp<RootStackParamList, 'Icons'>;

type Props = {
  navigation: ScreenNavigationProp;
  route: ScreenRouteProp;
};

const Connected = (props: Props) => {
  const onDismiss = props.route?.params?.onDismiss;
  const onSelectIcon = props.route?.params?.onSelectIcon;
  const kind = props.route?.params?.kind || '';
  const defaultIcon = props.route?.params?.defaultIcon || false;
  const photo = props.route?.params?.photo || false;

  useDidMount(() => {
    props.navigation.setParams({
      onDismiss,
    });
  });

  const onSelectIconItem = useCallback(
    (selectedKind: string) => {
      if (onSelectIcon) {
        onSelectIcon(selectedKind);
      }
    },
    [onSelectIcon]
  );

  return (
    <Page
      kind={kind}
      defaultIcon={defaultIcon}
      photo={photo}
      onSelectIcon={onSelectIconItem}
    />
  );
};

export default memo(Connected);

export const IconsNavigationOptions = ({ route }: Props) => {
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
        <TouchableOpacity onPress={route.params.onDismiss}>
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
    left: 10,
  },
});
