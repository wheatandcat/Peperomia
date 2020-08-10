import React, { Component } from 'react';
import { View } from 'react-native';
import EStyleSheet from 'react-native-extended-stylesheet';
import { Button } from 'react-native-elements';
import dayjs from 'dayjs';
import advancedFormat from 'dayjs/plugin/advancedFormat';
import 'dayjs/locale/ja';
import DatePicker from 'react-native-datepicker';
import {
  Consumer as ThemeConsumer,
  ContextProps as ThemeContextProps,
} from 'containers/Theme';
import theme from 'config/theme';

dayjs.extend(advancedFormat);

type Props = {
  date: string | null;
  onInput: (date: string) => void;
};

class DatePickerForm extends Component<Props> {
  datePicker: any;

  onOpenDtePicker = () => {
    this.datePicker.onPressDate();
  };

  render() {
    return (
      <ThemeConsumer>
        {({ mode }: ThemeContextProps) => (
          <>
            <View>
              <DatePicker
                style={styles.datePicker}
                ref={(picker) => {
                  this.datePicker = picker;
                }}
                mode="date"
                format="YYYY年MM月DD日"
                iconComponent={<View />}
                confirmBtnText="完了"
                cancelBtnText="キャンセル"
                customStyles={{
                  dateText: {
                    color: theme().mode.text,
                  },
                  datePicker: {
                    backgroundColor: mode === 'dark' ? '#222' : 'white',
                  },
                  datePickerCon: {
                    backgroundColor: mode === 'dark' ? '#333' : 'white',
                  },
                }}
                locale="ja"
                onDateChange={(_: string, date: Date) => {
                  const r = dayjs(date).format('YYYY-MM-DD');
                  return this.props.onInput(r);
                }}
              />
            </View>
            {this.props.date ? (
              <View style={styles.datePickerContainer}>
                <DatePicker
                  mode="date"
                  date={this.props.date}
                  confirmBtnText="完了"
                  cancelBtnText="キャンセル"
                  locale="ja"
                  format="YYYY年MM月DD日"
                  style={styles.datePickerInput}
                  customStyles={{
                    dateText: {
                      color: theme().mode.text,
                    },
                    datePicker: {
                      backgroundColor: mode === 'dark' ? '#222' : 'white',
                    },
                    datePickerCon: {
                      backgroundColor: mode === 'dark' ? '#333' : 'white',
                    },
                  }}
                  placeholder="日付を設定する"
                  onDateChange={(_: string, date: Date) => {
                    const r = dayjs(date).format('YYYY-MM-DD');

                    return this.props.onInput(r);
                  }}
                />
              </View>
            ) : (
              <View style={styles.dateButtonContainer}>
                <Button
                  icon={{
                    name: 'date-range',
                    size: 20,
                    color: 'white',
                  }}
                  buttonStyle={styles.dateButton}
                  titleStyle={styles.dateButtonText}
                  title="日付を設定する"
                  onPress={this.onOpenDtePicker}
                />
              </View>
            )}
          </>
        )}
      </ThemeConsumer>
    );
  }
}

export default DatePickerForm;

const styles = EStyleSheet.create({
  datePicker: {
    width: 0,
    height: 0,
    //  TDOD: androidで謎の線が残るので↓で対処,
    position: 'absolute',
    top: -9999,
  },
  datePickerContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
    paddingHorizontal: 30,
    paddingTop: 35,
  },
  dateButtonContainer: {
    padding: 30,
  },
  dateButton: {
    backgroundColor: theme().color.lightGreen,
    borderRadius: 15,
    padding: 15,
  },
  dateButtonText: {
    fontSize: 20,
    fontWeight: '600',
  },
  datePickerInput: {
    width: '100%',
  },
});
