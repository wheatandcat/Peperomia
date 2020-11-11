import React, { useCallback, useRef } from 'react';
import {
  SafeAreaView,
  StatusBar,
  View,
  StyleSheet,
  TouchableOpacity,
  Keyboard,
  ScrollView,
  ActivityIndicator,
} from 'react-native';
import { MaterialIcons, MaterialCommunityIcons } from '@expo/vector-icons';
import { getKindData } from 'lib/kind';
import Header from 'components/molecules/Header';
import useKeyboard from 'hooks/useKeyboard';
import useScroll from 'hooks/useScroll';
import theme from 'config/theme';
import AppScrollViewIOSBounceColorsWrapper from 'components/organisms/ItemWrap/AppScrollViewIOSBounceColorsWrapper';

type Props = {
  date?: string;
  loading?: boolean;
  title: string;
  kind: string;
  onCloseKeyBoard: () => void;
  rightIcon: string;
  onRightPress: () => void;
  onDismiss: () => void;
};

const ItemDetailWrap: React.FC<Props> = (props) => {
  const config = getKindData(props.kind);
  const { showKeyboard } = useKeyboard();
  const scrollViewRef = useRef<ScrollView>(null);
  const { scrollBelowTarget, onScroll } = useScroll(70);

  const onCloseKeyBoard = useCallback(() => {
    Keyboard.dismiss();
    props.onCloseKeyBoard();
  }, [props]);

  return (
    <AppScrollViewIOSBounceColorsWrapper
      topBounceColor={config.backgroundColor}
      bottomBounceColor={theme().color.highLightGray}
    >
      <StatusBar
        backgroundColor={config.backgroundColor}
        barStyle="dark-content"
      />
      <Header
        date={props.date}
        title={scrollBelowTarget ? '' : props.title}
        color={scrollBelowTarget ? 'none' : config.backgroundColor}
        right={
          showKeyboard ? (
            <TouchableOpacity
              onPress={onCloseKeyBoard}
              testID="KeyBoardCloseInCreateScheduleDetail"
            >
              <MaterialCommunityIcons
                name="keyboard-close"
                color={theme().color.main}
                size={25}
                style={styles.keyboardClose}
              />
            </TouchableOpacity>
          ) : (
            <>
              {props.loading ? (
                <View>
                  <ActivityIndicator />
                </View>
              ) : (
                <TouchableOpacity onPress={props.onRightPress}>
                  <MaterialIcons
                    name={props.rightIcon}
                    color={theme().color.main}
                    size={25}
                    style={styles.keyboardClose}
                  />
                </TouchableOpacity>
              )}
            </>
          )
        }
        onClose={props.onDismiss}
      />

      <ScrollView
        ref={scrollViewRef}
        contentInsetAdjustmentBehavior="never"
        onScroll={onScroll}
        scrollEventThrottle={200}
      >
        <SafeAreaView
          style={[styles.contents, { backgroundColor: config.backgroundColor }]}
        >
          {props.children}
        </SafeAreaView>
      </ScrollView>
    </AppScrollViewIOSBounceColorsWrapper>
  );
};

export default ItemDetailWrap;

const styles = StyleSheet.create({
  contents: {
    flex: 0,
    height: '100%',
  },
  keyboardClose: {
    paddingRight: 5,
  },
});
