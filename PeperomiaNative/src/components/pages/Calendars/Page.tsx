import React from "react";
import {
  Text,
  View,
  Dimensions,
  StyleSheet,
  Image,
  TouchableOpacity,
  ActivityIndicator
} from "react-native";
import { Calendar, LocaleConfig } from "react-native-calendars";
import Color from "color";
import { SelectCalendar } from "../../../lib/db/calendar";
import theme from "../../../config/theme";
import ImageDay from "../../organisms/Calendars/Image";

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

export default (props: Props) => (
  <View style={[styles.root, { backgroundColor: theme().color.lightNavy }]}>
    <View style={styles.yearContainer}>
      <Text style={styles.year}>2019年10月</Text>
    </View>
    <View style={styles.imageContainer}>
      <Image
        source={require("../../../img/october.png")}
        style={{ width: "100%" }}
      />
    </View>
    <View style={styles.weekNameContainer}>
      <Text style={[styles.weekText, { color: theme().color.red }]}>日</Text>
      <Text style={styles.weekText}>月</Text>
      <Text style={styles.weekText}>火</Text>
      <Text style={styles.weekText}>水</Text>
      <Text style={styles.weekText}>木</Text>
      <Text style={styles.weekText}>金</Text>
      <Text style={[styles.weekText, { color: theme().color.sky }]}>土</Text>
    </View>
    {props.loading ? (
      <ActivityIndicator size="large" color={theme().mode.text} />
    ) : (
      <Calendar
        style={{
          backgroundColor: theme().color.lightNavy
        }}
        current={"2019-10-01"}
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
          const schedule = props.calendars.find(
            item => item.date === date.dateString
          );

          if (schedule) {
            return (
              <TouchableOpacity
                onPress={() =>
                  props.onSchedule(schedule.itemId, schedule.title)
                }
              >
                <ImageDay kind={schedule.kind} day={String(date.day)} />
              </TouchableOpacity>
            );
          }

          return (
            <TouchableOpacity onPress={() => props.onCreate(date.dateString)}>
              <View
                style={[
                  styles.itemContainer,
                  {
                    backgroundColor: Color(theme().color.lightNavy)
                      .lighten(0.1)
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
  </View>
);

const styles = StyleSheet.create({
  root: {
    height: "100%",
    width: "100%"
  },
  yearContainer: {
    width: "100%",
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
