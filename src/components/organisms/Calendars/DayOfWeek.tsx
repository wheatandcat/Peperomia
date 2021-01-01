import React from 'react';
import { Text, View, StyleSheet } from 'react-native';
import theme from 'config/theme';

type Props = {};

const DayOfWeek: React.FC<Props> = () => {
  return (
    <View style={styles.weekNameContainer}>
      <Text style={[styles.weekText, { color: theme().color.error.main }]}>
        日
      </Text>
      <Text style={styles.weekText}>月</Text>
      <Text style={styles.weekText}>火</Text>
      <Text style={styles.weekText}>水</Text>
      <Text style={styles.weekText}>木</Text>
      <Text style={styles.weekText}>金</Text>
      <Text style={[styles.weekText, { color: theme().color.accent1.main }]}>
        土
      </Text>
    </View>
  );
};

export default DayOfWeek;

const styles = StyleSheet.create({
  weekNameContainer: {
    marginTop: theme().space(2),
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginHorizontal: theme().space(2),
  },
  weekText: {
    paddingVertical: theme().space(3),
    textAlign: 'center',
    alignItems: 'center',
    fontSize: 18,
    fontWeight: '600',
  },
});
