import React, { useState } from 'react';
import { View, StyleSheet } from 'react-native';
import { Button } from 'react-native-elements';
import dayjs from 'dayjs';
import advancedFormat from 'dayjs/plugin/advancedFormat';
import 'dayjs/locale/ja';
import DateTimePickerModal from 'react-native-modal-datetime-picker';
import theme, { darkMode } from 'config/theme';

dayjs.extend(advancedFormat);

type Props = {
  date: string | null;
  onInput: (date: string) => void;
};

const DatePickerForm: React.FC<Props> = (props) => {
  const [open, setOpen] = useState(false);

  const onOpenDtePicker = () => {
    setOpen(true);
  };

  const dateFormat = props.date
    ? dayjs(props.date).format('YYYY年MM月DD日')
    : null;

  return (
    <>
      <View>
        <DateTimePickerModal
          isVisible={open}
          mode="date"
          headerTextIOS="日付を設定する"
          confirmTextIOS="完了"
          cancelTextIOS="キャンセル"
          locale="ja"
          isDarkModeEnabled={darkMode()}
          onConfirm={(date) => {
            setOpen(false);
            const r = dayjs(date).format('YYYY-MM-DD');
            return props.onInput(r);
          }}
          onCancel={() => setOpen(false)}
        />
      </View>

      <View style={styles.dateButtonContainer}>
        <Button
          icon={{
            name: 'date-range',
            size: 20,
            color: 'white',
          }}
          buttonStyle={styles.dateButton}
          titleStyle={styles.dateButtonText}
          title={dateFormat ? dateFormat : '日付を設定する'}
          onPress={onOpenDtePicker}
        />
      </View>
    </>
  );
};

export default DatePickerForm;

const styles = StyleSheet.create({
  dateButtonContainer: {
    padding: 30,
  },
  dateButton: {
    backgroundColor: theme().color.secondary.main,
    borderRadius: 15,
    padding: 15,
  },
  dateButtonText: {
    fontSize: 20,
    fontWeight: '600',
  },
});
