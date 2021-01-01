import React, { useState, useRef, useEffect, useCallback } from 'react';
import {
  View,
  TouchableOpacity,
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
import usePrevious from 'hooks/usePrevious';
import useIsFirstRender from 'hooks/useIsFirstRender';
import { calendarKey } from 'lib/calendar';
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
  theme().color.accent2.light,
  '#E3E3FE',
  '#FFE7D0',
  '#BFD3B7',
];

const config = {
  velocityThreshold: 0.3,
  directionalOffsetThreshold: 80,
};

const initialState = () => {
  return {
    currentDate: dayjs().format('YYYY-MM-01'),
    count: 0,
    backgroundColor: new Animated.Value(dayjs().month()),
  };
};

type CalendarRef = {
  addMonth: (month: number) => void;
};

const Page: React.FC<Props> = (props) => {
  const [state, setState] = useState<State>(initialState());
  const [loading, setLoading] = useState(false);
  const isFirstRender = useIsFirstRender();
  const prevProps = usePrevious(props);
  const calendarRef = useRef<CalendarRef>(null);

  useEffect(() => {
    if (isFirstRender) return;

    const currentMonth = dayjs(state.currentDate).month();

    Animated.timing(state.backgroundColor, {
      toValue: currentMonth,
      useNativeDriver: false,
    }).start();
  }, [isFirstRender, state.backgroundColor, state.currentDate]);

  useEffect(() => {
    const key1 = calendarKey(props?.calendars || []);
    const key2 = calendarKey(prevProps?.calendars || []);

    if (key1 !== key2) {
      setLoading(true);

      // NOTE: dayComponentが再描画しないと更新されないのでstateを更新する
      setTimeout(() => {
        setLoading(false);
      }, 5);
    } else if (!key1 && !key2) {
      setLoading(true);

      // NOTE: dayComponentが再描画しないと更新されないのでstateを更新する
      setTimeout(() => {
        setLoading(false);
      }, 5);
    }
  }, [props, prevProps]);

  const onNextMonth = useCallback(() => {
    const count = state.count + 1;
    const day = dayjs(state.currentDate).add(count, 'month');
    const currentMonth = day.month();

    const startDate = dayjs(day)
      .startOf('month')
      .add(-7, 'day')
      .format('YYYY-MM-DDT00:00:00');
    const endDate = dayjs(day)
      .endOf('month')
      .add(7, 'day')
      .format('YYYY-MM-DDT23:59:59');

    props.setDate(startDate, endDate);

    setState((s) => ({
      ...s,
      count,
    }));

    if (currentMonth === 0) {
      Animated.timing(state.backgroundColor, {
        toValue: 12,
        useNativeDriver: false,
      }).start((callback) => {
        if (callback.finished) {
          state.backgroundColor.setValue(0);
        }
      });
    } else {
      Animated.timing(state.backgroundColor, {
        toValue: currentMonth,
        useNativeDriver: false,
      }).start();
    }
    if (calendarRef.current) {
      calendarRef.current.addMonth(1);

      setLoading(true);
    }
  }, [calendarRef, state, props]);

  const onPrevMonth = useCallback(() => {
    const count = state.count - 1;
    const day = dayjs(state.currentDate).add(count, 'month');
    const currentMonth = day.month();

    const startDate = dayjs(day)
      .startOf('month')
      .add(-7, 'day')
      .format('YYYY-MM-DDT00:00:00');
    const endDate = dayjs(day)
      .endOf('month')
      .add(7, 'day')
      .format('YYYY-MM-DDT23:59:59');

    props.setDate(startDate, endDate);

    setState((s) => ({
      ...s,
      count,
    }));

    if (currentMonth === 11) {
      Animated.timing(state.backgroundColor, {
        toValue: -1,
        useNativeDriver: false,
      }).start((callback) => {
        if (callback.finished) {
          state.backgroundColor.setValue(11);
        }
      });
    } else {
      Animated.timing(state.backgroundColor, {
        toValue: currentMonth,
        useNativeDriver: false,
      }).start();
    }
    if (calendarRef.current) {
      calendarRef.current.addMonth(-1);

      setLoading(true);
    }
  }, [calendarRef, state, props]);

  const backgroundColor = state.backgroundColor.interpolate({
    inputRange: [-1, 0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12],
    outputRange: [
      backgroundColors[11],
      ...backgroundColors,
      backgroundColors[0],
    ],
  });

  const currentMonth = dayjs(state.currentDate)
    .add(state.count, 'month')
    .month();

  const currentDate = dayjs(state.currentDate)
    .add(state.count, 'month')
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
        onSwipeLeft={onNextMonth}
        onSwipeRight={onPrevMonth}
        config={config}
      >
        <AnimatedSafeAreaView style={[styles.root, animationStyle]}>
          <Header
            onPrevMonth={onPrevMonth}
            onNextMonth={onNextMonth}
            date={dayjs(state.currentDate)
              .add(state.count, 'month')
              .format('YYYY年MM月')}
          />

          <DayOfWeek />
          {loading ? (
            <Calendar
              style={{
                backgroundColor: backgroundColors[currentMonth],
              }}
              monthFormat={''}
              hideDayNames
              hideArrows
              current={currentDate}
              theme={calendarTheme}
              dayComponent={({ date }) => {
                return (
                  <TouchableOpacity>
                    <DayText
                      currentDate={currentDate}
                      color={backgroundColors[currentMonth]}
                      day={date.day}
                    />
                  </TouchableOpacity>
                );
              }}
            />
          ) : (
            <>
              <Calendar
                ref={calendarRef as any}
                style={{
                  backgroundColor: backgroundColors[currentMonth],
                }}
                current={currentDate}
                monthFormat={''}
                hideDayNames
                hideArrows
                theme={calendarTheme}
                dayComponent={({ date }) => {
                  const schedule = props.calendars.find(
                    (item) =>
                      dayjs(item?.date).format('YYYY-MM-DD') === date.dateString
                  );

                  if (schedule) {
                    return (
                      <TouchableOpacity
                        onPress={() => props.onCalendar(schedule.date)}
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
                      onPress={() => props.onCreate(date.dateString)}
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
              <View style={styles.calendarBottom} />
            </>
          )}
        </AnimatedSafeAreaView>
      </GestureRecognizer>
    </CalendarWrap>
  );
};

export default Page;

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
