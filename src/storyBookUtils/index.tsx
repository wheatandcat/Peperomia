import React from 'react';
import { Alert } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

export const mockFn = (msg?: string) => (): any => Alert.alert(msg ?? 'テスト');

type Props = {
  screen: any;
};

const Stack = createStackNavigator();

export const StackNavigator: React.FC<Props> = (props) => {
  return (
    <NavigationContainer independent={true}>
      <Stack.Navigator>
        <Stack.Screen
          name="MyStorybookScreen"
          component={props.screen}
          options={{ header: () => null }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};
