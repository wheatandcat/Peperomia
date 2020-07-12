import React from 'react';
import { View } from 'react-native';
import EStyleSheet from 'react-native-extended-stylesheet';
import { RouteProp } from '@react-navigation/native';
import { Button } from 'react-native-elements';
import { StackNavigationProp } from '@react-navigation/stack';
import { useActionSheet } from '@expo/react-native-action-sheet';
import { RootStackParamList } from 'lib/navigation';
import { useItems } from 'containers/Items';
import { useAuth } from 'containers/Auth';
import { useFetch } from 'containers/Fetch';
import theme from 'config/theme';
import Switch from './Switch';
import HeaderLeft from './HeaderLeft';
import HeaderRight from './HeaderRight';

type ScreenNavigationProp = StackNavigationProp<RootStackParamList, 'Schedule'>;
export type ScreenRouteProp = RouteProp<RootStackParamList, 'Schedule'>;

export type SwitchProps = {
  navigation: ScreenNavigationProp;
  route: ScreenRouteProp;
};

const ScheduleIndex: React.FC<SwitchProps> = (props) => {
  const { uid } = useAuth();
  const { refreshData } = useItems();
  const { post } = useFetch();
  const { showActionSheetWithOptions } = useActionSheet();

  return (
    <Switch
      {...props}
      uid={uid}
      refreshData={refreshData}
      post={post}
      showActionSheetWithOptions={showActionSheetWithOptions}
    />
  );
};

export default ScheduleIndex;

export const ScheduleNavigationOptions = ({ route }: SwitchProps) => {
  return {
    headerTitle: () => (
      <Button
        type="clear"
        title={route.params.title}
        onPress={route.params.onEditPlan}
        testID="ScheduleTitleUpdate"
        titleStyle={styles.headerTitle}
      />
    ),
    headerStyle: {
      backgroundColor: theme().mode.header.backgroundColor,
    },
    headerLeft: () => (
      <View style={styles.headerLeft}>
        <HeaderLeft mode={route.params.mode} onShow={route.params.onShow} />
      </View>
    ),
    headerRight: () => (
      <View style={styles.headerRight}>
        <HeaderRight
          mode={route.params.mode}
          onSave={route.params.onSave}
          onShare={() => {
            if (route.params.onShare) {
              route.params.onShare();
            }
          }}
        />
      </View>
    ),
  };
};

const styles = EStyleSheet.create({
  headerTitle: {
    color: '$headerText',
    fontWeight: '600',
  },
  headerLeft: {
    left: 5,
  },
  headerRight: {
    right: 10,
  },
});
