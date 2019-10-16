import React, { Component } from "react";
import {
  Text,
  View,
  Dimensions,
  StyleSheet,
  Image,
  TouchableOpacity,
  ActivityIndicator,
  Animated
} from "react-native";
import { Calendar, LocaleConfig } from "react-native-calendars";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import GestureRecognizer from "react-native-swipe-gestures";
import dayjs from "dayjs";
import advancedFormat from "dayjs/plugin/advancedFormat";
import "dayjs/locale/ja";
import Color from "color";
import { SelectCalendar } from "../../../lib/db/calendar";
import theme from "../../../config/theme";
import ImageDay from "../../organisms/Calendars/Image";

dayjs.extend(advancedFormat);

const width = Dimensions.get("window").width;

LocaleConfig.locales["jp"] = {
  monthNames: [
    "1月",
    "2月",
    "3月",
    "4月",
    "5月",
    "6月",
    "7月",
    "8月",
    "9月",
    "10月",
    "11月",
    "12月"
  ],
  monthNamesShort: [
    "1月",
    "2月",
    "3月",
    "4月",
    "5月",
    "6月",
    "7月",
    "8月",
    "9月",
    "10月",
    "11月",
    "12月"
  ],
  dayNames: ["日", "月", "火", "水", "木", "金", "土"],
  dayNamesShort: ["日", "月", "火", "水", "木", "金", "土"]
};
LocaleConfig.defaultLocale = "jp";

type Props = {
  loading: boolean;
  calendars: SelectCalendar[];
  onCreate: (date: string) => void;
  onSchedule: (id: number, title: string) => void;
};

type State = {
  currentDate: string;
  count: number;
  backgroundColor: any;
};

const backgroundColors = [
  "#e5e4e6",
  "#d4dcda",
  "#e8d3d1",
  "#fdeff2",
  "#badcad",
  theme().color.dodgerBlue,
  "#a0d8ef",
  "#f2f2b0",
  theme().color.beige,
  theme().color.lightNavy,
  "#eaedf7",
  "#ebf6f7"
];

const config = {
  velocityThreshold: 0.3,
  directionalOffsetThreshold: 80
};

export default class extends Component<Props, State> {
  state = {
    currentDate: "2019-10-01",
    count: 0,
    backgroundColor: new Animated.Value(9)
  };

  calendar: any;
  componentDidMount() {
    const currentMonth = dayjs(this.state.currentDate).month();

    Animated.timing(this.state.backgroundColor, {
      toValue: currentMonth
    }).start();
  }

  onNextMonth = () => {
    const count = this.state.count + 1;
    const currentMonth = dayjs(this.state.currentDate)
      .add(count, "month")
      .month();

    this.setState({
      count
    });

    if (currentMonth === 0) {
      Animated.timing(this.state.backgroundColor, {
        toValue: 12
      }).start(props => {
        if (props.finished) {
          this.setState({
            backgroundColor: new Animated.Value(0)
          });
        }
      });
    } else {
      Animated.timing(this.state.backgroundColor, {
        toValue: currentMonth
      }).start();
    }
    this.calendar.addMonth(1);
  };

  onPrevMonth = () => {
    const count = this.state.count - 1;
    const currentMonth = dayjs(this.state.currentDate)
      .add(count, "month")
      .month();

    this.setState({
      count
    });

    if (currentMonth === 11) {
      Animated.timing(this.state.backgroundColor, {
        toValue: -1
      }).start(props => {
        if (props.finished) {
          this.setState({
            backgroundColor: new Animated.Value(12)
          });
        }
      });
    } else {
      Animated.timing(this.state.backgroundColor, {
        toValue: currentMonth
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
        backgroundColors[0]
      ]
    });

    const currentMonth = dayjs(this.state.currentDate)
      .add(this.state.count, "month")
      .month();

    const animationStyle = {
      backgroundColor
    };

    return (
      <GestureRecognizer
        onSwipeLeft={this.onNextMonth}
        onSwipeRight={this.onPrevMonth}
        config={config}
      >
        <Animated.View style={[styles.root, animationStyle]}>
          <View style={styles.headerContainer}>
            <TouchableOpacity onPress={this.onPrevMonth}>
              <MaterialCommunityIcons
                name="chevron-left"
                size={30}
                color={theme().color.main}
              />
            </TouchableOpacity>

            <View style={styles.yearContainer}>
              <Text style={styles.year}>
                {dayjs(this.state.currentDate)
                  .add(this.state.count, "month")
                  .format("YYYY年MM月")}
              </Text>
            </View>

            <TouchableOpacity onPress={this.onNextMonth}>
              <MaterialCommunityIcons
                name="chevron-right"
                size={30}
                color={theme().color.main}
              />
            </TouchableOpacity>
          </View>
          <View style={styles.imageContainer}>
            <Image
              source={require("../../../img/october.png")}
              style={{ width: "100%" }}
            />
          </View>
          <View style={styles.weekNameContainer}>
            <Text style={[styles.weekText, { color: theme().color.red }]}>
              日
            </Text>
            <Text style={styles.weekText}>月</Text>
            <Text style={styles.weekText}>火</Text>
            <Text style={styles.weekText}>水</Text>
            <Text style={styles.weekText}>木</Text>
            <Text style={styles.weekText}>金</Text>
            <Text style={[styles.weekText, { color: theme().color.sky }]}>
              土
            </Text>
          </View>
          {this.props.loading ? (
            <ActivityIndicator size="large" color={theme().mode.text} />
          ) : (
            <Calendar
              ref={ref => (this.calendar = ref)}
              style={{
                backgroundColor: backgroundColors[currentMonth]
              }}
              monthFormat={""}
              hideDayNames
              hideArrows
              theme={{
                "stylesheet.calendar.main": {
                  week: {
                    marginTop: 0,
                    flexDirection: "row",
                    justifyContent: "space-between"
                  }
                },
                textMonthFontSize: 18,
                monthTextColor: "#000",
                textMonthFontWeight: "600",
                "stylesheet.calendar.header": {
                  header: {
                    height: 0
                  },
                  dayHeader: {
                    fontWeight: "600",
                    paddingBottom: 10,
                    color: "#000"
                  }
                }
              }}
              dayComponent={({ date }) => {
                const schedule = this.props.calendars.find(
                  item => item.date === date.dateString
                );

                if (schedule) {
                  return (
                    <TouchableOpacity
                      onPress={() =>
                        this.props.onSchedule(schedule.itemId, schedule.title)
                      }
                    >
                      <ImageDay kind={schedule.kind} day={String(date.day)} />
                    </TouchableOpacity>
                  );
                }

                return (
                  <TouchableOpacity
                    onPress={() => this.props.onCreate(date.dateString)}
                  >
                    <View
                      style={[
                        styles.itemContainer,
                        {
                          backgroundColor: Color(backgroundColors[currentMonth])
                            .lighten(0.4)
                            .toString()
                        }
                      ]}
                    >
                      <Text style={styles.dayText}>{date.day}</Text>
                    </View>
                  </TouchableOpacity>
                );
              }}
            />
          )}
          <View style={styles.calendarBottom} />
        </Animated.View>
      </GestureRecognizer>
    );
  }
}

const styles = StyleSheet.create({
  root: {
    height: "100%",
    width: "100%"
  },
  headerContainer: {
    justifyContent: "space-between",
    alignItems: "center",
    flexDirection: "row"
  },
  yearContainer: {
    paddingVertical: 20,
    justifyContent: "center"
  },
  year: {
    textAlign: "center",
    color: theme().color.darkGray,
    fontSize: 25,
    fontWeight: "600"
  },
  imageContainer: {
    paddingTop: 30,
    paddingBottom: 30,
    alignItems: "center",
    justifyContent: "center"
  },
  itemContainer: {
    width: width / 7,
    height: width / 7,
    borderTopWidth: 0.5,
    borderRightWidth: 0.5,
    borderLeftWidth: 0.5,
    borderColor: "gray",
    alignItems: "center",
    justifyContent: "center"
  },
  weekNameContainer: {
    marginTop: 7,
    flexDirection: "row",
    justifyContent: "space-around",
    marginHorizontal: 4
  },
  weekText: {
    paddingVertical: 12,
    textAlign: "center",
    alignItems: "center",
    fontSize: 18,
    fontWeight: "600"
  },
  calendarBottom: {
    borderColor: "gray",
    marginHorizontal: 4,
    borderBottomWidth: 1
  },
  dayText: {
    textAlign: "center",
    color: theme().color.gray,
    fontSize: 18,
    fontWeight: "600"
  }
});
