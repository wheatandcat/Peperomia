import React, { memo } from 'react';
import { RouteProp } from '@react-navigation/native';
import {
  createStackNavigator,
  StackNavigationProp,
} from '@react-navigation/stack';
import { RootStackParamList } from 'lib/navigation';
import dayjs from 'dayjs';
import advancedFormat from 'dayjs/plugin/advancedFormat';
import 'dayjs/locale/ja';
import Connected from './Connected';

dayjs.extend(advancedFormat);

type ScreenNavigationProp = StackNavigationProp<
  RootStackParamList,
  'CreateCalendar'
>;
type ScreenRouteProp = RouteProp<RootStackParamList, 'CreateCalendar'>;

export type Props = {
  navigation: ScreenNavigationProp;
  route: ScreenRouteProp;
};

const CreateCalendar: React.FC<Props> = memo((props) => {
  const date =
    props.route.params?.date || dayjs().format('YYYY-MM-DDT00:00:00');

  return <Connected {...props} date={date} />;
});

const RootStack = createStackNavigator<RootStackParamList>();

const RootStackScreen = () => {
  return (
    <RootStack.Navigator mode="modal">
      <RootStack.Screen
        name="CreateCalendar"
        component={CreateCalendar}
        options={{ header: () => null }}
      />
    </RootStack.Navigator>
  );
};

export default RootStackScreen;
