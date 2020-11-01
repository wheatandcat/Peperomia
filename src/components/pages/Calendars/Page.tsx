import React, { Component } from 'react';
import {
  View,
  TouchableOpacity,
  ActivityIndicator,
  Animated,
  SafeAreaView,
  StyleSheet,
} from 'react-native';
import { Calendar, LocaleConfig, CalendarTheme } from 'react-native-calendars';
import GestureRecognizer from 'react-native-swipe-gestures';
import dayjs from 'dayjs';
import advancedFormat from 'dayjs/plugin/advancedFormat';
import 'dayjs/locale/ja';
import theme from 'config/theme';
import ImageDay from 'components/organisms/Calendars/Image';
import DayText from 'components/organisms/Calendars/DayText';
import { ContextProps as CalendarsContextProps } from 'containers/Calendars';
import CalendarWrap from 'components/organisms/ItemWrap/CalendarWrap';
import Header from 'components/organisms/Calendars/Header';
import DayOfWeek from 'components/organisms/Calendars/DayOfWeek';
import GlobalStyles from '../../../GlobalStyles';
import { ConnectedType } from './Connected';

dayjs.extend(advancedFormat);

const AnimatedSafeAreaView = Animated.createAnimatedComponent(SafeAreaView);

LocaleConfig.locales.jp = {
  monthNames: [
    '1月',
    '2月',
    '3月',
    '4月',
    '5月',
    '6月',
    '7月',
    '8月',
    '9月',
    '10月',
    '11月',
    '12月',
  ],
  monthNamesShort: [
    '1月',
    '2月',
    '3月',
    '4月',
    '5月',
    '6月',
    '7月',
    '8月',
    '9月',
    '10月',
    '11月',
    '12月',
  ],
  dayNames: ['日', '月', '火', '水', '木', '金', '土'],
  dayNamesShort: ['日', '月', '火', '水', '木', '金', '土'],
};
LocaleConfig.defaultLocale = 'jp';

type Props = ConnectedType &
  Pick<CalendarsContextProps, 'calendars' | 'setDate'> & {
    loading: boolean;
  };

type State = {
  currentDate: string;
  count: number;
  backgroundColor: any;
};

const backgroundColors = [
  '#FDDACB',
  '#FBEDF2',
  '#DCF6FA',
  '#fdeff2',
  '#FFE8AE',
  '#7BB07D',
  '#a0d8ef',
  '#f2f2b0',
  theme().color.beige,
  '#E3E3FE',
  '#FFE7D0',
  '#BFD3B7',
];

const config = {
  velocityThreshold: 0.3,
  directionalOffsetThreshold: 80,
};

export default class extends Component<Props, State> {
  state = {
    currentDate: dayjs().format('YYYY-MM-01'),
    count: 0,
    backgroundColor: new Animated.Value(dayjs().month()),
  };

  calendar: any;
  componentDidMount() {
    const currentMonth = dayjs(this.state.currentDate).month();

    Animated.timing(this.state.backgroundColor, {
      toValue: currentMonth,
      useNativeDriver: false,
    }).start();
  }

  onNextMonth = () => {
    const count = this.state.count + 1;
    const currentMonth = dayjs(this.state.currentDate)
      .add(count, 'month')
      .month();

    this.setState({
      count,
    });

    if (currentMonth === 0) {
      Animated.timing(this.state.backgroundColor, {
        toValue: 12,
        useNativeDriver: false,
      }).start((props) => {
        if (props.finished) {
          this.setState({
            backgroundColor: new Animated.Value(0),
          });
        }
      });
    } else {
      Animated.timing(this.state.backgroundColor, {
        toValue: currentMonth,
        useNativeDriver: false,
      }).start();
    }
    this.calendar.addMonth(1);
  };

  onPrevMonth = () => {
    const count = this.state.count - 1;
    const currentMonth = dayjs(this.state.currentDate)
      .add(count, 'month')
      .month();

    this.setState({
      count,
    });

    if (currentMonth === 11) {
      Animated.timing(this.state.backgroundColor, {
        toValue: -1,
        useNativeDriver: false,
      }).start((props) => {
        if (props.finished) {
          this.setState({
            backgroundColor: new Animated.Value(12),
          });
        }
      });
    } else {
      Animated.timing(this.state.backgroundColor, {
        toValue: currentMonth,
        useNativeDriver: false,
      }).start();
    }
    this.calendar.addMonth(-1);
  };

  render() {
    const backgroundColor = this.state.backgroundColor.interpolate({
      inputRange: [-1, 0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12],
      outputRange: [
        backgroundColors[11],
        ...backgroundColors,
        backgroundColors[0],
      ],
    });

    const currentMonth = dayjs(this.state.currentDate)
      .add(this.state.count, 'month')
      .month();

    const currentDate = dayjs(this.state.currentDate)
      .add(this.state.count, 'month')
      .format('YYYY-MM-DD');

    const animationStyle = {
      backgroundColor,
    };

    return (
      <CalendarWrap backgroundColor={backgroundColors[currentMonth]}>
        <AnimatedSafeAreaView
          style={[GlobalStyles.droidSafeArea, styles.safeArea, animationStyle]}
        />
        <GestureRecognizer
          onSwipeLeft={this.onNextMonth}
          onSwipeRight={this.onPrevMonth}
          config={config}
        >
          <AnimatedSafeAreaView style={[styles.root, animationStyle]}>
            <Header
              onPrevMonth={this.onPrevMonth}
              onNextMonth={this.onNextMonth}
              date={dayjs(this.state.currentDate)
                .add(this.state.count, 'month')
                .format('YYYY年MM月')}
            />

            <DayOfWeek />
            {this.props.loading ? (
              <ActivityIndicator size="large" color={theme().mode.text} />
            ) : (
              <Calendar
                ref={(ref) => (this.calendar = ref)}
                style={{
                  backgroundColor: backgroundColors[currentMonth],
                }}
                monthFormat={''}
                hideDayNames
                hideArrows
                theme={calendarTheme}
                dayComponent={({ date }) => {
                  const schedule = this.props.calendars.find(
                    (item) =>
                      dayjs(item?.date).format('YYYY-MM-DD') === date.dateString
                  );

                  if (schedule) {
                    return (
                      <TouchableOpacity
                        onPress={() => this.props.onCalendar(schedule.date)}
                      >
                        <ImageDay
                          currentDate={currentDate}
                          kind={schedule?.item.kind || ''}
                          day={String(date.day)}
                        />
                      </TouchableOpacity>
                    );
                  }

                  return (
                    <TouchableOpacity
                      onPress={() => this.props.onCreate(date.dateString)}
                    >
                      <DayText
                        currentDate={currentDate}
                        color={backgroundColors[currentMonth]}
                        day={date.day}
                      />
                    </TouchableOpacity>
                  );
                }}
              />
            )}
            <View style={styles.calendarBottom} />
          </AnimatedSafeAreaView>
        </GestureRecognizer>
      </CalendarWrap>
    );
  }
}

const calendarTheme: CalendarTheme = {
  'stylesheet.calendar.main': {
    week: {
      marginTop: 0,
      flexDirection: 'row',
      justifyContent: 'space-between',
    },
  },
  textMonthFontSize: 18,
  monthTextColor: '#000',
  textMonthFontWeight: '600',
  'stylesheet.calendar.header': {
    header: {
      height: 0,
    },
    dayHeader: {
      fontWeight: '600',
      paddingBottom: theme().space(2),
      color: '#000',
    },
  },
};

const styles = StyleSheet.create({
  root: {
    flex: 1,
    height: '100%',
    width: '100%',
  },
  calendarBottom: {
    borderColor: 'gray',
    marginHorizontal: theme().space(2),
    borderBottomWidth: 1,
  },
  safeArea: {
    flex: 0,
  },
});
