import React, { FC } from 'react';
import { View, TextInput, Text, Platform, StyleSheet } from 'react-native';
import { Button, Overlay } from 'react-native-elements';
import EStyleSheet from 'react-native-extended-stylesheet';
import theme from 'config/theme';

type Props = {
  open: boolean;
  onChange: (value: number) => void;
  onSetManualTime: () => void;
  onCloseManualTime: () => void;
};

const TimeDialog: FC<Props> = (props) => (
  <Overlay isVisible={props.open} overlayStyle={estyles.overlay}>
    <View style={estyles.root}>
      <View>
        <Text style={estyles.title}>時間を入力して下さい</Text>
      </View>

      <View style={styles.contents}>
        <View style={styles.textInputContainer}>
          <TextInput
            keyboardType="numeric"
            style={estyles.timeInput}
            defaultValue=""
            onChangeText={(value) => props.onChange(Number(value))}
            returnKeyType="done"
            maxLength={4}
            autoFocus
          />

          <View style={styles.minutes}>
            <Text style={estyles.timeInputSuffix}>分</Text>
          </View>
        </View>
      </View>
      <View style={styles.footer}>
        <Button
          title="キャンセル"
          type="clear"
          onPress={props.onCloseManualTime}
          containerStyle={styles.cancelContainer}
          titleStyle={styles.cancel}
        />
        <View>
          <Text style={styles.line}>|</Text>
        </View>
        <Button
          title="設定"
          type="clear"
          onPress={props.onSetManualTime}
          containerStyle={styles.settingButton}
          titleStyle={estyles.buttonText}
        />
      </View>
    </View>
  </Overlay>
);

const estyles = EStyleSheet.create({
  root: {
    height: Platform.OS === 'ios' ? 180 : 205,
    width: '100%',
    backgroundColor: '$background',
  },
  title: {
    fontSize: 20,
    fontWeight: '600',
    textAlign: 'center',
    color: '$text',
  },
  timeInput: {
    width: 90,
    paddingRight: 10,
    textAlign: 'right',
    fontSize: 24,
    borderBottomWidth: 1,
    color: '$text',
    borderColor: '$text',
  },
  timeInputSuffix: {
    paddingTop: 9,
    paddingLeft: 5,
    fontSize: 18,
    color: '$text',
  },
  buttonText: {
    color: '$secondaryButton',
    fontWeight: '600',
  },
  overlay: {
    backgroundColor: '$background',
    paddingHorizontal: 0,
    paddingTop: 30,
  },
});

const styles = StyleSheet.create({
  footer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: 'auto',
    marginTop: 50,
    paddingTop: 10,
    borderTopWidth: 0.5,
    borderColor: theme().color.base.pale,
  },
  cancel: {
    color: theme().color.base.light,
    fontWeight: '600',
  },
  contents: {
    paddingTop: 30,
  },
  textInputContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
  },
  minutes: {
    paddingTop: 5,
  },
  cancelContainer: {
    paddingHorizontal: 15,
  },
  line: {
    fontSize: 22,
    color: theme().color.base.pale,
  },
  settingButton: {
    width: 120,
  },
});

export default TimeDialog;
