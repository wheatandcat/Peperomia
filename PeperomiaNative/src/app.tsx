import Constants from 'expo-constants';
import * as React from 'react';
import { Appearance, AppearanceProvider } from 'react-native-appearance';
import { ActionSheetProvider } from '@expo/react-native-action-sheet';
import { Text, View, StatusBar } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import * as Sentry from 'sentry-expo';
import Version from './containers/Version';
import AuthProvider from './containers/Auth';
import FetchProvider from './containers/Fetch';
import ItemsProvider from './containers/Items';
import ThemeProvider from './containers/Theme';
import './lib/firebase';
import theme from './config/theme';
import Home from './components/pages/Home/Connected';
import Setting from './components/pages/Setting/Connected';

if (process.env.SENTRY_URL) {
  Sentry.setRelease(String(Constants.manifest.revisionId));
  Sentry.init({
    dsn: String(process.env.SENTRY_URL),
    debug: true,
  });
}

Appearance.getColorScheme();

StatusBar.setBarStyle('light-content', true);
StatusBar.setBackgroundColor(theme().color.white, true);

const Tab = createBottomTabNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <AppearanceProvider>
        <ActionSheetProvider>
          <Version>
            <AuthProvider>
              <FetchProvider>
                <ItemsProvider>
                  <ThemeProvider>
                    <Tab.Navigator>
                      <Tab.Screen name="Home" component={Home} />
                      <Tab.Screen name="Settings" component={Setting} />
                    </Tab.Navigator>
                  </ThemeProvider>
                </ItemsProvider>
              </FetchProvider>
            </AuthProvider>
          </Version>
        </ActionSheetProvider>
      </AppearanceProvider>
    </NavigationContainer>
  );
}
