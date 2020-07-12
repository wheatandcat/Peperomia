import { StyleSheet, Platform } from 'react-native';
export default StyleSheet.create({
  droidSafeArea: {
    paddingTop: Platform.OS === 'android' ? 30 : 0,
  },
});
